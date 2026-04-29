import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://trxconcept.cl',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith('/404.html') &&
        !page.endsWith('/politica-de-cookies/'),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        'astro/entrypoints/prerender': fileURLToPath(
          new URL('./node_modules/astro/dist/entrypoints/prerender.js', import.meta.url),
        ),
      },
    },
  },
});
