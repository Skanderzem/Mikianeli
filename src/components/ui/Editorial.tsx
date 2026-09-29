import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Arrow } from "./ButtonLink";
import { faqs, siteConfig } from "@/lib/site";
export function TextLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: ReactNode;
  "data-cta"?: string;
}) {
  return (
    <Link href={href} className="text-link" {...props}>
      {children}
      <Arrow diagonal />
    </Link>
  );
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="page-intro">
      <Container>
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        <div className="intro-bottom">
          <p className="intro-copy">{children}</p>
          <span className="intro-index" aria-hidden="true">
            M / {label.split(" ")[0]}
          </span>
        </div>
      </Container>
    </section>
  );
}
export function FAQ({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section paper">
      <Container className="split">
        <div>
          <p className="eyebrow">Questions fréquentes</p>
          <h2>
            Avant de
            <br />
            travailler ensemble.
          </h2>
          <p className="section-copy">
            Les réponses aux questions que vous vous posez peut-être.
          </p>
          <TextLink href="/contact">Poser votre question</TextLink>
        </div>
        <div className="faq">
          {(compact ? faqs.slice(0, 6) : faqs).map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="breadcrumbs" aria-label="Fil d’Ariane">
      <Link href="/">Accueil</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
export function BreadcrumbSchema({
  current,
  path,
}: {
  current: string;
  path: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: siteConfig.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: current,
              item: siteConfig.url + path,
            },
          ],
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
