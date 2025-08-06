"use client";

import { useState } from "react";
import { signInWithGoogle, auth } from "@/lib/firebase-client";

export default function Home() {
  const [error, setError] = useState("");

  async function handleSignIn() {
    try {
      const result = await signInWithGoogle();
      const email = result.user.email || "";

      if (!email.endsWith("@abodie.co")) {
        await auth.signOut();
        window.location.href = "/nope";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Sign-in failed. Try again.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground text-center px-6">
      <h1 className="text-4xl font-bold">Welcome to Ava</h1>
      <p className="mt-2 text-lg">This page does absolutely nothing.</p>
      <p className="mt-1 text-sm text-muted">Except send you somewhere slightly more useful.</p>

      <button
        onClick={handleSignIn}
        className="mt-6 rounded-xl border border-foreground px-5 py-3 text-sm hover:bg-foreground hover:text-background transition"
      >
        Take me to the good stuff →
      </button>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </main>
  );
}
