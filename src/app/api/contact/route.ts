import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_BODY_LENGTH = 12_000;
const MAX_LENGTHS = {
  name: 120,
  company: 120,
  email: 160,
  phone: 40,
  website: 240,
  sector: 120,
  objective: 120,
  message: 3_000,
} as const;

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  sector: string;
  objective: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function methodNotAllowed() {
  return NextResponse.json(
    { error: "Méthode non autorisée." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;

function normalizeText(value: unknown, maxLength: number, preserveLines = false) {
  if (typeof value !== "string") {
    return "";
  }

  const withoutControlChars = value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n");

  const normalized = preserveLines
    ? withoutControlChars
        .split("\n")
        .map((line) => line.replace(/[ \t]+/g, " ").trim())
        .join("\n")
        .replace(/\n{4,}/g, "\n\n\n")
        .trim()
    : withoutControlChars.replace(/\s+/g, " ").trim();

  return normalized.slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validatePayload(raw: Record<string, unknown>) {
  const payload: ContactPayload = {
    name: normalizeText(raw.name, MAX_LENGTHS.name),
    company: normalizeText(raw.company, MAX_LENGTHS.company),
    email: normalizeText(raw.email, MAX_LENGTHS.email).toLowerCase(),
    phone: normalizeText(raw.phone, MAX_LENGTHS.phone),
    website: normalizeText(raw.website, MAX_LENGTHS.website),
    sector: normalizeText(raw.sector, MAX_LENGTHS.sector),
    objective: normalizeText(raw.objective, MAX_LENGTHS.objective),
    message: normalizeText(raw.message, MAX_LENGTHS.message, true),
  };

  const fieldErrors: FieldErrors = {};

  if (!payload.name) {
    fieldErrors.name = "Indiquez votre nom.";
  }

  if (!payload.email) {
    fieldErrors.email = "Indiquez votre email.";
  } else if (!emailPattern.test(payload.email)) {
    fieldErrors.email = "Indiquez un email valide.";
  }

  if (!payload.message) {
    fieldErrors.message = "Décrivez brièvement votre situation.";
  }

  return {
    payload,
    fieldErrors,
    valid: Object.keys(fieldErrors).length === 0,
  };
}

function formatValue(value: string) {
  return value ? escapeHtml(value) : "Non renseigné";
}

function buildHtmlEmail(payload: ContactPayload, receivedAt: string) {
  const rows = [
    ["Nom", payload.name],
    ["Entreprise", payload.company],
    ["Email", payload.email],
    ["Téléphone", payload.phone],
    ["Site web", payload.website],
    ["Secteur", payload.sector],
    ["Objectif", payload.objective],
    ["Date de réception", receivedAt],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#07111f;line-height:1.6">
      <h1 style="font-size:22px;margin:0 0 20px">Nouvelle demande Mikianeli</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="border:1px solid #d7dee8;padding:10px 12px;font-weight:700;background:#f7f3ea">${escapeHtml(label)}</td>
                  <td style="border:1px solid #d7dee8;padding:10px 12px">${formatValue(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="font-size:18px;margin:24px 0 8px">Message</h2>
      <div style="white-space:pre-wrap;border:1px solid #d7dee8;background:#f7f3ea;padding:14px 16px;max-width:680px">${formatValue(payload.message)}</div>
    </div>
  `;
}

function buildTextEmail(payload: ContactPayload, receivedAt: string) {
  return [
    "Nouvelle demande Mikianeli",
    "",
    `Nom : ${payload.name || "Non renseigné"}`,
    `Entreprise : ${payload.company || "Non renseigné"}`,
    `Email : ${payload.email || "Non renseigné"}`,
    `Téléphone : ${payload.phone || "Non renseigné"}`,
    `Site web : ${payload.website || "Non renseigné"}`,
    `Secteur : ${payload.sector || "Non renseigné"}`,
    `Objectif : ${payload.objective || "Non renseigné"}`,
    `Date de réception : ${receivedAt}`,
    "",
    "Message :",
    payload.message || "Non renseigné",
  ].join("\n");
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > MAX_BODY_LENGTH) {
    return NextResponse.json({ error: "La demande est trop volumineuse." }, { status: 400 });
  }

  let bodyText = "";

  try {
    bodyText = await request.text();
  } catch {
    return NextResponse.json({ error: "Impossible de lire la demande." }, { status: 400 });
  }

  if (bodyText.length > MAX_BODY_LENGTH) {
    return NextResponse.json({ error: "La demande est trop volumineuse." }, { status: 400 });
  }

  let rawPayload: unknown;

  try {
    rawPayload = JSON.parse(bodyText);
  } catch {
    return NextResponse.json({ error: "Format de demande invalide." }, { status: 400 });
  }

  if (!rawPayload || typeof rawPayload !== "object" || Array.isArray(rawPayload)) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const { payload, fieldErrors, valid } = validatePayload(rawPayload as Record<string, unknown>);

  if (!valid) {
    return NextResponse.json(
      { error: "Certains champs sont invalides.", fieldErrors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "iskander@mikianeli.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "contact@mikianeli.com";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Le service d'envoi n'est pas encore configuré." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const subjectName = payload.company || payload.name;
  const receivedAt = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(new Date());

  try {
    const { error } = await resend.emails.send({
      from: `Mikianeli <${fromEmail}>`,
      to: [toEmail],
      replyTo: payload.email,
      subject: `Nouvelle demande Mikianeli — ${subjectName}`,
      html: buildHtmlEmail(payload, receivedAt),
      text: buildTextEmail(payload, receivedAt),
    });

    if (error) {
      return NextResponse.json({ error: "Erreur lors de l'envoi du message." }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'envoi du message." }, { status: 500 });
  }
}
