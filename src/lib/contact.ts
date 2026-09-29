export const contactLimits = {
  name: 120,
  company: 120,
  email: 160,
  need: 80,
  message: 3000,
} as const;
export const contactNeeds = [
  "Générer des leads ou des rendez-vous",
  "Développer les ventes e-commerce",
  "Reprendre ou optimiser un compte",
  "Renfort agence / marque blanche",
  "Audit ou tracking",
  "Un autre besoin",
];
export type ContactFields = {
  name: string;
  company: string;
  email: string;
  need: string;
  message: string;
};
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;
export function validateContact(raw: Record<string, unknown>) {
  const fieldErrors: FieldErrors = {};
  const payload = {} as ContactFields;
  for (const field of Object.keys(contactLimits) as (keyof ContactFields)[]) {
    const value = raw[field];
    if (value !== undefined && typeof value !== "string") {
      fieldErrors[field] = "Ce champ doit contenir du texte.";
      payload[field] = "";
      continue;
    }
    const text = (typeof value === "string" ? value : "").trim();
    if (text.length > contactLimits[field])
      fieldErrors[field] = `Limite : ${contactLimits[field]} caractères.`;
    if (
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(text) ||
      (field !== "message" && /[\r\n]/.test(text))
    )
      fieldErrors[field] = "Ce champ contient des caractères invalides.";
    payload[field] = text;
  }
  if (!payload.name) fieldErrors.name = "Indiquez votre nom.";
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
    fieldErrors.email = "Indiquez une adresse email valide.";
  if (!payload.message)
    fieldErrors.message = "Décrivez brièvement votre besoin.";
  if (payload.need && !contactNeeds.includes(payload.need))
    fieldErrors.need = "Sélectionnez un besoin dans la liste.";
  return { payload, fieldErrors, valid: Object.keys(fieldErrors).length === 0 };
}
