import { test, expect } from "@playwright/test";

test("FAQ opens and closes smoothly with the keyboard and stays native without JS", async ({
  page,
  browser,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  const faq = page.locator(".faq details").first();
  const summary = faq.locator("summary");
  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq.locator(".faq-answer p")).toBeVisible();
  await expect
    .poll(() =>
      faq.evaluate((el) =>
        parseFloat(getComputedStyle(el, "::details-content").blockSize),
      ),
    )
    .toBeGreaterThan(20);
  await page.keyboard.press("Space");
  await expect(faq).not.toHaveAttribute("open");
  await expect
    .poll(() =>
      faq.evaluate((el) =>
        parseFloat(getComputedStyle(el, "::details-content").blockSize),
      ),
    )
    .toBe(0);
  await expect(summary).toBeFocused();
  // Rapid reversals must not leave the answer clipped or a summary unresponsive.
  for (let i = 0; i < 5; i++) await summary.click();
  await expect(faq).toHaveAttribute("open", "");
  await expect
    .poll(() =>
      faq.evaluate((el) =>
        parseFloat(getComputedStyle(el, "::details-content").blockSize),
      ),
    )
    .toBeGreaterThan(20);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const plain = await context.newPage();
  await plain.goto("/");
  await plain.locator(".faq summary").first().click();
  await expect(plain.locator(".faq details").first()).toHaveAttribute(
    "open",
    "",
  );
  await expect(plain.locator(".faq-answer p").first()).toBeVisible();
  await context.close();
});

test("motion remains optional during pointer, result and scroll interactions", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  await page.mouse.move(1230, 340);
  const art = page.locator(".signal-art");
  await expect
    .poll(() =>
      art.evaluate((el) =>
        parseFloat((el as HTMLElement).style.getPropertyValue("--pointer-x")),
      ),
    )
    .toBeGreaterThan(0);
  const choices = page.locator(".case-tabs button");
  const values = ["×5,1", "×3", "−60 %"];
  for (const i of [1, 2, 0, 2]) {
    await choices.nth(i).click();
    await expect(page.locator(".case-metric strong")).toHaveText(values[i]);
    await expect(choices.nth(i)).toHaveAttribute("aria-pressed", "true");
    expect(
      await page
        .locator(".case-content")
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("result-copy");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  expect(await page.locator(".will-reveal").count()).toBe(0);
  expect(await art.evaluate((el) => getComputedStyle(el).transform)).toBe(
    "none",
  );
  for (const selector of [
    ".case-content",
    ".case-metric",
    ".signal-sculpture",
    ".signal-halo",
  ]) {
    expect(
      await page
        .locator(selector)
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
  }
  await choices.first().click();
  await expect(page.locator(".case-metric strong")).toHaveText("×5,1");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "ready");
  await page.locator(".closing .button").focus();
  await expect(page.locator(".closing .button")).toBeFocused();
  expect(
    await page
      .locator(".closing .button")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
});

test("decorative entry animation settles and validated values never count through false numbers", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Refuser", exact: true }).click();
  await expect(page.locator(".proof-v3-item strong")).toHaveText([
    "−60 %",
    "×3",
    "÷1,5",
    "×5,1",
  ]);
  await expect
    .poll(
      () =>
        page
          .locator(".hero-v3")
          .evaluate(
            (el) =>
              el
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running").length,
          ),
      { timeout: 6500 },
    )
    .toBe(0);
  await page.locator(".proof-v3").scrollIntoViewIfNeeded();
  await expect(page.locator(".proof-v3-item strong")).toHaveText([
    "−60 %",
    "×3",
    "÷1,5",
    "×5,1",
  ]);
});
