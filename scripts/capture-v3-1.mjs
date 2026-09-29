import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
const origin = process.env.TEST_BASE_URL || "http://localhost:3000";
const out = path.resolve("output/site-v3-1");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(origin);
await page.getByRole("button", { name: "Refuser", exact: true }).click();
const stillStyle =
  ".will-reveal { opacity: 1 !important; transform: none !important; clip-path: none !important; } .hero-v3 h1 > span { animation: none !important; clip-path: none !important; transform: none !important; }";
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
  await page.goto(origin);
  await page.waitForTimeout(4800);
  await page.screenshot({
    path: path.join(out, `hero-${width}.png`),
    animations: "disabled",
  });
  for (const [selector, name] of [
    [".proof-v3", "statistiques"],
    [".stack-panel:first-child", "expertise"],
    [".problems-v3", "pain-points"],
    [".results-v3", "resultats"],
    [".method-v3", "methode"],
    [".faq", "faq"],
    [".closing", "cta-final"],
  ]) {
    const el = page.locator(selector);
    await el.scrollIntoViewIfNeeded();
    if (name === "faq") await el.locator("summary").first().click();
    await page.waitForTimeout(1300);
    await el.screenshot({
      path: path.join(out, `${name}-${width}.png`),
      animations: "disabled",
      style: stillStyle,
    });
    if (name === "faq") await el.locator("summary").first().click();
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(out, `homepage-${width}.png`),
    fullPage: true,
    animations: "disabled",
    style: stillStyle,
  });
}
await context.close();

// Real browser recording: no effects added to the footage and no accelerated playback.
const videoContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: {
    dir: path.join(out, "recordings"),
    size: { width: 1440, height: 900 },
  },
});
// Carry only the refusal choice into the recording, so the motion stays unobstructed.
await videoContext.addCookies(
  await (async () => {
    const c = await browser.newContext();
    const p = await c.newPage();
    await p.goto(origin);
    await p.getByRole("button", { name: "Refuser", exact: true }).click();
    const cookies = await c.cookies();
    await c.close();
    return cookies;
  })(),
);
const movie = await videoContext.newPage();
const chapters = [];
const started = Date.now();
const chapter = (name) =>
  chapters.push({
    name,
    seconds: Number(((Date.now() - started) / 1000).toFixed(1)),
  });
await movie.goto(origin);
chapter("Hero : titre, CTA, monogramme et micro-parallaxe");
await movie.waitForTimeout(1800);
await movie.mouse.move(1180, 380, { steps: 30 });
await movie.waitForTimeout(1600);
await movie.mouse.move(500, 350, { steps: 30 });
await movie.waitForTimeout(900);
async function glide(selector, duration = 700, offset = 130) {
  const target = await movie
    .locator(selector)
    .first()
    .evaluate(
      (el, offset) => el.getBoundingClientRect().top + scrollY - offset,
      offset,
    );
  const from = await movie.evaluate(() => scrollY);
  const steps = Math.max(1, Math.round(duration / 35));
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const eased = 1 - (1 - t) ** 3;
    await movie.evaluate(
      (y) => window.scrollTo({ top: y, behavior: "instant" }),
      from + (target - from) * eased,
    );
    await movie.waitForTimeout(35);
  }
}
chapter("Statistiques : séquence et tracés");
await glide(".proof-v3");
await movie.waitForTimeout(1500);
chapter("Expertise : entrées, survol et empilement");
await glide(".expertise-v3", 850);
await movie.waitForTimeout(950);
await movie.locator(".panel-surface").first().hover();
await movie.waitForTimeout(850);
const first = await movie
  .locator(".stack-panel")
  .first()
  .evaluate((el) => el.getBoundingClientRect().top + scrollY);
for (let i = 0; i <= 135; i++) {
  await movie.evaluate(
    (y) => window.scrollTo({ top: y, behavior: "instant" }),
    first - 170 + i * 11,
  );
  await movie.waitForTimeout(45);
}
chapter("Pain points et tracés");
await glide(".problems-v3");
await movie.waitForTimeout(900);
chapter("Résultats : changement de panneau");
await glide(".results-v3");
await movie.waitForTimeout(900);
await movie.locator(".case-tabs button").nth(1).click();
await movie.waitForTimeout(1000);
await movie.locator(".case-tabs button").nth(2).click();
await movie.waitForTimeout(1000);
chapter("Méthode");
await glide(".method-v3");
await movie.waitForTimeout(1100);
chapter("FAQ : ouverture et fermeture");
await glide(".faq");
await movie.waitForTimeout(650);
await movie.locator(".faq summary").first().click();
await movie.waitForTimeout(850);
await movie.locator(".faq summary").first().click();
await movie.waitForTimeout(650);
chapter("CTA final : entrée et lumière");
await glide(".closing");
await movie.waitForTimeout(950);
await movie.locator(".closing .button").hover();
await movie.waitForTimeout(2600);
const video = movie.video();
await videoContext.close();
await video.saveAs(path.join(out, "motion-desktop.webm"));
await video.delete();
await fs.writeFile(
  path.join(out, "video-chapters.json"),
  JSON.stringify(chapters, null, 2),
);
await browser.close();
console.log("V3.1 : captures 1440/390 et vidéo des animations enregistrées.");
