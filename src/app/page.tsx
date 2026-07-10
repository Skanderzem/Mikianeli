import type { Metadata } from "next";
import { HeroSignalBackground } from "@/components/visuals/HeroSignalBackground";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTASection } from "@/components/ui/CTASection";
import { InsightCard } from "@/components/ui/InsightCard";
import { MethodStep } from "@/components/ui/MethodStep";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Container } from "@/components/layout/Container";
import { differentiation, methodSteps, serviceCards } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mikianeli — Votre acquisition digitale, construite avec méthode",
  description:
    "Mikianeli aide les entreprises locales et spécialisées à clarifier leur offre, structurer leur site et générer des demandes qualifiées.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mikianeli — Votre acquisition digitale, construite avec méthode",
    description:
      "Mikianeli aide les entreprises locales et spécialisées à clarifier leur offre, structurer leur site et générer des demandes qualifiées.",
    url: "/",
  },
};

const problemCards = [
  {
    title: "Le site présente, mais ne déclenche pas assez de demandes",
    text: "Les visiteurs comprennent l’activité, mais le parcours ne les aide pas assez à passer à l’action.",
  },
  {
    title: "Les campagnes tournent, mais le parcours derrière reste fragile",
    text: "Le budget attire du trafic, mais les pages, les messages ou les formulaires ne suivent pas toujours.",
  },
  {
    title: "Les résultats sont difficiles à lire sans tracking clair",
    text: "Sans suivi fiable, il devient compliqué de savoir quelles sources produisent les bonnes demandes.",
  },
];

const systemItems = ["Offre", "Site", "Campagnes", "Formulaire", "Tracking", "Optimisation"];

const homeSectorCards = [
  {
    title: "Habitat, travaux et rénovation",
    text: "Sites, campagnes et formulaires pensés pour générer des demandes de devis mieux qualifiées.",
  },
  {
    title: "Cliniques de médecine esthétique",
    text: "Des parcours sobres pour présenter les traitements, rassurer et faciliter les demandes de rendez-vous.",
  },
  {
    title: "Centres laser et soins techniques",
    text: "Des pages et campagnes qui expliquent les prestations techniques avant la demande d’information.",
  },
  {
    title: "Commerces locaux à potentiel",
    text: "Des campagnes locales pour transformer la visibilité en visites, réservations ou demandes.",
  },
  {
    title: "Kiné, sport-santé et paramédical",
    text: "Des sites clairs pour présenter les spécialités, renforcer la visibilité locale et faciliter le contact.",
  },
  {
    title: "PME et services spécialisés",
    text: "Une acquisition plus structurée pour clarifier l’offre, prioriser les actions et suivre les demandes.",
  },
];

const humanCards = [
  "Marketing digital et acquisition",
  "Sites, campagnes et tracking",
  "Approche orientée demandes, devis et rendez-vous",
];

const observedIndicators = [
  {
    label: "CPC observé",
    value: "jusqu’à -50 %",
    text: "Après optimisation des angles, ciblages et parcours publicitaires.",
  },
  {
    label: "CPA observé",
    value: "jusqu’à -35 %",
    text: "En améliorant la cohérence entre campagne, page et suivi des conversions.",
  },
  {
    label: "Nouveaux clients",
    value: "jusqu’à +85 %",
    text: "Sur des dispositifs d’acquisition structurés et suivis dans le temps.",
  },
  {
    label: "Phase de test",
    value: "2 100+ clics",
    text: "Pour analyser rapidement les signaux d’intérêt et les points de friction.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-signal-host relative overflow-hidden bg-ink pb-[23rem] pt-12 text-ivory sm:min-h-[1040px] sm:py-16 lg:min-h-[820px] lg:py-20 xl:min-h-[840px] xl:py-20">
        <HeroSignalBackground />
        <Container className="relative z-10">
          <div className="max-w-[44rem] lg:pt-4 xl:pt-5">
            <div>
              <Badge tone="dark" className="hero-badge">
                Agence digitale orientée acquisition
              </Badge>
              <h1 className="hero-title mt-7 max-w-[37rem] font-display text-4xl font-semibold leading-[1.06] sm:mt-8 sm:text-5xl lg:max-w-[40rem] lg:text-[3.65rem] xl:text-[3.95rem]">
                Votre acquisition digitale, construite avec méthode.
              </h1>
              <p className="mt-6 max-w-[35rem] text-lg leading-8 text-brume/78 sm:mt-7 sm:text-xl">
                Mikianeli aide les entreprises locales et spécialisées à transformer leur site,
                leurs campagnes et leur suivi en un parcours clair pour générer plus de demandes
                utiles.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-5">
                <ButtonLink href="/contact" variant="sand" className="hero-cta hero-cta-primary">
                  Demander un diagnostic
                </ButtonLink>
                <ButtonLink href="/methode" variant="light" className="hero-cta hero-cta-secondary">
                  Découvrir la méthode
                </ButtonLink>
              </div>
              <p className="hero-reassurance mt-6 text-sm font-medium text-brume/70 sm:mt-8 sm:text-base">
                Diagnostic clair. Priorités concrètes. Actions mesurables.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <AnimatedSection className="bg-ivory py-18 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Le blocage"
            title="Avoir de la visibilité ne suffit pas."
            text="Un site, des réseaux sociaux ou quelques campagnes peuvent attirer l’attention. Mais si l’offre n’est pas claire, si le parcours ne rassure pas ou si les demandes ne sont pas suivies, la visibilité ne se transforme pas en opportunités commerciales."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problemCards.map((card, index) => (
              <ServiceCard key={card.title} title={card.title} text={card.text} index={index} />
            ))}
          </div>
        </Container>
      </AnimatedSection>

      <section className="bg-graphite py-18 text-ivory sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeader
              eyebrow="La réponse"
              title="Relier les bons éléments dans le bon ordre."
              text="Mikianeli travaille sur l’ensemble du parcours : l’offre, les pages, les campagnes, les formulaires et le suivi. L’objectif est de rendre l’acquisition plus claire, plus mesurable et plus utile commercialement."
              tone="dark"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {systemItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-ivory/10 bg-ink/45 p-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sand font-display text-sm font-semibold text-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-lg font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brume py-18 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader
              eyebrow="Services"
              title="Les leviers concrets pour générer des demandes qualifiées."
            />
            <ButtonLink href="/services" variant="secondary" className="w-fit">
              Découvrir les services
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-18 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader
              eyebrow="Secteurs"
              title="Des secteurs où le parcours compte autant que la visibilité."
              text="Travaux, esthétique, laser, commerces ou services spécialisés : l’objectif reste le même, transformer l’intérêt en demande claire et suivie."
            />
            <ButtonLink href="/secteurs" variant="secondary" className="w-fit">
              Voir les secteurs accompagnés
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homeSectorCards.map((sector, index) => (
              <ServiceCard key={sector.title} title={sector.title} text={sector.text} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-18 text-ivory sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader
              eyebrow="Méthode"
              title="Une méthode simple pour avancer sans actions dispersées."
              tone="dark"
            />
            <ButtonLink href="/methode" variant="light" className="w-fit">
              Voir la méthode complète
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-9 md:grid-cols-2 lg:grid-cols-3">
            {methodSteps.map((step, index) => (
              <MethodStep key={step.title} {...step} index={index} tone="dark" />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-18 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Pourquoi Mikianeli"
            title="Une approche pensée pour les entreprises qui veulent du concret."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {differentiation.map((item, index) => (
              <InsightCard
                key={item.title}
                label={String(index + 1).padStart(2, "0")}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-graphite py-18 text-ivory sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <SectionHeader
              eyebrow="Derrière Mikianeli"
              title="Derrière Mikianeli, une approche terrain."
              text="Mikianeli est portée par Iskander Zemouri, profil marketing digital orienté acquisition. L’approche est simple : clarifier l’offre, construire des parcours lisibles, lancer les bons leviers et suivre les résultats sans complexifier inutilement."
              tone="dark"
            />
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {humanCards.map((card, index) => (
                <div
                  key={card}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 font-display text-lg font-semibold text-ivory">{card}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brume py-18 sm:py-24">
        <Container>
          <SectionHeader
            eyebrow="Suivi"
            title="Des indicateurs suivis sur des campagnes réelles."
            text="L’objectif n’est pas seulement de générer du trafic, mais de comprendre ce qui réduit les coûts, améliore la qualité des demandes et aide à prendre de meilleures décisions."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {observedIndicators.map((indicator) => (
              <article
                key={indicator.label}
                className="rounded-card border border-graphite/10 bg-ink p-5 text-ivory shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand">
                  {indicator.label}
                </p>
                <p className="mt-5 font-display text-3xl font-semibold text-ivory">
                  {indicator.value}
                </p>
                <p className="mt-4 text-sm leading-6 text-brume/78">{indicator.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-stone">
            Ces indicateurs sont issus de missions et campagnes pilotées. Ils varient selon le
            marché, l’offre, le budget, le parcours et la qualité du suivi. Ils ne constituent pas
            une garantie de résultat.
          </p>
        </Container>
      </section>

      <CTASection
        title="Vous voulez savoir ce qui bloque vos demandes aujourd’hui ?"
        text="Le diagnostic permet d’identifier les points de friction de votre site, de vos campagnes ou de votre parcours de conversion."
        secondaryLabel="Voir les services"
        secondaryHref="/services"
      />
    </main>
  );
}
