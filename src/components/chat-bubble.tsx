type ChatBubbleProps = {
  sender: "user" | "ava";
  text: string;
};

export default function ChatBubble({ sender, text }: ChatBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      className={`max-w-[80%] rounded-xl px-4 py-3 my-2 ${
        isUser
          ? "ml-auto bg-[var(--foreground)] text-[var(--background)]"
          : "mr-auto bg-neutral-200 text-black"
      }`}
    >
      {text}
    </div>
  );
}
