import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <Container>
        <p className="eyebrow">Erreur 404</p>
        <h1>
          Cette page
          <br />
          <em>a changé de cap.</em>
        </h1>
        <p>
          Le lien est peut-être ancien. Retrouvez mon expertise et mes résultats
          depuis l’accueil.
        </p>
        <ButtonLink href="/">Retour à l’accueil</ButtonLink>
      </Container>
    </main>
  );
}
