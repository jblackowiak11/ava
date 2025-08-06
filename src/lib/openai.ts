import OpenAI from "openai";

console.log("✅ OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function askAva(userMessage: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are Ava, a smart assistant for a high-end design-build company.",
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    temperature: 0.7,
  });

  return response.choices[0]?.message.content ?? "Something went wrong.";
}
