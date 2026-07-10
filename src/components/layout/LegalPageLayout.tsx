import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function LegalPageLayout({ title, description, children }: LegalPageLayoutProps) {
  return (
    <main className="bg-ivory">
      <section className="border-b border-graphite/10 py-16 sm:py-20">
        <Container>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-sand-dark">
            Informations légales
          </p>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-stone sm:text-lg">{description}</p>
        </Container>
      </section>
      <section className="py-14 sm:py-18">
        <Container>
          <div className="prose-legal max-w-4xl">{children}</div>
        </Container>
      </section>
    </main>
  );
}
