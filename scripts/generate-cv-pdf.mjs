import http from 'node:http';
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from 'playwright';

const root = resolve('dist');
const port = Number(process.env.CV_PDF_PORT ?? 4179);
const profiles = [
  ['developer', 'cv-putra-kamulyan-developer.pdf'],
  ['it-support', 'cv-putra-kamulyan-it-support.pdf'],
  ['general', 'cv-putra-kamulyan.pdf'],
];

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function pathFor(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const requested = normalize(join(root, decoded));
  if (!requested.startsWith(root)) return null;
  if (existsSync(requested) && statSync(requested).isFile()) return requested;
  return join(requested, 'index.html');
}

const server = http.createServer((request, response) => {
  const file = pathFor(request.url ?? '/');
  if (!file || !existsSync(file)) {
    response.writeHead(404).end('Not found');
    return;
  }
  response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(response);
});

await new Promise((resolveServer) => server.listen(port, '127.0.0.1', resolveServer));
const browser = await chromium.launch({ headless: true });

/**
 * Chromium menulis jumlah halaman di node /Pages. Dibaca langsung dari berkas
 * supaya CI gagal bila CV melebar dari 2 halaman A4 (mis. font tidak termuat).
 */
const maxPages = Number(process.env.CV_PDF_MAX_PAGES ?? 2);
function pageCount(file) {
  const bytes = readFileSync(file).toString('latin1');
  const counts = [...bytes.matchAll(/\/Count\s+(\d+)/g)].map((m) => Number(m[1]));
  if (counts.length) return Math.max(...counts);
  return [...bytes.matchAll(/\/Type\s*\/Page[^s]/g)].length;
}

try {
  for (const [profile, fileName] of profiles) {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/cv/${profile}/print/`, { waitUntil: 'networkidle' });
    const title = await page.title();
    if (!title.includes('CV')) throw new Error(`Halaman CV ${profile} tidak termuat dengan benar.`);
    /* Font harus benar-benar termuat: kalau jatuh ke font sistem, lebar teks
       berubah dan CV bisa melebar jadi 3 halaman di mesin lain. */
    await page.evaluate(() => document.fonts.ready);
    const fontReady = await page.evaluate(() => document.fonts.check('1rem "Inter Portfolio"'));
    if (!fontReady) throw new Error(`Font "Inter Portfolio" tidak termuat pada CV ${profile}.`);
    const outputDir = join(root, 'cv');
    mkdirSync(outputDir, { recursive: true });
    const output = join(outputDir, fileName);
    await page.pdf({
      path: output,
      format: 'A4',
      printBackground: true,
      margin: { top: '11mm', right: '11mm', bottom: '11mm', left: '11mm' },
    });
    await page.close();
    const pages = pageCount(output);
    if (pages > maxPages) {
      throw new Error(`CV ${fileName} jadi ${pages} halaman, maksimal ${maxPages}.`);
    }
    console.log(`PDF dibuat: dist/cv/${fileName} (${pages} halaman)`);
  }
} finally {
  await browser.close();
  await new Promise((resolveServer) => server.close(resolveServer));
}
