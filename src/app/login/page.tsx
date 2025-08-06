"use client";

import { signInWithGoogle, auth } from "@/lib/firebase-client";
import { useState } from "react";

export default function LoginPage() {
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-semibold">Sign in to Ava</h1>
      <p className="mt-2 text-[var(--foreground)]/60 text-sm">
        Access is restricted to <code>@abodie.co</code> accounts.
      </p>

      <div className="mt-8">
        <button
          onClick={handleSignIn}
          className="rounded-xl bg-[var(--foreground)] text-[var(--background)] px-6 py-3 font-medium transition hover:opacity-90"
        >
          Sign in with Google
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}
