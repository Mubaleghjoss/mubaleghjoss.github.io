// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// User site: https://mubaleghjoss.github.io/ -> base '/'
export default defineConfig({
  site: 'https://mubaleghjoss.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
});
