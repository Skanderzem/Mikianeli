import { Container } from "@/components/layout/Container";
import {
  PageIntro,
  BreadcrumbSchema,
  TextLink,
  FAQ,
} from "@/components/ui/Editorial";
import { CTASection } from "@/components/ui/CTASection";
import { ExpertiseStack } from "@/components/v3/ExpertiseStack";
import { MethodJourney } from "@/components/v3/MethodJourney";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pageMetadata, siteConfig } from "@/lib/site";
export const metadata = pageMetadata(
  "Consultant Meta Ads · Acquisition & tracking | Mikianeli",
  "Je construis et pilote votre acquisition : Meta Ads, creative testing, tracking et optimisation. Une stratégie et une exécution prises en charge directement par Iskander.",
  "/services",
);
export default function ExpertisePage() {
  return (
    <main id="main-content" className="expertise-page-v3">
      <BreadcrumbSchema current="Expertise" path="/services" />
      <PageIntro
        label="Expertise / Du plan à la performance"
        title={
          <>
            Construire.
            <br />
            Piloter.
            <br />
            <em>Faire progresser.</em>
          </>
        }
      >
        Je prends en charge votre acquisition comme un ensemble. La stratégie,
        les campagnes, les créations et la mesure travaillent vers le même
        objectif : le vôtre.
      </PageIntro>
      <section className="expertise-manifesto paper">
        <Container>
          <p>
            Une offre claire.<span> Un message qui compte.</span>
            <span> Un pilotage qui suit.</span>
          </p>
        </Container>
      </section>
      <ExpertiseStack />
      <MethodJourney />
      <section className="section paper" id="pour-qui">
        <Container className="audience-v3-grid">
          <div>
            <p className="eyebrow">
              Un objectif commercial, un périmètre clair
            </p>
            <h2>
              Votre modèle
              <br />
              donne le cap.
            </h2>
            <TextLink href="/resultats">Voir les résultats</TextLink>
          </div>
          <div className="audience-details">
            <article data-reveal>
              <h3>Générer des leads et des rendez-vous.</h3>
              <p>
                Services, PME, établissements : attirer des demandes et suivre
                leur transformation commerciale.
              </p>
            </article>
            <article data-reveal>
              <h3>Développer les ventes e-commerce.</h3>
              <p>
                Travailler l’acquisition avec une lecture du coût, de la marge
                et de la rentabilité.
              </p>
            </article>
            <article data-reveal>
              <h3>Renforcer une équipe marketing.</h3>
              <p>
                Apporter une expertise ciblée, reprendre un compte ou structurer
                les prochains tests.
              </p>
            </article>
            <article data-reveal>
              <h3>Prendre le relais en agence.</h3>
              <p>
                Intégrer vos process et piloter les comptes que vous me confiez,
                en marque blanche.
              </p>
              <TextLink href="/agences">L’offre agences</TextLink>
            </article>
          </div>
        </Container>
      </section>
      <section className="scope-v3 section">
        <Container>
          <div>
            <p className="eyebrow">Le cadre est posé dès le départ</p>
            <h2>
              Vous savez ce que
              <br />
              <em>je prends en charge.</em>
            </h2>
          </div>
          <div>
            <p className="large-copy">
              Les comptes, les livrables, les responsabilités et la cadence des
              échanges sont définis ensemble.
            </p>
            <p>
              Budget publicitaire et honoraires sont séparés. Les productions
              lourdes de contenu ou les refontes de site font l’objet d’un
              périmètre spécifique lorsqu’elles sont utiles.
            </p>
            <ButtonLink href="/contact" data-cta="expertise">
              {siteConfig.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>
      <FAQ />
      <CTASection />
    </main>
  );
}
