import { Container } from "@/components/layout/Container";
import {
  PageIntro,
  BreadcrumbSchema,
  TextLink,
} from "@/components/ui/Editorial";
import { CTASection } from "@/components/ui/CTASection";
import { results, resultSelectionNote } from "@/lib/results";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Résultats Media Buying · Missions anonymisées | Mikianeli",
  "Lead generation, e-commerce et optimisation : des résultats relatifs documentés, issus de missions distinctes. Découvrez l’approche d’Iskander Zemouri.",
  "/resultats",
);
export default function ResultsPage() {
  return (
    <main id="main-content" className="results-page-v3">
      <BreadcrumbSchema current="Résultats" path="/resultats" />
      <PageIntro
        label="Résultats / La performance en perspective"
        title={
          <>
            Des résultats.
            <br />
            <em>Pas des promesses.</em>
          </>
        }
      >
        Des défis différents. Une même exigence d’exécution. Cette sélection de
        missions anonymisées donne un aperçu concret de mon expérience en
        acquisition.
      </PageIntro>
      <section className="result-index">
        <Container>
          <p>{resultSelectionNote}</p>
          <nav aria-label="Explorer les résultats">
            {results.map((r, i) => (
              <a href={`#${r.id}`} key={r.id}>
                <span>0{i + 1}</span>
                {r.category}
                <span aria-hidden="true">↓</span>
              </a>
            ))}
          </nav>
        </Container>
      </section>
      {results.map((r, i) => (
        <article
          className={`result-story result-story-${i + 1}`}
          id={r.id}
          key={r.id}
        >
          <Container>
            <div className="result-story-heading">
              <p className="eyebrow">
                Cas 0{i + 1} / {r.category}
              </p>
              <span>Mission anonymisée</span>
            </div>
            <div className="result-story-grid">
              <div className="story-metric" data-reveal>
                <span>{r.qualifier}</span>
                <strong>{r.value}</strong>
                <p>{r.label}</p>
                <div className="metric-decoration" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="story-narrative">
                <h2>{r.title}</h2>
                <dl>
                  <div>
                    <dt>Le challenge</dt>
                    <dd>{r.challenge}</dd>
                  </div>
                  <div>
                    <dt>L’intervention</dt>
                    <dd>{r.action}</dd>
                  </div>
                  <div>
                    <dt>Le résultat</dt>
                    <dd>{r.outcome}</dd>
                  </div>
                </dl>
                <p className="story-context">{r.context}</p>
                <TextLink href="/contact">Parlons de votre objectif</TextLink>
              </div>
            </div>
          </Container>
        </article>
      ))}
      <section className="result-ethos section" id="experience-agence">
        <Container className="split">
          <h2>
            Une expérience
            <br />
            <em>qui se partage.</em>
            <br />
            Des données
            <br />
            qui restent privées.
          </h2>
          <div>
            <p className="large-copy">
              Les noms, budgets et données de compte restent confidentiels.
            </p>
            <p>
              Je partage les résultats utiles pour comprendre mon travail, avec
              leur périmètre. Les repères agence correspondent à des
              interventions dans une équipe et à des campagnes distinctes.
            </p>
            <TextLink href="/agences">Votre renfort en acquisition</TextLink>
          </div>
        </Container>
      </section>
      <CTASection title="Votre prochain résultat commence par un échange." />
    </main>
  );
}
