import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales | Mikianeli",
  description: "Mentions légales du site Mikianeli.",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function LegalNoticePage() {
  return (
    <LegalPageLayout
      title="Mentions légales"
      description="Informations relatives à l’éditeur du site Mikianeli et aux conditions générales d’utilisation du site vitrine."
    >
      <h2>Éditeur du site</h2>
      <ul>
        <li>Nom commercial : MIKIANELI</li>
        <li>Exploitant : Iskander Zemouri</li>
        <li>Statut : entreprise individuelle / entrepreneur individuel</li>
        <li>RCS : 903 180 974 R.C.S. Paris</li>
        <li>SIRET : 903 180 974 00029</li>
        <li>Adresse de l’établissement : 61 rue de Lyon, 75012 Paris, France</li>
        <li>Responsable de publication : Iskander Zemouri</li>
        <li>
          Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </li>
      </ul>

      <h2>Activité</h2>
      <p>
        Conseils pour les affaires et autres conseils de gestion. Prestations de services aux
        entreprises et aux particuliers non soumises à réglementation.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107,
        États-Unis, sous réserve de la configuration finale de déploiement. Si une entité
        Cloudflare Europe est plus appropriée selon la configuration finale, cette mention pourra
        être ajustée.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, éléments graphiques, logos, visuels, interfaces et contenus présents sur ce site
        sont protégés par le droit de la propriété intellectuelle. Toute reproduction,
        représentation, adaptation ou réutilisation, totale ou partielle, doit faire l’objet d’une
        autorisation préalable.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations présentées sur ce site ont un caractère informatif et peuvent être mises à
        jour. Mikianeli s’efforce de proposer des contenus exacts et accessibles, sans garantir
        l’absence totale d’erreur, d’interruption ou d’indisponibilité temporaire.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site, vous pouvez écrire à{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
