import { test, expect } from "@playwright/test";

test("desktop expertise layers follow the natural scroll and results work by keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  await expect
    .poll(() =>
      page
        .locator(".hero-v3 h1 span")
        .last()
        .evaluate((el) => getComputedStyle(el).clipPath),
    )
    .toBe("none");
  const panels = page.locator(".stack-panel");
  expect(
    await panels.first().evaluate((el) => getComputedStyle(el).position),
  ).toBe("sticky");
  const start = await panels
    .first()
    .evaluate((el) => el.getBoundingClientRect().top + scrollY);
  await page.evaluate(
    (y) => window.scrollTo({ top: y + 300, behavior: "instant" }),
    start,
  );
  await expect
    .poll(async () => (await panels.first().boundingBox())?.y)
    .toBeCloseTo(112, 0);
  const second = await panels.nth(1).boundingBox();
  const first = await panels.first().boundingBox();
  expect(second!.y).toBeGreaterThan(first!.y);
  expect(second!.y).toBeLessThan(first!.y + first!.height);
  const ecommerce = page
    .locator(".case-tabs")
    .getByRole("button", { name: /E-commerce/ });
  await ecommerce.focus();
  await page.keyboard.press("Enter");
  await expect(ecommerce).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#selected-case .case-metric strong")).toHaveText(
    "×3",
  );
  await expect(page.locator("#selected-case a")).toHaveAttribute(
    "href",
    "/resultats#ecommerce",
  );
  await page.locator("#selected-case a").click();
  await expect(page).toHaveURL(/\/resultats#ecommerce$/);
  await expect(page.locator("#ecommerce h2")).toBeInViewport();
});

test("mobile and reduced motion keep every expertise panel readable without sticky effects", async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({
      reducedMotion: width === 1440 ? "reduce" : "no-preference",
    });
    await page.goto("/");
    for (const panel of await page.locator(".stack-panel").all()) {
      expect(
        await panel.evaluate((el) => getComputedStyle(el).position),
      ).not.toBe("sticky");
      await panel.scrollIntoViewIfNeeded();
      await expect(panel.locator("h3")).toBeInViewport();
      await expect(panel.locator("p")).toBeInViewport();
    }
    if (width === 1440) {
      expect(
        await page
          .locator(".hero-v3 h1 span")
          .first()
          .evaluate((el) => getComputedStyle(el).animationName),
      ).toBe("none");
      expect(
        await page
          .locator(".signal-art")
          .evaluate((el) => getComputedStyle(el).transform),
      ).toBe("none");
      expect(
        await page
          .locator("[data-reveal]")
          .evaluateAll((es) =>
            es.every((el) => getComputedStyle(el).opacity === "1"),
          ),
      ).toBe(true);
    }
  }
});

test("the complete pitch remains available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".proof-v3-item")).toHaveCount(4);
  await expect(page.locator(".stack-panel")).toHaveCount(4);
  for (const selector of [
    ".hero-v3 h1",
    ".proof-v3",
    ".panel-4 p",
    ".personal-grid",
    ".closing",
  ]) {
    await expect(page.locator(selector)).toBeVisible();
  }
  await page.locator(".proof-v3-item").first().click();
  await expect(page).toHaveURL(/\/resultats#cout-par-lead$/);
  await expect(page.locator("#cout-par-lead h2")).toBeVisible();
  await context.close();
});
