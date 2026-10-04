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
  hoteles: { es: "fotografo-de-hoteles", en: "hotel-photographer", ca: "fotograf-dhotels" },
  paisaje: { es: "fotografo-de-paisaje", en: "landscape-photographer", ca: "fotograf-de-paisatge" },
};

/** Frase clave para el <title> de las páginas servicio×ciudad (≤ ~65 car.).
 *  Separada del título visible del servicio ("Hoteles & Restaurantes"…),
 *  que es demasiado largo para un <title> y no es la búsqueda real. */
const TITLE_KEYWORD: Record<ServiceKey, Record<Locale, string>> = {
  bodas: { es: "Fotógrafo de Bodas", en: "Wedding Photographer", ca: "Fotògraf de Casaments" },
  hoteles: { es: "Fotógrafo de Hoteles", en: "Hotel Photographer", ca: "Fotògraf d'Hotels" },
  paisaje: { es: "Fotógrafo de Paisaje", en: "Landscape Photographer", ca: "Fotògraf de Paisatge" },
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

function baseCityServiceCopy(locale: Locale, service: Service, city: City): CityServiceCopy {
  const s = service.i18n[locale].title;
  const n = city.name;
  const r = CITY_REGION[city.slug]?.[locale] ?? city.region;
  const kw = TITLE_KEYWORD[service.key][locale];

  if (locale === "en") {
    return {
      title: `${kw} in ${n} · Photo & Film · Satori Arts`,
      description: `${kw} in ${n}: photography and film by Satori Arts, a duo with an editorial eye. Message us on WhatsApp for availability.`,
      h1: `${s} photography & film in ${n}`,
      intro: `Looking for a ${kw.toLowerCase()} and videographer in ${n}? We're Satori Arts, a duo covering ${n} and all of ${r}.`,
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
      title: `${kw} a ${n} · Foto & Film · Satori Arts`,
      description: `Fotografia i vídeo de ${s.toLowerCase()} a ${n}. Satori Arts, un duo amb mirada editorial. Escriu-nos per WhatsApp per disponibilitat.`,
      h1: `Fotografia i film de ${s.toLowerCase()} a ${n}`,
      intro: `Busques fotògraf i càmera de ${s.toLowerCase()} a ${n}? Som Satori Arts, un duo que cobreix ${n} i tota ${r}.`,
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
    title: `${kw} en ${n} · Foto y Vídeo · Satori Arts`,
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

/* ------------------------------------------------------------------ */
/*  Contenido propio por ciudad (evita páginas "clon" / doorway pages) */
/* ------------------------------------------------------------------ */

/** Etiqueta para enlaces internos: "Fotógrafo de Bodas en Barcelona". */
export function cityServiceLabel(locale: Locale, key: ServiceKey, city: City): string {
  const prep: Record<Locale, string> = { es: "en", en: "in", ca: "a" };
  return `${TITLE_KEYWORD[key][locale]} ${prep[locale]} ${city.name}`;
}

/** Región localizada (city.region en config.ts solo está en español). */
const CITY_REGION: Record<string, Record<Locale, string>> = {
  barcelona: { es: "Cataluña", en: "Catalonia", ca: "Catalunya" },
  madrid: { es: "la Comunidad de Madrid", en: "the Madrid region", ca: "la Comunitat de Madrid" },
};

const AROUND: Record<Locale, (n: string) => string> = {
  es: (n) => `${n} y alrededores`,
  en: (n) => `${n} and around`,
  ca: (n) => `${n} i voltants`,
};

/**
 * Un párrafo DISTINTO por servicio × ciudad × idioma, con contexto real
 * del lugar (zonas, tipo de espacios, luz). Si se añade una ciudad nueva
 * en config.ts sin texto aquí, la página se genera igual, sin esta sección.
 * [Mejor aún] sustituir/ampliar con espacios y proyectos reales.
 */
const CITY_NOTES: Record<ServiceKey, Record<string, Record<Locale, string>>> = {
  bodas: {
    barcelona: {
      es: "Desde nuestra base en el Maresme cubrimos bodas en masías y fincas de toda la provincia de Barcelona, en la Costa Brava, el Empordà, el Garraf o entre viñedos del Penedès. Conocemos la luz del Mediterráneo: suave por la mañana y dorada al atardecer junto al mar, ideal para la sesión de pareja. Si la boda es en la ciudad, también trabajamos en hoteles y espacios del Eixample, el Gòtic o el Born.",
      en: "From our base in the Maresme we cover weddings at country estates (masías) across the province of Barcelona, on the Costa Brava, in the Empordà, the Garraf and among the Penedès vineyards. We know the Mediterranean light: soft in the morning and golden by the sea at sunset, perfect for the couple session. For city weddings we also work in hotels and venues in the Eixample, the Gothic Quarter and El Born.",
      ca: "Des de la nostra base al Maresme cobrim casaments en masies i finques de tota la província de Barcelona, a la Costa Brava, l'Empordà, el Garraf o entre vinyes del Penedès. Coneixem la llum de la Mediterrània: suau al matí i daurada al capvespre vora el mar, ideal per a la sessió de parella. Si el casament és a la ciutat, també treballem en hotels i espais de l'Eixample, el Gòtic o el Born.",
    },
    madrid: {
      es: "En Madrid trabajamos en fincas de la sierra de Guadarrama, palacios y espacios históricos, y en los alrededores de El Escorial, Aranjuez o Chinchón. La luz de Castilla es más seca y contrastada que la del Mediterráneo, y eso cambia cómo planteamos el día: buscamos sombra a mediodía y aprovechamos los atardeceres largos del verano para la sesión de pareja.",
      en: "In Madrid we work at estates in the Sierra de Guadarrama, palaces and historic venues, and around El Escorial, Aranjuez or Chinchón. Castilian light is drier and more contrasted than the Mediterranean's, and that changes how we plan the day: we look for shade at midday and use the long summer sunsets for the couple session.",
      ca: "A Madrid treballem en finques de la serra de Guadarrama, palaus i espais històrics, i als voltants d'El Escorial, Aranjuez o Chinchón. La llum de Castella és més seca i contrastada que la de la Mediterrània, i això canvia com plantegem el dia: busquem ombra al migdia i aprofitem les postes de sol llargues de l'estiu per a la sessió de parella.",
    },
  },
  hoteles: {
    barcelona: {
      es: "Barcelona es una de las ciudades europeas con más hoteles boutique, y en Booking, Google o Instagram la reserva se gana con imagen. Fotografiamos hoteles urbanos en el Eixample, el Gòtic y el Born, hoteles de playa en el Maresme y la Costa Brava, y restaurantes y rooftops que necesitan renovar su contenido para web y redes. Desde el Maresme llegamos rápido a toda la provincia.",
      en: "Barcelona is one of the European cities with the most boutique hotels, and on Booking, Google or Instagram the booking is won with images. We photograph city hotels in the Eixample, the Gothic Quarter and El Born, beach hotels in the Maresme and on the Costa Brava, and restaurants and rooftops that need fresh content for their website and social channels. From the Maresme we reach the whole province quickly.",
      ca: "Barcelona és una de les ciutats europees amb més hotels boutique, i a Booking, Google o Instagram la reserva es guanya amb imatge. Fotografiem hotels urbans a l'Eixample, el Gòtic i el Born, hotels de platja al Maresme i la Costa Brava, i restaurants i terrats que necessiten renovar el contingut per a web i xarxes. Des del Maresme arribem ràpid a tota la província.",
    },
    madrid: {
      es: "Madrid tiene una escena hotelera y gastronómica enorme: hoteles en el Barrio de las Letras, Salamanca o Gran Vía, rooftops y restaurantes que necesitan renovar su imagen con frecuencia. Planificamos la producción por zonas y horarios para no interferir con los huéspedes, y entregamos imágenes listas para la web, las OTAs y las redes sociales.",
      en: "Madrid has a huge hotel and dining scene: hotels in the Barrio de las Letras, Salamanca or Gran Vía, plus rooftops and restaurants that need to refresh their imagery often. We plan the shoot by area and time slot so guests aren't disturbed, and deliver images ready for the website, OTAs and social media.",
      ca: "Madrid té una escena hotelera i gastronòmica enorme: hotels al Barrio de las Letras, Salamanca o la Gran Vía, terrats i restaurants que necessiten renovar la imatge sovint. Planifiquem la producció per zones i horaris per no molestar els hostes, i lliurem imatges a punt per a la web, les OTA i les xarxes socials.",
    },
  },
  paisaje: {
    barcelona: {
      es: "Desde el Maresme tenemos a mano la costa catalana, la montaña de Montserrat, el Montseny y, a pocas horas, los Pirineos. Hacemos encargos de paisaje para hoteles, interioristas y particulares de Barcelona, y nuestra colección de copias de autor reúne paisajes de viajes por todo el mundo: desiertos, auroras, cañones y montañas.",
      en: "From the Maresme we have the Catalan coast, Montserrat, the Montseny and, a few hours away, the Pyrenees close at hand. We take landscape commissions for hotels, interior designers and private clients in Barcelona, and our fine-art print collection gathers landscapes from travels around the world: deserts, auroras, canyons and mountains.",
      ca: "Des del Maresme tenim a tocar la costa catalana, la muntanya de Montserrat, el Montseny i, a poques hores, els Pirineus. Fem encàrrecs de paisatge per a hotels, interioristes i particulars de Barcelona, i la nostra col·lecció de còpies d'autor reuneix paisatges de viatges arreu del món: deserts, aurores, canyons i muntanyes.",
    },
    madrid: {
      es: "Alrededor de Madrid, la sierra de Guadarrama, el Hayedo de Montejo y las llanuras de Castilla ofrecen paisajes muy distintos a los de la costa: horizontes amplios, nieve en invierno y cielos limpios. Organizamos salidas y encargos desde Madrid para coleccionistas, hoteles y estudios de interiorismo.",
      en: "Around Madrid, the Sierra de Guadarrama, the Montejo beech forest and the plains of Castile offer landscapes very different from the coast: wide horizons, snow in winter and clear skies. We organise trips and commissions from Madrid for collectors, hotels and interior design studios.",
      ca: "Al voltant de Madrid, la serra de Guadarrama, la fageda de Montejo i les planes de Castella ofereixen paisatges molt diferents dels de la costa: horitzons amplis, neu a l'hivern i cels nets. Organitzem sortides i encàrrecs des de Madrid per a col·leccionistes, hotels i estudis d'interiorisme.",
    },
  },
};

export function cityServiceCopy(locale: Locale, service: Service, city: City): CityServiceCopy {
  const base = baseCityServiceCopy(locale, service, city);
  const note = CITY_NOTES[service.key]?.[city.slug]?.[locale];
  if (!note) return base;
  return {
    ...base,
    bodyHtml: base.bodyHtml + `\n        <h2>${AROUND[locale](city.name)}</h2>\n        <p>${note}</p>\n`,
  };
}
