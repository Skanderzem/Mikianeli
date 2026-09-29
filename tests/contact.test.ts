import { test } from "node:test";
import assert from "node:assert/strict";
import {
  handleContact,
  type ContactDependencies,
  type ContactEmail,
} from "../src/lib/contact-server";
const valid = {
  name: "Test QA",
  email: "qa@example.com",
  company: "Test",
  need: "",
  message: "Test technique",
  website: "",
  startedAt: 1000,
  requestId: "11111111-1111-4111-8111-111111111111",
};
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request("https://mikianeli.com/api/contact", {
    method: "POST",
    headers: {
      origin: "https://mikianeli.com",
      "content-type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
function dependencies(overrides: Partial<ContactDependencies> = {}) {
  return {
    limit: async () => true,
    send: async () => "receipt-test",
    now: () => 10000,
    ...overrides,
  };
}
test("requires a provider receipt before confirming success", async () => {
  const success = await handleContact(request(), dependencies());
  assert.equal(success.status, 201);
  assert.deepEqual(await success.json(), { ok: true, receipt: "receipt-test" });
  for (const send of [
    async () => null,
    async () => {
      throw new Error("provider unavailable");
    },
  ]) {
    const response = await handleContact(request(), dependencies({ send }));
    assert.ok(response.status >= 500);
    assert.equal((await response.json()).ok, undefined);
  }
});
test("validates field types, lengths, required fields and unknown select values", async () => {
  for (const change of [
    { name: "" },
    { email: "not-an-email" },
    { message: "" },
    { name: ["x"] },
    { company: "x".repeat(121) },
    { need: "Unknown" },
    { email: "a@b.com\nBcc: stolen@example.com" },
  ])
    assert.equal(
      (await handleContact(request({ ...valid, ...change }), dependencies()))
        .status,
      400,
    );
});
test("blocks cross-origin, unsupported content, oversized streams and malformed bodies", async () => {
  assert.equal(
    (
      await handleContact(
        request(valid, { origin: "https://attacker.example" }),
        dependencies(),
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await handleContact(
        request(valid, { "content-type": "text/plain" }),
        dependencies(),
      )
    ).status,
    415,
  );
  assert.equal((await handleContact(request("{"), dependencies())).status, 400);
  assert.equal(
    (await handleContact(request("a".repeat(17000)), dependencies())).status,
    413,
  );
});
test("honeypot, instant submit and rate limit cannot send email", async () => {
  let sends = 0;
  const deps = dependencies({
    send: async () => {
      sends++;
      return "bad";
    },
  });
  for (const change of [
    { website: "bot" },
    { startedAt: 9999 },
    { requestId: "invalid" },
  ])
    assert.equal(
      (await handleContact(request({ ...valid, ...change }), deps)).status,
      400,
    );
  const throttled = await handleContact(request(), {
    ...deps,
    limit: async () => false,
  });
  assert.equal(throttled.status, 429);
  assert.equal(throttled.headers.get("retry-after"), "60");
  assert.equal(sends, 0);
});
test("retries keep idempotency stable, escape HTML and discard unsafe attribution", async () => {
  const sent: ContactEmail[] = [];
  const deps = dependencies({
    send: async (message) => {
      sent.push(message);
      return "receipt";
    },
  });
  const body = {
    ...valid,
    message: '<script>alert("x")</script>',
    attribution: {
      utm_source: "linkedin",
      utm_campaign: "person@example.com",
      arbitrary: "secret",
    },
  };
  await handleContact(request(body), deps);
  await handleContact(request(body), deps);
  assert.deepEqual(sent[0], sent[1]);
  assert.match(sent[0].html, /&lt;script&gt;/);
  assert.ok(!sent[0].html.includes("<script>"));
  assert.match(sent[0].text, /utm_source : linkedin/);
  assert.ok(!sent[0].text.includes("person@example.com"));
  assert.ok(!sent[0].text.includes("secret"));
});
