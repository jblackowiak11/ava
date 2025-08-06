import React from "react";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export function Section({ className = "", children, ...rest }: SectionProps) {
  return (
    <section className={`mx-auto max-w-6xl px-4 ${className}`} {...rest}>
      {children}
    </section>
  );
}
