import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const routes = [
  '/',
  '/projects/',
  '/projects/sma-afbs/',
  '/projects/pkg-mobile-app/',
  '/projects/jaringan-smaafbs/',
  '/cv/developer/',
  '/cv/developer/print/',
  '/cv/network-engineer/',
  '/cv/network-engineer/print/',
];
const viewports = [
  { label: 'desktop', width: 1440, height: 1000 },
  { label: 'mobile', width: 390, height: 844 },
];

mkdirSync('artifacts/verification', { recursive: true });
const browser = await chromium.launch({ headless: true });
let failures = 0;

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    for (const route of routes) {
      const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
      const status = response?.status() ?? 0;
      const title = await page.title();
      const h1 = await page.locator('h1').first().textContent();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      const imageMissing = await page.locator('img').evaluateAll((images) => images.some((image) => !image.complete || image.naturalWidth === 0));
      const navIssues = await page.locator('a[href]').evaluateAll((links) => links.filter((link) => !link.textContent?.trim()).length);
      const pass = status === 200 && Boolean(title) && Boolean(h1) && !overflow && !imageMissing && navIssues === 0;
      if (!pass) failures += 1;
      console.log(`${pass ? 'PASS' : 'FAIL'} ${viewport.label} ${route} status=${status} h1=${JSON.stringify(h1?.trim())} overflow=${overflow} images=${imageMissing ? 'bad' : 'ok'} emptyLinks=${navIssues}`);
    }
    await page.goto(`${baseURL}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `artifacts/verification/home-${viewport.label}.png`, fullPage: true });
    await page.goto(`${baseURL}/projects/sma-afbs/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `artifacts/verification/case-study-${viewport.label}.png`, fullPage: true });
    await page.goto(`${baseURL}/cv/developer/print/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `artifacts/verification/cv-${viewport.label}.png`, fullPage: true });
    await page.close();
  }
} finally {
  await browser.close();
}

if (failures) process.exit(1);
console.log('Semua pemeriksaan halaman selesai.');
