import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextLink, FAQ } from "@/components/ui/Editorial";
import { CTASection } from "@/components/ui/CTASection";
import { expertise, pageMetadata, siteConfig } from "@/lib/site";
export const metadata = pageMetadata(
  "Media Buyer freelance · Meta Ads | Iskander Zemouri — Mikianeli",
  siteConfig.description,
  "/",
);
export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <Container>
          <div className="hero-topline">
            <p className="eyebrow">Paid acquisition / Meta Ads</p>
            <span>Indépendant. Impliqué. Mesurable.</span>
          </div>
          <div className="hero-grid privacy-hero">
            <div className="hero-copy">
              <h1>
                Votre acquisition,
                <br />
                pilotée au plus
                <br />
                <em>près du réel.</em>
              </h1>
              <p>
                Je suis{" "}
                <strong>Iskander Zemouri, Media Buyer freelance.</strong> Je
                pilote vos campagnes Meta Ads et relie leur performance à vos
                leads, vos ventes et vos données commerciales.
              </p>
              <p className="hero-audience">
                Pour les entreprises, les équipes marketing et les agences.
              </p>
              <div className="hero-actions">
                <ButtonLink href="/contact" data-cta="hero">
                  {siteConfig.cta}
                </ButtonLink>
                <TextLink href="/resultats">Voir les résultats</TextLink>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <span>Stratégie</span>
            <span>Campagnes</span>
            <span>Creative testing</span>
            <span>Tracking & mesure</span>
            <span>Optimisation</span>
          </div>
        </Container>
      </section>
      <section className="section paper">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Ce que je prends en charge</p>
              <h2>
                De la première hypothèse
                <br />à la prochaine décision.
              </h2>
            </div>
            <TextLink href="/services">Explorer l’expertise</TextLink>
          </div>
          <div className="expertise-list">
            {expertise.map((item, i) => (
              <article className="expertise-row" key={item.id}>
                <span className="row-number">0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="micro">{item.label}</p>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="section paper" id="pour-qui">
        <Container>
          <p className="eyebrow">03 / Votre besoin, mon rôle</p>
          <div className="audience-grid">
            <h2>
              Le bon renfort,
              <br />
              au bon endroit.
            </h2>
            <div>
              <article>
                <span className="micro">Entreprises</span>
                <h3>Des leads, des rendez-vous ou des ventes.</h3>
                <p>
                  Je construis ou reprends votre acquisition payante, avec un
                  objectif commercial défini et un suivi des résultats.
                </p>
              </article>
              <article>
                <span className="micro">Équipes marketing</span>
                <h3>Une expertise qui complète la vôtre.</h3>
                <p>
                  Audit de compte, tests créatifs, tracking, optimisation ou
                  scaling : j’interviens sur le périmètre qui vous manque.
                </p>
              </article>
              <article>
                <span className="micro">Agences</span>
                <h3>Votre Media Buyer, en marque blanche.</h3>
                <p>
                  Je m’intègre à vos méthodes pour piloter des comptes, absorber
                  une charge ou apporter une expertise Meta Ads.
                </p>
                <TextLink href="/agences">
                  Voir l’accompagnement agences
                </TextLink>
              </article>
            </div>
          </div>
        </Container>
      </section>
      <section className="section about-section" id="iskander">
        <Container className="about-grid">
          <div>
            <p className="eyebrow">04 / Derrière Mikianeli</p>
            <h2>
              Une marque.
              <br />
              <em>Un interlocuteur.</em>
            </h2>
            <p className="about-name">Iskander Zemouri</p>
            <span className="micro">Media Buyer & consultant acquisition</span>
          </div>
          <div>
            <p className="large-copy">
              La personne qui vous conseille
              <br />
              est aussi celle qui pilote.
            </p>
            <p>
              J’ai travaillé en agence sur plusieurs marques en parallèle. Avec
              Mikianeli, je mets cette expérience au service de votre
              acquisition : cadrer les priorités, exécuter, analyser et faire
              évoluer les campagnes.
            </p>
            <p>
              J’aime savoir ce qui se passe après le clic. C’est là que les
              données média rencontrent votre réalité commerciale : une demande
              joignable, un rendez-vous confirmé, une vente enregistrée.
            </p>
            <div className="about-signoff">
              <span>
                Vous savez qui fait quoi.
                <br />
                Et pourquoi une décision est prise.
              </span>
              <TextLink href={siteConfig.linkedin}>
                Mon parcours sur LinkedIn
              </TextLink>
            </div>
          </div>
        </Container>
      </section>
      <FAQ compact />
      <CTASection />
    </main>
  );
}
