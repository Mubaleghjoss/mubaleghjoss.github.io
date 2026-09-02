// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// User site: https://mubaleghjoss.github.io/ -> base '/'
export default defineConfig({
  site: 'https://mubaleghjoss.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  // Halaman print adalah duplikat CV online; jangan diindeks agar tidak memecah SEO.
  integrations: [sitemap({ filter: (page) => !page.includes('/print/') })],
  vite: { plugins: [tailwindcss()] },
});
