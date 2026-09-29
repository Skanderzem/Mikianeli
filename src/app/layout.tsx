import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Consent } from "@/components/cookies/Consent";
import { Analytics } from "@/components/analytics/Analytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { pageMetadata, siteConfig } from "@/lib/site";
import "./globals.css";
import "./v3.css";
import "./motion.css";
import { MotionDirector } from "@/components/v3/MotionDirector";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
export const metadata: Metadata = {
  ...pageMetadata(
    "Mikianeli — Iskander Zemouri, Media Buyer freelance",
    siteConfig.description,
    "/",
  ),
  applicationName: "Mikianeli",
  metadataBase: new URL(siteConfig.url),
  icons: { icon: "/favicon.png", apple: "/mikianeli-icon.png" },
  formatDetection: { telephone: false },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10151b",
};
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.person,
      jobTitle: "Media Buyer et consultant acquisition digitale",
      url: `${siteConfig.url}/#iskander`,
      sameAs: [siteConfig.linkedin],
      worksFor: { "@id": `${siteConfig.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/mikianeli-icon.png`,
      email: siteConfig.email,
      founder: { "@id": `${siteConfig.url}/#person` },
      description: siteConfig.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: "61 rue de Lyon",
        postalCode: "75012",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "fr-FR",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={manrope.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        {children}
        <Footer />
        <Consent />
        <Analytics />
        <MotionDirector />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
