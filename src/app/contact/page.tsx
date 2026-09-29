import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { BreadcrumbSchema } from "@/components/ui/Editorial";
import { pageMetadata, siteConfig } from "@/lib/site";
export const metadata = pageMetadata(
  "Parler de votre acquisition | Iskander Zemouri — Mikianeli",
  "Un projet Meta Ads, un compte à reprendre ou un besoin de renfort agence ? Contactez directement Iskander Zemouri pour définir la prochaine étape.",
  "/contact",
);
export default function ContactPage() {
  return (
    <main id="main-content" className="contact-main">
      <BreadcrumbSchema current="Contact" path="/contact" />
      <Container className="contact-grid">
        <div className="contact-intro">
          <p className="eyebrow">Contact / Premier échange</p>
          <h1>
            Votre projet.
            <br />
            <em>Notre point de départ.</em>
          </h1>
          <p className="intro-copy">
            Un objectif à atteindre, un compte à reprendre ou une équipe à
            renforcer. Donnez-moi le contexte, je vous réponds directement.
          </p>
          <div className="contact-person">
            <div>
              <strong>Iskander Zemouri</strong>
              <p>
                Media Buyer freelance
                <br />
                Votre interlocuteur direct.
              </p>
            </div>
          </div>
          <div className="contact-expectations">
            <p className="micro">Et ensuite ?</p>
            <p>
              Je lis votre demande, puis je reviens vers vous pour préciser les
              objectifs, le périmètre et la prochaine étape.
            </p>
            <p>
              Vous préférez l’email ?<br />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </div>
        </div>
        <ContactForm />
      </Container>
    </main>
  );
}
