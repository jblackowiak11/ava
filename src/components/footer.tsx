export default function Footer() {
  return (
    <footer className="border-t border-neutral-900/60">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-neutral-400">
        © {new Date().getFullYear()} Abodie. Internal use only.
      </div>
    </footer>
  );
}
