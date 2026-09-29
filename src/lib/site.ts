import type { Metadata } from "next";

export const siteConfig = {
  name: "Mikianeli",
  person: "Iskander Zemouri",
  url: "https://mikianeli.com",
  email: "iskander@mikianeli.com",
  linkedin: "https://www.linkedin.com/in/iskander-zemouri",
  description:
    "Iskander Zemouri, Media Buyer freelance. Meta Ads, acquisition payante et tracking pour entreprises, équipes marketing et agences. Du budget média aux résultats CRM.",
  cta: "Parler de votre acquisition",
};
export const navLinks = [
  { href: "/services", label: "Expertise" },
  { href: "/resultats", label: "Résultats" },
  { href: "/agences", label: "Agences" },
  { href: "/#iskander", label: "À propos" },
];
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: "/og-mikianeli.png",
          width: 1200,
          height: 630,
          alt: "Mikianeli — Iskander Zemouri. Media Buyer freelance, Meta Ads et acquisition mesurable.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-mikianeli.png"],
    },
  };
}
export const expertise = [
  {
    id: "paid-media",
    title: "Acquisition payante",
    label: "Meta Ads · Google Search",
    text: "Je structure et pilote vos campagnes : objectifs, audiences, budgets et optimisations. Meta Ads est mon cœur de métier ; Google Search intervient quand une demande active mérite d’être captée.",
    deliverables: [
      "Audit du compte et priorités d’action",
      "Structure, lancement et gestion des campagnes",
      "Pilotage CPL / CPA / ROAS selon votre modèle",
      "Montée en budget progressive, selon les résultats",
    ],
  },
  {
    id: "creatif",
    title: "Créations qui apprennent",
    label: "Angles · Hooks · Tests",
    text: "Je transforme les arguments de votre offre en hypothèses publicitaires. Chaque test doit nous apprendre ce qui fait réagir vos prospects et ce qui les fait réellement convertir.",
    deliverables: [
      "Angles, accroches et messages publicitaires",
      "Briefs et déclinaisons à partir de vos assets",
      "Plan de tests lisible et analyse des créations",
      "Coordination avec vos designers ou créateurs",
    ],
  },
  {
    id: "mesure",
    title: "Mesure & décisions",
    label: "Tracking · CRM · Reporting",
    text: "Je rapproche les données publicitaires des résultats commerciaux. Un formulaire envoyé, un lead reçu et un client signé sont trois étapes différentes : votre reporting doit les distinguer.",
    deliverables: [
      "Audit Pixel, Dataset, CAPI, GTM et GA4",
      "Contrôle des événements et des doublons",
      "Analyse du parcours et rapprochement CRM",
      "Reporting, recommandations et prochaines actions",
    ],
  },
];
export const methodSteps = [
  {
    title: "Comprendre avant de lancer",
    text: "Votre offre, vos marges, votre cycle de vente et vos données existantes. Je définis avec vous l’objectif et les limites du test.",
    output: "Un diagnostic et des priorités partagées.",
  },
  {
    title: "Construire une base fiable",
    text: "Je vérifie les conversions, le parcours et le suivi des demandes, puis je prépare la structure de campagne et les premières hypothèses créatives.",
    output: "Un plan de lancement mesurable.",
  },
  {
    title: "Tester, lire, ajuster",
    text: "Je compare les messages, les audiences et les parcours. Je confronte les résultats des régies aux leads et aux ventes réellement enregistrés.",
    output: "Des décisions fondées sur vos résultats.",
  },
  {
    title: "Renforcer ce qui fonctionne",
    text: "J’ajuste les budgets progressivement, renouvelle les créations et partage ce qu’il faut poursuivre, corriger ou arrêter.",
    output: "Un reporting qui débouche sur des actions.",
  },
];
export const faqs = [
  {
    question: "Avec quels budgets travaillez-vous ?",
    answer:
      "Le budget dépend de votre coût d’acquisition cible, de la valeur d’un client et du volume nécessaire pour apprendre. Je distingue toujours le budget média de mes honoraires. Lors du premier échange, nous vérifions si votre enveloppe permet un test utile, puis je vous propose un périmètre chiffré.",
  },
  {
    question: "Meta Ads ou Google Ads ?",
    answer:
      "Meta Ads est ma spécialité : faire découvrir une offre, tester des messages et générer des leads ou des ventes. Google Search est pertinent quand vos clients recherchent déjà votre solution. Je recommande le canal à partir de votre besoin, pas l’inverse.",
  },
  {
    question: "Créez-vous aussi les publicités ?",
    answer:
      "Je prends en charge les angles, les accroches, les textes, les briefs et les tests. Je peux décliner vos contenus existants et travailler avec vos designers ou créateurs. Un tournage ou une production vidéo complète fait l’objet d’un périmètre distinct, défini avant la mission.",
  },
  {
    question: "Pouvez-vous reprendre un compte existant et son tracking ?",
    answer:
      "Oui. Je commence par l’historique des campagnes, les créations, les budgets et les conversions. Je vérifie ensuite le Pixel, les événements, GTM, GA4 et la cohérence avec vos données commerciales. Je priorise les corrections avant de modifier ce qui fonctionne.",
  },
  {
    question: "Qui possède le compte publicitaire et les données ?",
    answer:
      "Vous restez propriétaire de vos comptes, de vos assets et de vos données. J’interviens avec les accès nécessaires à la mission. Le périmètre, les livrables et les modalités de transmission sont définis ensemble au départ.",
  },
  {
    question: "Travaillez-vous en marque blanche avec des agences ?",
    answer:
      "Oui, en renfort ponctuel ou récurrent : reprise de comptes, gestion opérationnelle, creative testing, tracking et reporting. Je peux m’intégrer à vos outils et participer aux échanges clients selon le rôle convenu. Vous gardez la relation commerciale.",
  },
  {
    question: "Combien de temps avant de pouvoir juger les résultats ?",
    answer:
      "Les premiers signaux arrivent dès la diffusion, mais une décision fiable dépend du volume, du budget et du cycle de vente. Je ne promets pas de rentabilité en quelques jours. Nous fixons ensemble une fenêtre d’observation et des critères pour poursuivre, ajuster ou arrêter.",
  },
  {
    question: "Comment commence une collaboration ?",
    answer:
      "Vous me décrivez votre activité et votre besoin. Nous échangeons sur les objectifs, le budget, les accès et l’existant. Je vous propose ensuite un périmètre, des honoraires et un mode de suivi clairs avant toute intervention.",
  },
];
