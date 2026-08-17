// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // ⚠️ [PLACEHOLDER] Cambia esta URL por el dominio definitivo.
  // Debe coincidir con SITE.url en src/config.ts (sitemap, canonicals y hreflang dependen de esto).
  site: 'https://satoriarts.vercel.app',
  trailingSlash: 'always',

  // Sitio trilingüe: es (raíz), en (/en), ca (/ca)
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-GB',
          ca: 'ca-ES',
        },
      },
      // Las páginas noindex no deben aparecer en el sitemap
      filter: (page) =>
        !page.includes('/aviso-legal') &&
        !page.includes('/privacidad') &&
        !page.includes('/legal-notice') &&
        !page.includes('/privacy') &&
        !page.includes('/avis-legal') &&
        !page.includes('/privacitat'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
