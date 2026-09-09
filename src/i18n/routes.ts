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
import { JOURNAL_POSTS } from "@/i18n/journal-content";

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
  portfolio: { es: "proyectos", en: "projects", ca: "projectes" },
  about: { es: "conocenos", en: "about", ca: "coneix-nos" },
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

/** Ruta de un artículo del Journal en un idioma, con barra final */
export function journalArticlePath(locale: Locale, slug: string): string {
  return localizePath(locale, `/journal/${slug}`);
}

/** Alternates hreflang para un artículo del Journal (mismo groupId en los 3 idiomas) */
export function journalArticleAlternates(groupId: string): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => {
      const post = JOURNAL_POSTS[l].find((p) => p.groupId === groupId);
      return [l, post ? journalArticlePath(l, post.slug) : routePath(l, "journal")];
    }),
  ) as Record<Locale, string>;
}
