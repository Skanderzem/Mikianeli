import { validateContact } from "./contact";

export type ContactEmail = {
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  idempotencyKey: string;
};
export type ContactDependencies = {
  limit: (key: string) => Promise<boolean>;
  send: (email: ContactEmail) => Promise<string | null>;
  now?: () => number;
};
const MAX_BYTES = 16000;
const errorMessage =
  "L’envoi n’a pas pu être confirmé. Veuillez réessayer ou écrire à iskander@mikianeli.com.";
function json(
  body: object,
  status: number,
  extra: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}
function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

export async function handleContact(
  request: Request,
  dependencies: ContactDependencies,
) {
  const origin = request.headers.get("origin");
  if (
    !origin ||
    origin !== new URL(request.url).origin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  )
    return json({ error: "Origine non autorisée." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Format non pris en charge." }, 415);
  if (Number(request.headers.get("content-length")) > MAX_BYTES)
    return json({ error: "La demande est trop volumineuse." }, 413);
  let raw: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "Demande vide." }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BYTES) {
        await reader.cancel();
        return json({ error: "La demande est trop volumineuse." }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return json({ error: "Données invalides." }, 400);
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Format de demande invalide." }, 400);
  }
  const { payload, fieldErrors, valid } = validateContact(raw);
  if (!valid)
    return json({ error: "Certains champs sont invalides.", fieldErrors }, 400);
  if (
    raw.website !== "" ||
    typeof raw.startedAt !== "number" ||
    !Number.isFinite(raw.startedAt) ||
    (dependencies.now?.() ?? Date.now()) - raw.startedAt < 1500
  )
    return json(
      { error: "Veuillez patienter un instant puis réessayer." },
      400,
    );
  if (
    typeof raw.requestId !== "string" ||
    !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
      raw.requestId,
    )
  )
    return json({ error: "Rechargez la page avant de réessayer." }, 400);
  try {
    if (
      !(await dependencies.limit(
        request.headers.get("cf-connecting-ip") || "local",
      ))
    )
      return json({ error: "Trop de tentatives. Patientez une minute." }, 429, {
        "Retry-After": "60",
      });
    const rows = [
      ["Nom", payload.name],
      ["Entreprise", payload.company],
      ["Email", payload.email],
      ["Besoin", payload.need],
      ["Message", payload.message],
    ];
    if (
      raw.attribution &&
      typeof raw.attribution === "object" &&
      !Array.isArray(raw.attribution)
    ) {
      for (const key of [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
      ]) {
        const value = (raw.attribution as Record<string, unknown>)[key];
        if (typeof value === "string" && /^[a-z0-9_-]{1,80}$/i.test(value))
          rows.push([key, value]);
      }
    }
    // A retry uses the same identifier and byte-identical email; Resend deduplicates for 24 hours.
    const text = rows
      .map(([label, value]) => `${label} : ${value || "Non renseigné"}`)
      .join("\n\n");
    const digest = Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)),
      ),
    )
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    const receipt = await dependencies.send({
      replyTo: payload.email,
      subject: `Demande Mikianeli — ${payload.company || payload.name}`,
      text,
      html: `<h1>Nouvelle demande Mikianeli</h1>${rows.map(([label, value]) => `<h2>${escape(label)}</h2><p style="white-space:pre-wrap">${escape(value || "Non renseigné")}</p>`).join("")}`,
      idempotencyKey: `contact/${raw.requestId}/${digest}`,
    });
    if (!receipt) return json({ error: errorMessage }, 502);
    return json({ ok: true, receipt }, 201);
  } catch {
    return json({ error: errorMessage }, 503);
  }
}
