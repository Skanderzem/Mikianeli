import { Container } from "@/components/layout/Container";
import {
  PageIntro,
  Breadcrumbs,
  BreadcrumbSchema,
  TextLink,
} from "@/components/ui/Editorial";
import { CTASection } from "@/components/ui/CTASection";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Résultats Meta Ads & cas client IMDM | Mikianeli",
  "128 leads CRM attribués à 5,70 € de CPL : le cas IMDM, ses actions, ses résultats et ses limites. Expérience Media Buying multicompte chez Teeps.",
  "/resultats",
);
export default function ResultsPage() {
  return (
    <main id="main-content">
      <BreadcrumbSchema current="Résultats" path="/resultats" />
      <PageIntro
        label="Résultats / Cas documentés"
        title={
          <>
            Des chiffres.
            <br />
            <em>Et ce qu’il y a derrière.</em>
          </>
        }
      >
        Le contexte, les choix et la lecture des résultats comptent autant que
        le chiffre affiché. Voici un cas d’acquisition récent et les repères de
        mon expérience en agence.
      </PageIntro>
      <article className="section paper" id="imdm">
        <Container>
          <Breadcrumbs current="Résultats" />
          <div className="case-heading">
            <p className="eyebrow">01 / Cas client · IMDM</p>
            <h2>
              Rapprocher Meta Ads
              <br />
              des demandes réellement reçues.
            </h2>
            <p className="section-copy">
              Institut Médical du Marais · Médecine esthétique · Paris
              <br />
              Période : 11–22 septembre 2026, coupure à 17 h 16, heure de Paris.
            </p>
          </div>
          <dl className="result-numbers">
            <div>
              <dt>Budget média dépensé</dt>
              <dd>729,46 €</dd>
            </div>
            <div>
              <dt>Leads CRM attribuables au paid</dt>
              <dd>128</dd>
            </div>
            <div>
              <dt>Coût par lead CRM attribué</dt>
              <dd>5,70 €</dd>
            </div>
          </dl>
          <div className="story-grid">
            <aside>
              <p className="micro">Mon intervention</p>
              <p>
                Audit, campagnes Meta Ads, parcours de conversion et
                rapprochement CRM.
              </p>
              <p className="micro">Sources du bilan</p>
              <p>
                Meta Ads Insights, formulaires natifs et CRM. Données agrégées,
                sans coordonnées de prospects.
              </p>
            </aside>
            <div className="case-story">
              <section>
                <h3>Le contexte</h3>
                <p>
                  IMDM relançait son acquisition sur deux offres : greffe
                  capillaire et injections. Quatre campagnes permettaient
                  d’observer deux parcours, les formulaires natifs Meta et le
                  formulaire du site.
                </p>
              </section>
              <section>
                <h3>Le problème à résoudre</h3>
                <p>
                  Les conversions déclarées par la plateforme ne donnaient pas
                  une lecture suffisante des demandes reçues ni de leur suite
                  commerciale. Piloter uniquement sur ce signal risquait de
                  favoriser le parcours le moins cher en apparence.
                </p>
              </section>
              <section>
                <h3>Le diagnostic</h3>
                <p>
                  Il fallait distinguer une conversion publicitaire, une
                  soumission de formulaire, un lead reçu au CRM et un
                  rendez-vous confirmé. J’ai vérifié chaque étape pour comparer
                  les campagnes sur une définition commune.
                </p>
              </section>
              <section>
                <h3>Les actions</h3>
                <ul className="deliverables">
                  <li>
                    Structurer les campagnes par offre et par parcours de
                    conversion.
                  </li>
                  <li>
                    Relier les demandes reçues à leurs campagnes et contrôler
                    les doublons.
                  </li>
                  <li>
                    Comparer les formulaires Meta aux demandes du site à partir
                    du CRM.
                  </li>
                  <li>
                    Suivre les statuts commerciaux pour aller au-delà du seul
                    CPL.
                  </li>
                  <li>
                    Détecter deux soumissions natives non livrées ; les
                    récupérer puis renforcer les contrôles de livraison le 22
                    septembre.
                  </li>
                </ul>
              </section>
              <section>
                <h3>Les résultats par parcours</h3>
                <div className="table-wrap">
                  <table>
                    <caption>
                      Bilan arrêté au 22 septembre 2026 à 17 h 16
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Parcours</th>
                        <th scope="col">Leads CRM</th>
                        <th scope="col">CPL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Instant Forms reçus</th>
                        <td>120</td>
                        <td>4,83 €</td>
                      </tr>
                      <tr>
                        <th scope="row">Campagnes Website</th>
                        <td>7</td>
                        <td>21,45 €</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="small-copy">
                  Une demande reçue sur le site est attribuée à une campagne
                  Instant : elle explique le total paid de 128, distinct de la
                  somme 120 + 7. Trois demandes directes sont exclues du calcul
                  paid. La récupération ultérieure des deux soumissions
                  manquantes n’est pas ajoutée à ce bilan arrêté.
                </p>
              </section>
              <section>
                <h3>Ce que cela a changé</h3>
                <p>
                  Les Instant Forms ont produit davantage de demandes pour un
                  coût inférieur sur ce périmètre. Mais le premier patient
                  payant attribué provenait du parcours Website. La décision
                  budgétaire devait donc intégrer le suivi commercial, pas
                  seulement le prix d’un lead.
                </p>
                <blockquote>
                  Le volume ouvre la discussion.
                  <br />
                  La qualité commerciale guide la suite.
                </blockquote>
                <p>
                  À la coupure, le CRM comptait deux demandes au statut « RDV
                  pris » et une au statut « Patient payant ». Pour ce patient :{" "}
                  <strong>780 € encaissés</strong>, pour un traitement prévu à{" "}
                  <strong>3 900 €</strong>. Le montant prévu n’est pas présenté
                  comme encaissé.
                </p>
              </section>
              <section className="case-limits">
                <h3>Les limites de lecture</h3>
                <p>
                  Un seul patient payant ne permet pas de conclure sur la
                  rentabilité globale. Les campagnes ont des fenêtres
                  d’attribution et des durées de diffusion différentes. Cette
                  comparaison n’est pas un A/B test contrôlé ; les leads ne sont
                  pas tous qualifiés. Aucun résultat futur n’est garanti.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </article>
      <section className="section agency-proof" id="teeps">
        <Container className="split">
          <div>
            <p className="eyebrow">02 / Expérience agence · Teeps</p>
            <h2>
              Plusieurs comptes.
              <br />
              <em>La même exigence.</em>
            </h2>
            <TextLink href="/agences">Travailler ensemble en agence</TextLink>
          </div>
          <div>
            <div className="agency-stats">
              <div>
                <strong>7</strong>
                <span>marques gérées simultanément</span>
              </div>
              <div>
                <strong>≈ 6 000 €</strong>
                <span>par semaine sur les dispositifs les plus importants</span>
              </div>
            </div>
            <p>
              Chez Teeps, j’ai travaillé sur des univers, des calendriers et des
              objectifs différents en parallèle. Cette expérience structure ma
              manière de reprendre un compte, prioriser les opérations et rendre
              les résultats lisibles.
            </p>
            <p className="small-copy">
              Les repères historiques du portfolio — ROI e-commerce ×3 sur un
              cas, CPC inférieur à 0,20 €, baisse de CPL jusqu’à 60 % ou CPA
              divisé par 1,5 — concernent des campagnes distinctes. Ils ne sont
              pas additionnés ni présentés comme les résultats d’un seul client.
            </p>
          </div>
        </Container>
      </section>
      <CTASection
        title="Votre compte mérite la même précision."
        text="Parlons de vos objectifs, des résultats actuels et de ce qu’il faut vérifier pour avancer."
      />
    </main>
  );
}
