import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.env.LIVE_URL ?? 'https://mubaleghjoss.github.io';
const routes = [
  '/',
  '/projects/',
  '/projects/pkg-mobile-app/',
  '/projects/jaringan-smaafbs/',
  '/cv/developer/',
  '/cv/network-engineer/',
];
const viewports = [
  { label: 'desktop', width: 1440, height: 1000 },
  { label: 'mobile', width: 390, height: 844 },
];

mkdirSync('artifacts/live', { recursive: true });
const browser = await chromium.launch({ headless: true });
let failures = 0;

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];
    page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text().slice(0, 120)));
    page.on('requestfailed', (r) => failedRequests.push(r.url().slice(0, 120)));

    const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 });
    const status = response?.status();
    const h1 = await page.locator('h1').first().innerText().catch(() => '(none)');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const brokenImages = await page.evaluate(() =>
      [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    );
    const emptyLinks = await page.evaluate(
      () => [...document.querySelectorAll('a')].filter((a) => !a.getAttribute('href')).length,
    );

    const ok = status === 200 && !overflow && brokenImages.length === 0 && consoleErrors.length === 0 && failedRequests.length === 0;
    if (!ok) failures++;
    console.log(
      `${ok ? 'PASS' : 'FAIL'} ${vp.label} ${route} status=${status} h1="${h1.replace(/\s+/g, ' ').slice(0, 48)}" overflow=${overflow} brokenImg=${brokenImages.length} consoleErr=${consoleErrors.length} reqFail=${failedRequests.length}`,
    );
    if (consoleErrors.length) console.log('   console:', consoleErrors.join(' | '));
    if (failedRequests.length) console.log('   requests:', failedRequests.join(' | '));
    if (brokenImages.length) console.log('   images:', brokenImages.join(' | '));

    const name = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-|-$/g, '');
    await page.screenshot({ path: `artifacts/live/${name}-${vp.label}.png`, fullPage: vp.label === 'mobile' });
    await page.close();
  }
  await context.close();
}

await browser.close();
console.log(failures === 0 ? 'LIVE_VERIFY_OK' : `LIVE_VERIFY_FAILED=${failures}`);
process.exit(failures === 0 ? 0 : 1);
