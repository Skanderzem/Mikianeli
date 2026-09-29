import fs from "node:fs/promises";
const origin = process.argv[2] || "http://localhost:3000";
const reportPath = process.argv[3] || "output/site-v3/privacy-audit.json";
const forbidden =
  /IMDM|Institut M[ée]dical du Marais|Teeps|\bCRM\b|729[,.]46|5[,.]70\s*(?:€|&euro;)|4[,.]83|21[,.]45|Instant Forms|iskander-zemouri\.webp|\d[\d ,.]*\s*€/i;
const paths = [
  "/",
  "/services",
  "/resultats",
  "/agences",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
  "/sitemap.xml",
  "/robots.txt",
];
const scripts = new Set();
const checks = [];
for (const path of paths) {
  const res = await fetch(origin + path);
  const text = await res.text();
  checks.push({ path, status: res.status, clean: !forbidden.test(text) });
  for (const match of text.matchAll(/<script[^>]+src="([^"]+)"/g))
    if (match[1].startsWith("/")) scripts.add(match[1]);
}
for (const path of scripts) {
  const res = await fetch(origin + path);
  const text = await res.text();
  checks.push({ path, status: res.status, clean: !forbidden.test(text) });
}
const image = await fetch(origin + "/iskander-zemouri.webp");
const optimized = await fetch(
  origin + "/_next/image?url=%2Fiskander-zemouri.webp&w=640&q=75",
);
const report = {
  origin,
  time: new Date().toISOString(),
  checks,
  removedPortrait: image.status,
  removedOptimizedPortrait: optimized.status,
  ok:
    checks.every((c) => c.status === 200 && c.clean) &&
    image.status === 404 &&
    [400, 404].includes(optimized.status) &&
    !optimized.headers.get("content-type")?.startsWith("image/"),
};
await fs.mkdir("output/site-v3", { recursive: true });
await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify({
    ok: report.ok,
    resources: checks.length,
    bad: checks.filter((c) => !c.clean || c.status !== 200),
    removedPortrait: image.status,
    removedOptimizedPortrait: optimized.status,
  }),
);
if (!report.ok) process.exitCode = 1;
