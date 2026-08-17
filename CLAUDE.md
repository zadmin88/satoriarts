# Guía del proyecto — Satori Arts

Web estática de **Satori Arts**, un dúo de **fotografía y film** (Manu + Tefi)
para **bodas, eventos, hoteles y paisaje** en Barcelona, Madrid y destino.
Objetivo del sitio: **que la gente lo encuentre en Google y contacte por
WhatsApp**. Trilingüe: **español (raíz), inglés (`/en/`) y catalán (`/ca/`)**.

## Comandos

```
npm run dev          # servidor local en http://localhost:4321
npm run build        # genera el sitio en ./dist
npm run preview      # previsualiza el build
```

## Dónde está cada cosa

| Qué                                         | Dónde                                   |
| ------------------------------------------- | --------------------------------------- |
| Datos de negocio, WhatsApp, servicios, ciudades | `src/config.ts` (ÚNICA fuente)      |
| Textos de interfaz (nav, footer, CTAs)      | `src/i18n/ui.ts`                        |
| Slugs de páginas fijas por idioma           | `src/i18n/routes.ts`                    |
| Contenido de la home (por qué, testimonios) | `src/i18n/home.ts`                      |
| Contenido largo de cada servicio            | `src/i18n/services-content.ts`          |
| Motor SEO servicio×ciudad (slugs + copy)    | `src/i18n/city-service.ts`              |
| Colores, fuentes, tokens del tema           | `src/styles/global.css`                 |
| SEO base (metas, canonical, hreflang, JSON-LD) | `src/layouts/BaseLayout.astro`       |
| Plantilla de página de servicio             | `src/layouts/ServiceLayout.astro`       |
| Schema.org del negocio (LocalBusiness)      | `src/lib/schema.ts`                     |
| Componentes de página (uno por tipo)        | `src/components/pages/`                 |
| Componentes propios                         | `src/components/`                       |
| Componentes shadcn/ui                       | `src/components/ui/`                    |
| Páginas (una ruta = un file, por idioma)    | `src/pages/`, `src/pages/en/`, `src/pages/ca/` |

## Arquitectura clave (léela antes de tocar nada)

- **Patrón "page-component"**: cada tipo de página vive UNA vez en
  `src/components/pages/*.astro` y recibe `locale`. Los archivos en `src/pages/`
  son envoltorios de 3 líneas. Así el sitio trilingüe no se duplica.
  Ejemplo: `src/pages/nosotros.astro`, `src/pages/en/about.astro` y
  `src/pages/ca/nosaltres.astro` renderizan todos `AboutPage` con su `locale`.
- **`src/config.ts` es la única fuente** de datos del negocio. `SERVICES`
  (verticales) × `DISCIPLINES` (photo/film) × `CITIES`. Los mensajes de WhatsApp
  se **generan** con `waServiceMessage()` / `waDefaultMessage()`, no se escriben
  a mano.
- **Idiomas**: `es` en la raíz, `en` en `/en/`, `ca` en `/ca/`. Usa
  `localizePath()`, `servicePath()`, `routePath()` — nunca construyas rutas a
  mano. Cada página pasa `alternates` a `BaseLayout` para el hreflang.

## Reglas del proyecto (importantes — no las rompas sin avisar)

### Contenido y tono

- Tono cercano y editorial, en "tú/vosotros". Vendemos emoción (bodas) y ROI
  (hoteles). Sin promesas vacías.
- Datos personales (WhatsApp, email, dominio, nombres) SOLO en `src/config.ts`.
  Nunca escribas un número o un `wa.me` a mano en una página.
- Ortografía cuidada en los 3 idiomas. Si añades texto de UI, hazlo en los 3
  (`src/i18n/ui.ts`); si falta una clave, cae al español.

### Diseño

- Tema **oscuro editorial de lujo**: negro cálido + neutros + **champán/oro**
  (`text-gold`, `text-gold-deep`). Usa siempre tokens del tema
  (`bg-card`, `text-muted-foreground`, `border-border`…), nunca colores sueltos.
- El **verde está reservado a WhatsApp** (`--wa`, `bg-wa`). No lo uses para nada
  más: así verde = contactar.
- Fuentes autoalojadas: **Fraunces** (títulos, `font-heading`) y **Geist**
  (cuerpo). No añadas Google Fonts por CDN.
- Botones de WhatsApp: usa `src/components/WhatsAppButton.astro` (props
  `message`, `label`, `size`, `variant`). El `message` sale de las funciones
  `wa*` de `config.ts`.
- shadcn/ui configurado (preset base-nova, Base UI). Añadir componentes:
  `npx shadcn@latest add <componente>`. Los `.tsx` se usan **sin** directiva
  `client:` (render en servidor → cero JS).

### Rendimiento (regla de oro: cero JavaScript)

- El sitio se envía **sin JS** al navegador (0 bytes de JS). No añadas islands de
  React con `client:*` salvo necesidad real. Interactividad simple con CSS o
  `<details>` (menú móvil, dropdown de servicios, FAQ, galería).
- **Imágenes**: hoy hay marcadores (`Placeholder.astro` / `Gallery.astro`) sin
  binarios. Cuando lleguen las fotos reales, sustituye por `<Image>` de
  `astro:assets` con `alt` SIEMPRE, AVIF/WebP y `loading="lazy"`.

### SEO (no tocar sin entender)

- Cada página pasa `title` (≤ ~65 car., keyword al principio) y `description`
  únicos a `BaseLayout`. No dupliques títulos entre páginas ni idiomas.
- Un solo `<h1>` por página; jerarquía h1 → h2 → h3 sin saltos.
- No elimines: canonical, **hreflang** (los 3 idiomas + `x-default`), sitemap,
  robots.txt, JSON-LD (`LocalBusiness` + `Service` + `FAQPage` + `BreadcrumbList`).
- URLs con barra final (`trailingSlash: 'always'`). Enlaces internos también.
- Páginas noindex (legales): pasan `noindex` a `BaseLayout` **y** están
  excluidas del sitemap en `astro.config.mjs`.
- **Motor de SEO local**: las páginas servicio×ciudad
  (`/fotografo-de-bodas-barcelona/`, `/en/wedding-photographer-madrid/`…) se
  generan solas desde `SERVICES × CITIES`. Para más alcance, añade ciudades.

## Recetas frecuentes

**Añadir una ciudad** (p. ej. Valencia): añade una entrada a `CITIES` en
`src/config.ts`. Se generan solas las páginas servicio×ciudad en los 3 idiomas,
con su hreflang y schema. Revisa el copy en `cityServiceCopy()` de
`src/i18n/city-service.ts`.

**Añadir un servicio nuevo**: 1) añade la `key` al tipo `ServiceKey` y una
entrada a `SERVICES` en `src/config.ts` (con `i18n` de los 3 idiomas y
`disciplines`); 2) añade su contenido a `SERVICE_CONTENT` en
`src/i18n/services-content.ts` y su fragmento de slug a `SERVICE_CITY_SLUG` en
`city-service.ts`; 3) crea los 3 envoltorios en `src/pages/…` copiando
`bodas.astro`. El menú, footer, home y "otros servicios" se actualizan solos.

**Cambiar textos de la home**: `src/i18n/home.ts` (por qué, testimonios, SEO) y
`src/i18n/ui.ts` (hero, secciones).

**Cambiar colores/fuentes**: solo en `src/styles/global.css` (variables en
`:root`). Comprueba contraste AA sobre el fondo oscuro.

**Poner fotos reales**: sustituye `Placeholder`/`Gallery` por `<Image>` de
`astro:assets`. Guarda las imágenes en `src/assets/` e impórtalas.

**Antes de dar por terminado un cambio**: `npm run build` debe pasar sin errores
y conviene mirar la página afectada con `npm run dev`.

## Pendientes conocidos (PLACEHOLDER)

- `src/config.ts`: `whatsappNumber`, `phoneDisplay`, `email`, `url` y las
  `CITIES` reales. `site` en `astro.config.mjs` y el sitemap de
  `public/robots.txt` deben coincidir con `SITE.url`.
- Falta `public/og-image.jpg` (1200×630) y **fotos reales** (hoy hay marcadores).
- Fotos del dúo para `AboutPage`.
- NIF y dirección en las páginas legales están como `[PENDIENTE]`.
- `Journal`: hoy es un índice con tarjetas "próximamente". Para el SEO de venues,
  convertirlo en una content collection (`src/content/`) con un artículo por
  finca/hotel.

## Documentación

- Astro: https://docs.astro.build · i18n: https://docs.astro.build/en/guides/internationalization/
- shadcn/ui: https://ui.shadcn.com/docs
- Estrategia de descubrimiento (Google Business Profile, reseñas): ver `README.md`.
