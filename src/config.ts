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

/** Nombre completo del idioma, en su propio idioma (menú desplegable) */
export const LOCALE_NAME: Record<Locale, string> = {
  es: "Español",
  en: "English",
  ca: "Català",
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
/*  Modo "Próximamente" (coming soon)                          */
/* ---------------------------------------------------------- */

/**
 * `true`  → TODAS las rutas muestran una pantalla negra "Próximamente"
 *           con el logo girando (en desarrollo Y en producción).
 * `false` → se muestra el sitio completo.
 *
 * Para trabajar en el sitio real: ponlo en `false` (lo verás en
 * `npm run dev`). Para LANZAR: `false` + `npm run build` + desplegar.
 */
export const COMING_SOON = false;

/* ---------------------------------------------------------- */
/*  Datos del negocio                                          */
/* ---------------------------------------------------------- */

export const SITE = {
  /** Nombre de la marca */
  brand: "Satori Arts",

  /** Los dos autores del estudio (dúo) */
  team: [
    { name: "Manuel", role: "Fotografía", instagram: "manu_fotografia" },
    { name: "Stephanie", role: "Vídeo", instagram: "tefireyese" },
  ],

  /**
   * WhatsApp en formato internacional, SIN "+" ni
   * espacios. España 6XX XX XX XX → "346XXXXXXXX".
   */
  whatsappNumber: "34675938839",

  /** Cómo se muestra el teléfono en pantalla */
  phoneDisplay: "+34 675 93 88 39",

  /** Email de contacto (footer y legales) */
  email: "satorivisualarts@gmail.com",

  /** Instagram (canal principal actual) */
  instagram: "satoriarts_",
  get instagramUrl() {
    return `https://www.instagram.com/${this.instagram}/`;
  },

  /**
   * Usuario de la página de Facebook. VACÍO = el enlace no se muestra
   * (menú y footer). OJO: facebook.com/satoriarts NO es nuestro, es otro
   * negocio ("Satori Arts | Eureka Springs AR", EE. UU.). Rellenar solo
   * con la página real del estudio.
   */
  facebook: "" as string,
  get facebookUrl() {
    return `https://www.facebook.com/${this.facebook}/`;
  },

  youtube: "@satoriarts",
  get youtubeUrl() {
    return `https://www.youtube.com/${this.youtube}`;
  },

  /**
   * URL definitiva, SIN barra final.
   * Debe coincidir con `site` en astro.config.mjs.
   */
  url: "https://satoriarts.es",

  /** Nota media y nº de reseñas de la ficha de Google Business (5,0 · 6 reseñas). */
  googleRating: 5.0,
  googleReviewCount: 6,
  /**
   * Nombre de la ficha de Google Business ("Satori Arts - Fotografia y video"). Sin Place ID confirmado, se enlaza a una
   * búsqueda de Google Maps por nombre: abre directamente la ficha con sus
   * reseñas. Sustituir por el enlace corto (g.page/r/.../review) cuando se
   * confirme el Place ID exacto, para ir directo al formulario de reseña.
   */
  googleBusinessName: "Satori Arts - Fotografia y video",
  get googleReviewsUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.googleBusinessName)}`;
  },
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

/** Logos de clientes de la sección "Algunos de nuestros clientes" de la home.
 *  Logos recortados y optimizados
 *  (WebP, sin margen transparente) en public/clients/.
 *  Para añadir uno: copia el archivo ahí y añade una entrada. Todos se
 *  muestran en una caja del mismo tamaño y centrados. */
export interface Client {
  name: string;
  /** Ruta pública del logo (blanco, transparente, recortado al contenido). */
  logo: string;
  /** Factor de altura para igualar el peso visual (los logos finos necesitan
   *  más altura que los densos). 1 = altura base de la sección. */
  scale: number;
}
export const CLIENTS: Client[] = [
  { name: "Hilton Barcelona", logo: "/clients/hotel-hilton.webp", scale: 1 },
  { name: "Kimpton Vividora Barcelona", logo: "/clients/kimpton-vividora.webp", scale: 1.2 },
  { name: "Gran Hotel Central", logo: "/clients/gran-hotel-central.webp", scale: 1.45 },
  { name: "Museu Egipci de Barcelona", logo: "/clients/museu-egipci-png.webp", scale: 1.05 },
  { name: "Mas de Torrent", logo: "/clients/mas-de-torrent.webp", scale: 1.5 },
  { name: "Torre del Remei", logo: "/clients/torre-del-remei.webp", scale: 1.5 },
  { name: "The Lodge Mallorca", logo: "/clients/the-lodge.webp", scale: 1.17 },
  { name: "St-Germain", logo: "/clients/st-germain.webp", scale: 0.78 },
  { name: "Serras Barcelona", logo: "/clients/serras-barcelona.webp", scale: 0.96 },
  { name: "IC Moda", logo: "/clients/icmoda.webp", scale: 0.85 },
  { name: "Soldatal", logo: "/clients/soldatal.svg", scale: 0.62 },
  { name: "The Society of Art", logo: "/clients/society-of-art.svg", scale: 1.37 },
  { name: "Barcelona Open Banc Sabadell", logo: "/clients/open-banc-sabadell.webp", scale: 1.03 },
  { name: "Reial Acadèmia de Medicina de Catalunya", logo: "/clients/academia-medicina-catalunya.webp", scale: 1.5 },
];

/* ---------------------------------------------------------- */
/*  Servicios (verticales)                                     */
/* ---------------------------------------------------------- */

export type ServiceKey = "bodas" | "hoteles" | "paisaje";

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
          "El momento en que algo cambia para siempre. Sin poses, sin impostura.",
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
    key: "hoteles",
    disciplines: ["photo", "film"],
    i18n: {
      es: {
        slug: "hoteles",
        title: "Hoteles & Restaurantes",
        menuLabel: "Hoteles & Restaurantes",
        short:
          "El instante en que un espacio invita a quedarse. Pensado para la reserva directa.",
      },
      en: {
        slug: "hotels",
        title: "Hotels & Restaurants",
        menuLabel: "Hotels & Restaurants",
        short:
          "Images that sell: rooms, dining, spa and lifestyle for hotels, resorts and rentals.",
      },
      ca: {
        slug: "hotels",
        title: "Hotels & Restaurants",
        menuLabel: "Hotels & Restaurants",
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
          "El instante en que un lugar no necesita nada más. Fine-art en copias de autor, numeradas.",
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
