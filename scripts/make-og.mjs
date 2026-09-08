/**
 * Genera public/og-image.jpg (1200×630) para las tarjetas sociales (OG/Twitter).
 * Recorta una foto destacada (manteniendo la zona con caras) y añade un
 * degradado inferior para dar profundidad de marca.
 *
 * Uso:  node scripts/make-og.mjs [ruta_imagen_origen]
 * Por defecto usa src/assets/photos/hero/01.webp
 */
import { createRequire } from "module";
import path from "path";

const require = createRequire(import.meta.url);
const sharp = require(
  require.resolve("sharp", {
    paths: [path.join(process.cwd(), "node_modules", "astro"), path.join(process.cwd(), "node_modules")],
  }),
);

const SRC = process.argv[2] || "src/assets/photos/hero/01.webp";
const OUT = "public/og-image.jpg";
const W = 1200;
const H = 630;

const gradient = Buffer.from(
  `<svg width="${W}" height="${H}">
     <defs>
       <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0.4" stop-color="#000000" stop-opacity="0"/>
         <stop offset="1" stop-color="#000000" stop-opacity="0.5"/>
       </linearGradient>
     </defs>
     <rect width="${W}" height="${H}" fill="url(#g)"/>
   </svg>`,
);

await sharp(SRC)
  .rotate()
  .resize(W, H, { fit: "cover", position: sharp.strategy.attention })
  .composite([{ input: gradient, blend: "over" }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OUT);

console.log(`OG image → ${OUT} (${W}x${H}) desde ${SRC}`);
