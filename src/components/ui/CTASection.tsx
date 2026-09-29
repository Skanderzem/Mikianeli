import { Container } from "@/components/layout/Container";
import { ButtonLink } from "./ButtonLink";
import { siteConfig } from "@/lib/site";
export function CTASection({
  title = "On passe au prochain cap ?",
  text = "Un compte à reprendre, des leads à générer ou un besoin de renfort ? Parlez-moi de votre situation.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="closing" data-motion-scene>
      <Container>
        <p className="eyebrow">Votre prochaine décision</p>
        <div className="closing-grid">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <ButtonLink href="/contact" data-cta="closing">
            {siteConfig.cta}
          </ButtonLink>
        </div>
        <div className="closing-note">
          <span>Vous échangez directement avec Iskander.</span>
          <span>Objectifs, périmètre, budget : on commence par en parler.</span>
        </div>
      </Container>
    </section>
  );
}
