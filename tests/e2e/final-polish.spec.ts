import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("hero communicates immediately and the CTA works before decorative entry completes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  // Restart then pause CSS entry to inspect its actual first frames deterministically.
  await page.locator(".hero-v3").evaluate((hero) => {
    const animated = [...hero.querySelectorAll<HTMLElement>("*")].filter(
      (el) => getComputedStyle(el).animationName !== "none",
    );
    animated.forEach((el) => {
      el.style.animationName = "none";
    });
    void (hero as HTMLElement).offsetWidth;
    animated.forEach((el) => el.style.removeProperty("animation-name"));
    hero.getAnimations({ subtree: true }).forEach((animation) => {
      animation.pause();
      animation.currentTime = 0;
    });
  });
  const firstMask = await page
    .locator(".hero-v3 h1 > span")
    .first()
    .evaluate((el) =>
      Number(getComputedStyle(el).clipPath.match(/-?[\d.]+/g)?.[2]),
    );
  expect(firstMask).toBeLessThan(40);
  expect(
    await page
      .locator(".hero-actions")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
  await page.locator(".hero-v3").evaluate((hero) => {
    hero.getAnimations({ subtree: true }).forEach((animation) => {
      animation.currentTime = 150;
    });
  });
  const masks = await page
    .locator(".hero-v3 h1 > span")
    .evaluateAll((lines) =>
      lines.map((el) =>
        Number(getComputedStyle(el).clipPath.match(/-?[\d.]+/g)?.[2]),
      ),
    );
  expect(masks.every((bottom) => bottom < 40)).toBe(true);
  const cta = page.locator('.hero-actions a[data-cta="hero"]');
  await expect(cta).toBeVisible();
  await cta.click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("method follows native scroll, reaches all steps and remains readable when going back", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  const journey = page.locator(".journey");
  await expect(journey).toHaveAttribute("data-journey", "scroll");
  for (const [progress, active] of [
    [0, 0],
    [0.4, 1],
    [0.75, 2],
    [1.05, 3],
    [0.4, 1],
  ]) {
    const requestedY = await journey.evaluate((el, p) => {
      const y =
        el.getBoundingClientRect().top +
        scrollY -
        innerHeight * 0.82 +
        innerHeight * 0.56 * p;
      window.scrollTo({ top: y, behavior: "instant" });
      return y;
    }, progress);
    await expect(journey.locator('li[data-step-state="active"]')).toHaveCount(
      1,
    );
    await expect(journey.locator("li").nth(active)).toHaveAttribute(
      "data-step-state",
      "active",
    );
    expect(
      Math.abs((await page.evaluate(() => scrollY)) - requestedY),
    ).toBeLessThan(2);
    await expect(
      journey.locator("li").nth(active).locator("p"),
    ).toBeInViewport();
  }
  await expect(journey.locator("li.is-reached")).toHaveCount(4);
  expect(
    (
      await new AxeBuilder({ page })
        .include(".method-v3")
        .withTags(["wcag2aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  // The same geometry produces the same progress with no extra timeline height or pinning.
  expect(await journey.evaluate((el) => getComputedStyle(el).position)).toBe(
    "relative",
  );
  expect(
    await page
      .locator(".method-v3")
      .evaluate((el) => getComputedStyle(el).position),
  ).not.toBe("sticky");
});

test("method falls back on mobile, resized layouts, reduced motion and no JavaScript", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const journey = page.locator(".journey");
  await expect(journey).toHaveAttribute("data-journey", "scroll");
  for (const width of [390, 768, 900]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(journey).not.toHaveAttribute("data-journey");
    expect(
      await journey.evaluate((el) => getComputedStyle(el, "::after").content),
    ).toBe("none");
    for (const step of await journey.locator("li").all()) {
      await step.scrollIntoViewIfNeeded();
      await expect(step.locator("p")).toBeInViewport();
    }
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(journey).toHaveAttribute("data-journey", "scroll");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(journey).not.toHaveAttribute("data-journey");
  expect(
    await journey
      .locator("li")
      .evaluateAll((steps) =>
        steps.every(
          (step) =>
            getComputedStyle(step).opacity === "1" &&
            getComputedStyle(step.querySelector("p")!).transform === "none",
        ),
      ),
  ).toBe(true);
  expect(await journey.locator("[data-step-state]").count()).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(journey).toHaveAttribute("data-journey", "scroll");
  const plain = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const noJS = await plain.newPage();
  await noJS.goto("/#methode");
  await expect(noJS.locator(".journey li p")).toHaveCount(4);
  await expect(noJS.locator(".journey")).not.toHaveAttribute("data-journey");
  expect(
    await noJS
      .locator(".journey li")
      .evaluateAll((steps) =>
        steps.every((step) => getComputedStyle(step).opacity === "1"),
      ),
  ).toBe(true);
  await plain.close();
});
