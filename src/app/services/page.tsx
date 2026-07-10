import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTASection } from "@/components/ui/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Services — Sites, campagnes et tracking | Mikianeli",
  description:
    "Sites orientés conversion, landing pages, campagnes Meta Ads, Google Ads, tracking et optimisation pour générer des demandes qualifiées.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services — Sites, campagnes et tracking | Mikianeli",
    description:
      "Sites orientés conversion, landing pages, campagnes Meta Ads, Google Ads, tracking et optimisation pour générer des demandes qualifiées.",
    url: "/services",
  },
};

const detailedServices = [
  {
    kicker: "Site orienté conversion",
    title: "Un site clair, crédible et prêt à recevoir du trafic.",
    text: "Un bon site ne doit pas seulement présenter l’activité. Il doit aider le prospect à comprendre l’offre, trouver les bonnes informations et savoir quoi faire ensuite.",
    includes: [
      "pages prestations plus lisibles",
      "éléments de réassurance",
      "CTA adaptés à chaque intention",
      "formulaire de demande mieux qualifié",
      "tracking des clics et formulaires importants",
    ],
    result: "Un site plus lisible, plus rassurant et mieux préparé à générer des demandes.",
  },
  {
    kicker: "Landing pages",
    title: "Une page dédiée quand une offre mérite un parcours à part.",
    text: "Pour certaines campagnes, une page ciblée évite de disperser le visiteur. Le message est plus direct, l’offre plus visible et l’action plus simple.",
    includes: ["une page par offre prioritaire", "cohérence entre publicité et page", "FAQ courte", "arguments de réassurance", "formulaire ou CTA unique"],
    result: "Un parcours plus cohérent entre la publicité, la page et la demande attendue.",
  },
  {
    kicker: "Campagnes Meta Ads",
    title: "Tester des angles, pas seulement diffuser des publicités.",
    text: "Les campagnes Meta servent à travailler les offres, les créations, les messages et les audiences. Pour les secteurs sensibles comme l’esthétique ou le paramédical, les messages doivent rester sobres, conformes et respectueux.",
    includes: [
      "angle de campagne",
      "création publicitaire",
      "message conforme au secteur",
      "page de destination",
      "suivi des demandes",
      "optimisation",
    ],
    result: "Des campagnes mieux reliées à l’offre, au parcours et aux demandes que vous voulez obtenir.",
  },
  {
    kicker: "Campagnes Google Ads",
    title: "Capter les recherches quand l’intention existe déjà.",
    text: "Google Ads permet d’être présent au moment où un prospect cherche activement une solution. Le travail consiste à relier mots-clés, annonces, pages et conversions.",
    includes: ["requêtes utiles", "mots-clés à exclure", "annonces claires", "pages cohérentes", "conversions suivies", "lecture des coûts"],
    result: "Un levier plus lisible pour transformer les recherches utiles en demandes suivies.",
  },
  {
    kicker: "Tracking et mesure",
    title: "Savoir d’où viennent les demandes, pas seulement compter les clics.",
    text: "Le tracking donne une lecture plus claire des contacts, formulaires, appels, rendez-vous et sources de trafic. Il évite de piloter l’acquisition à l’intuition.",
    includes: [
      "formulaires envoyés",
      "clics téléphone",
      "clics email",
      "pages de remerciement",
      "sources de trafic",
      "suivi simple des demandes",
    ],
    result: "Une base plus fiable pour décider quoi garder, corriger ou arrêter.",
  },
  {
    kicker: "Optimisation continue",
    title: "Corriger les points de friction au lieu de tout refaire.",
    text: "Une fois le parcours lancé, l’enjeu est de prioriser les corrections : message, page, formulaire, offre, CTA, ciblage ou suivi.",
    includes: ["corriger une page faible", "ajuster un CTA", "améliorer un formulaire", "retravailler une offre", "couper ce qui ne produit rien", "renforcer ce qui fonctionne"],
    result: "Des améliorations régulières, concentrées sur ce qui influence vraiment les demandes.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-ink py-16 text-ivory sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-sand">
              Services
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Des leviers concrets pour structurer votre acquisition.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brume/78">
              Site, landing pages, campagnes et tracking : Mikianeli intervient sur les points qui
              influencent directement la génération de demandes.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="sand">
                Parler de votre acquisition
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-20 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Leviers"
            title="Chaque service doit régler un problème précis du parcours."
            text="Le site, la page, la campagne et le suivi ne sont pas des sujets séparés. Ils doivent travailler ensemble pour aider un prospect à comprendre, se rassurer et demander un échange."
          />
          <div className="mt-12 space-y-6">
            {detailedServices.map((service, index) => (
              <article
                key={service.kicker}
                className="grid gap-8 rounded-card border border-graphite/10 bg-white/58 p-6 shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-8"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-sand-dark">
                    {String(index + 1).padStart(2, "0")} · {service.kicker}
                  </p>
                  <h2 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-base leading-8 text-stone">{service.text}</p>
                </div>
                <div className="rounded-2xl border border-graphite/10 bg-ivory p-5">
                  <h3 className="font-semibold text-graphite">Ce que l’on structure</h3>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-stone">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl bg-ink p-4 text-ivory">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand">
                      Résultat visé
                    </p>
                    <p className="mt-3 text-sm leading-7 text-brume/80">{service.result}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Vous voulez prioriser les bons leviers ?"
        text="Parlons de votre site, de vos campagnes et de votre suivi pour identifier ce qui bloque les demandes aujourd’hui."
        primaryLabel="Parler de votre acquisition"
      />
    </main>
  );
}
