import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { app } from "./firebase-client";

const db = getFirestore(app);

// 🧠 Save a message to Firestore under a specific conversation
export async function saveMessage({
  sender,
  text,
  userId,
  conversationId,
}: {
  sender: "user" | "ava";
  text: string;
  userId: string;
  conversationId: string;
}) {
  try {
    await addDoc(
      collection(db, "conversations", conversationId, "messages"),
      {
        sender,
        text,
        userId,
        createdAt: serverTimestamp(),
      }
    );
  } catch (err) {
    console.error("Failed to save message:", err);
  }
}

// 🧠 Get all messages in a conversation
export async function getMessagesForConversation(conversationId: string) {
  const q = query(
    collection(db, "conversations", conversationId, "messages"),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    ...(doc.data() as { sender: "user" | "ava"; text: string }),
  }));
}

// 🧵 Create a new conversation
export async function createConversation(userId: string, title: string) {
  const docRef = await addDoc(collection(db, "conversations"), {
    userId,
    title,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

// 📚 Get all conversations for a user
export async function getUserConversations(userId: string) {
  const q = query(
    collection(db, "conversations"),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// 🧠 Get all messages ever sent by a user (across all conversations)
export async function getUserMessages(userId: string) {
  const allMessages: { sender: "user" | "ava"; text: string }[] = [];

  const conversationsQuery = query(
    collection(db, "conversations"),
    where("userId", "==", userId)
  );
  const conversationSnapshot = await getDocs(conversationsQuery);

  for (const convoDoc of conversationSnapshot.docs) {
    const convoId = convoDoc.id;
    const messagesRef = collection(db, "conversations", convoId, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));
    const messagesSnapshot = await getDocs(messagesQuery);

    const messages = messagesSnapshot.docs.map((doc) => ({
      ...(doc.data() as { sender: "user" | "ava"; text: string }),
    }));

    allMessages.push(...messages);
  }

  return allMessages;
}
