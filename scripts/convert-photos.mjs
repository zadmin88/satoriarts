/**
 * Convierte fotos (JPG/PNG) a WebP optimizado con sharp.
 * Auto-orienta por EXIF, limita el lado largo y comprime.
 *
 * Uso:
 *   node scripts/convert-photos.mjs --src <carpeta_origen> --out <carpeta_destino> [--max 1900] [--q 82]
 *
 * Ejemplo (lo usado para las fotos reales):
 *   node scripts/convert-photos.mjs --src _originals-fotossatori --out src/assets/photos/_incoming
 *   # luego repartir los .webp en src/assets/photos/{bodas,eventos,hoteles,paisaje,hero}/
 *
 * Nota: astro:assets vuelve a optimizar en el build, pero convertir a WebP aquí
 * reduce muchísimo el peso de los originales (DSLR de 10-20 MB → ~200-500 KB).
 */
import { createRequire } from "module";
import { readdirSync, mkdirSync } from "fs";
import path from "path";

const require = createRequire(import.meta.url);
const sharp = require(
  require.resolve("sharp", {
    paths: [path.join(process.cwd(), "node_modules", "astro"), path.join(process.cwd(), "node_modules")],
  }),
);

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith("--")) acc.push([cur.slice(2), arr[i + 1]]);
    return acc;
  }, []),
);

const SRC = args.src;
const OUT = args.out;
const MAX = Number(args.max ?? 1900);
const Q = Number(args.q ?? 82);

if (!SRC || !OUT) {
  console.error("Faltan argumentos. Uso: node scripts/convert-photos.mjs --src <dir> --out <dir> [--max 1900] [--q 82]");
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

let i = 0;
for (const f of files) {
  i++;
  const n = String(i).padStart(2, "0");
  const dest = path.join(OUT, `${n}.webp`);
  await sharp(path.join(SRC, f))
    .rotate()
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: Q })
    .toFile(dest);
  console.log(`${f} → ${path.basename(dest)}`);
}
console.log(`\nListo: ${files.length} imágenes → ${OUT}`);
