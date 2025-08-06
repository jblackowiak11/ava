import { useState } from "react";

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-2 border-t border-neutral-300 p-4"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask Ava anything..."
        className="flex-1 rounded-xl border border-neutral-300 px-4 py-2 text-sm"
      />
      <button
        type="submit"
        className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-xl text-sm hover:opacity-90"
      >
        Send
      </button>
    </form>
  );
}
