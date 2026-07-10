"use client";

import { useEffect } from "react";

type TarteaucitronInstance = {
  init: (options: Record<string, unknown>) => void;
  job: string[];
  user: Record<string, unknown>;
};

declare global {
  interface Window {
    __mikianeliTarteaucitronReady?: boolean;
    tarteaucitron?: TarteaucitronInstance;
    tarteaucitronCustomText?: Record<string, unknown>;
  }
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-mikianeli-tac="${src}"]`,
    );

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.mikianeliTac = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Unable to load ${src}`));
    document.head.appendChild(script);
  });
}

export function TarteaucitronConsent() {
  useEffect(() => {
    let cancelled = false;

    async function loadConsentManager() {
      if (window.__mikianeliTarteaucitronReady) {
        return;
      }

      await loadScript("/tarteaucitron/tarteaucitron.min.js");
      await loadScript("/tarteaucitron/tarteaucitron.fr.min.js");
      await loadScript("/tarteaucitron/tarteaucitron.services.min.js");

      if (cancelled || !window.tarteaucitron) {
        return;
      }

      window.tarteaucitronCustomText = {
        alertBigPrivacy:
          "Ce site peut utiliser des traceurs soumis au consentement pour mesurer l'audience et les campagnes.",
      };

      window.tarteaucitron.init({
        privacyUrl: "/politique-confidentialite",
        bodyPosition: "bottom",
        hashtag: "#tarteaucitron",
        cookieName: "tarteaucitron",
        orientation: "bottom",
        groupServices: true,
        showDetailsOnClick: true,
        serviceDefaultState: "wait",
        showAlertSmall: false,
        showTitleBanner: false,
        cookieslist: false,
        cookieslistEmbed: false,
        showIcon: true,
        iconPosition: "BottomRight",
        adblocker: false,
        DenyAllCta: true,
        AcceptAllCta: true,
        highPrivacy: true,
        alwaysNeedConsent: false,
        handleBrowserDNTRequest: false,
        removeCredit: false,
        moreInfoLink: true,
        useExternalCss: true,
        useExternalJs: true,
        readmoreLink: "/politique-confidentialite",
        mandatory: true,
        mandatoryCta: true,
        googleConsentMode: true,
        bingConsentMode: false,
        softConsentMode: false,
        dataLayer: false,
        serverSide: false,
        partnersList: false,
      });

      const tarteaucitron = window.tarteaucitron;
      tarteaucitron.job = tarteaucitron.job || [];
      tarteaucitron.user = tarteaucitron.user || {};

      // Éviter le double tracking : si GTM est utilisé pour GA4/Ads/Meta, ne pas activer les services directs.
      if (gtmId) {
        tarteaucitron.user.googletagmanagerId = gtmId;
        tarteaucitron.job.push("googletagmanager");
      } else {
        if (ga4Id) {
          tarteaucitron.user.gtagUa = ga4Id;
          tarteaucitron.job.push("gtag");
        }

        if (googleAdsId) {
          tarteaucitron.user.googleadsId = googleAdsId;
          tarteaucitron.job.push("googleads");
        }

        if (metaPixelId) {
          tarteaucitron.user.facebookpixelId = metaPixelId;
          tarteaucitron.job.push("facebookpixel");
        }
      }

      window.__mikianeliTarteaucitronReady = true;
    }

    void loadConsentManager().catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
