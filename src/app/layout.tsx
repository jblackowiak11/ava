import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ava — Abodie's Virtual Assistant",
  description: "Internal AI assistant for the Abodie team.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
