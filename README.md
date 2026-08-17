# Satori Arts — web + estrategia para ser un imán de clientes

Web estática (Astro, cero JS) de un dúo de **fotografía y film**: bodas, eventos,
hoteles y paisaje. Trilingüe **ES / EN / CA**. Contacto por **WhatsApp**.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # ./dist  (listo para Vercel/Netlify/Cloudflare Pages)
```

## Qué incluye la web

- **Home, 4 servicios, portfolio, nosotros, contacto, journal y legales**, en los
  3 idiomas (58 páginas construidas).
- **Motor de SEO local**: 24 páginas servicio×ciudad de alta intención
  (`/fotografo-de-bodas-barcelona/`, `/en/hotel-photographer-madrid/`…) generadas
  desde datos.
- **SEO técnico**: títulos/descripciones únicos, `hreflang` en los 3 idiomas +
  `x-default`, canonical, sitemap multilingüe, `robots.txt`, y **JSON-LD**
  (`LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`).
- **Conversión**: botón de WhatsApp con mensaje contextual por servicio/idioma en
  cada página + botón flotante.
- Diseño oscuro editorial de lujo; el verde solo para WhatsApp.

> **Datos PLACEHOLDER** pendientes de rellenar en `src/config.ts`: número de
> WhatsApp, email, dominio y ciudades reales. Y faltan las **fotos reales**
> (ahora hay marcadores). Ver `CLAUDE.md → Pendientes`.

## Por qué esta web puede ser un imán de clientes

La investigación de la competencia en Barcelona y Madrid muestra un patrón: los
fotógrafos tienen **portfolios preciosos pero SEO local flojo** (sin blog, sin
páginas de ciudad, poca reseña estructurada). Ahí está la oportunidad. La
estrategia combina 3 piezas que se refuerzan:

### 1. La web (hecho)
Páginas servicio×ciudad + schema + trilingüe. Google entiende qué haces, dónde y
en qué idioma. La reserva directa se cierra por WhatsApp, sin comisiones.

### 2. Google Business Profile (GBP) — la palanca #1 del SEO local
Google posiciona los negocios locales por **relevancia + distancia +
prominencia**. El GBP es lo primero que ve un cliente que busca "fotógrafo de
bodas en Barcelona". Plan:

- **Crea/reclama** el perfil como "Fotógrafo" (categoría principal) y añade
  secundarias: "Servicio de video", "Fotógrafo de bodas".
- Si trabajáis a domicilio, **oculta la dirección** y define **área de servicio**
  (Barcelona, Madrid + alrededores).
- **Rellena todo**: descripción con keywords naturales, horario, enlace a la web,
  botón de WhatsApp, idiomas.
- **Sube 10+ fotos** al empezar y **fotos nuevas cada semana**.
- **Reseñas**: pide una tras **cada entrega** de galería. Es el factor que más
  mueve el ranking. Responde a todas.
- Publica un **Post de GBP** al mes (una boda, un venue, una oferta).
- Resultados típicos: cambios visibles en **4–8 semanas**; SEO orgánico en
  **3–6 meses**.

### 3. Contenido (journal) — captura búsquedas que nadie trabaja
Convierte `Journal` en un blog de **venues y ubicaciones**: "Boda en [finca]",
"Mejores hoteles para bodas en Madrid", "Qué ver antes de tu sesión en [barrio]".
Publica **2–4 artículos al mes**. Enlaza cada artículo a la página de servicio y
a la de servicio×ciudad correspondiente. (Técnicamente: montar una content
collection en `src/content/` — ver `CLAUDE.md`.)

### Refuerzos
- **Instagram** (@satoriarts_) es hoy vuestro canal fuerte: enlázalo desde la web
  (hecho) y enlaza la web desde la bio. El mismo trabajo alimenta GBP, IG y blog.
- **Reseñas en más sitios**: Google (prioridad), Bodas.net / Zankyou (bodas),
  perfiles de hostelería para el vertical hotelero.
- **Backlinks**: aparece en directorios de fotógrafos y colabora con venues y
  wedding planners (que os enlacen desde su web).

## Checklist para lanzar

1. Rellenar datos reales en `src/config.ts` (WhatsApp, email, dominio, ciudades).
2. Poner `site` en `astro.config.mjs` y el sitemap de `public/robots.txt` con el
   dominio definitivo (debe coincidir con `SITE.url`).
3. Sustituir marcadores por **fotos reales** (`astro:assets` `<Image>`).
4. Añadir `public/og-image.jpg` (1200×630) y fotos del dúo.
5. Completar NIF/dirección en las páginas legales.
6. `npm run build`, desplegar, y **dar de alta el sitemap en Google Search
   Console**.
7. Crear y optimizar el **Google Business Profile** (sección 2).

## Stack

Astro 7 · Tailwind 4 · shadcn/ui (base-nova) · fuentes autoalojadas · cero JS.
Ver `CLAUDE.md` para la arquitectura y las reglas del proyecto.
