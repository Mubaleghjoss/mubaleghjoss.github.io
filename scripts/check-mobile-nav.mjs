/**
 * Memastikan bar navigasi pada tampilan ponsel benar-benar punya warna/tanda,
 * bukan sekadar putih polos, dan item halaman aktif diberi penanda.
 * Dijalankan terhadap `npm run preview`. Default memakai nama host, bukan
 * 127.0.0.1, karena preview pada mesin ini hanya mengikat IPv6 (::1).
 */
import { chromium } from 'playwright';

const baseURL = process.env.BASE_URL ?? 'http://localhost:4321';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
let failures = 0;

const check = (label, pass, detail) => {
  if (!pass) failures += 1;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${label} ${detail}`);
};

const isPlainWhite = (rgb) => {
  const m = rgb.match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
  if (m.length < 3) return false;
  const [r, g, b] = m;
  const alpha = m[3] ?? 1;
  return alpha === 0 || (r > 250 && g > 250 && b > 250);
};

try {
  await page.goto(`${baseURL}/projects/`, { waitUntil: 'networkidle' });

  const header = page.locator('.site-header');
  const headerStyle = await header.evaluate((el) => {
    const s = getComputedStyle(el);
    return { background: s.backgroundColor, border: s.borderBottomColor, shadow: s.boxShadow };
  });
  check('header-berwarna', !isPlainWhite(headerStyle.background), `background=${headerStyle.background}`);
  check('header-berbayang', headerStyle.shadow !== 'none', `shadow=${headerStyle.shadow}`);

  const toggle = page.locator('.nav-toggle');
  await toggle.waitFor({ state: 'visible' });
  const toggleStyle = await toggle.evaluate((el) => {
    const s = getComputedStyle(el);
    return { background: s.backgroundColor, color: s.color, height: el.getBoundingClientRect().height };
  });
  check('tombol-menu-berwarna', !isPlainWhite(toggleStyle.background), `background=${toggleStyle.background}`);
  check('tombol-menu-target-sentuh', toggleStyle.height >= 40, `tinggi=${Math.round(toggleStyle.height)}px`);

  const linksHidden = await page.locator('#nav-links').evaluate((el) => getComputedStyle(el).display);
  check('menu-tertutup-awal', linksHidden === 'none', `display=${linksHidden}`);

  await toggle.click();
  await page.waitForTimeout(150);
  const linksOpen = await page.locator('#nav-links').evaluate((el) => getComputedStyle(el).display);
  check('menu-terbuka-setelah-klik', linksOpen === 'flex', `display=${linksOpen}`);
  check('aria-expanded-benar', (await toggle.getAttribute('aria-expanded')) === 'true', `aria-expanded=${await toggle.getAttribute('aria-expanded')}`);

  const items = await page.locator('#nav-links a').evaluateAll((els) =>
    els.map((el) => {
      const s = getComputedStyle(el);
      return {
        text: el.textContent.trim(),
        current: el.getAttribute('aria-current'),
        background: s.backgroundColor,
        color: s.color,
        shadow: s.boxShadow,
        weight: s.fontWeight,
        height: el.getBoundingClientRect().height,
      };
    }),
  );
  console.log('   item menu:', JSON.stringify(items, null, 1));

  const active = items.filter((i) => i.current === 'page');
  check('tepat-satu-item-aktif', active.length === 1, `jumlah=${active.length} (${active.map((a) => a.text).join(', ')})`);
  if (active.length === 1) {
    const other = items.find((i) => i.current !== 'page');
    check('item-aktif-beda-latar', active[0].background !== other.background, `aktif=${active[0].background} lain=${other.background}`);
    check('item-aktif-beda-warna-teks', active[0].color !== other.color, `aktif=${active[0].color} lain=${other.color}`);
    check('item-aktif-lebih-tebal', Number(active[0].weight) > Number(other.weight), `aktif=${active[0].weight} lain=${other.weight}`);
  }
  check(
    'semua-item-target-sentuh',
    items.every((i) => i.height >= 40),
    `tinggi=${items.map((i) => Math.round(i.height)).join(',')}`,
  );

  const panelBg = await page.locator('#nav-links').evaluate((el) => getComputedStyle(el).backgroundColor);
  const pageBg = await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor);
  check('panel-berwarna-beda-dari-halaman', !isPlainWhite(panelBg) && panelBg !== pageBg, `panel=${panelBg} body=${pageBg}`);

  await page.screenshot({ path: 'artifacts/verification/nav-mobile-open.png' });

  /* Panel menutupi isi halaman, jadi memilih item harus otomatis menutup menu. */
  await page.locator('#nav-links a').first().click();
  await page.waitForTimeout(250);
  const afterClick = await page.locator('#nav-links').evaluate((el) => getComputedStyle(el).display);
  check('menu-tertutup-setelah-pilih-item', afterClick === 'none', `display=${afterClick}`);

  await toggle.click();
  await page.waitForTimeout(150);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const afterEscape = await page.locator('#nav-links').evaluate((el) => getComputedStyle(el).display);
  check('menu-tertutup-dengan-escape', afterEscape === 'none', `display=${afterEscape}`);

  await toggle.click();
  await page.waitForTimeout(150);
  await toggle.click();
  await page.waitForTimeout(150);
  const closed = await page.locator('#nav-links').evaluate((el) => getComputedStyle(el).display);
  check('menu-bisa-ditutup', closed === 'none', `display=${closed}`);
  await page.screenshot({ path: 'artifacts/verification/nav-mobile-closed.png' });
} finally {
  await browser.close();
}

if (failures) {
  console.log(`\n${failures} pemeriksaan GAGAL.`);
  process.exit(1);
}
console.log('\nSemua pemeriksaan nav ponsel lulus.');
