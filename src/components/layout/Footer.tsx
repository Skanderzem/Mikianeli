import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-ink py-12 text-ivory">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.7fr]">
          <div>
            <Link href="/" aria-label="Mikianeli, retour à l’accueil">
              <Image
                src="/mikianeli-logo-light.png"
                alt={siteConfig.name}
                width={1698}
                height={310}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-brume/72">
              Mikianeli structure les sites, campagnes et systèmes de suivi qui aident les
              entreprises à générer des demandes qualifiées.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-3 text-sm" aria-label="Navigation secondaire">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-brume/72 transition hover:text-sand">
                {link.label}
              </Link>
            ))}
            <Link href="/mentions-legales" className="text-brume/72 transition hover:text-sand">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-brume/72 transition hover:text-sand">
              Politique de confidentialité
            </Link>
          </nav>

          <div className="text-sm leading-7 text-brume/72 lg:text-right">
            <a href={`mailto:${siteConfig.email}`} className="transition hover:text-sand">
              {siteConfig.email}
            </a>
            <p className="mt-4">© Mikianeli.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
