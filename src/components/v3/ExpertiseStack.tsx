import type { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/Editorial";
const pillars = [
  {
    name: "Acquisition.",
    tag: "Trouver le bon terrain",
    text: "Faire rencontrer votre offre et les bonnes personnes. Je construis le plan, lance les campagnes et garde le cap sur votre objectif commercial.",
    chips: ["Meta Ads", "Google Search", "Media buying"],
    form: "target",
  },
  {
    name: "Création.",
    tag: "Donner une raison de choisir",
    text: "Une bonne publicité commence par une bonne hypothèse. Je transforme vos arguments en angles, messages et tests qui font avancer la performance.",
    chips: ["Angles", "Hooks", "Creative testing"],
    form: "cards",
  },
  {
    name: "Mesure.",
    tag: "Décider sur une base solide",
    text: "Savoir ce qui fonctionne vraiment. Je fiabilise les conversions et mets les données au service de décisions claires.",
    chips: ["Tracking", "Attribution", "Analyse"],
    form: "measure",
  },
  {
    name: "Progression.",
    tag: "Renforcer ce qui produit de la valeur",
    text: "Les campagnes vivent. Je réalloue, renouvelle les créations et fais évoluer le dispositif à partir des résultats observés.",
    chips: ["Optimisation", "Scaling", "Pilotage"],
    form: "growth",
  },
];
export function ExpertiseStack() {
  return (
    <section className="expertise-v3 section" id="expertise">
      <Container className="stack-layout">
        <div className="stack-intro">
          <p className="eyebrow">02 / Un pilotage complet</p>
          <h2>
            Une acquisition
            <br />
            qui avance.
            <br />
            <em>Tout est lié.</em>
          </h2>
          <p>
            De la première hypothèse à la prochaine décision, je prends en
            charge les leviers qui font la différence.
          </p>
          <TextLink href="/services">Explorer l’expertise</TextLink>
          <div className="stack-index" aria-hidden="true">
            <span>01</span>
            <i />
            <span>04</span>
          </div>
        </div>
        <div className="stack-panels">
          {pillars.map((p, i) => (
            <article
              className={`stack-panel panel-${i + 1}`}
              key={p.name}
              style={{ "--panel-index": i } as CSSProperties}
            >
              <div
                className="panel-surface"
                data-reveal="card"
                data-entry={["right", "rise", "mask", "turn"][i]}
              >
                <div className="panel-top">
                  <span>{p.tag}</span>
                  <span>0{i + 1} / 04</span>
                </div>
                <div className={`panel-art art-${p.form}`} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="panel-copy">
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                  <div className="panel-chips">
                    {p.chips.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
