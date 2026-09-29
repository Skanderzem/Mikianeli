import { Container } from "@/components/layout/Container";
import { ButtonLink, Arrow } from "@/components/ui/ButtonLink";
import { TextLink, FAQ } from "@/components/ui/Editorial";
import { CTASection } from "@/components/ui/CTASection";
import { SignalArt } from "@/components/v3/SignalArt";
import { ProofStrip } from "@/components/v3/ProofStrip";
import { ExpertiseStack } from "@/components/v3/ExpertiseStack";
import { ResultExplorer } from "@/components/v3/ResultExplorer";
import { PersonalSection } from "@/components/v3/PersonalSection";
import { MethodJourney } from "@/components/v3/MethodJourney";
import { pageMetadata, siteConfig } from "@/lib/site";
import { resultSelectionNote } from "@/lib/results";
export const metadata = pageMetadata(
  "Media Buyer freelance · Meta Ads | Iskander Zemouri — Mikianeli",
  siteConfig.description,
  "/",
);
export default function Home() {
  return (
    <main id="main-content">
      <section className="hero-v3">
        <Container>
          <div className="hero-v3-top">
            <p className="eyebrow">
              <span className="status-dot" />
              Iskander Zemouri / Media Buyer indépendant
            </p>
            <span className="hero-specialty">Meta Ads · Paid acquisition</span>
          </div>
          <div className="hero-v3-stage">
            <div className="hero-v3-copy">
              <h1>
                <span>Faites de</span>
                <span className="hero-acquisition">l’acquisition</span>
                <span>votre avantage.</span>
              </h1>
              <p>
                Je construis et pilote vos campagnes pour faire avancer votre
                business.{" "}
                <strong>
                  La stratégie et l’exécution. Directement avec moi.
                </strong>
              </p>
              <div className="hero-actions">
                <ButtonLink href="/contact" data-cta="hero">
                  {siteConfig.cta}
                </ButtonLink>
                <TextLink href="/resultats">
                  Les résultats <span className="sr-only">de mes missions</span>
                </TextLink>
              </div>
            </div>
            <SignalArt />
          </div>
          <div className="hero-v3-bottom">
            <span>Entreprises · Équipes marketing · Agences</span>
            <a href="#preuves">
              La performance se démontre <span aria-hidden="true">↓</span>
            </a>
          </div>
        </Container>
      </section>
      <div id="preuves">
        <ProofStrip />
      </div>
      <ExpertiseStack />
      <section className="problems-v3 section paper">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / Votre prochain cap</p>
              <h2>
                Vous n’avez pas besoin
                <br />
                de plus de campagnes.
                <br />
                <em>De meilleures décisions.</em>
              </h2>
            </div>
            <p className="section-copy">
              Un compte qui stagne. Des créations qui fatiguent. Des résultats
              difficiles à lire. On identifie le vrai frein, puis on agit.
            </p>
          </div>
          <div className="problem-lines">
            {[
              [
                "L’acquisition plafonne.",
                "Je hiérarchise les tests et les opportunités pour retrouver une direction.",
              ],
              [
                "Les clics ne suffisent pas.",
                "Je travaille le message et le parcours pour faire progresser les conversions.",
              ],
              [
                "Vous manquez de capacité.",
                "Je prends le relais sur le pilotage, avec une implication directe et un périmètre clair.",
              ],
            ].map(([t, p], i) => (
              <article key={t} data-reveal>
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{p}</p>
                <Arrow diagonal />
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="results-v3 section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / La preuve par les résultats</p>
              <h2>
                Moins de discours.
                <br />
                <em>Du concret.</em>
              </h2>
            </div>
            <TextLink href="/resultats">Explorer les résultats</TextLink>
          </div>
          <ResultExplorer />
          <p className="result-disclaimer">{resultSelectionNote}</p>
        </Container>
      </section>
      <MethodJourney />
      <section className="audience-v3 section paper" id="pour-qui">
        <Container>
          <p className="eyebrow">Le bon partenaire, au bon endroit</p>
          <div className="audience-v3-grid">
            <h2>
              Votre ambition.
              <br />
              Mon terrain
              <br />
              <em>d’action.</em>
            </h2>
            <div>
              <article data-reveal>
                <span>01 / Entreprises</span>
                <h3>Faire de l’acquisition un levier de croissance.</h3>
                <p>
                  Des leads, des rendez-vous ou des ventes : nous posons un
                  objectif clair, puis je prends le pilotage.
                </p>
              </article>
              <article data-reveal>
                <span>02 / Équipes marketing</span>
                <h3>Une expertise qui complète la vôtre.</h3>
                <p>
                  Audit, reprise de compte, creative testing ou mesure :
                  j’interviens là où vous avez besoin d’avancer.
                </p>
              </article>
              <article data-reveal>
                <span>03 / Agences</span>
                <h3>Votre relation client. Mon expertise acquisition.</h3>
                <p>
                  Un renfort opérationnel en marque blanche, intégré à vos
                  méthodes.
                </p>
                <TextLink href="/agences">L’accompagnement agences</TextLink>
              </article>
            </div>
          </div>
        </Container>
      </section>
      <PersonalSection />
      <FAQ compact />
      <CTASection />
    </main>
  );
}
