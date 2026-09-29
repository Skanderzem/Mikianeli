import { Container } from "@/components/layout/Container";
import { results, resultSelectionNote } from "@/lib/results";
import { TextLink } from "@/components/ui/Editorial";
export function ProofStrip() {
  const order = [results[1], results[2], results[3], results[0]];
  return (
    <section className="proof-v3" aria-label="Sélection de résultats">
      <Container>
        <div className="proof-v3-top">
          <p className="eyebrow">De l’ambition. Des résultats.</p>
          <span>01 — Sélection de performances</span>
        </div>
        <div className="proof-v3-grid">
          {order.map((r) => (
            <a
              href={`/resultats#${r.id}`}
              className="proof-v3-item"
              key={r.id}
              data-reveal
            >
              <span className="metric-qualifier">{r.qualifier}</span>
              <strong>{r.value}</strong>
              <span className="metric-label">
                {r.label}
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
        <div className="proof-v3-note">
          <p>{resultSelectionNote}</p>
          <TextLink href="/resultats">Voir les résultats</TextLink>
        </div>
      </Container>
    </section>
  );
}
