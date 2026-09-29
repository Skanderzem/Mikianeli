import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { pageMetadata, siteConfig } from "@/lib/site";
export const metadata = pageMetadata(
  "Politique de confidentialité",
  "Données du formulaire, cookies, mesure d’audience et exercice de vos droits sur mikianeli.com.",
  "/politique-confidentialite",
);
export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      description="Les données utilisées sur ce site, leur finalité et vos choix. Mise à jour : 29 septembre 2026."
    >
      <h2>Responsable du traitement</h2>
      <p>
        Iskander Zemouri, entrepreneur individuel sous le nom commercial
        MIKIANELI, SIRET 903 180 974 00029, 61 rue de Lyon, 75012 Paris. Contact
        : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
      <h2>Votre demande de contact</h2>
      <p>
        Le formulaire recueille votre nom, votre email et votre message.
        L’entreprise et le besoin sont facultatifs. Ces informations servent à
        vous répondre, qualifier votre demande et préparer un éventuel
        accompagnement. Le traitement repose sur les mesures précontractuelles
        prises à votre demande et, pour les autres échanges professionnels, sur
        l’intérêt légitime à y répondre. Les champs obligatoires sont
        nécessaires pour traiter votre demande.
      </p>
      <p>
        Les informations sont transmises par email à Iskander Zemouri. Elles ne
        vous inscrivent à aucune newsletter. Évitez d’inclure des données
        sensibles dans votre message.
      </p>
      <h2>Conservation</h2>
      <p>
        Les échanges de prospection sont conservés au maximum trois ans après
        votre dernier contact actif, sauf suppression demandée auparavant ou
        obligation légale. Si une relation contractuelle est engagée, les
        documents nécessaires à son exécution et à la comptabilité suivent les
        durées légales applicables.
      </p>
      <h2>Hébergement, envoi et sécurité</h2>
      <p>
        Cloudflare héberge le site et assure sa distribution et sa protection.
        Resend transmet les emails du formulaire. Ces prestataires traitent les
        données nécessaires à ces fonctions. L’adresse IP est utilisée
        temporairement pour limiter les envois abusifs ; elle n’est pas ajoutée
        au message de contact. Un identifiant technique permet d’éviter l’envoi
        en double d’une même demande.
      </p>
      <p>
        Ces prestataires, ainsi que Google lorsque vous acceptez la mesure
        d’audience, peuvent traiter des données hors de l’Espace économique
        européen. Leurs dispositifs contractuels et les garanties applicables
        sont décrits dans les informations de{" "}
        <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a>,{" "}
        <a href="https://resend.com/legal/privacy-policy">Resend</a> et{" "}
        <a href="https://policies.google.com/privacy?hl=fr">Google</a>.
      </p>
      <h2>Cookies et mesure d’audience</h2>
      <p>
        Le cookie nécessaire <code>mikianeli_consent_v2</code> mémorise votre
        acceptation ou votre refus pendant 180 jours. Il ne sert pas à suivre
        votre navigation. Sans acceptation, Google Analytics n’est pas chargé
        par le site.
      </p>
      <p>
        Avec votre accord, Google Analytics 4 mesure les pages consultées, les
        clics sur les appels à prendre contact et les demandes dont l’envoi est
        confirmé. Les cookies <code>_ga</code> et <code>_ga_…</code> peuvent
        alors être utilisés, avec une expiration configurée à treize mois sans
        prolongation automatique par le site. La publicité personnalisée et
        Google Signals sont désactivés dans le marquage du site.
      </p>
      <p>
        Le contenu du formulaire, votre nom et votre email ne sont jamais
        envoyés à Google Analytics par le site. Les paramètres de campagne UTM,
        lorsqu’ils respectent le format autorisé, peuvent être associés à la
        navigation et à la demande avec votre accord. N’inscrivez jamais de
        données personnelles dans les liens de campagne.
      </p>
      <p>
        Vous pouvez refuser aussi facilement qu’accepter et modifier votre choix
        à tout moment grâce au lien « Gérer les cookies » en pied de page. Le
        retrait bloque les nouveaux événements de mesure et supprime les cookies
        Analytics accessibles sur ce domaine. Il n’efface pas rétroactivement
        les données déjà transmises à Google.
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l’accès, la rectification, l’effacement, la
        limitation du traitement et, lorsque les conditions s’appliquent, la
        portabilité de vos données. Vous pouvez vous opposer aux traitements
        fondés sur l’intérêt légitime et retirer votre consentement à la mesure
        d’audience à tout moment.
      </p>
      <p>
        Pour exercer ces droits, écrivez à{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. En cas de
        difficulté, vous pouvez adresser une réclamation à la{" "}
        <a href="https://www.cnil.fr/fr/adresser-une-plainte">CNIL</a>.
      </p>
    </LegalPageLayout>
  );
}
