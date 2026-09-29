/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="fold" x2="1" y2="1"><stop stop-color="#dbe4ff"/><stop offset=".45" stop-color="#687fff"/><stop offset="1" stop-color="#3748df"/></linearGradient><radialGradient id="glow"><stop stop-color="#243174" stop-opacity=".65"/><stop offset="1" stop-color="#090c14" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="630" fill="#090c14"/><ellipse cx="950" cy="290" rx="390" ry="330" fill="url(#glow)"/>
<g font-family="Arial,sans-serif"><text x="64" y="76" font-size="29" fill="#edf0f7">Mikianeli</text><text x="64" y="150" font-size="15" letter-spacing="2" fill="#b1bdff">ISKANDER ZEMOURI / MEDIA BUYER</text><g font-size="73" font-weight="bold" letter-spacing="-4"><text x="60" y="258" fill="#edf0f7">Faites de</text><text x="60" y="340" fill="#b1bdff">l’acquisition</text><text x="60" y="422" fill="#edf0f7">votre avantage.</text></g><text x="64" y="495" font-size="21" fill="#dce2f5">La stratégie et l’exécution. Directement avec moi.</text><text x="64" y="580" font-size="18" fill="#aab3ca">Meta Ads · Paid acquisition</text><text x="967" y="580" font-size="18" fill="#edf0f7">mikianeli.com</text></g>
<g transform="translate(750 150) rotate(-9 170 160)"><ellipse cx="170" cy="170" rx="230" ry="88" stroke="#6678bd" stroke-opacity=".3" fill="none" transform="rotate(-25 170 170)"/><path d="M30 80 170 190 315 80 350 102V350L315 330V190L208 280 170 260 100 208V355L65 335Z" fill="#3238a8"/><path d="M30 80 170 190 315 80V330H245V215L170 275 100 219V330H30Z" fill="url(#fold)" stroke="#bac7ff" stroke-opacity=".5"/><circle cx="350" cy="65" r="5" fill="#d8ff8b"/></g><path d="M64 539H1136" stroke="#34405a"/>
</svg>`;
(async () => {
  await sharp(Buffer.from(svg))
    .png({ palette: true })
    .toFile(path.join(root, "public/og-mikianeli.png"));
})();
