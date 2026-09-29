import { Container } from "@/components/layout/Container";
const steps = [
  [
    "Le diagnostic.",
    "Comprendre votre offre, vos objectifs et ce qui freine la performance.",
  ],
  [
    "Le plan.",
    "Définir les priorités, les hypothèses à tester et une mesure fiable.",
  ],
  ["L’action.", "Lancer, lire les signaux et ajuster avec méthode."],
  [
    "Le prochain cap.",
    "Renforcer les leviers utiles et décider de la suite ensemble.",
  ],
];
export function MethodJourney() {
  return (
    <section className="method-v3 section" id="methode">
      <Container>
        <div className="method-heading">
          <p className="eyebrow">
            La méthode / Toujours une prochaine décision
          </p>
          <h2>
            Un cap clair.
            <br />
            <em>Un mouvement continu.</em>
          </h2>
          <p>
            Vous savez où l’on va, ce que je teste et pourquoi les campagnes
            évoluent.
          </p>
        </div>
        <ol className="journey">
          {steps.map(([title, text], i) => (
            <li key={title} data-reveal>
              <div className="journey-node">
                <span>0{i + 1}</span>
                <i />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
