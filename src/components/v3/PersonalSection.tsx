import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/Editorial";
import { siteConfig } from "@/lib/site";

// Supply only a newly approved professional portrait. No image or empty slot by default.
export function PersonalSection({
  portrait,
}: {
  portrait?: { src: string; alt: string };
}) {
  return (
    <section className="personal-v3 section" id="iskander">
      <Container>
        <div className="personal-heading">
          <p className="eyebrow">Mikianeli, c’est Iskander.</p>
          <span className="personal-signature" aria-hidden="true">
            IZ.
          </span>
        </div>
        <div className={`personal-grid ${portrait ? "with-portrait" : ""}`}>
          {portrait && (
            <div className="personal-portrait">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(max-width: 700px) 90vw, 320px"
              />
            </div>
          )}
          <h2>
            La personne qui
            <br />
            pense la stratégie
            <br />
            <em>la met en œuvre.</em>
          </h2>
          <div>
            <p className="large-copy">
              Vous travaillez directement avec moi. Du premier échange à la
              prochaine optimisation.
            </p>
            <p>
              Mon expérience en agence m’a appris à piloter plusieurs univers, à
              challenger les créations et à garder les priorités commerciales en
              vue. Avec Mikianeli, cette exigence s’accompagne d’une relation
              simple : un interlocuteur, impliqué dans l’exécution.
            </p>
            <div className="personal-principles">
              <span>Conseil + exécution</span>
              <span>Échanges directs</span>
              <span>Décisions expliquées</span>
            </div>
            <TextLink href={siteConfig.linkedin}>
              Rencontrer mon parcours
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
