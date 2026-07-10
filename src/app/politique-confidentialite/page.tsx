import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Mikianeli",
  description: "Politique de confidentialité du site Mikianeli.",
  alternates: {
    canonical: "/politique-confidentialite",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      description="Cette page explique les données susceptibles d’être traitées lorsque vous contactez Mikianeli via le site."
    >
      <h2>Responsable du traitement</h2>
      <p>
        Le responsable du traitement est Iskander Zemouri, exploitant de MIKIANELI, entreprise
        individuelle immatriculée sous le SIRET 903 180 974 00029.
      </p>

      <h2>Données susceptibles d’être collectées</h2>
      <p>
        Le formulaire de contact peut collecter les informations transmises volontairement : nom,
        entreprise, email, téléphone, site web, secteur d’activité, objectif principal et message.
      </p>

      <h2>Finalités</h2>
      <p>
        Ces données servent à répondre à la demande, qualifier le besoin, préparer un échange
        commercial et assurer le suivi de la relation avec la personne ou l’entreprise qui contacte
        Mikianeli.
      </p>

      <h2>Base légale</h2>
      <p>
        Le traitement repose sur l’intérêt légitime de Mikianeli à répondre aux demandes reçues et à
        échanger avec des prospects ou contacts professionnels. Selon le contexte, certains échanges
        peuvent également reposer sur le consentement de la personne concernée.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données issues des demandes de contact peuvent être conservées jusqu’à 3 ans après le
        dernier contact commercial, sauf demande de suppression ou obligation légale contraire.
      </p>

      <h2>Destinataires</h2>
      <p>
        Les données sont destinées à Mikianeli et aux outils strictement nécessaires au traitement
        des demandes, selon la configuration retenue au moment du déploiement.
      </p>

      <h2>Droits des personnes</h2>
      <p>
        Vous pouvez demander l’accès, la rectification, la suppression, la limitation ou l’opposition
        au traitement de vos données personnelles. Pour exercer ces droits, écrivez à{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>Cookies et mesure d’audience</h2>
      <p>
        Le site peut utiliser des cookies ou traceurs soumis au consentement pour mesurer
        l’audience, comprendre les parcours et suivre certaines campagnes. Les outils envisagés
        sont Google Tag Manager, Google Analytics 4, Google Ads et Meta Pixel.
      </p>
      <p>
        Lorsque ces outils sont configurés, ils ne doivent être activés qu’après consentement lorsque
        la loi l’exige. Vous pouvez accepter, refuser ou modifier vos choix via le bandeau cookies
        prévu à cet effet. Les détails de cette section seront ajustés selon les outils effectivement
        activés lors du déploiement.
      </p>

      <h2>Formulaire de contact</h2>
      <p>
        Le formulaire présent sur le site transmet les demandes à Mikianeli afin de répondre au
        message et de préparer un éventuel échange commercial. Vous pouvez également écrire
        directement par email à{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
