"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase-client";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setEmail(user.email);
      } else {
        window.location.href = "/login"; // kick back to login if unauth'd
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-4">Welcome to Ava</h1>
        {email && <p className="text-[var(--foreground)]/60 mb-8">Signed in as <strong>{email}</strong></p>}
        <div className="rounded-xl border border-[var(--foreground)]/20 p-8">
          <p className="text-lg">
            🚧 Ava’s dashboard is under construction. Future home of chat, memory, and KPIs.
          </p>
        </div>
      </div>
    </div>
  );
}
