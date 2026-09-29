import { Container } from "@/components/layout/Container";
import {
  PageIntro,
  BreadcrumbSchema,
  TextLink,
} from "@/components/ui/Editorial";
import { CTASection } from "@/components/ui/CTASection";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Résultats & expérience en acquisition | Mikianeli",
  "Acquisition, tests créatifs et optimisation : une sélection d’interventions anonymisées d’Iskander Zemouri, Media Buyer freelance.",
  "/resultats",
);
export default function ResultsPage() {
  return (
    <main id="main-content">
      <BreadcrumbSchema current="Résultats" path="/resultats" />
      <PageIntro
        label="Résultats / Expérience"
        title={
          <>
            L’acquisition.
            <br />
            <em>À l’épreuve du terrain.</em>
          </>
        }
      >
        Des interventions en lead generation et en e-commerce. Des choix guidés
        par les résultats. Les missions sont présentées sans identifier les
        clients ni exposer leurs données commerciales.
      </PageIntro>
      <section className="section paper" id="lead-generation">
        <Container className="split">
          <div>
            <p className="eyebrow">01 / Lead generation</p>
            <h2>
              Faire de l’acquisition
              <br />
              un levier commercial.
            </h2>
          </div>
          <div>
            <p className="large-copy">
              Relier l’investissement publicitaire à la qualité des
              opportunités.
            </p>
            <p>
              Mon intervention : diagnostiquer les freins, améliorer le parcours
              et affiner le pilotage des campagnes. L’enjeu est de faire
              progresser les demandes utiles, au-delà du seul volume.
            </p>
            <TextLink href="/services">Voir mon approche</TextLink>
          </div>
        </Container>
      </section>
      <section className="section agency-proof" id="experience-agence">
        <Container className="split">
          <div>
            <p className="eyebrow">02 / Expérience agence</p>
            <h2>
              Plusieurs comptes.
              <br />
              La même exigence.
            </h2>
          </div>
          <div>
            <p className="large-copy">
              Lead generation, e-commerce et pilotage de plusieurs marques.
            </p>
            <p>
              J’ai travaillé sur des offres et des objectifs différents en
              agence. Cette expérience m’a appris à hiérarchiser les actions,
              renouveler les créations et adapter les décisions à chaque
              activité.
            </p>
            <TextLink href="/agences">Votre renfort en marque blanche</TextLink>
          </div>
        </Container>
      </section>
      <CTASection />
    </main>
  );
}
