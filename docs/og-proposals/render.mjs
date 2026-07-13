import { chromium } from "@playwright/test";
import sharp from "sharp";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const variants = ["v1", "v2", "v3", "v4", "v5"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });

for (const v of variants) {
  await page.goto(pathToFileURL(join(DIR, `${v}.html`)).href, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    // ensure any decode of the bg photos is done
    await Promise.all([...document.images].map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {}))));
  });
  const pngBuf = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
  // full-res PNG for on-screen review + optimized 1200x630 webp for shipping
  await sharp(pngBuf)
    .resize(1200, 630)
    .png()
    .toFile(join(DIR, `og-${v}.png`));
  await sharp(pngBuf)
    .resize(1200, 630)
    .webp({ quality: 82 })
    .toFile(join(DIR, `og-${v}.webp`));
  const { size } = await sharp(join(DIR, `og-${v}.webp`))
    .metadata()
    .then(() => import("node:fs"))
    .then((fs) => fs.statSync(join(DIR, `og-${v}.webp`)));
  console.log(`${v}: og-${v}.webp ${Math.round(size / 1024)}KB`);
}

// Contact sheet: 5 stacked at 600x315 with 16px gaps on a dark board.
const thumbW = 600,
  thumbH = 315,
  gap = 16;
const thumbs = await Promise.all(
  variants.map((v) =>
    sharp(join(DIR, `og-${v}.png`))
      .resize(thumbW, thumbH)
      .png()
      .toBuffer()
  )
);
const board = sharp({
  create: {
    width: thumbW + gap * 2,
    height: gap + (thumbH + gap) * variants.length,
    channels: 3,
    background: "#050505",
  },
});
await board
  .composite(thumbs.map((b, i) => ({ input: b, left: gap, top: gap + i * (thumbH + gap) })))
  .png()
  .toFile(join(DIR, "contact-sheet.png"));

await browser.close();
console.log("done");
