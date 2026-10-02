import type { ServiceKey } from "@/config";

/**
 * [PLACEHOLDER] Un vídeo por categoría, como elemento protagonista de
 * su cuadrícula (antes de las fotos). De momento las 4 apuntan al
 * mismo vídeo de referencia (public/video/hero.mp4) mientras no
 * lleguen los definitivos — cuando el cliente los envíe, basta con
 * sustituir la ruta de cada clave por su archivo real (p. ej.
 * "/video-bodas.mp4"), sin tocar ningún componente.
 *
 * Fuente ÚNICA compartida por PortfolioPage.astro (/proyectos/, todas
 * las categorías en una sola página con filtro) y ServiceLayout.astro
 * (páginas de servicio individuales, /bodas/, /hoteles/...): antes
 * solo la primera tenía el vídeo, así que entrar directamente a
 * /bodas/ (en vez de filtrar desde /proyectos/) mostraba la galería
 * sin vídeo — la causa real del "vídeo que no carga", no un problema
 * de lazy-loading ni de autoplay.
 */
export const CATEGORY_VIDEO: Record<ServiceKey, string> = {
  bodas: "/video/hero.mp4",
  hoteles: "/video/hero.mp4",
  paisaje: "/video/hero.mp4",
};
