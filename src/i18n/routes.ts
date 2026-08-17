/**
 * Rutas de páginas fijas con slug localizado por idioma (SEO).
 * Las páginas de servicio se manejan en config.ts (SERVICES).
 *
 * Cada página del sitio debe existir como archivo en:
 *   - es: src/pages/<slug-es>.astro
 *   - en: src/pages/en/<slug-en>.astro
 *   - ca: src/pages/ca/<slug-ca>.astro
 */
import { LOCALES, localizePath, servicePath, SERVICES } from "@/config";
import type { Locale } from "@/config";

export type RouteKey =
  | "home"
  | "portfolio"
  | "about"
  | "contact"
  | "journal"
  | "legalNotice"
  | "privacy";

export const ROUTE_SLUGS: Record<RouteKey, Record<Locale, string>> = {
  home: { es: "", en: "", ca: "" },
  portfolio: { es: "portfolio", en: "portfolio", ca: "portfolio" },
  about: { es: "nosotros", en: "about", ca: "nosaltres" },
  contact: { es: "contacto", en: "contact", ca: "contacte" },
  journal: { es: "journal", en: "journal", ca: "journal" },
  legalNotice: { es: "aviso-legal", en: "legal-notice", ca: "avis-legal" },
  privacy: { es: "privacidad", en: "privacy", ca: "privacitat" },
};

/** Ruta de una página fija en un idioma, con barra final */
export function routePath(locale: Locale, key: RouteKey): string {
  return localizePath(locale, "/" + ROUTE_SLUGS[key][locale]);
}

/** Alternates hreflang para una página fija (todas las lenguas) */
export function routeAlternates(key: RouteKey): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, routePath(l, key)]),
  ) as Record<Locale, string>;
}

/** Alternates hreflang para una página de servicio */
export function serviceAlternates(serviceKey: string): Record<Locale, string> {
  const service = SERVICES.find((s) => s.key === serviceKey);
  if (!service) return {} as Record<Locale, string>;
  return Object.fromEntries(
    LOCALES.map((l) => [l, servicePath(l, service)]),
  ) as Record<Locale, string>;
}
