"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  captureAttribution,
  syncAnalytics,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";
import { CONSENT_EVENT } from "@/lib/consent";
export function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    captureAttribution();
    const update = () => {
      syncAnalytics();
      trackPageView();
    };
    update();
    window.addEventListener(CONSENT_EVENT, update);
    const click = (event: MouseEvent) => {
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[data-cta]")
          : null;
      const position = anchor?.dataset.cta;
      if (
        position &&
        ["header", "hero", "closing", "agency", "expertise"].includes(position)
      )
        trackEvent("contact_click", { cta_position: position });
    };
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener(CONSENT_EVENT, update);
      document.removeEventListener("click", click);
    };
  }, []);
  useEffect(() => {
    trackPageView();
  }, [pathname]);
  return null;
}
