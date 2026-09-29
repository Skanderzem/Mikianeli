import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const origin = process.env.TEST_BASE_URL || "http://localhost:3000";
const out = path.resolve("output/site-v3-1-1");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
const page = await context.newPage();
await page.goto(origin);
await page.getByRole("button", { name: "Refuser", exact: true }).click();
const cookies = await context.cookies();

// Stills at known CSS times; the video below uses unmodified real-time playback.
await page.locator(".hero-v3").evaluate((hero) => {
  const animated = [...hero.querySelectorAll("*")].filter(
    (el) => getComputedStyle(el).animationName !== "none",
  );
  animated.forEach((el) => {
    el.style.animationName = "none";
  });
  void hero.offsetWidth;
  animated.forEach((el) => el.style.removeProperty("animation-name"));
  hero.getAnimations({ subtree: true }).forEach((animation) => {
    animation.pause();
    animation.currentTime = 0;
  });
});
for (const time of [0, 150]) {
  await page.locator(".hero-v3").evaluate((hero, time) => {
    hero.getAnimations({ subtree: true }).forEach((animation) => {
      animation.currentTime = time;
    });
  }, time);
  await page.screenshot({ path: path.join(out, `hero-${time}ms-1440.png`) });
}
async function methodProgress(targetPage, progress) {
  await targetPage.locator(".journey").evaluate((el, p) => {
    window.scrollTo({
      top:
        el.getBoundingClientRect().top +
        scrollY -
        innerHeight * 0.82 +
        innerHeight * 0.56 * p,
      behavior: "instant",
    });
  }, progress);
}
for (const [i, progress] of [0, 0.4, 0.75, 1.03].entries()) {
  await methodProgress(page, progress);
  await page.waitForTimeout(650);
  await page.screenshot({
    path: path.join(out, `methode-etape-0${i + 1}-1440.png`),
  });
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(origin);
await page.screenshot({ path: path.join(out, "hero-390.png") });
await page.locator(".method-v3").screenshot({
  path: path.join(out, "methode-390.png"),
  animations: "disabled",
  style:
    ".will-reveal { opacity: 1 !important; transform: none !important; } .site-header { visibility: hidden; }",
});
await page.emulateMedia({ reducedMotion: "reduce" });
await page.setViewportSize({ width: 1440, height: 900 });
await page.locator(".method-v3").screenshot({
  path: path.join(out, "methode-reduced-1440.png"),
  style: ".site-header { visibility: hidden; }",
});
await context.close();

const recording = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: {
    dir: path.join(out, "recordings"),
    size: { width: 1440, height: 900 },
  },
});
await recording.addCookies(cookies);
const movie = await recording.newPage();
await movie.goto(origin);
await movie.waitForTimeout(1500);
await movie.mouse.move(1170, 340, { steps: 20 });
await movie.waitForTimeout(2600);
await methodProgress(movie, 0);
await movie.waitForTimeout(900);
for (let i = 0; i <= 120; i++) {
  await methodProgress(movie, i / 116);
  await movie.waitForTimeout(40);
}
await movie.waitForTimeout(1000);
for (let i = 0; i <= 35; i++) {
  await methodProgress(movie, 1.03 - i * 0.018);
  await movie.waitForTimeout(35);
}
await movie.waitForTimeout(800);
const video = movie.video();
await recording.close();
await video.saveAs(path.join(out, "final-polish-desktop.webm"));
await video.delete();
await browser.close();
console.log(
  "V3.1.1 : hero, progression Méthode, mobile, mouvement réduit et vidéo enregistrés.",
);
