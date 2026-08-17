/**
 * Manifiesto de imágenes. Carga todas las fotos de src/assets/photos/**
 * como ImageMetadata (astro:assets) y las agrupa por carpeta.
 *
 * [DUMMY] Ahora son fotos de relleno temáticas (loremflickr). Para producción,
 * sustituye los archivos en src/assets/photos/<carpeta>/ manteniendo los nombres.
 */
import type { ImageMetadata } from "astro";
import type { Locale, ServiceKey } from "@/config";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/photos/**/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

// Agrupa por nombre de carpeta (penúltimo segmento de la ruta)
const byFolder = new Map<string, { name: string; img: ImageMetadata }[]>();
for (const [path, mod] of Object.entries(modules)) {
  const parts = path.split("/");
  const folder = parts[parts.length - 2];
  const name = parts[parts.length - 1];
  if (!byFolder.has(folder)) byFolder.set(folder, []);
  byFolder.get(folder)!.push({ name, img: mod.default });
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

/** Genera un alt descriptivo para una foto de servicio */
export function photoAlt(locale: Locale, serviceTitle: string, i: number): string {
  const by: Record<Locale, string> = {
    es: `${serviceTitle} — Satori Arts, foto ${i + 1}`,
    en: `${serviceTitle} — Satori Arts, photo ${i + 1}`,
    ca: `${serviceTitle} — Satori Arts, foto ${i + 1}`,
  };
  return by[locale];
}
