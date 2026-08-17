/**
 * Motor de SEO local: páginas servicio × ciudad.
 * Generan URLs de alta intención como /fotografo-de-bodas-barcelona/.
 * Se construyen desde datos (SERVICES × CITIES × LOCALES) sin duplicar código.
 */
import { SERVICES, CITIES, LOCALES, localizePath } from "@/config";
import type { Locale, ServiceKey, City, Service } from "@/config";

/** Fragmento de slug SEO por servicio e idioma (sin la ciudad) */
export const SERVICE_CITY_SLUG: Record<ServiceKey, Record<Locale, string>> = {
  bodas: { es: "fotografo-de-bodas", en: "wedding-photographer", ca: "fotograf-de-casaments" },
  eventos: { es: "fotografo-de-eventos", en: "event-photographer", ca: "fotograf-desdeveniments" },
  hoteles: { es: "fotografo-de-hoteles", en: "hotel-photographer", ca: "fotograf-dhotels" },
  paisaje: { es: "fotografo-de-paisaje", en: "landscape-photographer", ca: "fotograf-de-paisatge" },
};

export function cityServiceSlug(locale: Locale, key: ServiceKey, city: City): string {
  return `${SERVICE_CITY_SLUG[key][locale]}-${city.slug}`;
}

export function cityServicePath(locale: Locale, key: ServiceKey, city: City): string {
  return localizePath(locale, "/" + cityServiceSlug(locale, key, city));
}

/** Todas las combinaciones para getStaticPaths de un idioma */
export function cityServiceCombos(locale: Locale) {
  const combos: { slug: string; serviceKey: ServiceKey; citySlug: string }[] = [];
  for (const s of SERVICES) {
    for (const c of CITIES) {
      combos.push({ slug: cityServiceSlug(locale, s.key, c), serviceKey: s.key, citySlug: c.slug });
    }
  }
  return combos;
}

/** Alternates hreflang para una página servicio×ciudad */
export function cityServiceAlternates(key: ServiceKey, city: City): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((l) => [l, cityServicePath(l, key, city)]),
  ) as Record<Locale, string>;
}

/* ---- Copy localizado (título, descripción, H1, intro, cuerpo) ---- */

export interface CityServiceCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
  bodyHtml: string;
}

export function cityServiceCopy(locale: Locale, service: Service, city: City): CityServiceCopy {
  const s = service.i18n[locale].title;
  const n = city.name;
  const r = city.region;

  if (locale === "en") {
    return {
      title: `${s} Photographer in ${n} · Photo & Film · Satori Arts`,
      description: `${s.toLowerCase()} photography and film in ${n}. Satori Arts, a duo with an editorial eye. Message us on WhatsApp for availability.`,
      h1: `${s} photography & film in ${n}`,
      intro: `Looking for a ${s.toLowerCase()} photographer and videographer in ${n}? We're Satori Arts, a duo covering ${n} and all of ${r}.`,
      bodyHtml: `
        <h2>Why Satori Arts in ${n}</h2>
        <p>We know ${n} and the light, the venues and the pace of the city. Photo and film with one coordinated team, so nothing gets missed.</p>
        <ul>
          <li>Local knowledge of ${n} and ${r}.</li>
          <li>Photo, film or both, your choice.</li>
          <li>Private online gallery and cinematic film.</li>
        </ul>
        <h2>How we work in ${n}</h2>
        <p>Tell us the date and the venue in ${n}. We check availability and send you a tailored plan, no strings attached.</p>
      `,
    };
  }
  if (locale === "ca") {
    return {
      title: `Fotògraf de ${s} a ${n} · Foto & Film · Satori Arts`,
      description: `Fotografia i vídeo de ${s.toLowerCase()} a ${n}. Satori Arts, un duo amb mirada editorial. Escriu-nos per WhatsApp per disponibilitat.`,
      h1: `Fotografia i film de ${s.toLowerCase()} a ${n}`,
      intro: `Busques fotògraf i càmera de ${s.toLowerCase()} a ${n}? Som Satori Arts, un duo que cobreix ${n} i tot ${r}.`,
      bodyHtml: `
        <h2>Per què Satori Arts a ${n}</h2>
        <p>Coneixem ${n}: la llum, els espais i el ritme de la ciutat. Foto i film amb un sol equip coordinat, així no s'escapa res.</p>
        <ul>
          <li>Coneixement local de ${n} i ${r}.</li>
          <li>Foto, film o tots dos, tu tries.</li>
          <li>Galeria en línia privada i pel·lícula cinematogràfica.</li>
        </ul>
        <h2>Com treballem a ${n}</h2>
        <p>Explica'ns la data i l'espai a ${n}. Mirem disponibilitat i t'enviem un pla a mida, sense compromís.</p>
      `,
    };
  }
  // es
  return {
    title: `Fotógrafo de ${s} en ${n} · Foto y Vídeo · Satori Arts`,
    description: `Fotografía y vídeo de ${s.toLowerCase()} en ${n}. Satori Arts, un dúo con mirada editorial. Escríbenos por WhatsApp para ver disponibilidad.`,
    h1: `Fotografía y film de ${s.toLowerCase()} en ${n}`,
    intro: `¿Buscas fotógrafo y cámara de ${s.toLowerCase()} en ${n}? Somos Satori Arts, un dúo que cubre ${n} y toda ${r}.`,
    bodyHtml: `
      <h2>Por qué Satori Arts en ${n}</h2>
      <p>Conocemos ${n}: la luz, los espacios y el ritmo de la ciudad. Foto y vídeo con un solo equipo coordinado, así no se escapa nada.</p>
      <ul>
        <li>Conocimiento local de ${n} y ${r}.</li>
        <li>Foto, vídeo o ambos, tú eliges.</li>
        <li>Galería online privada y película cinematográfica.</li>
      </ul>
      <h2>Cómo trabajamos en ${n}</h2>
      <p>Cuéntanos la fecha y el lugar en ${n}. Vemos disponibilidad y te enviamos un plan a medida, sin compromiso.</p>
    `,
  };
}
