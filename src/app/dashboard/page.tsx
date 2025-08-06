import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-4">Welcome to Ava</h1>

        <div className="rounded-xl border border-[var(--foreground)]/20 p-8 space-y-6">
          <p className="text-lg">
            🚧 Ava’s dashboard is under construction. Future home of chat, memory, and KPIs.
          </p>

          <Link
            href="/chat"
            className="inline-block rounded-xl border border-[var(--foreground)] px-5 py-3 font-medium transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
          >
            Go to Chat
          </Link>
        </div>
      </div>
    </div>
  );
}
