import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
const origin = process.env.TEST_BASE_URL || "http://localhost:3000";
const out = path.resolve("output/site-v3");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(origin);
const refuse = page.getByRole("button", { name: "Refuser", exact: true });
await refuse.click();
await refuse.waitFor({ state: "hidden" });
async function prepare(route) {
  await page.goto(origin + route);
  await page.evaluate(() => document.fonts.ready);
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < height; y += 650) {
    await page.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      y,
    );
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(750);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(850);
}
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
  for (const [route, name] of [
    ["/", "homepage"],
    ["/services", "expertise"],
    ["/resultats", "resultats"],
    ["/agences", "agences"],
    ["/contact", "contact"],
  ]) {
    await prepare(route);
    await page.screenshot({
      path: path.join(out, `${name}-${width}.png`),
      fullPage: true,
      animations: "disabled",
      // A long still represents every reveal at its readable endpoint.
      style:
        ".will-reveal { opacity: 1 !important; transform: none !important; } .hero-v3 h1 > span { animation: none !important; clip-path: none !important; transform: none !important; }",
    });
    if (route === "/") {
      await page.screenshot({ path: path.join(out, `hero-${width}.png`) });
      for (const [selector, name] of [
        [".proof-v3", "statistiques"],
        [".results-v3", "resultats-interactifs"],
        [".closing", "cta-final"],
      ]) {
        const element = page.locator(selector);
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(750);
        await element.screenshot({
          path: path.join(out, `${name}-${width}.png`),
        });
      }
    }
  }
}
await context.close();
const videoContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: {
    dir: path.join(out, "recordings"),
    size: { width: 1440, height: 900 },
  },
});
const videoPage = await videoContext.newPage();
await videoPage.goto(origin);
await videoPage.getByRole("button", { name: "Refuser", exact: true }).click();
await videoPage.waitForTimeout(1700);
const start = await videoPage
  .locator(".expertise-v3")
  .evaluate((el) => el.getBoundingClientRect().top + scrollY - 80);
await videoPage.evaluate(
  (y) => window.scrollTo({ top: y, behavior: "instant" }),
  start,
);
await videoPage.waitForTimeout(1000);
for (let step = 0; step < 155; step++) {
  await videoPage.mouse.wheel(0, 12);
  await videoPage.waitForTimeout(70);
  if ([0, 42, 85, 125].includes(step))
    await videoPage.screenshot({
      path: path.join(out, `expertise-motion-${step}.png`),
    });
}
await videoPage.waitForTimeout(1200);
const video = videoPage.video();
await videoContext.close();
await video.saveAs(path.join(out, "expertise-motion.webm"));
await video.delete();
await browser.close();
console.log(
  "Captures desktop 1440, mobile 390 et vidéo expertise enregistrées dans output/site-v3.",
);
