/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#10151b"/><rect x="65" y="114" width="56" height="5" fill="#275dff"/><g font-family="Arial,sans-serif"><text x="65" y="88" font-size="30" fill="#f5f4ef">Mikianeli</text><text x="65" y="213" font-size="23" fill="#8faeff">ISKANDER ZEMOURI</text><text x="65" y="294" font-size="59" font-weight="bold" fill="#f5f4ef">Media Buyer</text><text x="65" y="365" font-size="59" font-weight="bold" fill="#f5f4ef">freelance.</text><text x="65" y="437" font-size="26" fill="#8faeff">Meta Ads. Acquisition. Mesure.</text><text x="65" y="560" font-size="21" fill="#f5f4ef">Un interlocuteur. Du conseil à l’exécution.</text></g></svg>`;
(async () => {
  const portrait = await sharp(path.join(root, "public/iskander-zemouri.webp"))
    .resize(340, 420, { fit: "cover", position: "centre" })
    .toBuffer();
  await sharp(Buffer.from(svg))
    .composite([{ input: portrait, left: 795, top: 110 }])
    .png({ palette: true })
    .toFile(path.join(root, "public/og-mikianeli.png"));
})();
