"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";
import { Arrow } from "@/components/ui/ButtonLink";
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <div className="container header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Mikianeli, accueil"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/mikianeli-logo-light.webp"
            alt="Mikianeli"
            width={170}
            height={31}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/contact" data-cta="header">
          {siteConfig.cta}
          <Arrow diagonal />
        </Link>
        <button
          ref={trigger}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fermer" : "Menu"}
          <span aria-hidden="true">{open ? "×" : "+"}</span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Navigation mobile"
        hidden={!open}
      >
        {[...navLinks, { href: "/contact", label: siteConfig.cta }].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            aria-current={pathname === l.href ? "page" : undefined}
          >
            {l.label}
            <Arrow diagonal />
          </Link>
        ))}
      </nav>
    </header>
  );
}
