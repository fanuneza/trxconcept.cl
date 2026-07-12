import { chromium, devices } from 'playwright';
import fs from 'fs';

const BASE_URL = 'http://localhost:8401';
const TOKEN = '266af8d1-6d90-4d81-94e6-e6cc3853d5bf';
const DETECT_URL = `${BASE_URL}/detect.js?token=${TOKEN}`;
const OUT_DIR = '/tmp/impeccable-review';

const ROUTES = [
  '/',
  '/servicios/',
  '/sobre-mi/',
  '/preguntas-frecuentes/',
  '/politica-de-cookies/',
  '/404/',
];

const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    const url = `${BASE_URL}${route}`;
    console.error(`Scanning ${url} @ ${vp.name}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      console.error(`  navigation issue: ${e.message}`);
    }

    const detectResponse = await page.evaluate(async (detectUrl) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = detectUrl;
        script.onload = () => resolve('loaded');
        script.onerror = () => resolve('error');
        document.head.appendChild(script);
      });
    }, DETECT_URL);

    let findings = [];
    try {
      await page.waitForFunction(() => typeof window.impeccableScan === 'function', { timeout: 10000 });
      findings = await page.evaluate(() => {
        const raw = window.impeccableScan({ serialize: true });
        return Array.isArray(raw) ? raw : [];
      });
    } catch (e) {
      console.error(`  scan failed: ${e.message}`);
    }

    const metrics = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      const vw = Math.max(html.clientWidth, window.innerWidth);
      const vh = Math.max(html.clientHeight, window.innerHeight);
      const scrollW = Math.max(body.scrollWidth, html.scrollWidth);
      const overflowX = scrollW > vw + 1;

      const waLinks = Array.from(document.querySelectorAll('a[href*="wa.me"], a[data-wa]'));
      const allButtons = Array.from(document.querySelectorAll('a.btn, button, [role="button"]'));
      const ctaBar = document.querySelector('.mobile-cta-bar');
      const ctaBarVisible = ctaBar ? !window.getComputedStyle(ctaBar).display.includes('none') : false;

      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName,
        text: h.textContent.trim().slice(0, 60),
      }));

      return {
        viewport: { vw, vh },
        scrollWidth: scrollW,
        overflowX,
        waLinkCount: waLinks.length,
        waLinksVisible: waLinks.filter(a => {
          const r = a.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        }).length,
        buttonLikeCount: allButtons.length,
        ctaBarVisible,
        headingCount: headings.length,
      };
    });

    const screenshotPath = `${OUT_DIR}/${route.replace(/\//g, '_') || 'home'}_${vp.name}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });

    results.push({ route, viewport: vp.name, url, detectStatus: detectResponse, findings, metrics, screenshotPath });
    await context.close();
  }
}

await browser.close();

fs.writeFileSync(`${OUT_DIR}/results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
