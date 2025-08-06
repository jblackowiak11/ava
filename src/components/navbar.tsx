import Link from "next/link";
import { Button } from "./button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900/60 bg-black/50 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 rounded-full bg-yellow-400" />
          <span className="text-sm tracking-wide text-neutral-200">Ava</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button href="/login" variant="ghost">Sign in</Button>
          <Button href="/dashboard">Open Dashboard</Button>
        </div>
      </nav>
    </header>
  );
}
