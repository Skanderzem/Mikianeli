import { Resend } from "resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { handleContact } from "@/lib/contact-server";

type RateLimiter = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};
const localAttempts = new Map<string, { count: number; expires: number }>();
async function limit(key: string) {
  let limiter: RateLimiter | undefined;
  try {
    const { env } = await getCloudflareContext({ async: true });
    limiter = (env as unknown as { CONTACT_RATE_LIMITER?: RateLimiter })
      .CONTACT_RATE_LIMITER;
  } catch {
    /* Standard Node preview has no Cloudflare context. */
  }
  if (limiter) return (await limiter.limit({ key: `contact:${key}` })).success;
  // Only a loopback Next.js preview may use an in-memory fallback.
  if (key !== "local") throw new Error("Missing rate limit binding");
  const now = Date.now();
  const current = localAttempts.get(key);
  if (!current || current.expires < now) {
    localAttempts.set(key, { count: 1, expires: now + 60000 });
    return true;
  }
  return ++current.count <= 5;
}
export async function POST(request: Request) {
  return handleContact(request, {
    limit,
    send: async (email) => {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) return null;
      const { idempotencyKey, ...content } = email;
      const { data, error } = await new Resend(apiKey).emails.send(
        {
          ...content,
          from: `Mikianeli <${process.env.CONTACT_FROM_EMAIL || "contact@mikianeli.com"}>`,
          to: [process.env.CONTACT_TO_EMAIL || "iskander@mikianeli.com"],
        },
        { idempotencyKey },
      );
      return error ? null : data?.id || null;
    },
  });
}
function methodNotAllowed() {
  return Response.json(
    { error: "Méthode non autorisée." },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
  );
}
export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
