import { readConsent } from "./consent";
export const GA4_ID = "G-2FLSSCDYLW";
type Gtag = (command: string, ...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
    "ga-disable-G-2FLSSCDYLW"?: boolean;
  }
}
let initialized = false;
let lastPage: string | undefined;
const attribution: Record<string, string> = {};
const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(location.search);
  for (const key of campaignKeys) {
    const value = params.get(key);
    if (value && /^[a-z0-9_-]{1,80}$/i.test(value)) attribution[key] = value;
  }
}
export function getAttribution() {
  return readConsent() === "granted" ? { ...attribution } : {};
}
export function safePageLocation() {
  const url = new URL(location.origin + location.pathname);
  for (const [key, value] of Object.entries(attribution))
    url.searchParams.set(key, value);
  return url.href;
}
function safeReferrer() {
  try {
    return document.referrer ? new URL(document.referrer).origin + "/" : "";
  } catch {
    return "";
  }
}
export function disableAnalytics() {
  window["ga-disable-G-2FLSSCDYLW"] = true;
  lastPage = undefined;
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (/^(_ga|_gid|_gat|_gcl_)/.test(name)) {
      const parts = location.hostname.split(".");
      document.cookie = `${name}=; Max-Age=0; Path=/`;
      for (let i = 0; i < parts.length - 1; i++)
        document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${parts.slice(i).join(".")}`;
    }
  }
}
export function syncAnalytics() {
  if (readConsent() !== "granted") {
    disableAnalytics();
    return;
  }
  captureAttribution();
  window["ga-disable-G-2FLSSCDYLW"] = false;
  if (!initialized) {
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    // Google’s queue expects an Arguments object, not an Array.
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 33696000,
      cookie_update: false,
      page_location: safePageLocation(),
      page_referrer: safeReferrer(),
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    script.id = "mikianeli-ga4";
    script.onerror = () => {
      script.remove();
      initialized = false;
      lastPage = undefined;
    };
    document.head.appendChild(script);
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}
export function trackPageView() {
  if (readConsent() !== "granted" || typeof window.gtag !== "function") return;
  const path = location.pathname;
  if (lastPage === path) return;
  lastPage = path;
  window.gtag("event", "page_view", {
    page_location: safePageLocation(),
    page_title: document.title,
    page_referrer: safeReferrer(),
    send_to: GA4_ID,
  });
}
export function trackEvent(
  name: "generate_lead" | "contact_click",
  parameters: Record<string, string>,
) {
  if (readConsent() !== "granted" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", name, {
      ...parameters,
      page_location: safePageLocation(),
      send_to: GA4_ID,
    });
  } catch {
    /* Analytics never blocks contact. */
  }
}
export function trackGenerateLead() {
  trackEvent("generate_lead", {
    lead_source: "website_contact_form",
    form_name: "contact",
  });
}
