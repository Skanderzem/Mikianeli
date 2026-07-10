import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { TarteaucitronConsent } from "@/components/cookies/TarteaucitronConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mikianeli — Agence digitale orientée acquisition",
    template: "%s",
  },
  description: siteConfig.description,
  applicationName: "Mikianeli",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/mikianeli-icon.png",
  },
  openGraph: {
    title: "Mikianeli — Agence digitale orientée acquisition",
    description: siteConfig.description,
    url: "/",
    siteName: "Mikianeli",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-mikianeli.png",
        width: 1200,
        height: 630,
        alt: "Mikianeli, agence digitale orientée acquisition.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mikianeli — Agence digitale orientée acquisition",
    description: siteConfig.description,
    images: ["/og-mikianeli.png"],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05080D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <TarteaucitronConsent />
      </body>
    </html>
  );
}
