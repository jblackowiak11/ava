import { Suspense } from "react";
import ChatLayout from "@/components/chat-layout";
import ChatPageContent from "./ChatPageContent";

export default function ChatPage() {
  return (
    <ChatLayout>
      <Suspense fallback={<div className="p-6">Loading chat...</div>}>
        <ChatPageContent />
      </Suspense>
    </ChatLayout>
  );
}
