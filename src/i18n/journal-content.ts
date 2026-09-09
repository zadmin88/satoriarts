/**
 * Artículos del Journal. Mismo patrón que services-content.ts: los
 * textos van en TypeScript, no en una content collection aparte.
 * "groupId" enlaza las 3 versiones de idioma de un mismo artículo
 * (para el selector de idioma y el hreflang de la página).
 *
 * El cuerpo de cada artículo es una lista de "bloques" en el orden en
 * que deben aparecer — así el texto y las fotos se intercalan de
 * verdad (formato editorial visual, como makemepulse.com/news), en vez
 * de todo el texto seguido y la galería al final.
 *
 * Las fotos son las mismas que usa el resto del sitio (servicePhotos),
 * referenciadas por servicio + índice — el journal no necesita su
 * propia carpeta de imágenes todavía. Máximo recomendado: 6 fotos por
 * artículo (contando la de cabecera), para mantener el formato ligero.
 */
import type { Locale, ServiceKey } from "@/config";

export interface JournalPhotoRef {
  service: ServiceKey;
  index: number;
}

export type JournalBlock =
  | { type: "text"; html: string }
  | { type: "quote"; text: string }
  /** 1 foto = a todo el ancho del contenido; 2 fotos = en pareja, lado a lado */
  | { type: "image"; refs: JournalPhotoRef[] };

export interface JournalPost {
  /** Enlaza las 3 versiones de idioma del mismo artículo entre sí */
  groupId: string;
  slug: string;
  title: string;
  category: string;
  /** Fecha ya formateada para mostrar */
  date: string;
  /** Para ordenar los artículos (más reciente primero) */
  sortDate: string;
  readingMinutes: number;
  excerpt: string;
  /** Imagen de cabecera, a todo el ancho de la pantalla, sin recortar */
  cover: JournalPhotoRef;
  blocks: JournalBlock[];
}

export const JOURNAL_POSTS: Record<Locale, JournalPost[]> = {
  es: [
    {
      groupId: "boda-emporda",
      slug: "boda-en-el-emporda",
      title: "Boda en el Empordà",
      category: "Bodas",
      date: "12 sept 2026",
      sortDate: "2026-09-12",
      readingMinutes: 4,
      excerpt: "Una boda de dos días en una masía del Empordà: luz de finales de verano, una ceremonia al aire libre y una fiesta que no quiso terminar.",
      cover: { service: "bodas", index: 1 },
      blocks: [
        { type: "text", html: "<p>Llegamos la tarde anterior para dejarlo todo listo y aprovechar la última luz del día sobre la finca. El Empordà en septiembre regala ese tono cálido y bajo que buscamos siempre para las ceremonias al aire libre.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 3 }] },
        { type: "text", html: "<p>La pareja quiso una preparación tranquila, casi en silencio, con la familia cerca pero sin prisa. Ese es el tipo de arranque que nos permite documentar de verdad, sin dirigir nada.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 2 }, { service: "bodas", index: 4 }] },
        { type: "quote", text: "No hubo un solo momento posado: cada foto es algo que de verdad pasó." },
        { type: "text", html: "<p>Bajo los cipreses, con el mar como telón de fondo lejano, la ceremonia duró apenas veinte minutos — y fueron los que más se repitieron en la edición.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 5 }] },
        { type: "text", html: "<p>Pasada la medianoche, con la banda tocando en el patio, entendimos por qué esta pareja eligió una finca con alojamiento: nadie tenía prisa por irse.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 7 }] },
      ],
    },
    {
      groupId: "evento-corporativo-bcn",
      slug: "un-evento-corporativo-en-barcelona",
      title: "Un evento corporativo en Barcelona",
      category: "Eventos",
      date: "3 ago 2026",
      sortDate: "2026-08-03",
      readingMinutes: 3,
      excerpt: "Contenido temporal — pendiente de sustituir por el reportaje definitivo. Una jornada de marca con más de doscientos invitados, documentada de principio a fin.",
      cover: { service: "eventos", index: 0 },
      blocks: [
        { type: "text", html: "<p>[Contenido temporal] Llegamos antes de la apertura de puertas para cubrir el montaje: el detalle de marca importa tanto como el momento en directo.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 1 }] },
        { type: "text", html: "<p>[Contenido temporal] Con varios escenarios activos a la vez, el reto es estar en el lugar correcto en el momento correcto sin interrumpir nunca la experiencia de los asistentes.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 2 }, { service: "eventos", index: 3 }] },
        { type: "quote", text: "[Contenido temporal] El objetivo: que la marca se reconozca en cada fotografía, sin que la cámara se note nunca." },
        { type: "text", html: "<p>[Contenido temporal] Este artículo se sustituirá por el reportaje real en cuanto el cliente entregue el contenido definitivo.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 4 }] },
      ],
    },
    {
      groupId: "hotel-boutique-madrid",
      slug: "un-hotel-boutique-en-madrid",
      title: "Un hotel boutique en Madrid",
      category: "Hoteles",
      date: "18 jul 2026",
      sortDate: "2026-07-18",
      readingMinutes: 3,
      excerpt: "Contenido temporal — pendiente de sustituir por el reportaje definitivo. Luz natural, interiorismo cuidado y un recorrido pensado para vender la experiencia, no solo las habitaciones.",
      cover: { service: "hoteles", index: 0 },
      blocks: [
        { type: "text", html: "<p>[Contenido temporal] El encargo: un banco de imágenes que sirva tanto para la web del hotel como para sus redes, con la misma luz y el mismo criterio en cada espacio.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 1 }] },
        { type: "text", html: "<p>[Contenido temporal] Recorrimos el hotel en las horas de mejor luz natural, priorizando los espacios que mejor cuentan la experiencia de alojarse allí.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 2 }, { service: "hoteles", index: 3 }] },
        { type: "quote", text: "[Contenido temporal] No vendemos habitaciones: vendemos la sensación de quedarse." },
        { type: "text", html: "<p>[Contenido temporal] Este artículo se sustituirá por el reportaje real en cuanto el cliente entregue el contenido definitivo.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 4 }] },
      ],
    },
  ],
  en: [
    {
      groupId: "boda-emporda",
      slug: "a-wedding-in-the-emporda",
      title: "A Wedding in the Empordà",
      category: "Weddings",
      date: "12 Sep 2026",
      sortDate: "2026-09-12",
      readingMinutes: 4,
      excerpt: "A two-day wedding at a country estate in the Empordà: late-summer light, an open-air ceremony and a party that refused to end.",
      cover: { service: "bodas", index: 1 },
      blocks: [
        { type: "text", html: "<p>We arrived the evening before to get everything ready and catch the last light over the property. The Empordà in September gives you that warm, low tone we always look for in outdoor ceremonies.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 3 }] },
        { type: "text", html: "<p>The couple wanted a quiet, almost silent getting-ready, family close but unhurried. That kind of start is what lets us document for real, without directing anything.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 2 }, { service: "bodas", index: 4 }] },
        { type: "quote", text: "Not a single posed moment — every photo is something that really happened." },
        { type: "text", html: "<p>Under the cypress trees, with the sea as a distant backdrop, the ceremony lasted barely twenty minutes — and they were the ones we came back to most during editing.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 5 }] },
        { type: "text", html: "<p>Past midnight, with the band playing in the courtyard, we understood why this couple chose an estate with rooms: nobody was in a hurry to leave.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 7 }] },
      ],
    },
    {
      groupId: "evento-corporativo-bcn",
      slug: "a-corporate-event-in-barcelona",
      title: "A corporate event in Barcelona",
      category: "Events",
      date: "3 Aug 2026",
      sortDate: "2026-08-03",
      readingMinutes: 3,
      excerpt: "Placeholder content — to be replaced with the final story. A brand day with over two hundred guests, documented start to finish.",
      cover: { service: "eventos", index: 0 },
      blocks: [
        { type: "text", html: "<p>[Placeholder content] We arrived before doors opened to cover the setup: brand detail matters as much as the live moment.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 1 }] },
        { type: "text", html: "<p>[Placeholder content] With several stages running at once, the challenge is being in the right place at the right time without ever interrupting the guest experience.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 2 }, { service: "eventos", index: 3 }] },
        { type: "quote", text: "[Placeholder content] The goal: the brand shows in every photo, the camera never does." },
        { type: "text", html: "<p>[Placeholder content] This article will be replaced with the real story once the client delivers the final content.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 4 }] },
      ],
    },
    {
      groupId: "hotel-boutique-madrid",
      slug: "a-boutique-hotel-in-madrid",
      title: "A boutique hotel in Madrid",
      category: "Hotels",
      date: "18 Jul 2026",
      sortDate: "2026-07-18",
      readingMinutes: 3,
      excerpt: "Placeholder content — to be replaced with the final story. Natural light, careful interiors and a walkthrough built to sell the experience, not just the rooms.",
      cover: { service: "hoteles", index: 0 },
      blocks: [
        { type: "text", html: "<p>[Placeholder content] The brief: an image bank that works for both the hotel's website and its social channels, with the same light and criteria across every space.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 1 }] },
        { type: "text", html: "<p>[Placeholder content] We walked the hotel during the best natural light hours, prioritising the spaces that best tell the story of staying there.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 2 }, { service: "hoteles", index: 3 }] },
        { type: "quote", text: "[Placeholder content] We don't sell rooms: we sell the feeling of staying." },
        { type: "text", html: "<p>[Placeholder content] This article will be replaced with the real story once the client delivers the final content.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 4 }] },
      ],
    },
  ],
  ca: [
    {
      groupId: "boda-emporda",
      slug: "un-casament-a-lemporda",
      title: "Un casament a l'Empordà",
      category: "Casaments",
      date: "12 set 2026",
      sortDate: "2026-09-12",
      readingMinutes: 4,
      excerpt: "Un casament de dos dies en una masia de l'Empordà: llum de final d'estiu, una cerimònia a l'aire lliure i una festa que no va voler acabar.",
      cover: { service: "bodas", index: 1 },
      blocks: [
        { type: "text", html: "<p>Vam arribar la tarda abans per deixar-ho tot a punt i aprofitar l'última llum del dia sobre la finca. L'Empordà al setembre regala aquest to càlid i baix que sempre busquem per a les cerimònies a l'aire lliure.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 3 }] },
        { type: "text", html: "<p>La parella va voler una preparació tranquil·la, gairebé en silenci, amb la família a prop però sense pressa. Aquest és el tipus d'inici que ens permet documentar de debò, sense dirigir res.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 2 }, { service: "bodas", index: 4 }] },
        { type: "quote", text: "No hi va haver cap moment posat: cada foto és alguna cosa que de debò va passar." },
        { type: "text", html: "<p>Sota els xiprers, amb el mar com a teló de fons llunyà, la cerimònia va durar just vint minuts — i van ser els que més es van repetir durant l'edició.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 5 }] },
        { type: "text", html: "<p>Passada la mitjanit, amb el grup tocant al pati, vam entendre per què aquesta parella va triar una finca amb allotjament: ningú tenia pressa per marxar.</p>" },
        { type: "image", refs: [{ service: "bodas", index: 7 }] },
      ],
    },
    {
      groupId: "evento-corporativo-bcn",
      slug: "un-esdeveniment-corporatiu-a-barcelona",
      title: "Un esdeveniment corporatiu a Barcelona",
      category: "Esdeveniments",
      date: "3 ago 2026",
      sortDate: "2026-08-03",
      readingMinutes: 3,
      excerpt: "Contingut temporal — pendent de substituir pel reportatge definitiu. Una jornada de marca amb més de dos-cents convidats, documentada de principi a fi.",
      cover: { service: "eventos", index: 0 },
      blocks: [
        { type: "text", html: "<p>[Contingut temporal] Vam arribar abans de l'obertura de portes per cobrir el muntatge: el detall de marca importa tant com el moment en directe.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 1 }] },
        { type: "text", html: "<p>[Contingut temporal] Amb diversos escenaris actius alhora, el repte és ser al lloc correcte en el moment correcte sense interrompre mai l'experiència dels assistents.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 2 }, { service: "eventos", index: 3 }] },
        { type: "quote", text: "[Contingut temporal] L'objectiu: que la marca es reconegui en cada fotografia, sense que la càmera es noti mai." },
        { type: "text", html: "<p>[Contingut temporal] Aquest article se substituirà pel reportatge real quan el client lliuri el contingut definitiu.</p>" },
        { type: "image", refs: [{ service: "eventos", index: 4 }] },
      ],
    },
    {
      groupId: "hotel-boutique-madrid",
      slug: "un-hotel-boutique-a-madrid",
      title: "Un hotel boutique a Madrid",
      category: "Hotels",
      date: "18 jul 2026",
      sortDate: "2026-07-18",
      readingMinutes: 3,
      excerpt: "Contingut temporal — pendent de substituir pel reportatge definitiu. Llum natural, interiorisme curat i un recorregut pensat per vendre l'experiència, no només les habitacions.",
      cover: { service: "hoteles", index: 0 },
      blocks: [
        { type: "text", html: "<p>[Contingut temporal] L'encàrrec: un banc d'imatges que serveixi tant per a la web de l'hotel com per a les seves xarxes, amb la mateixa llum i el mateix criteri a cada espai.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 1 }] },
        { type: "text", html: "<p>[Contingut temporal] Vam recórrer l'hotel a les hores de millor llum natural, prioritzant els espais que millor expliquen l'experiència d'allotjar-s'hi.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 2 }, { service: "hoteles", index: 3 }] },
        { type: "quote", text: "[Contingut temporal] No venem habitacions: venem la sensació de quedar-s'hi." },
        { type: "text", html: "<p>[Contingut temporal] Aquest article se substituirà pel reportatge real quan el client lliuri el contingut definitiu.</p>" },
        { type: "image", refs: [{ service: "hoteles", index: 4 }] },
      ],
    },
  ],
};

export function getJournalPost(locale: Locale, slug: string): JournalPost | undefined {
  return JOURNAL_POSTS[locale].find((p) => p.slug === slug);
}

export function relatedJournalPosts(locale: Locale, groupId: string, limit = 3): JournalPost[] {
  return JOURNAL_POSTS[locale].filter((p) => p.groupId !== groupId).slice(0, limit);
}
