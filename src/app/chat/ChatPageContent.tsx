"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatBubble from "@/components/chat-bubble";
import ChatInput from "@/components/chat-input";
import { saveMessage, getMessagesForConversation } from "@/lib/firestore";
import { auth } from "@/lib/firebase-client";
import { onAuthStateChanged } from "firebase/auth";

type Message = {
  sender: "user" | "ava";
  text: string;
};

export default function ChatPageContent() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("c");

  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // 🔐 Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setEmail(user.email ?? null);
      } else {
        setUserId(null);
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 📩 Load existing messages for this conversation
  useEffect(() => {
    if (!conversationId) return;

    localStorage.setItem("conversationId", conversationId);
    getMessagesForConversation(conversationId).then(setMessages);
  }, [conversationId]);

  // 🧠 Handle sending a message
  async function handleSend(userMessage: string) {
    if (!conversationId || !userId) return;

    const userMsg: Message = { sender: "user", text: userMessage };
    setMessages((prev) => [...prev, userMsg]);

    await saveMessage({
      ...userMsg,
      userId,
      conversationId,
    });

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          userId,
          conversationId,
        }),
      });

      const data = await res.json();
      const aiMsg: Message = { sender: "ava", text: data.answer };

      setMessages((prev) => [...prev, aiMsg]);

      await saveMessage({
        ...aiMsg,
        userId,
        conversationId,
      });
    } catch (error) {
      const fallbackMsg: Message = {
        sender: "ava",
        text: "⚠️ Ava had trouble thinking. Please try again.",
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  }

  return (
    <main className="flex h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <div className="p-4 text-sm text-[var(--foreground)]/60 border-b border-[var(--foreground)]/10">
        {email && (
          <>
            You’re signed in as <strong>{email}</strong>
          </>
        )}
      </div>

      {/* Chat body with scroll */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        {messages.map((msg, i) => (
          <ChatBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      {/* Sticky Chat Input */}
      <div className="sticky bottom-0 bg-[var(--background)] p-4 border-t border-[var(--foreground)]/10">
        <ChatInput onSend={handleSend} />
      </div>
    </main>
  );
}
