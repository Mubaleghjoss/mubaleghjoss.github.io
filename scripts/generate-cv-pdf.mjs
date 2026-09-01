import http from 'node:http';
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
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

try {
  for (const [profile, fileName] of profiles) {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/cv/${profile}/print/`, { waitUntil: 'networkidle' });
    const title = await page.title();
    if (!title.includes('CV')) throw new Error(`Halaman CV ${profile} tidak termuat dengan benar.`);
    const outputDir = join(root, 'cv');
    mkdirSync(outputDir, { recursive: true });
    await page.pdf({
      path: join(outputDir, fileName),
      format: 'A4',
      printBackground: true,
      margin: { top: '11mm', right: '11mm', bottom: '11mm', left: '11mm' },
    });
    await page.close();
    console.log(`PDF dibuat: dist/cv/${fileName}`);
  }
} finally {
  await browser.close();
  await new Promise((resolveServer) => server.close(resolveServer));
}
