---
name: satori-seo
description: Reglas SEO obligatorias del sitio Satori Arts (Astro, trilingüe es/en/ca). Úsala SIEMPRE antes y después de cualquier cambio que toque páginas, textos, títulos, rutas/slugs, imágenes/fotos, componentes de página, layouts, config.ts, i18n, schema/JSON-LD, sitemap o robots — también en rediseños "solo visuales" (un cambio de diseño puede romper el h1, quitar texto o dejar páginas huérfanas). Triggers: "nueva página", "añadir servicio/ciudad", "cambiar título", "subir fotos", "rediseño", "journal/artículo", "SEO", "Google", "posicionar", "meta description", "h1".
---

# SEO de Satori Arts — reglas para cualquier cambio

El objetivo del sitio es **que Google lo encuentre y la gente escriba por
WhatsApp**. Estas reglas salen de errores reales que ya pasaron en este
proyecto (están anotados con ⚠). No son opcionales: si un cambio de diseño
choca con una regla, avisa antes de romperla.

## 0. Cómo trabajar

1. Antes de tocar nada, lee las secciones de esta skill que afectan a tu cambio.
2. Haz el cambio.
3. **Ejecuta `npm run seo:check`** (build + comprobación automática de `./dist`).
   - `✖ ERROR` → no se despliega hasta corregirlo (sale con código 1).
   - `⚠ AVISO` → revisa; explica en el PR si lo dejas así.
4. Mira la página afectada en `npm run dev` (también en móvil).

## 1. Títulos y descripciones

- **Cada página indexable**: `title` y `description` **únicos** (en todo el
  sitio y en los 3 idiomas). Se pasan a `BaseLayout`.
- **Title ≤ ~60–65 caracteres**, con la **búsqueda real al principio**
  ("Fotógrafo de Bodas en Barcelona · …"), marca al final (`· Satori Arts`).
  ⚠ Los títulos con "Hoteles & Restaurantes" pasaban de 80 caracteres y Google
  los cortaba.
- **Description 70–160 caracteres**, con servicio + ciudad + llamada a la acción.
- Dónde viven:
  | Página | Fichero |
  |---|---|
  | Home | `src/i18n/home.ts` → `HOME_SEO` |
  | Servicios (`/bodas/`…) | `src/i18n/services-content.ts` → `seoTitle`, `seoDescription` |
  | Servicio × ciudad | `src/i18n/city-service.ts` → `TITLE_KEYWORD` + `cityServiceCopy()` |
  | Journal | `src/i18n/journal-content.ts` (`title`, `excerpt` = description) |
  | Resto (contacto, nosotros, proyectos, legales) | constante `SEO`/`CONTENT` dentro de `src/components/pages/*Page.astro` |
- En inglés, ojo con la gramática de las plantillas: ⚠ salía "**Weddings**
  Photographer" porque se usaba el título del servicio en plural. Para
  keywords usa `TITLE_KEYWORD`, no `service.i18n[locale].title`.

## 2. Encabezados

- **Exactamente un `<h1>` por página**, y debe contener la **keyword** de esa
  página (no un rótulo genérico).
- Jerarquía h1 → h2 → h3 sin saltos. No uses `<h2>/<h3>` solo por estilo:
  usa clases; y no conviertas un título real en `<div>`.
- ⚠ Las páginas de servicio comparten `ProjectsGallery` con `/proyectos/`.
  "PROYECTOS" es el h1 **solo** en `/proyectos/`; en servicios se pasa
  `titleAs="p"` (mismo aspecto) y el h1 con keyword está en el bloque de texto
  bajo la galería (`ServiceLayout.astro`, `keywordH1`). Si tocas ese
  componente, no reintroduzcas un segundo h1.
- Los comentarios HTML (`<!-- -->`) salen en el HTML final: no escribas
  `<h1>` literal dentro de un comentario (confunde las auditorías).

## 3. Contenido (lo que más pesa)

- **Nada de texto oculto** para "meter keywords" (`sr-only`, `display:none`,
  color = fondo…). Google lo penaliza. Si el contenido importa, se ve.
- Páginas que deben posicionar (servicios, servicio×ciudad, artículos):
  **≥ 250 palabras visibles** y con sentido. ⚠ Las páginas de servicio
  llegaron a tener ~120 palabras y un h1 "Proyectos": eran invisibles para
  "fotógrafo de bodas". El texto largo + FAQ viven en `services-content.ts`
  y se muestran bajo la galería.
- **Páginas servicio×ciudad**: cada combinación necesita su **párrafo propio**
  en `CITY_NOTES` (`city-service.ts`), por servicio × ciudad × idioma. Sin eso
  son plantillas casi iguales ("doorway pages") y Google las ignora o penaliza.
  Al añadir una ciudad a `CITIES`, **escribe sus notas** (mejor aún: espacios y
  bodas reales hechas allí).
- **Prohibido publicar texto provisional indexable** (`[PENDIENTE]`,
  `[Contenido temporal]`, `[Placeholder content]`, lorem ipsum, teléfono
  `600 00 00 00`…). ⚠ La description de un artículo salía en Google como
  "Contenido temporal — pendiente de sustituir…". Si un artículo no está
  listo: `draft: true` en `journal-content.ts` (→ `noindex`) **y** su URL en el
  filtro del sitemap de `astro.config.mjs`.
- **Afirmaciones honestas**: no digas que algo se hizo en un sitio si no es
  así. ⚠ La colección de paisaje es internacional (cañones, auroras,
  pirámides), no "de la costa catalana".
- Tono y ortografía en los 3 idiomas (ver `CLAUDE.md`). En catalán:
  "tota Catalunya", "d'hotels".

## 4. Idiomas, URLs y enlaces

- Toda página nueva existe en **es (raíz), en (`/en/`) y ca (`/ca/`)**: 3
  envoltorios en `src/pages/…` + slug en `src/i18n/routes.ts` (o en
  `SERVICES`/`SERVICE_CITY_SLUG`), y pasa **`alternates`** a `BaseLayout`
  (genera hreflang es/en/ca + `x-default`).
- Slugs en el idioma de la página, en minúsculas, con guiones, sin acentos
  (`fotografo-de-bodas-barcelona`, `wedding-photographer-barcelona`).
- **Nunca cambies un slug publicado** sin redirección 301 (en el hosting).
- URLs y enlaces internos **con barra final** (`trailingSlash: 'always'`).
  Construye rutas con `localizePath()`, `servicePath()`, `routePath()`,
  `cityServicePath()`, `journalArticlePath()` — nunca a mano.
- **Ninguna página indexable huérfana**: tiene que haber al menos un `<a>`
  desde otra página (los `<link hreflang>` NO cuentan). ⚠ Las páginas
  servicio×ciudad no tenían ningún enlace real; ahora se enlazan desde la
  página de su servicio ("Dónde trabajamos").
- Enlaces a servicios/ciudades con **texto descriptivo** ("Fotógrafo de Bodas
  en Barcelona"), no "aquí" o "ver más" (helper `cityServiceLabel()`).

## 5. Indexación (no romper)

- No quites: canonical, hreflang, `robots.txt`, sitemap, JSON-LD.
- Páginas que no deben indexarse (legales, borradores, 404): `noindex` en
  `BaseLayout` **y** fuera del sitemap (filtro en `astro.config.mjs`). Las
  dos cosas.
- `COMING_SOON` (`src/config.ts`): con `true`, **todo** el sitio es `noindex`
  y muestra "Próximamente". En producción, una vez lanzado, debe ser `false`.
  Para enseñar el sitio sin publicarlo, usa una rama de preview.
- Dominio: `https://satoriarts.es` en `SITE.url` (config.ts), `site`
  (astro.config.mjs) y `public/robots.txt`. Los tres iguales.

## 6. Datos estructurados (JSON-LD)

- El negocio (`src/lib/schema.ts`) va en todas las páginas: `ProfessionalService`
  + `LocalBusiness`, `areaServed` = Maresme + `CITIES`. **Sin `address`**: es un
  negocio con área de servicio (igual que la ficha de Google Business, con la
  dirección oculta).
- Servicios: `BreadcrumbList` + `Service` + `FAQPage` (solo con FAQ **visible**).
  Servicio×ciudad: `Service`. Journal: `BlogPosting` + `BreadcrumbList`.
- **No** añadas `AggregateRating`/`Review` con datos inventados o
  auto-asignados (riesgo de penalización manual).
- El schema debe describir lo que se ve en la página; nada de FAQs o datos
  que no estén en pantalla.

## 7. Imágenes

- Siempre con `astro:assets` (`<Image>` / `Photo.astro`); nunca `<img>` a
  `public/` para fotos de contenido. `widths` ≤ ancho real del original.
- **Nombre de archivo**: `NN-descripcion-corta.webp` (minúsculas, guiones, sin
  acentos). El `NN` fija el orden: el Journal referencia fotos por índice, así
  que **no reordenes ni borres** fotos sin revisar `journal-content.ts`.
- **Alt**: describe **lo que se ve**, en los 3 idiomas, en
  `src/lib/photo-alts.ts` (clave `"carpeta/NN-descripcion"`). Usa
  `photoAlt(locale, título, i, image)` pasando **siempre** la imagen. Nada de
  alts tipo "foto 3" o rellenos de keywords.
- Imágenes decorativas: `alt=""` **y** `aria-hidden="true"`.
- Fotos nuevas: `scripts/convert-photos.mjs` (WebP) → carpeta correcta →
  alt en `photo-alts.ts`. OG: `scripts/make-og.mjs` (1200×630).

## 8. Datos de contacto y perfiles (coherencia con Google)

- Nombre **"Satori Arts"**, WhatsApp **+34 675 93 88 39**, email y web: solo en
  `src/config.ts` y **idénticos** a la ficha de Google Business y directorios
  (Bodas.net, Instagram…). Google desconfía si no coinciden.
- Solo enlaza perfiles sociales **verificados como propios**.
  ⚠ `facebook.com/satoriarts` es de OTRO negocio (EE. UU.); por eso
  `SITE.facebook` está vacío y el enlace no se muestra. Rellénalo solo con la
  página real.

## 9. Rendimiento (también es SEO)

- No subir originales pesados a `public/` (⚠ 294 MB de JPG se movieron a
  `_originals-fotossatori/`, gitignored).
- Vídeo del hero con `poster`; fuentes autoalojadas con `preload`.
- Ojo con el scroll horizontal en móvil (⚠ un `-mx-5` sobre un contenedor a
  ancho completo desbordaba la página). `body` tiene `overflow-x: clip`; no lo
  cambies a `hidden` (rompe `position: sticky`).

## 10. Checklist rápido antes de dar un cambio por terminado

- [ ] `npm run seo:check` sin errores (y avisos revisados).
- [ ] 1 h1 con keyword; title ≤ 65 y description 70–160, únicos.
- [ ] Página nueva → 3 idiomas + `alternates` + enlazada desde otra página.
- [ ] Sin texto provisional indexable; borradores con `draft`/`noindex` + fuera del sitemap.
- [ ] Fotos: `NN-descripcion.webp` + alt descriptivo en 3 idiomas.
- [ ] Contacto/perfiles solo desde `config.ts` y verificados.
- [ ] Revisado en `npm run dev` (móvil incluido).
