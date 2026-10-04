/**
 * Manifiesto de imágenes. Carga todas las fotos de src/assets/photos/**
 * como ImageMetadata (astro:assets) y las agrupa por carpeta.
 *
 * Nombres "NN-descripcion.webp": el NN fija el orden (las referencias por
 * índice del Journal dependen de él) y la descripción ayuda a Google Imágenes.
 * Los alt descriptivos de cada foto están en src/lib/photo-alts.ts.
 */
import type { ImageMetadata } from "astro";
import type { Locale, ServiceKey } from "@/config";
import { PHOTO_ALT } from "@/lib/photo-alts";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/photos/**/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

// Agrupa por nombre de carpeta (penúltimo segmento de la ruta)
const byFolder = new Map<string, { name: string; img: ImageMetadata }[]>();
// imagen → "carpeta/nombre-sin-extensión" (clave de PHOTO_ALT)
const keyOf = new Map<ImageMetadata, string>();
for (const [path, mod] of Object.entries(modules)) {
  const parts = path.split("/");
  const folder = parts[parts.length - 2];
  const name = parts[parts.length - 1];
  if (!byFolder.has(folder)) byFolder.set(folder, []);
  byFolder.get(folder)!.push({ name, img: mod.default });
  keyOf.set(mod.default, `${folder}/${name.replace(/\.[^.]+$/, "")}`);
}
for (const list of byFolder.values()) list.sort((a, b) => a.name.localeCompare(b.name));

export function photosIn(folder: string): ImageMetadata[] {
  return (byFolder.get(folder) ?? []).map((e) => e.img);
}

export const heroPhotos = photosIn("hero");
export const teamPhotos = photosIn("team");

export function servicePhotos(key: ServiceKey): ImageMetadata[] {
  return photosIn(key);
}

/**
 * Alt de una foto. Si se pasa la imagen y tiene descripción en
 * photo-alts.ts, usa esa (lo que se ve en la foto); si no, el genérico.
 */
export function photoAlt(locale: Locale, serviceTitle: string, i: number, image?: ImageMetadata): string {
  const key = image ? keyOf.get(image) : undefined;
  const described = key ? PHOTO_ALT[key]?.[locale] : undefined;
  if (described) return `${described} — Satori Arts`;
  const by: Record<Locale, string> = {
    es: `${serviceTitle} — Satori Arts, foto ${i + 1}`,
    en: `${serviceTitle} — Satori Arts, photo ${i + 1}`,
    ca: `${serviceTitle} — Satori Arts, foto ${i + 1}`,
  };
  return by[locale];
}
