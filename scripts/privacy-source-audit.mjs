import fs from "node:fs/promises";
import path from "node:path";
const checks = [];
const patterns = [
  ["identity", /IMDM|Institut M[ée]dical du Marais|Teeps/i],
  ["portrait", /iskander-zemouri\.webp/i],
  ["internal-operation", /\bCRM\b|Instant Forms/i],
  [
    "confidential-amount",
    /729[,.]46|\b4[,.]83\b|\b21[,.]45\b|\d[\d ,.]*\s*(?:€|&euro;)/i,
  ],
  [
    "ad-identifier",
    /(?:campaign[_-]?id|adset[_-]?id|ad[_-]?id|act_)\s*[:=]?\s*["']?\d{8,}/i,
  ],
];
const extensions =
  /\.(?:tsx?|jsx?|mjs|json|html|rsc|txt|xml|svg|css|cache|map)$/i;
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (extensions.test(file) || entry.name === "_headers") {
      const body = await fs.readFile(file, "utf8");
      checks.push({
        file,
        hits: patterns.filter(([, re]) => re.test(body)).map(([name]) => name),
      });
    }
  }
}
for (const dir of [
  "src",
  "public",
  ".next/static",
  ".next/server/app",
  ".open-next/assets",
  ".open-next/cache",
])
  await walk(dir);
const bad = checks.filter((c) => c.hits.length);
const report = {
  time: new Date().toISOString(),
  ok: bad.length === 0,
  files: checks.length,
  bad,
  checks,
};
await fs.mkdir("output/site-v3", { recursive: true });
await fs.writeFile(
  "output/site-v3/privacy-source-audit.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify({ ok: report.ok, files: report.files, bad }));
if (!report.ok) process.exitCode = 1;
