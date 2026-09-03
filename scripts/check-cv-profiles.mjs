
import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
let fail = 0;

for (const route of ['/cv/developer/', '/cv/network-engineer/', '/cv/it-support/', '/cv/general/']) {
  await page.goto(base + route, { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.cv-switch-item')].map((el) => ({
      text: el.textContent.trim(),
      active: el.classList.contains('is-active'),
      current: el.getAttribute('aria-current'),
      href: el.getAttribute('href'),
      h: Math.round(el.getBoundingClientRect().height),
    }));
    const lineOf = (el) => {
      const cs = getComputedStyle(el);
      const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4;
      return Math.round(el.getBoundingClientRect().height / lh);
    };
    const worst = [...document.querySelectorAll('.cv-list li, .cv-entry li')]
      .map((el) => ({ lines: lineOf(el), text: el.textContent.trim().slice(0, 70) }))
      .sort((a, b) => b.lines - a.lines)
      .slice(0, 3);
    const de = document.documentElement;
    return {
      items,
      worst,
      overflow: de.scrollWidth > de.clientWidth + 1,
      skillLabels: [...document.querySelectorAll('.cv-skill-line strong')].map((el) => el.textContent.trim()),
      headline: document.querySelector('.cv-header .eyebrow')?.textContent.trim(),
      pdfLink: document.querySelector('a[download]')?.getAttribute('href'),
    };
  });
  const activeCount = info.items.filter((i) => i.active).length;
  const okActive = activeCount === 1 && info.items.find((i) => i.active)?.href === route;
  const okTouch = info.items.every((i) => i.h >= 28);
  const okLines = info.worst.every((w) => w.lines <= 4);
  if (!okActive || !okTouch || !okLines || info.overflow) fail++;
  console.log(`${okActive && okTouch && okLines && !info.overflow ? 'PASS' : 'FAIL'} ${route}`);
  console.log(`   headline="${info.headline}" pdf=${info.pdfLink} overflow=${info.overflow}`);
  console.log(`   switch=${info.items.map((i) => i.text + (i.active ? '*' : '')).join(' | ')} tinggi=${info.items.map((i)=>i.h).join(',')}`);
  console.log(`   keahlian=${info.skillLabels.join(' / ')}`);
  console.log(`   butir-terpanjang=${info.worst.map((w) => w.lines + ' baris: ' + w.text).join(' || ')}`);
}

// halaman print tidak boleh menampilkan bar pemilih versi saat dicetak
await page.goto(base + '/cv/network-engineer/print/', { waitUntil: 'networkidle' });
const printInfo = await page.evaluate(() => ({
  meta: document.querySelector('meta[name="cv-pdf-filename"]')?.getAttribute('content'),
  switchCount: document.querySelectorAll('.cv-switch').length,
}));
console.log(`${printInfo.meta === 'cv-putra-kamulyan-network-engineer.pdf' && printInfo.switchCount === 0 ? 'PASS' : 'FAIL'} /cv/network-engineer/print/ meta=${printInfo.meta} switch=${printInfo.switchCount}`);
if (printInfo.meta !== 'cv-putra-kamulyan-network-engineer.pdf' || printInfo.switchCount !== 0) fail++;

await page.emulateMedia({ media: 'print' });
await page.goto(base + '/cv/network-engineer/', { waitUntil: 'networkidle' });
const hidden = await page.evaluate(() => {
  const el = document.querySelector('.cv-switch');
  return el ? getComputedStyle(el).display : 'absent';
});
console.log(`${hidden === 'none' ? 'PASS' : 'FAIL'} pemilih-versi-disembunyikan-saat-cetak display=${hidden}`);
if (hidden !== 'none') fail++;

await browser.close();
if (fail) { console.log(`GAGAL: ${fail} pemeriksaan`); process.exit(1); }
console.log('Semua pemeriksaan CV multi-profil lulus.');
