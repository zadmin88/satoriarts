// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import { COMING_SOON } from './src/config.ts';

// https://astro.build/config
export default defineConfig({
  // Dominio definitivo. Debe coincidir con SITE.url en src/config.ts
  // (sitemap, canonicals y hreflang dependen de esto).
  site: 'https://satoriarts.es',
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
      // En modo "Próximamente" (COMING_SOON) todas las páginas son
      // noindex: el sitemap va vacío.
      filter: (page) =>
        !COMING_SOON &&
        !page.includes('/aviso-legal') &&
        !page.includes('/privacidad') &&
        !page.includes('/legal-notice') &&
        !page.includes('/privacy') &&
        !page.includes('/avis-legal') &&
        !page.includes('/privacitat') &&
        // Artículos del Journal en borrador (draft: true en
        // src/i18n/journal-content.ts → noindex). Quitar de aquí cuando
        // tengan su texto definitivo.
        !page.includes('/journal/un-hotel-boutique-en-andorra') &&
        !page.includes('/journal/a-boutique-hotel-in-andorra') &&
        !page.includes('/journal/un-hotel-boutique-a-andorra'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
