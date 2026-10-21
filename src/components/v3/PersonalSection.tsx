import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/Editorial";
import { siteConfig } from "@/lib/site";

export function PersonalSection() {
  return (
    <section className="personal-v3 section" id="iskander">
      <Container>
        <div className="personal-grid">
          <div className="personal-portrait">
            <Image
              src="/iskander-portrait-bleu.webp"
              alt="Iskander Zemouri, votre interlocuteur chez Mikianeli"
              width={1080}
              height={1080}
              sizes="(max-width: 700px) calc(100vw - 46px), (max-width: 900px) 480px, (max-width: 1100px) 42vw, 520px"
            />
          </div>
          <div className="personal-copy">
            <p className="eyebrow">Mikianeli, c’est Iskander.</p>
            <h2>
              La personne qui
              <br />
              pense la stratégie
              <br />
              <em>la met en œuvre.</em>
            </h2>
            <p className="large-copy">
              Vous travaillez directement avec moi. Du premier échange à la
              prochaine optimisation.
            </p>
            <p className="personal-description">
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
