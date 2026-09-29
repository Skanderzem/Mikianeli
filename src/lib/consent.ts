export const CONSENT_COOKIE = "mikianeli_consent_v2";
export const CONSENT_EVENT = "mikianeli:consent";
export function readConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];
  return value === "granted" || value === "denied" ? value : null;
}
export function saveConsent(value: "granted" | "denied") {
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
