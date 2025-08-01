'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#f5f1e8', fontFamily: 'Helvetica Neue, sans-serif' }}
    >
      <h1 className="text-4xl font-light mb-4 tracking-tight text-gray-900">
        Ava
      </h1>
      <p className="text-base text-gray-600 max-w-md text-center leading-relaxed mb-6">
        An intelligent assistant built exclusively for Abodie.
      </p>

      {!session ? (
        <button
          onClick={() => {
            console.log("🧠 Clicking signIn");
            signIn("google");
          }}
          className="bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800"
        >
          Sign in with Google
        </button>
      ) : (
        <button
          onClick={() => signOut()}
          className="text-sm text-gray-500 underline"
        >
          Sign out
        </button>
      )}
    </main>
  );
}
