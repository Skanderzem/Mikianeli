import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Demander un diagnostic | Mikianeli",
  description:
    "Contactez Mikianeli pour identifier les points de friction de votre site, de vos campagnes ou de votre parcours de conversion.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Demander un diagnostic | Mikianeli",
    description:
      "Contactez Mikianeli pour identifier les points de friction de votre site, de vos campagnes ou de votre parcours de conversion.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-ink py-16 text-ivory sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-sand">
              Contact
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Parlons de ce que vous voulez améliorer.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brume/78">
              Site, campagnes, demandes entrantes, suivi des conversions : décrivez rapidement
              votre situation et nous identifierons les premiers points de friction.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="lg:pt-4">
              <div className="rounded-card border border-graphite/10 bg-white/58 p-6 shadow-soft">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Le diagnostic peut vous aider à comprendre :
                </h2>
                <ul className="mt-6 space-y-4">
                  {[
                    "pourquoi votre site ne génère pas assez de demandes",
                    "si vos campagnes envoient vers le bon parcours",
                    "quels leviers traiter en premier",
                    "comment mieux suivre les contacts",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-stone">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 rounded-2xl border border-sand/25 bg-sand/10 p-5">
                  <p className="font-semibold text-ink">
                    Le premier échange sert à clarifier votre situation, pas à vous vendre une
                    solution standard.
                  </p>
                  <p className="mt-3 text-sm leading-6 text-stone">
                    Réponse rapide après réception de votre demande.
                  </p>
                </div>
                <div className="mt-7 rounded-2xl border border-graphite/10 bg-ivory p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-dark">
                    Alternative
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-3 block text-base font-semibold text-ink transition hover:text-sand-dark"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div className="mt-6">
                  <ButtonLink href="/methode" variant="secondary">
                    Voir la méthode
                  </ButtonLink>
                </div>
              </div>
            </aside>
            <ContactForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
