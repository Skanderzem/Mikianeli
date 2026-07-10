"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-graphite/10 bg-ivory/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Mikianeli, retour à l’accueil" onClick={() => setIsOpen(false)}>
          <Image
            src="/mikianeli-logo-dark.png"
            alt={siteConfig.name}
            width={1432}
            height={266}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-graphite transition hover:text-sand-dark",
                  active && "text-sand-dark",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/contact" variant="primary" className="min-h-10 px-4 py-2.5">
            Demander un diagnostic
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full border border-graphite/12 text-ink md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sr-only">{isOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span className={cn("h-px bg-ink transition", isOpen && "translate-y-[7px] rotate-45")} />
            <span className={cn("h-px bg-ink transition", isOpen && "opacity-0")} />
            <span className={cn("h-px bg-ink transition", isOpen && "-translate-y-[7px] -rotate-45")} />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-graphite/10 bg-ivory px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-graphite hover:bg-brume/65"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ButtonLink
            href="/contact"
            variant="primary"
            className="mt-4 w-full"
            onClick={() => setIsOpen(false)}
          >
            Demander un diagnostic
          </ButtonLink>
        </div>
      ) : null}
    </header>
  );
}
