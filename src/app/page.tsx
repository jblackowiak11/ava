import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/button";
import { Section } from "@/components/section";

export default function Page() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-neutral-900/20 via-black to-black" />
        <Section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Ava, your internal AI assistant.
          </h1>
          <p className="mt-5 max-w-2xl text-neutral-300">
            Search shared knowledge, draft estimates, and answer ops questions—securely inside Abodie.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/login">Sign in with Google</Button>
            <Button href="#features" variant="ghost">See how it works</Button>
          </div>
          <p className="mt-3 text-xs text-neutral-400">Access restricted to @abodie.co accounts.</p>
        </Section>
      </div>

      {/* Features */}
      <Section className="py-16" id="features">
        <div className="grid gap-6 md:grid-cols-3">
          <Feature title="Shared Memory" body="Org-wide memory powered by vector search." />
          <Feature title="Estimating Assist" body="Draft budgets from historical recipes." />
          <Feature title="Secure & Private" body="Abodie-only sign-in. Your data stays inside." />
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-10 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Ready to try Ava?</h2>
          <p className="mt-3 text-neutral-300">Sign in with your Abodie account and open the dashboard.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/login">Sign in</Button>
            <Button href="/dashboard" variant="ghost">Open Dashboard</Button>
          </div>
        </div>
      </Section>

      <Footer />
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-neutral-950 p-6">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-neutral-300">{body}</p>
    </div>
  );
}
