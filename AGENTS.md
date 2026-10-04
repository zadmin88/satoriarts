# Agents guide — Satori Arts

Lee y sigue **CLAUDE.md** en la raíz del proyecto (estructura, diseño, recetas)
y, para CUALQUIER cambio que toque páginas, textos, títulos, rutas, imágenes,
layouts, `src/config.ts`, i18n o schema, las reglas SEO de
**`.claude/skills/satori-seo/SKILL.md`**. Resumen mínimo:

- Sitio Astro trilingüe: español (raíz), inglés (`/en/`), catalán (`/ca/`).
  Toda página nueva existe en los 3 idiomas y pasa `alternates` a `BaseLayout`.
- Datos de negocio y contacto SOLO en `src/config.ts` (WhatsApp, email, perfiles).
- SEO: 1 solo `<h1>` con keyword; `title` ≤ ~65 y `description` 70–160, únicos;
  nada de texto provisional ni oculto en páginas indexables; ninguna página
  huérfana; fotos `NN-descripcion.webp` con alt descriptivo en
  `src/lib/photo-alts.ts`; no tocar canonical, hreflang, sitemap ni JSON-LD.
- Diseño: tokens del tema en `src/styles/global.css`, nunca colores sueltos.
- Verificación antes de terminar: **`npm run seo:check`** sin errores
  (build + comprobación SEO automática) y revisar la página en `npm run dev`.
