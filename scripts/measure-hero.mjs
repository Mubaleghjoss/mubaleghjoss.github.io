/**
 * Ukur geometri hero secara kuantitatif, sebagai ganti penilaian visual:
 * proporsi kolom, panjang baris teks (ch), dan keseimbangan tinggi.
 */
import { chromium } from 'playwright';

const base = process.env.MEASURE_BASE ?? 'http://127.0.0.1:4321';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(base + '/', { waitUntil: 'networkidle' });

const data = await page.evaluate(() => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) };
  };
  const lead = document.querySelector('.hero-lead');
  const cs = lead ? getComputedStyle(lead) : null;
  // Perkiraan lebar 1 karakter dari font-size (0.5em untuk font proporsional).
  const charW = cs ? parseFloat(cs.fontSize) * 0.5 : 0;
  return {
    heroText: box('.hero-grid > div:first-child'),
    avatar: box('.avatar-wrap'),
    lead: box('.hero-lead'),
    leadCh: charW ? Math.round((lead?.getBoundingClientRect().width ?? 0) / charW) : null,
    h1Size: getComputedStyle(document.querySelector('h1')).fontSize,
    heroH: box('.hero')?.h,
    viewportH: window.innerHeight,
  };
});

console.log(JSON.stringify(data, null, 2));

const ratio = data.avatar && data.heroText ? data.heroText.w / data.avatar.w : 0;
const checks = [
  ['lead measure 45-75ch', data.leadCh >= 45 && data.leadCh <= 75, `${data.leadCh}ch`],
  ['rasio kolom teks:foto 1.5-4', ratio >= 1.5 && ratio <= 4, ratio.toFixed(2)],
  ['hero <= 1.35x viewport', data.heroH <= data.viewportH * 1.35, `${data.heroH}px vs ${data.viewportH}px`],
];
let bad = 0;
for (const [name, ok, val] of checks) {
  if (!ok) bad++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name} -> ${val}`);
}
await browser.close();
console.log(bad === 0 ? 'HERO_GEOMETRY_OK' : `HERO_GEOMETRY_FAILED=${bad}`);
process.exit(bad === 0 ? 0 : 1);
