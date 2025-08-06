import React from "react";
import Link from "next/link";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", className = "", children, ...rest }: Props) {
  const base = "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition";
  const styles = variant === "primary"
    ? "bg-yellow-400 text-black hover:opacity-90"
    : "border border-neutral-700 text-neutral-200 hover:bg-neutral-900";
  const cls = `${base} ${styles} ${className}`;

  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
