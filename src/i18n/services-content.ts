/**
 * Contenido largo de cada página de servicio, por idioma.
 * (SEO). El cuerpo va en HTML sencillo; los estilos los pone
 * `.prose-body` en global.css. Edita aquí los textos.
 */
import type { Locale, ServiceKey } from "@/config";
import type { FaqItem } from "@/components/Faq.astro";

export interface ServiceContent {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  heroIntro: string;
  /** Titular y botón del cierre (si faltan, los genéricos de ui.ts) */
  ctaTitle?: string;
  ctaLabel?: string;
  bodyHtml: string;
  faqs: FaqItem[];
  gallery: { label?: string; ratio?: "portrait" | "landscape" | "square"; tone?: 1 | 2 | 3 | 4 }[];
}

const g = (
  ...items: [string, "portrait" | "landscape" | "square", 1 | 2 | 3 | 4][]
) => items.map(([label, ratio, tone]) => ({ label, ratio, tone }));

export const SERVICE_CONTENT: Record<ServiceKey, Record<Locale, ServiceContent>> = {
  /* ============================ BODAS ============================ */
  bodas: {
    es: {
      seoTitle: "Fotógrafo y Vídeo de Bodas en Barcelona y Madrid · Satori Arts",
      seoDescription:
        "Fotografía y vídeo de boda con un solo equipo, más de diez años de experiencia. Tú vives el día, nosotros nos aseguramos de que no se pierda nada.",
      h1: "Fotos y vídeo de boda que vas a querer volver a ver",
      heroIntro:
        "Fotografía y vídeo de bodas en Barcelona, Madrid o destino. Un solo equipo, más de diez años de experiencia. Tú vives el día. Nosotros nos aseguramos de que no se pierda nada.",
      ctaTitle: "Las fechas se llenan rápido. Consulta si la tuya está libre.",
      ctaLabel: "Consultar disponibilidad",
      bodyHtml: `
        <h2>Por qué elegir Satori Arts</h2>
        <p>Contratar foto y vídeo con el mismo equipo lo hace todo más fácil: un solo proveedor, sin planos repetidos ni prisas de última hora. Trabajamos con discreción, casi sin que notes que estamos. Cada boda la editamos nosotros mismos, con todo el cuidado que merece.</p>
      `,
      faqs: [
        { q: "¿Qué incluye la fotografía y el vídeo de boda?", a: "Preparativos, ceremonia, sesión de pareja y fiesta. Recibes una galería privada online, un avance para compartir y el vídeo completo." },
        { q: "¿Se puede contratar solo foto o solo vídeo?", a: "Sí. Puedes elegir solo fotografía, solo vídeo o los dos." },
        { q: "¿Satori Arts trabaja fuera de Barcelona y Madrid?", a: "Sí, en toda España y en el extranjero." },
      ],
      gallery: g(
        ["Ceremonia", "portrait", 1], ["Detalles", "square", 4], ["Pareja", "landscape", 2],
        ["Fiesta", "portrait", 3], ["Emoción", "landscape", 1], ["Destino", "portrait", 2],
      ),
    },
    en: {
      seoTitle: "Wedding Photographer & Film in Barcelona & Madrid · Satori Arts",
      seoDescription:
        "Wedding photography and video with a single team and more than ten years of experience. You live the day, we make sure nothing is missed.",
      h1: "Wedding photos and video you will want to watch again",
      heroIntro:
        "Wedding photography and video in Barcelona, Madrid or destination. One team, more than ten years of experience. You live the day. We make sure nothing is missed.",
      ctaTitle: "Dates fill up fast. Check if yours is free.",
      ctaLabel: "Check availability",
      bodyHtml: `
        <h2>Why choose Satori Arts</h2>
        <p>Hiring photo and video from the same team makes everything easier: one supplier, no repeated shots, no last-minute rush. We work with discretion, almost without you noticing we are there. We edit every wedding ourselves, with all the care it deserves.</p>
      `,
      faqs: [
        { q: "What do wedding photography and video include?", a: "Preparations, ceremony, couple session and party. You receive a private online gallery, a preview to share and the full film." },
        { q: "Can I hire only photo or only video?", a: "Yes. You can choose photography only, video only, or both." },
        { q: "Does Satori Arts work outside Barcelona and Madrid?", a: "Yes, across Spain and abroad." },
      ],
      gallery: g(
        ["Ceremony", "portrait", 1], ["Details", "square", 4], ["Couple", "landscape", 2],
        ["Party", "portrait", 3], ["Emotion", "landscape", 1], ["Destination", "portrait", 2],
      ),
    },
    ca: {
      seoTitle: "Fotògraf i Vídeo de Casaments a Barcelona i Madrid · Satori Arts",
      seoDescription:
        "Fotografia i vídeo de casament amb un sol equip i més de deu anys d'experiència. Tu vius el dia, nosaltres ens assegurem que no es perdi res.",
      h1: "Fotos i vídeo de casament que voldràs tornar a veure",
      heroIntro:
        "Fotografia i vídeo de casaments a Barcelona, Madrid o destinació. Un sol equip, més de deu anys d'experiència. Tu vius el dia. Nosaltres ens assegurem que no es perdi res.",
      ctaTitle: "Les dates s'omplen ràpid. Consulta si la teva és lliure.",
      ctaLabel: "Consultar disponibilitat",
      bodyHtml: `
        <h2>Per què triar Satori Arts</h2>
        <p>Contractar foto i vídeo amb el mateix equip ho fa tot més fàcil: un sol proveïdor, sense plans repetits ni presses d'última hora. Treballem amb discreció, gairebé sense que notis que hi som. Cada casament l'editem nosaltres mateixos, amb tota la cura que es mereix.</p>
      `,
      faqs: [
        { q: "Què inclou la fotografia i el vídeo de casament?", a: "Preparatius, cerimònia, sessió de parella i festa. Reps una galeria privada en línia, un avanç per compartir i el vídeo complet." },
        { q: "Es pot contractar només foto o només vídeo?", a: "Sí. Pots triar només fotografia, només vídeo o tots dos." },
        { q: "Satori Arts treballa fora de Barcelona i Madrid?", a: "Sí, a tot Espanya i a l'estranger." },
      ],
      gallery: g(
        ["Cerimònia", "portrait", 1], ["Detalls", "square", 4], ["Parella", "landscape", 2],
        ["Festa", "portrait", 3], ["Emoció", "landscape", 1], ["Destí", "portrait", 2],
      ),
    },
  },

  /* ============================ HOTELES ============================ */
  hoteles: {
    es: {
      seoTitle: "Fotografía de Hoteles y Restaurantes en Barcelona · Satori Arts",
      seoDescription:
        "Fotografía y vídeo para hoteles y restaurantes en Barcelona y Madrid. Contenido para vender más en tu web, en las OTAs o en redes, en una sola producción.",
      h1: "Fotos y vídeo que hacen que elijan tu hotel",
      heroIntro:
        "Fotografía y vídeo para hoteles y restaurantes en Barcelona, Madrid o cualquier lugar de España. Hilton Barcelona, Kimpton Vividora, Mas de Torrent o Torre del Remei ya confían en nosotros.",
      ctaTitle: "Cuéntanos qué necesitas y te preparamos una propuesta.",
      ctaLabel: "Pedir presupuesto",
      bodyHtml: `
        <h2>Por qué elegir Satori Arts para tu hotel o restaurante</h2>
        <p>Resolvemos todo en una sola producción: habitaciones, gastronomía, spa, exteriores con dron, lifestyle con modelos, vídeo para redes. Lo organizamos contigo para no molestar a los huéspedes. Al terminar, recibes cada formato listo para publicar. Un solo proveedor, un mismo estilo, nada que coordinar por tu parte.</p>
      `,
      faqs: [
        { q: "¿Qué incluye una sesión de fotografía de hotel?", a: "Habitaciones, restaurante, spa, zonas comunes. También arquitectura, exteriores con tomas aéreas de dron, lifestyle con modelos, vídeo para la web, vídeos verticales para redes." },
        { q: "¿Incluye fotografía gastronómica para restaurantes?", a: "Sí. Platos, sala, barra, equipo de cocina. Para la web, las redes o la carta." },
        { q: "¿Hay que cerrar el hotel durante la sesión?", a: "No. Lo planificamos contigo según la ocupación y el horario." },
        { q: "¿El dron cumple la normativa?", a: "Sí. Volamos con certificación AESA." },
        { q: "¿Satori Arts trabaja con cadenas y grupos hoteleros?", a: "Sí. Podemos producir varias propiedades con el mismo estilo visual." },
        { q: "¿Cómo se presupuesta?", a: "Hacemos un presupuesto para cada proyecto, según los espacios, los días de producción, los formatos que necesites." },
      ],
      gallery: g(
        ["Suite", "landscape", 1], ["Gastronomía", "square", 4], ["Spa", "portrait", 3],
        ["Exterior", "landscape", 2], ["Lifestyle", "portrait", 1], ["Detalle", "square", 4],
      ),
    },
    en: {
      seoTitle: "Hotel & Restaurant Photographer in Barcelona · Satori Arts",
      seoDescription:
        "Photography and video for hotels and restaurants in Barcelona and Madrid. Content that sells more on your website, OTAs or social media, in one production.",
      h1: "Photos and video that make guests choose your hotel",
      heroIntro:
        "Photography and video for hotels and restaurants in Barcelona, Madrid or anywhere in Spain. Hilton Barcelona, Kimpton Vividora, Mas de Torrent and Torre del Remei already trust us.",
      ctaTitle: "Tell us what you need and we will prepare a proposal.",
      ctaLabel: "Request a quote",
      bodyHtml: `
        <h2>Why choose Satori Arts for your hotel or restaurant</h2>
        <p>We handle everything in a single production: rooms, dining, spa, aerial drone exteriors, lifestyle with models, video for social media. We plan it with you so guests are not disturbed. When we finish, you receive every format ready to publish. One supplier, one style, nothing for you to coordinate.</p>
      `,
      faqs: [
        { q: "What does a hotel photo shoot include?", a: "Rooms, restaurant, spa and common areas. Also architecture, exteriors with aerial drone shots, lifestyle with models, video for the web and vertical videos for social media." },
        { q: "Do you shoot food photography for restaurants?", a: "Yes. Dishes, dining room, bar and kitchen team, for the website, social media or the menu." },
        { q: "Does the hotel have to close during the shoot?", a: "No. We plan it with you around occupancy and schedule." },
        { q: "Is the drone use compliant with regulations?", a: "Yes. We fly with AESA certification." },
        { q: "Does Satori Arts work with hotel chains and groups?", a: "Yes. We can produce several properties with the same visual style." },
        { q: "How is it quoted?", a: "We prepare a quote for each project, based on the spaces, the production days and the formats you need." },
      ],
      gallery: g(
        ["Suite", "landscape", 1], ["Food", "square", 4], ["Spa", "portrait", 3],
        ["Exterior", "landscape", 2], ["Lifestyle", "portrait", 1], ["Detail", "square", 4],
      ),
    },
    ca: {
      seoTitle: "Fotògraf d'Hotels i Restaurants a Barcelona · Satori Arts",
      seoDescription:
        "Fotografia i vídeo per a hotels i restaurants a Barcelona i Madrid. Contingut per vendre més al teu web, a les OTA o a les xarxes, en una sola producció.",
      h1: "Fotos i vídeo que fan que triïn el teu hotel",
      heroIntro:
        "Fotografia i vídeo per a hotels i restaurants a Barcelona, Madrid o qualsevol lloc d'Espanya. Hilton Barcelona, Kimpton Vividora, Mas de Torrent o Torre del Remei ja confien en nosaltres.",
      ctaTitle: "Explica'ns què necessites i et preparem una proposta.",
      ctaLabel: "Demanar pressupost",
      bodyHtml: `
        <h2>Per què triar Satori Arts per al teu hotel o restaurant</h2>
        <p>Ho resolem tot en una sola producció: habitacions, gastronomia, spa, exteriors amb dron, lifestyle amb models, vídeo per a xarxes. Ho organitzem amb tu per no molestar els hostes. En acabar, rebs cada format a punt per publicar. Un sol proveïdor, un mateix estil, res a coordinar per part teva.</p>
      `,
      faqs: [
        { q: "Què inclou una sessió de fotografia d'hotel?", a: "Habitacions, restaurant, spa i zones comunes. També arquitectura, exteriors amb preses aèries de dron, lifestyle amb models, vídeo per al web i vídeos verticals per a xarxes." },
        { q: "Inclou fotografia gastronòmica per a restaurants?", a: "Sí. Plats, sala, barra i equip de cuina, per al web, les xarxes o la carta." },
        { q: "Cal tancar l'hotel durant la sessió?", a: "No. Ho planifiquem amb tu segons l'ocupació i l'horari." },
        { q: "El dron compleix la normativa?", a: "Sí. Volem amb certificació AESA." },
        { q: "Satori Arts treballa amb cadenes i grups hotelers?", a: "Sí. Podem produir diverses propietats amb el mateix estil visual." },
        { q: "Com es pressuposta?", a: "Fem un pressupost per a cada projecte, segons els espais, els dies de producció i els formats que necessitis." },
      ],
      gallery: g(
        ["Suite", "landscape", 1], ["Gastronomia", "square", 4], ["Spa", "portrait", 3],
        ["Exterior", "landscape", 2], ["Lifestyle", "portrait", 1], ["Detall", "square", 4],
      ),
    },
  },

  /* ============================ PAISAJE ============================ */
  paisaje: {
    es: {
      seoTitle: "Fotografía de Paisaje y Naturaleza · Satori Arts",
      seoDescription:
        "Fotografía y vídeo de paisaje, nuestro trabajo más personal. También por encargo, desde tierra o con dron, para hoteles, fincas o destinos.",
      h1: "El paisaje, nuestro trabajo más personal",
      heroIntro:
        "Fotografía y vídeo de paisaje: es lo que hacemos cuando viajamos por nuestra cuenta, sin encargo ni prisa. Por eso también lo ofrecemos, con el mismo cuidado, a hoteles, fincas o destinos que quieren mostrar su entorno.",
      ctaTitle: "¿Quieres mostrar tu entorno?",
      ctaLabel: "Escríbenos",
      bodyHtml: `
        <h2>Por qué elegir Satori Arts para tu entorno</h2>
        <p>Sabemos esperar la hora adecuada, volver si hace falta, buscar el ángulo que nadie ha fotografiado. Desde tierra o con dron, mostramos las montañas, la costa, los viñedos que rodean tu hotel o tu finca, porque también forman parte de lo que vendes.</p>
      `,
      faqs: [
        { q: "¿Satori Arts hace encargos de fotografía de paisaje?", a: "Sí. Nos cuentas qué lugar quieres mostrar y organizamos la producción." },
        { q: "¿El dron cumple la normativa?", a: "Sí. Volamos con certificación AESA." },
      ],
      gallery: g(
        ["Montaña", "landscape", 3], ["Costa", "portrait", 2], ["Bruma", "square", 1],
        ["Luz", "landscape", 4], ["Horizonte", "portrait", 3], ["Detalle", "square", 2],
      ),
    },
    en: {
      seoTitle: "Landscape & Nature Photography · Satori Arts",
      seoDescription:
        "Landscape photography and video, our most personal work. Also on commission, from the ground or with a drone, for hotels, estates and destinations.",
      h1: "Landscape, our most personal work",
      heroIntro:
        "Landscape photography and video: it is what we do when we travel on our own, with no commission and no rush. That is why we also offer it, with the same care, to hotels, estates and destinations that want to show their surroundings.",
      ctaTitle: "Want to show your surroundings?",
      ctaLabel: "Write to us",
      bodyHtml: `
        <h2>Why choose Satori Arts for your surroundings</h2>
        <p>We know how to wait for the right hour, to go back if we have to, to look for the angle nobody has photographed. From the ground or with a drone, we show the mountains, the coast and the vineyards around your hotel or estate, because they are also part of what you sell.</p>
      `,
      faqs: [
        { q: "Does Satori Arts take landscape photography commissions?", a: "Yes. You tell us which place you want to show and we organise the production." },
        { q: "Is the drone use compliant with regulations?", a: "Yes. We fly with AESA certification." },
      ],
      gallery: g(
        ["Mountain", "landscape", 3], ["Coast", "portrait", 2], ["Mist", "square", 1],
        ["Light", "landscape", 4], ["Horizon", "portrait", 3], ["Detail", "square", 2],
      ),
    },
    ca: {
      seoTitle: "Fotografia de Paisatge i Natura · Satori Arts",
      seoDescription:
        "Fotografia i vídeo de paisatge, el nostre treball més personal. També per encàrrec, des de terra o amb dron, per a hotels, finques o destinacions.",
      h1: "El paisatge, el nostre treball més personal",
      heroIntro:
        "Fotografia i vídeo de paisatge: és el que fem quan viatgem pel nostre compte, sense encàrrec ni pressa. Per això també ho oferim, amb la mateixa cura, a hotels, finques o destinacions que volen mostrar el seu entorn.",
      ctaTitle: "Vols mostrar el teu entorn?",
      ctaLabel: "Escriu-nos",
      bodyHtml: `
        <h2>Per què triar Satori Arts per al teu entorn</h2>
        <p>Sabem esperar l'hora adequada, tornar si cal, buscar l'angle que ningú no ha fotografiat. Des de terra o amb dron, mostrem les muntanyes, la costa, les vinyes que envolten el teu hotel o la teva finca, perquè també formen part del que vens.</p>
      `,
      faqs: [
        { q: "Satori Arts fa encàrrecs de fotografia de paisatge?", a: "Sí. Ens expliques quin lloc vols mostrar i organitzem la producció." },
        { q: "El dron compleix la normativa?", a: "Sí. Volem amb certificació AESA." },
      ],
      gallery: g(
        ["Muntanya", "landscape", 3], ["Costa", "portrait", 2], ["Boira", "square", 1],
        ["Llum", "landscape", 4], ["Horitzó", "portrait", 3], ["Detall", "square", 2],
      ),
    },
  },
};
