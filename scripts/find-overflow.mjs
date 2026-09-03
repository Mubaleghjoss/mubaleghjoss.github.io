import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const routes = process.argv.slice(2);
if (!routes.length) routes.push('/cv/ai-engineer/');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

for (const route of routes) {
  await page.goto(base + route, { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const de = document.documentElement;
    const limit = de.clientWidth;
    const bad = [];
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > limit + 0.5 || el.scrollWidth > el.clientWidth + 1) {
        bad.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString().slice(0, 60) || '',
          right: Math.round(r.right * 100) / 100,
          w: Math.round(r.width * 100) / 100,
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
          text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
        });
      }
    }
    return {
      route: location.pathname,
      docScrollW: de.scrollWidth,
      clientW: de.clientWidth,
      innerW: window.innerWidth,
      bad: bad.slice(0, 25),
    };
  });
  console.log(`\n### ${route}`);
  console.log(`   docScrollWidth=${info.docScrollW} clientWidth=${info.clientW} innerWidth=${info.innerW}`);
  for (const b of info.bad) {
    console.log(`   ${b.tag}.${b.cls} right=${b.right} w=${b.w} scrollW=${b.scrollW} clientW=${b.clientW}`);
    console.log(`      "${b.text}"`);
  }
  if (!info.bad.length) console.log('   (tidak ada elemen melewati batas)');
}

await browser.close();
