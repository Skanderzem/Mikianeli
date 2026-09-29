import { Container } from "@/components/layout/Container";
import {
  PageIntro,
  Breadcrumbs,
  BreadcrumbSchema,
  TextLink,
} from "@/components/ui/Editorial";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTASection } from "@/components/ui/CTASection";
import { pageMetadata, siteConfig } from "@/lib/site";
export const metadata = pageMetadata(
  "Media Buyer freelance pour agences · Marque blanche | Mikianeli",
  "Renfort Meta Ads en marque blanche : gestion de comptes, creative testing, tracking et reporting. Iskander Zemouri s’intègre à vos méthodes et à votre équipe.",
  "/agences",
);
const missions = [
  [
    "Absorber un pic de charge",
    "Des comptes à lancer, un départ à couvrir ou une période intense : je prends un périmètre opérationnel défini pour libérer de la capacité.",
  ],
  [
    "Reprendre un portefeuille",
    "Je relis l’historique, les conventions de nommage, les créations et les objectifs avant de reprendre le pilotage des comptes.",
  ],
  [
    "Débloquer la performance",
    "Un compte stagne, les créations fatiguent ou la mesure est incertaine : je mène un audit ciblé et organise les corrections prioritaires.",
  ],
];
export default function AgenciesPage() {
  return (
    <main id="main-content">
      <BreadcrumbSchema current="Agences" path="/agences" />
      <PageIntro
        label="Agences / Marque blanche"
        title={
          <>
            Votre prochain renfort
            <br />
            <em>Paid Media, en direct.</em>
          </>
        }
      >
        Je suis Iskander Zemouri, Media Buyer freelance. Je m’intègre à votre
        organisation pour gérer vos comptes Meta Ads, tester vos créations et
        fiabiliser la lecture des résultats.
      </PageIntro>
      <section className="section paper">
        <Container>
          <Breadcrumbs current="Agences" />
          <div className="split">
            <div>
              <p className="eyebrow">Du vécu multicompte</p>
              <h2>
                Vos méthodes.
                <br />
                Votre relation client.
                <br />
                Mon implication.
              </h2>
              <ButtonLink href="/contact" data-cta="agency">
                {siteConfig.cta}
              </ButtonLink>
            </div>
            <div>
              <p className="large-copy">
                Chez Teeps : <strong>7 marques gérées simultanément</strong>,
                avec des budgets allant jusqu’à environ{" "}
                <strong>6 000 € par semaine</strong> selon les dispositifs.
              </p>
              <p>
                J’ai l’habitude de passer d’une offre à une autre, de suivre des
                objectifs différents et de garder des comptes lisibles. En
                marque blanche, nous définissons mon rôle, votre niveau de
                validation et les modalités d’échange avec vos clients.
              </p>
              <TextLink href="/resultats#teeps">
                Les repères de cette expérience
              </TextLink>
            </div>
          </div>
          <div className="agency-missions">
            {missions.map(([title, text], i) => (
              <article key={title}>
                <span className="row-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section method-section">
        <Container className="split">
          <div>
            <p className="eyebrow">Concrètement</p>
            <h2>
              Un renfort qui prend
              <br />
              le travail en main.
            </h2>
          </div>
          <ul className="deliverables agency-deliverables">
            <li>Audit et reprise de comptes Meta Ads.</li>
            <li>Création, lancement et suivi des campagnes.</li>
            <li>Budgets, audiences, tests créatifs et optimisations.</li>
            <li>Contrôle du tracking et de la qualité des conversions.</li>
            <li>Reporting dans vos formats et recommandations argumentées.</li>
            <li>
              Participation aux points internes ou clients selon le rôle
              convenu.
            </li>
          </ul>
        </Container>
      </section>
      <section className="section paper">
        <Container>
          <p className="eyebrow">L’intégration</p>
          <h2>
            On cadre le rôle.
            <br />
            Puis on avance.
          </h2>
          <ol className="method-list">
            <li>
              <span className="row-number">01</span>
              <div>
                <h3>Le périmètre</h3>
                <p>
                  Nombre de comptes, budget média, charge, urgence et
                  responsabilités. Les honoraires et la disponibilité sont
                  convenus avant le démarrage.
                </p>
              </div>
              <p className="method-output">Ponctuel ou récurrent.</p>
            </li>
            <li>
              <span className="row-number">02</span>
              <div>
                <h3>La prise en main</h3>
                <p>
                  Accès, historique, objectifs, assets, conventions de nommage
                  et canaux de communication. Je m’intègre à vos outils
                  existants.
                </p>
              </div>
              <p className="method-output">Une transmission structurée.</p>
            </li>
            <li>
              <span className="row-number">03</span>
              <div>
                <h3>Le pilotage</h3>
                <p>
                  Priorités partagées, points réguliers et décisions traçables.
                  Vous gardez la relation commerciale ; les comptes restent chez
                  vous ou vos clients.
                </p>
              </div>
              <p className="method-output">Une visibilité sur les actions.</p>
            </li>
          </ol>
        </Container>
      </section>
      <CTASection
        title="Un compte à confier ? Une période à renforcer ?"
        text="Décrivez-moi vos comptes, votre organisation et le renfort recherché. Nous vérifierons ensemble le périmètre qui fait sens."
      />
    </main>
  );
}
