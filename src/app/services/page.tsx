import { Container } from "@/components/layout/Container";
import {
  PageIntro,
  TextLink,
  FAQ,
  Breadcrumbs,
  BreadcrumbSchema,
} from "@/components/ui/Editorial";
import { CTASection } from "@/components/ui/CTASection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { expertise, methodSteps, pageMetadata, siteConfig } from "@/lib/site";
export const metadata = pageMetadata(
  "Consultant Meta Ads · Acquisition & tracking | Mikianeli",
  "Stratégie, gestion Meta Ads, creative testing, tracking et reporting. Iskander Zemouri prend en charge votre acquisition payante, du diagnostic à l’optimisation.",
  "/services",
);
export default function ExpertisePage() {
  return (
    <main id="main-content">
      <BreadcrumbSchema current="Expertise" path="/services" />
      <PageIntro
        label="Expertise / Paid acquisition"
        title={
          <>
            Les campagnes comptent.
            <br />
            <em>Ce qu’elles produisent aussi.</em>
          </>
        }
      >
        J’interviens sur trois leviers qui travaillent ensemble : la diffusion,
        les créations et la mesure. Le périmètre s’adapte à votre besoin, avec
        un objectif commercial commun.
      </PageIntro>
      <section className="section paper">
        <Container>
          <Breadcrumbs current="Expertise" />
          {expertise.map((e, i) => (
            <article className="service-detail" id={e.id} key={e.id}>
              <div>
                <span className="row-number">0{i + 1}</span>
                <p className="eyebrow">{e.label}</p>
                <h2>{e.title}</h2>
              </div>
              <div>
                <p className="large-copy">{e.text}</p>
                <h3 className="micro">Ce que je prends en charge</h3>
                <ul className="deliverables">
                  {e.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Container>
      </section>
      <section className="section method-section" id="methode">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">La méthode</p>
              <h2>
                Un cap clair.
                <br />
                Des décisions expliquées.
              </h2>
            </div>
            <p className="section-copy">
              Vous savez ce qui est testé, pourquoi le budget évolue et ce que
              les résultats permettent de conclure.
            </p>
          </div>
          <ol className="method-list">
            {methodSteps.map((m, i) => (
              <li key={m.title}>
                <span className="row-number">0{i + 1}</span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
                <p className="method-output">{m.output}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="section paper" id="pour-qui">
        <Container className="split">
          <div>
            <p className="eyebrow">Pour qui ?</p>
            <h2>
              Votre modèle guide
              <br />
              le pilotage.
            </h2>
            <TextLink href="/resultats">Voir la méthode en situation</TextLink>
          </div>
          <div className="audience-details">
            <article>
              <h3>Lead generation & rendez-vous</h3>
              <p>
                Services, PME et établissements : je regarde le coût d’une
                demande reçue, puis sa joignabilité, sa qualification et sa
                transformation commerciale avec vos équipes.
              </p>
            </article>
            <article>
              <h3>E-commerce</h3>
              <p>
                J’analyse les ventes attribuées, le coût d’acquisition et le
                ROAS en tenant compte du panier, de la marge et des limites de
                mesure. Une hausse de chiffre d’affaires n’est pas
                automatiquement une hausse de rentabilité.
              </p>
            </article>
            <article>
              <h3>Équipes marketing</h3>
              <p>
                Vous gardez votre organisation. Je complète votre expertise sur
                un audit, la reprise d’un compte, un plan de tests ou un
                problème de tracking.
              </p>
            </article>
            <article>
              <h3>Agences & marque blanche</h3>
              <p>
                Un renfort opérationnel sur vos comptes clients, avec vos
                conventions, vos outils et votre mode de reporting.
              </p>
              <TextLink href="/agences">
                Le dispositif pour les agences
              </TextLink>
            </article>
          </div>
        </Container>
      </section>
      <section className="section scope-section">
        <Container className="split">
          <h2>
            Un périmètre défini.
            <br />
            Une collaboration lisible.
          </h2>
          <div>
            <p>
              Avant de commencer, nous fixons les comptes concernés, les
              livrables, la cadence des échanges et les critères d’évaluation.
              Budget publicitaire et honoraires sont séparés.
            </p>
            <p>
              Si le parcours de conversion bloque, je vous indique les
              corrections prioritaires. Une refonte de site ou une production de
              contenus lourde se cadre séparément selon le besoin.
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
