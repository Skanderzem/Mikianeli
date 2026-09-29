import { Container } from "@/components/layout/Container";
import {
  PageIntro,
  BreadcrumbSchema,
  TextLink,
} from "@/components/ui/Editorial";
import { ButtonLink, Arrow } from "@/components/ui/ButtonLink";
import { CTASection } from "@/components/ui/CTASection";
import { pageMetadata, siteConfig } from "@/lib/site";
export const metadata = pageMetadata(
  "Media Buyer freelance pour agences · Marque blanche | Mikianeli",
  "Vous gardez votre relation client. Je prends en charge l’acquisition. Renfort Media Buyer, Meta Ads et gestion multicompte en marque blanche avec Iskander Zemouri.",
  "/agences",
);
export default function AgenciesPage() {
  return (
    <main id="main-content" className="agency-page-v3">
      <BreadcrumbSchema current="Agences" path="/agences" />
      <PageIntro
        label="Agences / Votre renfort en marque blanche"
        title={
          <>
            Votre relation client.
            <br />
            <em>
              Mon expertise
              <br />
              acquisition.
            </em>
          </>
        }
      >
        Vous gardez la relation commerciale. Je prends en charge le pilotage des
        campagnes et m’intègre à vos méthodes. Un Media Buyer impliqué,
        directement opérationnel.
      </PageIntro>
      <section className="agency-alliance">
        <Container>
          <div className="alliance-you">
            <span>Votre agence</span>
            <h2>
              La relation.
              <br />
              La vision.
              <br />
              La confiance.
            </h2>
          </div>
          <div className="alliance-link" aria-hidden="true">
            <span>+</span>
          </div>
          <div className="alliance-me">
            <span>Iskander / Mikianeli</span>
            <h2>
              La stratégie média.
              <br />
              L’exécution.
              <br />
              Le pilotage.
            </h2>
          </div>
        </Container>
      </section>
      <section className="section paper">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Un renfort qui prend le sujet en main</p>
              <h2>
                Plus de capacité.
                <br />
                <em>La même exigence.</em>
              </h2>
            </div>
            <p className="section-copy">
              J’ai l’habitude de piloter plusieurs comptes, de passer d’un
              univers à l’autre et de travailler avec une équipe agence.
            </p>
          </div>
          <div className="problem-lines">
            {[
              [
                "Un pic de charge.",
                "Lancements, croissance du portefeuille ou remplacement : je prends un périmètre opérationnel défini.",
              ],
              [
                "Un compte à reprendre.",
                "Je prends connaissance de l’historique, des objectifs et des créations pour assurer la continuité.",
              ],
              [
                "Une performance à relancer.",
                "J’audite le compte, hiérarchise les freins et organise les prochaines optimisations.",
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
      <section className="agency-signals section">
        <Container>
          <p className="eyebrow">Expérience agence / Dispositifs distincts</p>
          <div className="agency-signal-grid">
            <div>
              <strong>×3</strong>
              <span>ROI e-commerce</span>
            </div>
            <div>
              <strong>−60 %</strong>
              <span>Coût par lead, jusqu’à</span>
            </div>
            <div>
              <strong>÷1,5</strong>
              <span>Coût d’acquisition</span>
            </div>
          </div>
          <div className="proof-v3-note">
            <p>
              Repères historiques issus de campagnes distinctes, au sein d’une
              équipe agence.
            </p>
            <TextLink href="/resultats">Le contexte des résultats</TextLink>
          </div>
        </Container>
      </section>
      <section className="agency-work section paper">
        <Container className="split">
          <div>
            <p className="eyebrow">Une intégration simple</p>
            <h2>
              Vos process.
              <br />
              Vos comptes.
              <br />
              <em>Mon implication.</em>
            </h2>
            <ButtonLink href="/contact" data-cta="agency">
              {siteConfig.cta}
            </ButtonLink>
          </div>
          <ol>
            {[
              [
                "On cadre.",
                "Comptes, objectifs, responsabilités, disponibilités et mode de validation.",
              ],
              [
                "Je prends le relais.",
                "Historique, accès, créations et outils : une transmission structurée.",
              ],
              [
                "On pilote ensemble.",
                "Des points réguliers, un reporting dans vos formats et des recommandations argumentées.",
              ],
            ].map(([t, p], i) => (
              <li key={t} data-reveal>
                <span>0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="agency-promise">
        <Container>
          <p>
            Votre client reste <em>votre client.</em>
          </p>
          <span>
            Participation aux échanges selon le rôle convenu. Comptes et données
            restent chez vous ou vos clients.
          </span>
        </Container>
      </section>
      <CTASection
        title="Un compte à confier. Un cap à passer."
        text="Parlez-moi de votre organisation et du renfort recherché. Nous définissons ensemble le bon périmètre."
      />
    </main>
  );
}
