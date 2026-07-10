import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTASection } from "@/components/ui/CTASection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Secteurs accompagnés — Travaux, esthétique, laser, kiné et commerces | Mikianeli",
  description:
    "Mikianeli accompagne les entreprises de travaux, cliniques de médecine esthétique, centres laser, kinés, commerces locaux et PME dans leur acquisition digitale.",
  alternates: {
    canonical: "/secteurs",
  },
  openGraph: {
    title: "Secteurs accompagnés — Travaux, esthétique, laser, kiné et commerces | Mikianeli",
    description:
      "Mikianeli accompagne les entreprises de travaux, cliniques de médecine esthétique, centres laser, kinés, commerces locaux et PME dans leur acquisition digitale.",
    url: "/secteurs",
  },
};

const sectors = [
  {
    kicker: "Habitat, travaux et rénovation",
    title: "Générer des demandes de devis plus qualifiées.",
    context:
      "Rénovation globale, extension, véranda, menuiserie, isolation, toiture, paysagisme, aménagement extérieur, rénovation énergétique ou travaux spécialisés.",
    stakes: [
      "site qui ne génère pas assez de demandes",
      "dépendance au bouche-à-oreille",
      "devis peu qualifiés",
      "offre mal structurée",
      "preuves ou réassurance insuffisantes",
      "campagnes non suivies",
    ],
    structure: [
      "site vitrine orienté devis",
      "pages prestations",
      "formulaire qualifiant",
      "réassurance autour de la méthode",
      "tracking des demandes",
    ],
    levers: ["Google Ads sur recherche active", "Meta Ads locales", "pages prestations", "optimisation du parcours"],
    outcome: "Générer des demandes de devis plus qualifiées et mieux comprendre les sources qui les produisent.",
  },
  {
    kicker: "Cliniques de médecine esthétique",
    title: "Présenter les traitements avec clarté et préserver la confiance.",
    context:
      "Médecine esthétique, greffe capillaire, injections, détatouage laser porté par une clinique, soins médicaux esthétiques ou instituts médicaux spécialisés.",
    stakes: [
      "communication sensible",
      "besoin de pédagogie",
      "image sérieuse à préserver",
      "offres difficiles à présenter sans agressivité",
      "contraintes des plateformes publicitaires",
      "prise de rendez-vous",
    ],
    structure: [
      "pages traitements",
      "landing pages par offre",
      "formulaires de contact",
      "tracking des demandes",
      "amélioration des créations publicitaires",
    ],
    levers: ["Meta Ads sobres", "Google Ads selon intention", "pages traitements", "contenus pédagogiques"],
    outcome: "Présenter les traitements avec clarté, préserver la confiance et générer des demandes de rendez-vous plus qualifiées.",
  },
  {
    kicker: "Centres laser et soins techniques",
    title: "Rendre les prestations compréhensibles avant la demande.",
    context:
      "Centres de détatouage laser, épilation laser, soins visage techniques, technologies esthétiques, centres spécialisés ou instituts avec prestations techniques.",
    stakes: [
      "prestations parfois mal comprises",
      "besoin d’expliquer le déroulement",
      "réassurance sur la précision",
      "différenciation du centre",
      "demande d’évaluation ou de rendez-vous",
    ],
    structure: [
      "pages offres",
      "landing pages",
      "contenus pédagogiques",
      "formulaires de demande",
      "tracking",
      "optimisation des CTA",
    ],
    levers: ["campagnes Meta Ads", "pages d’offre", "contenus pédagogiques", "optimisation de conversion"],
    outcome: "Rendre les prestations plus compréhensibles, rassurer le prospect et faciliter la demande d’information ou de rendez-vous.",
  },
  {
    kicker: "Kiné, sport-santé et paramédical",
    title: "Clarifier les spécialités et faciliter la prise de contact.",
    context:
      "Kinésithérapeutes, cabinets de kiné, centres de sport-santé, ostéopathes si pertinent et cabinets paramédicaux sélectionnés.",
    stakes: [
      "visibilité locale",
      "prise de rendez-vous",
      "explication des spécialités",
      "crédibilité",
      "différenciation",
      "parcours de contact",
    ],
    structure: [
      "site clair",
      "pages spécialités",
      "SEO local de base",
      "tracking des contacts",
      "optimisation de la prise de rendez-vous",
    ],
    levers: ["SEO local de base", "Google Ads local si pertinent", "Meta Ads sobres", "pages spécialités"],
    outcome: "Clarifier les spécialités, renforcer la visibilité locale et faciliter la prise de contact.",
  },
  {
    kicker: "Commerces locaux à potentiel",
    title: "Transformer la visibilité locale en visites, réservations ou demandes.",
    context:
      "Salles de sport, studios spécialisés, restaurants avec positionnement clair, loisirs, boutiques spécialisées, services locaux et activités avec réservation.",
    stakes: [
      "visibilité irrégulière",
      "communication sans structure",
      "manque de demandes ou réservations",
      "dépendance aux réseaux sociaux",
      "absence de suivi",
      "campagnes lancées sans parcours clair",
    ],
    structure: [
      "pages d’offre",
      "landing pages saisonnières",
      "contenus orientés conversion",
      "tracking des réservations ou demandes",
      "parcours de contact",
    ],
    levers: ["campagnes locales", "Meta Ads", "Google Ads local", "landing pages saisonnières"],
    outcome: "Transformer la visibilité locale en visites, réservations ou demandes concrètes.",
  },
  {
    kicker: "PME et services spécialisés",
    title: "Mettre de l’ordre dans l’acquisition digitale.",
    context:
      "PME de services, entreprises B2B locales, organismes spécialisés ou structures qui ont déjà une activité mais pas encore de système clair.",
    stakes: [
      "actions dispersées",
      "site vieillissant",
      "offres peu lisibles",
      "campagnes non mesurées",
      "absence de tracking",
      "difficulté à prioriser",
    ],
    structure: [
      "diagnostic",
      "refonte progressive du site",
      "landing pages",
      "tracking",
      "campagnes",
      "optimisation du parcours",
    ],
    levers: ["diagnostic", "landing pages", "campagnes ciblées", "tracking", "optimisation progressive"],
    outcome: "Mettre de l’ordre dans l’acquisition digitale pour savoir quoi améliorer et où investir.",
  },
];

const prioritySectors = sectors.slice(0, 3);
const secondarySectors = sectors.slice(3);

export default function SectorsPage() {
  return (
    <main>
      <section className="bg-ink py-16 text-ivory sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-sand">
              Secteurs
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Des secteurs où le parcours compte autant que la visibilité.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brume/78">
              Quand la décision demande de la confiance, du budget ou une explication claire,
              l’acquisition ne peut pas se limiter à attirer du trafic.
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
            eyebrow="Cibles prioritaires"
            title="Des marchés où la valeur client et la confiance imposent un parcours plus solide."
            text="Ces secteurs ont souvent une valeur client plus élevée, un besoin de réassurance important et un parcours qui doit être structuré avant de lancer ou renforcer les campagnes."
          />
          <div className="mt-12 space-y-8">
            {prioritySectors.map((sector, index) => (
              <SectorArticle key={sector.kicker} sector={sector} index={index} />
            ))}
          </div>

          <div className="mt-16">
            <SectionHeader
              eyebrow="Autres activités accompagnées"
              title="Des structures locales ou spécialisées lorsque le suivi peut être clair."
              text="Mikianeli peut aussi accompagner des structures locales ou spécialisées lorsque l’offre est claire et que les demandes peuvent être suivies correctement."
            />
            <div className="mt-12 space-y-8">
              {secondarySectors.map((sector, index) => (
                <SectorArticle key={sector.kicker} sector={sector} index={index + 3} />
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-card border border-graphite/10 bg-ink p-6 text-ivory shadow-soft sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-display text-2xl font-semibold leading-tight">
                  Vous ne rentrez pas exactement dans ces catégories ?
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-brume/78">
                  Mikianeli peut aussi accompagner d’autres activités lorsque l’offre est claire,
                  que la valeur du client justifie un vrai parcours d’acquisition et que les
                  résultats peuvent être suivis correctement.
                </p>
              </div>
              <ButtonLink href="/contact" variant="sand">
                Demander un diagnostic
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Votre secteur demande un parcours plus clair ?"
        text="Discutons de votre contexte pour identifier les messages, pages et leviers à structurer en priorité."
      />
    </main>
  );
}

type Sector = (typeof sectors)[number];

function SectorArticle({ sector, index }: { sector: Sector; index: number }) {
  return (
    <article className="rounded-card border border-graphite/10 bg-white/58 p-6 shadow-soft lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr]">
        <div>
          <p className="font-display text-sm font-semibold text-sand-dark">
            {String(index + 1).padStart(2, "0")} · {sector.kicker}
          </p>
          <h2 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {sector.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-stone">{sector.context}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <ListBlock title="Enjeux" items={sector.stakes} />
          <ListBlock title="Leviers adaptés" items={sector.levers} />
          <div className="rounded-2xl border border-graphite/10 bg-ink p-5 text-ivory">
            <h3 className="font-semibold text-ivory">Résultat recherché</h3>
            <p className="mt-5 text-sm leading-7 text-brume/78">{sector.outcome}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-graphite/10 bg-ivory p-5">
      <h3 className="font-semibold text-graphite">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-stone">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
