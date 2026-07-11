type GenerateLeadParameters = {
  lead_source: "website_contact_form";
  form_name: "contact";
};

const GENERATE_LEAD_EVENT = "generate_lead";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: typeof GENERATE_LEAD_EVENT,
      parameters: GenerateLeadParameters,
    ) => void;
  }
}

export function trackGenerateLead(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  try {
    window.gtag("event", GENERATE_LEAD_EVENT, {
      lead_source: "website_contact_form",
      form_name: "contact",
    });
  } catch {
    return;
  }
}
