import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { navLinks, siteConfig } from "@/lib/site";
import { CookieSettings } from "@/components/cookies/Consent";
export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div>
            <Link href="/" aria-label="Mikianeli, accueil">
              <Image
                src="/mikianeli-logo-light.webp"
                alt="Mikianeli"
                width={170}
                height={31}
              />
            </Link>
            <p>
              Iskander Zemouri
              <br />
              Media Buyer indépendant · Meta Ads & acquisition
            </p>
            <p className="muted">
              Basé en Île-de-France. Missions partout en France.
            </p>
          </div>
          <nav aria-label="Navigation secondaire">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="footer-contact">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn d’Iskander <span aria-hidden="true">↗</span>
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            <p>
              Un interlocuteur. Du premier échange
              <br />à l’optimisation des campagnes.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Mikianeli · Iskander Zemouri EI
          </span>
          <div>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
            <CookieSettings />
          </div>
        </div>
      </Container>
    </footer>
  );
}
