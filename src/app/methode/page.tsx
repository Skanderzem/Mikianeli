import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTASection } from "@/components/ui/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Méthode — Structurer votre acquisition digitale | Mikianeli",
  description:
    "Une méthode claire pour diagnostiquer, structurer, lancer et améliorer votre acquisition digitale.",
  alternates: {
    canonical: "/methode",
  },
  openGraph: {
    title: "Méthode — Structurer votre acquisition digitale | Mikianeli",
    description:
      "Une méthode claire pour diagnostiquer, structurer, lancer et améliorer votre acquisition digitale.",
    url: "/methode",
  },
};

const methodDetails = [
  {
    title: "Diagnostic",
    text: "On identifie ce qui freine les demandes : message flou, page trop faible, formulaire peu utile, campagne mal reliée ou suivi incomplet.",
    points: [
      "Que comprend un prospect en arrivant ?",
      "Où hésite-t-il ?",
      "Quelles demandes arrivent vraiment ?",
      "Quelles sources sont suivies ?",
    ],
  },
  {
    title: "Clarification de l’offre",
    text: "On reformule ce qui doit être compris vite : l’offre, les priorités, les bénéfices concrets et les limites à ne pas promettre.",
    points: ["offre lisible", "messages hiérarchisés", "freins identifiés", "bénéfices formulés sobrement"],
  },
  {
    title: "Structure du parcours",
    text: "On organise les pages, preuves, CTA et formulaires pour que le prospect sache quoi faire sans chercher.",
    points: ["pages", "CTA", "formulaires", "preuves", "FAQ", "navigation"],
  },
  {
    title: "Création ou optimisation",
    text: "On crée ou améliore ce qui manque : site, landing page, contenu, formulaire, création publicitaire ou élément de réassurance.",
    points: ["site", "landing pages", "contenus", "publicités", "formulaires", "éléments de conversion"],
  },
  {
    title: "Acquisition",
    text: "On choisit les leviers adaptés au marché : Google Ads, Meta Ads, actions locales ou prospection ciblée.",
    points: ["Meta Ads", "Google Ads", "actions locales", "prospection ciblée", "budget et priorités"],
  },
  {
    title: "Mesure et amélioration",
    text: "On suit les demandes, lit les résultats simplement et corrige ce qui bloque en priorité.",
    points: ["tracking", "analyse", "décisions", "corrections", "amélioration progressive"],
  },
];

const avoidItems = [
  "lancer des campagnes vers une page trop faible",
  "refaire un site sans clarifier l’offre",
  "mesurer seulement les clics",
  "multiplier les actions sans priorité",
  "perdre des demandes faute de suivi",
];

const diagnosticOutputs = [
  {
    title: "Les points de friction",
    text: "Ce qui bloque aujourd’hui dans l’offre, les pages, les campagnes ou le suivi.",
  },
  {
    title: "Les priorités",
    text: "Les actions à traiter en premier pour éviter de disperser le budget et l’énergie.",
  },
  {
    title: "Les leviers recommandés",
    text: "Site, landing page, Meta Ads, Google Ads, tracking ou optimisation : les leviers adaptés à votre contexte.",
  },
  {
    title: "Une première feuille de route",
    text: "Une vision simple de ce qu’il faut corriger, lancer ou mesurer en priorité.",
  },
];

export default function MethodPage() {
  return (
    <main>
      <section className="bg-ink py-16 text-ivory sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-sand">
              Méthode
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Une méthode claire pour avancer sans actions dispersées.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brume/78">
              Avant de lancer un site ou une campagne, nous cherchons à comprendre ce qui bloque :
              l’offre, le message, le parcours, le suivi ou la cohérence entre les leviers.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="sand">
                Demander un diagnostic
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Étapes"
            title="Un cadre simple pour prendre de meilleures décisions."
            text="La méthode sert à savoir quoi traiter en premier, puis à relier les actions entre elles : offre, page, campagne, formulaire et mesure."
          />
          <div className="mt-12 space-y-6">
            {methodDetails.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-8 rounded-card border border-graphite/10 bg-white/58 p-6 shadow-soft md:grid-cols-[0.78fr_1fr] md:p-8"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-sand-dark">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-5 text-base leading-8 text-stone">{step.text}</p>
                </div>
                <ul className="grid content-start gap-3 sm:grid-cols-2">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-2xl border border-graphite/10 bg-ivory px-4 py-3 text-sm leading-6 text-graphite"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-graphite py-20 text-ivory sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Ce que cette méthode évite"
            title="Moins d’actions lancées au hasard, plus de priorités utiles."
            tone="dark"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {avoidItems.map((item) => (
              <div key={item} className="rounded-2xl border border-ivory/10 bg-ink/45 p-5">
                <span className="mb-5 block h-px w-10 bg-sand" />
                <p className="text-base leading-7 text-brume/82">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brume py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Après le diagnostic"
            title="Ce que vous obtenez après le diagnostic."
            text="Le diagnostic doit permettre de repartir avec une lecture plus claire de votre acquisition, même avant de lancer un nouveau site ou une campagne."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {diagnosticOutputs.map((item, index) => (
              <article
                key={item.title}
                className="rounded-card border border-graphite/10 bg-white/58 p-6 shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-5 font-display text-xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-stone">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Vous voulez repartir d’un diagnostic clair ?"
        text="Identifions les points de friction avant de décider quoi créer, lancer ou optimiser."
      />
    </main>
  );
}
