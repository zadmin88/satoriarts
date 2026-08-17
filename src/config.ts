/**
 * ============================================================
 *  DATOS DEL SITIO — ÚNICA FUENTE DE VERDAD
 * ============================================================
 *  Este es el ÚNICO archivo donde se editan los datos del
 *  negocio (marca, WhatsApp, email, ciudades, servicios).
 *  Todo el sitio (menú, tarjetas, footer, CTAs de WhatsApp,
 *  SEO y schema.org) lee de aquí.
 *
 *  ⚠️ Cambia también `site` en astro.config.mjs cuando tengas
 *     el dominio definitivo (debe coincidir con SITE.url) para
 *     que sitemap, canonicals y hreflang sean correctos.
 *
 *  Los textos largos de cada página (intro, secciones, FAQ)
 *  viven en las propias páginas y en src/i18n/. Aquí solo van
 *  los datos estructurales y los rótulos que se repiten en
 *  varios sitios (menú, tarjetas, footer).
 */

/* ---------------------------------------------------------- */
/*  Idiomas                                                    */
/* ---------------------------------------------------------- */

export const LOCALES = ["es", "en", "ca"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

/** Etiqueta corta para el selector de idioma */
export const LOCALE_LABEL: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  ca: "CA",
};

/** Código de idioma para <html lang> y og:locale */
export const LOCALE_LANG: Record<Locale, string> = {
  es: "es",
  en: "en",
  ca: "ca",
};
export const OG_LOCALE: Record<Locale, string> = {
  es: "es_ES",
  en: "en_GB",
  ca: "ca_ES",
};

/**
 * Prefijo de ruta por idioma. El idioma por defecto (es) vive en
 * la raíz; los demás en su subcarpeta. Devuelve "" para es.
 */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/**
 * Construye una ruta localizada con barra final.
 * localizePath("en", "/bodas/") -> "/en/bodas/"
 * localizePath("es", "/") -> "/"
 */
export function localizePath(locale: Locale, path: string): string {
  const clean = "/" + path.replace(/^\/+/, "").replace(/\/+$/, "");
  const base = localePrefix(locale) + (clean === "/" ? "/" : clean + "/");
  return base.replace(/\/{2,}/g, "/");
}

/* ---------------------------------------------------------- */
/*  Datos del negocio                                          */
/* ---------------------------------------------------------- */

export const SITE = {
  /** Nombre de la marca */
  brand: "Satori Arts",

  /** Los dos autores del estudio (dúo) */
  team: [
    { name: "Manu", role: "Photographer", instagram: "manu_fotografia" },
    { name: "Tefi", role: "Filmmaker", instagram: "tefireyese" },
  ],

  /**
   * [PLACEHOLDER] WhatsApp en formato internacional, SIN "+" ni
   * espacios. España 6XX XX XX XX → "346XXXXXXXX".
   */
  whatsappNumber: "34600000000",

  /** [PLACEHOLDER] Cómo se muestra el teléfono en pantalla */
  phoneDisplay: "+34 600 00 00 00",

  /** [PLACEHOLDER] Email de contacto (footer y legales) */
  email: "hola@satoriarts.com",

  /** Instagram (canal principal actual) */
  instagram: "satoriarts_",
  get instagramUrl() {
    return `https://www.instagram.com/${this.instagram}/`;
  },

  /**
   * [PLACEHOLDER] URL definitiva, SIN barra final.
   * Debe coincidir con `site` en astro.config.mjs.
   */
  url: "https://satoriarts.vercel.app",
} as const;

/** Enlace de WhatsApp con mensaje prellenado */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* ---------------------------------------------------------- */
/*  Disciplinas: Foto y Film son servicios independientes      */
/* ---------------------------------------------------------- */

export const DISCIPLINES = ["photo", "film"] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export const DISCIPLINE_LABEL: Record<Discipline, Record<Locale, string>> = {
  photo: { es: "Fotografía", en: "Photography", ca: "Fotografia" },
  film: { es: "Vídeo & Film", en: "Video & Film", ca: "Vídeo & Film" },
};

/* ---------------------------------------------------------- */
/*  Ciudades servidas (motor de SEO local)                     */
/* ---------------------------------------------------------- */

export interface City {
  slug: string;
  name: string;
  region: string;
}

/** [PLACEHOLDER] Confirmar ciudades reales servidas. */
export const CITIES: City[] = [
  { slug: "barcelona", name: "Barcelona", region: "Cataluña" },
  { slug: "madrid", name: "Madrid", region: "Comunidad de Madrid" },
];

/* ---------------------------------------------------------- */
/*  Servicios (verticales)                                     */
/* ---------------------------------------------------------- */

export type ServiceKey = "bodas" | "eventos" | "hoteles" | "paisaje";

export interface ServiceCopy {
  /** slug de URL para este idioma (SEO) */
  slug: string;
  /** título visible */
  title: string;
  /** rótulo corto para menú/footer */
  menuLabel: string;
  /** frase de una línea para tarjetas */
  short: string;
}

export interface Service {
  key: ServiceKey;
  /** disciplinas ofrecidas en esta vertical */
  disciplines: Discipline[];
  i18n: Record<Locale, ServiceCopy>;
}

export const SERVICES: Service[] = [
  {
    key: "bodas",
    disciplines: ["photo", "film"],
    i18n: {
      es: {
        slug: "bodas",
        title: "Bodas",
        menuLabel: "Bodas",
        short:
          "Fotografía y vídeo de boda con mirada editorial: los momentos reales, sin poses forzadas, contados como una historia.",
      },
      en: {
        slug: "weddings",
        title: "Weddings",
        menuLabel: "Weddings",
        short:
          "Editorial wedding photography and film: the real moments, no stiff poses, told like a story.",
      },
      ca: {
        slug: "casaments",
        title: "Casaments",
        menuLabel: "Casaments",
        short:
          "Fotografia i vídeo de casament amb mirada editorial: els moments reals, sense poses forçades.",
      },
    },
  },
  {
    key: "eventos",
    disciplines: ["photo", "film"],
    i18n: {
      es: {
        slug: "eventos",
        title: "Eventos",
        menuLabel: "Eventos",
        short:
          "Corporativos, celebraciones y eventos de marca cubiertos con discreción y entregados rápido.",
      },
      en: {
        slug: "events",
        title: "Events",
        menuLabel: "Events",
        short:
          "Corporate, brand and private events covered discreetly and delivered fast.",
      },
      ca: {
        slug: "esdeveniments",
        title: "Esdeveniments",
        menuLabel: "Esdeveniments",
        short:
          "Corporatius, celebracions i esdeveniments de marca coberts amb discreció i lliurats ràpid.",
      },
    },
  },
  {
    key: "hoteles",
    disciplines: ["photo", "film"],
    i18n: {
      es: {
        slug: "hoteles",
        title: "Hoteles & Hostelería",
        menuLabel: "Hoteles",
        short:
          "Imágenes que venden: habitaciones, restaurante, spa y lifestyle para hoteles, resorts y alojamientos.",
      },
      en: {
        slug: "hotels",
        title: "Hotels & Hospitality",
        menuLabel: "Hotels",
        short:
          "Images that sell: rooms, dining, spa and lifestyle for hotels, resorts and rentals.",
      },
      ca: {
        slug: "hotels",
        title: "Hotels & Hostaleria",
        menuLabel: "Hotels",
        short:
          "Imatges que venen: habitacions, restaurant, spa i lifestyle per a hotels i allotjaments.",
      },
    },
  },
  {
    key: "paisaje",
    disciplines: ["photo", "film"],
    i18n: {
      es: {
        slug: "paisaje",
        title: "Paisaje",
        menuLabel: "Paisaje",
        short:
          "Fotografía de paisaje fine-art y copias de autor para coleccionar o vestir espacios.",
      },
      en: {
        slug: "landscape",
        title: "Landscape",
        menuLabel: "Landscape",
        short:
          "Fine-art landscape photography and signed prints to collect or dress a space.",
      },
      ca: {
        slug: "paisatge",
        title: "Paisatge",
        menuLabel: "Paisatge",
        short:
          "Fotografia de paisatge fine-art i còpies d'autor per col·leccionar o vestir espais.",
      },
    },
  },
];

/* ---------------------------------------------------------- */
/*  Helpers de servicios                                       */
/* ---------------------------------------------------------- */

export function getService(key: ServiceKey): Service {
  const s = SERVICES.find((s) => s.key === key);
  if (!s) throw new Error(`Servicio desconocido: ${key}`);
  return s;
}

/** Ruta de la página de servicio en un idioma, con barra final */
export function servicePath(locale: Locale, service: Service): string {
  return localizePath(locale, `/${service.i18n[locale].slug}`);
}

/* ---------------------------------------------------------- */
/*  Mensajes de WhatsApp (generados, no repetidos)             */
/* ---------------------------------------------------------- */

const WA_TEMPLATE: Record<Locale, (service: string, discipline?: string) => string> = {
  es: (service, discipline) =>
    discipline
      ? `Hola Satori Arts, vengo de vuestra web. Me interesa ${discipline.toLowerCase()} para ${service.toLowerCase()}. ¿Podéis darme información?`
      : `Hola Satori Arts, vengo de vuestra web. Me interesa ${service.toLowerCase()}. ¿Podéis darme información?`,
  en: (service, discipline) =>
    discipline
      ? `Hi Satori Arts, I found you through your website. I'm interested in ${discipline.toLowerCase()} for my ${service.toLowerCase()}. Could you send me some info?`
      : `Hi Satori Arts, I found you through your website. I'm interested in ${service.toLowerCase()}. Could you send me some info?`,
  ca: (service, discipline) =>
    discipline
      ? `Hola Satori Arts, vinc del vostre web. M'interessa ${discipline.toLowerCase()} per al meu ${service.toLowerCase()}. Em podeu donar informació?`
      : `Hola Satori Arts, vinc del vostre web. M'interessa ${service.toLowerCase()}. Em podeu donar informació?`,
};

const WA_DEFAULT: Record<Locale, string> = {
  es: "Hola Satori Arts, vengo de vuestra web y me gustaría hacer una consulta.",
  en: "Hi Satori Arts, I found you through your website and I'd like to ask about your work.",
  ca: "Hola Satori Arts, vinc del vostre web i m'agradaria fer una consulta.",
};

/** Mensaje por defecto (botón general de WhatsApp) */
export function waDefaultMessage(locale: Locale): string {
  return WA_DEFAULT[locale];
}

/** Mensaje contextual para un servicio (y opcionalmente disciplina) */
export function waServiceMessage(
  locale: Locale,
  service: Service,
  discipline?: Discipline,
): string {
  const serviceName = service.i18n[locale].title;
  const disciplineName = discipline ? DISCIPLINE_LABEL[discipline][locale] : undefined;
  return WA_TEMPLATE[locale](serviceName, disciplineName);
}
