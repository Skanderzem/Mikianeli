import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const paths = [
  "/",
  "/services",
  "/resultats",
  "/agences",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
];
test("routes, metadata, accessible content and responsive widths", async ({
  page,
}) => {
  test.setTimeout(180000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 500) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toHaveCount(1);
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
      ).toBe("https://mikianeli.com" + (path === "/" ? "" : path));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (width === 390 || width === 1440) {
        // Audit all revealed content in its readable state; scroll motion has dedicated tests.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await expect(page.locator("html")).toHaveAttribute(
          "data-motion",
          "reduced",
        );
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(
          axe.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        ).toEqual([]);
        await page.emulateMedia({ reducedMotion: "no-preference" });
      }
    }
  }
  expect(errors).toEqual([]);
});
test("permanent redirects, real 404 and API method restriction", async ({
  request,
}) => {
  for (const [path, destination] of [
    ["/methode", "/services#methode"],
    ["/secteurs", "/services#pour-qui"],
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
  expect((await request.get("/page-qui-nexiste-pas")).status()).toBe(404);
  expect((await request.get("/api/contact")).status()).toBe(405);
});
test("mobile menu, keyboard focus and cookie preferences", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Aller au contenu" }),
  ).toBeFocused();
  const menu = page.locator('button[aria-controls="mobile-navigation"]');
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  await page.getByRole("button", { name: "Gérer les cookies" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("consent gates scripts; navigation deduplicates page views; contact is truthful", async ({
  page,
}) => {
  const google: string[] = [];
  let submissions = 0;
  await page.route(/googletagmanager\.com/, (route) => {
    google.push(route.request().url());
    return route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: "/* test transport: do not send analytics */",
    });
  });
  await page.goto(
    "/?utm_source=qa&utm_campaign=person%40example.com&email=private%40example.com",
  );
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  expect(google).toHaveLength(0);
  await page.getByRole("button", { name: "Gérer les cookies" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Accepter", exact: true })
    .click();
  await expect.poll(() => google.length).toBe(1);
  const events = () =>
    page.evaluate(() =>
      (window.dataLayer || [])
        .map((v) => Array.from(v as ArrayLike<unknown>))
        .filter((v) => v[0] === "event"),
    );
  expect((await events()).filter((v) => v[1] === "page_view")).toHaveLength(1);
  expect(JSON.stringify(await events())).not.toContain("example.com");
  await page
    .locator(".site-header")
    .getByRole("link", { name: "Parler de votre acquisition" })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
  expect((await events()).filter((v) => v[1] === "page_view")).toHaveLength(2);
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.locator("#name")).toBeFocused();
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2aa"]).analyze()).violations,
  ).toEqual([]);
  await page.locator("#name").fill("QA Local");
  await page.locator("#email").fill("qa@example.com");
  await page.locator("#message").fill("Essai technique sans envoi réel.");
  await page.route("**/api/contact", async (route) => {
    submissions++;
    await route.fulfill({
      status: 502,
      json: { error: "Provider unavailable" },
    });
  });
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.locator(".form-error")).toBeVisible();
  expect((await events()).filter((v) => v[1] === "generate_lead")).toHaveLength(
    0,
  );
  await expect(page.locator("#message")).toHaveValue(
    "Essai technique sans envoi réel.",
  );
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", async (route) => {
    submissions++;
    await new Promise((resolve) => setTimeout(resolve, 300));
    await route.fulfill({
      status: 201,
      json: { ok: true, receipt: "test-receipt" },
    });
  });
  await page.getByRole("button", { name: "Envoyer mon message" }).dblclick();
  await expect(
    page.getByRole("heading", { name: "Merci pour votre confiance." }),
  ).toBeVisible();
  expect(submissions).toBe(2);
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2aa"]).analyze()).violations,
  ).toEqual([]);
  expect((await events()).filter((v) => v[1] === "generate_lead")).toHaveLength(
    1,
  );
  await page.getByRole("button", { name: "Gérer les cookies" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Refuser", exact: true })
    .click();
  expect(await page.evaluate(() => window["ga-disable-G-2FLSSCDYLW"])).toBe(
    true,
  );
});
