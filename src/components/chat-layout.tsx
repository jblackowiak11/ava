"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase-client";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const db = getFirestore();

type Conversation = {
  id: string;
  title: string;
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentId = searchParams.get("c");

  // 🔐 Auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribeAuth();
  }, []);

  // 📡 Real-time conversations
  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "conversations"),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { title: string }),
      }));
      setConversations(convos);
    });

    return () => unsubscribe();
  }, [userId]);

  // ➕ Create new chat
  async function handleNewChat() {
    if (!userId) return;

    const docRef = await addDoc(collection(db, "conversations"), {
      title: "Untitled Chat",
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    localStorage.setItem("conversationId", docRef.id);
    router.push(`/chat?c=${docRef.id}`);
  }

  // ✏️ Rename chat
  async function handleRename(id: string, oldTitle: string) {
    const newTitle = prompt("Enter a new title", oldTitle);
    if (!newTitle || newTitle === oldTitle) return;

    const ref = doc(db, "conversations", id);
    await updateDoc(ref, {
      title: newTitle,
      updatedAt: new Date(),
    });
  }

  // ❌ Delete chat
  async function handleDelete(id: string) {
    const confirmDelete = confirm("✅ Are you sure you want to delete this chat?");
    if (!confirmDelete) return;

    const ref = doc(db, "conversations", id);
    await deleteDoc(ref);
  }

  // 🧼 Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Suspense fallback={<div>Loading chat layout...</div>}>
      <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[var(--foreground)]/10 p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-6">🧠 Ava</h2>

          <button
            onClick={handleNewChat}
            className="mb-4 rounded-md bg-[var(--foreground)] text-[var(--background)] px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            + New Chat
          </button>

          <div className="flex-1 overflow-y-auto text-sm text-[var(--foreground)]/80 space-y-1">
            {conversations.length === 0 && <p>No conversations yet.</p>}

            {conversations.map((c) => (
              <div
                key={c.id}
                className={`flex justify-between items-center px-2 py-1 rounded-md ${
                  c.id === currentId
                    ? "bg-gray-200 text-black font-semibold"
                    : "hover:bg-[var(--foreground)]/10"
                }`}
              >
                <Link href={`/chat?c=${c.id}`} className="truncate flex-1">
                  {c.title}
                </Link>

                <div className="relative ml-1" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === c.id ? null : c.id)
                    }
                    className="!text-black text-sm px-1 rounded bg-transparent hover:bg-black/10 focus:outline-none focus:ring-0 shadow-none"
                    style={{ backgroundColor: "transparent", boxShadow: "none" }}
                    title="Options"
                  >
                    ⋯
                  </button>

                  {openMenu === c.id && (
                    <div className="absolute right-0 mt-1 w-28 bg-[var(--background)] border border-gray-300 rounded-md shadow text-xs text-[var(--foreground)] z-10">
                      <button
                        onClick={() => {
                          handleRename(c.id, c.title);
                          setOpenMenu(null);
                        }}
                        className="w-full px-3 py-1 text-left hover:bg-[var(--foreground)]/10 rounded-t-md"
                      >
                        ✏️ Rename
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(c.id);
                          setOpenMenu(null);
                        }}
                        className="w-full px-3 py-1 text-left text-red-600 hover:bg-red-50 rounded-b-md"
                      >
                        ❌ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </Suspense>
  );
}