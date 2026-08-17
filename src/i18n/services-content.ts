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
        "Fotografía y film de boda con estilo editorial en Barcelona, Madrid y destino. Momentos reales, edición con carácter y entrega cuidada.",
      h1: "Vuestra boda, contada como merece",
      heroIntro:
        "Somos un dúo de foto y vídeo. Mientras uno documenta la emoción, el otro rueda la película. Sin poses eternas: lo que vivís, tal cual pasa.",
      bodyHtml: `
        <h2>Foto y film, el mismo día y el mismo equipo</h2>
        <p>Trabajar con un solo estudio para foto y vídeo tiene una ventaja enorme: nos coordinamos, no competimos por el momento. Podéis contratar solo fotografía, solo film o ambos.</p>
        <ul>
          <li>Cobertura de preparativos, ceremonia, sesión de pareja y fiesta.</li>
          <li>Galería online privada con las mejores imágenes editadas.</li>
          <li>Tráiler corto para compartir y película larga para guardar.</li>
        </ul>
        <h2>Nuestro estilo</h2>
        <p>Documental con alma editorial. Buscamos la luz buena, los gestos de verdad y esos detalles que en unos años os harán volver a emocionaros. Dirigimos lo justo para que estéis cómodos.</p>
        <h2>Bodas de destino</h2>
        <p>Nos movemos por toda España y fuera. Costa Brava, Empordà, sierra de Madrid, masías, fincas y hoteles con encanto: si el sitio os enamora, allí estaremos.</p>
      `,
      faqs: [
        { q: "¿Hacéis foto y vídeo a la vez?", a: "Sí. Somos dos personas; una a la foto y otra al vídeo, coordinadas. También podéis contratar solo una disciplina." },
        { q: "¿Viajáis fuera de Barcelona o Madrid?", a: "Sí, cubrimos bodas de destino en toda España y en el extranjero. Escríbenos con la fecha y el lugar." },
        { q: "¿Cuándo recibimos las fotos y el vídeo?", a: "Un avance en pocos días y la entrega completa en unas semanas, según temporada. Lo concretamos antes de reservar." },
        { q: "¿Cómo reservamos la fecha?", a: "Escríbenos por WhatsApp. Vemos disponibilidad, te contamos las opciones y bloqueamos la fecha con un anticipo." },
      ],
      gallery: g(
        ["Ceremonia", "portrait", 1], ["Detalles", "square", 4], ["Pareja", "landscape", 2],
        ["Fiesta", "portrait", 3], ["Emoción", "landscape", 1], ["Destino", "portrait", 2],
      ),
    },
    en: {
      seoTitle: "Wedding Photographer & Videographer in Barcelona & Madrid · Satori Arts",
      seoDescription:
        "Editorial wedding photography and film in Barcelona, Madrid and destination. Real moments, editing with character and careful delivery.",
      h1: "Your wedding, told the way it deserves",
      heroIntro:
        "We are a photo and film duo. While one documents the emotion, the other shoots the film. No endless posing: what you live, exactly as it happens.",
      bodyHtml: `
        <h2>Photo and film, same day, same team</h2>
        <p>Booking one studio for both photo and film has a big upside: we coordinate rather than compete for the moment. You can book photography only, film only, or both.</p>
        <ul>
          <li>Coverage of preparations, ceremony, couple session and party.</li>
          <li>Private online gallery with the best edited images.</li>
          <li>A short highlight to share and a long feature to keep.</li>
        </ul>
        <h2>Our style</h2>
        <p>Documentary with an editorial soul. We look for good light, honest gestures and the details that will move you again years from now. We direct just enough for you to feel at ease.</p>
        <h2>Destination weddings</h2>
        <p>We travel across Spain and beyond. Costa Brava, Empordà, the Madrid mountains, country estates and charming hotels: if the place speaks to you, we'll be there.</p>
      `,
      faqs: [
        { q: "Do you shoot photo and film at the same time?", a: "Yes. We are two people, one on photo and one on film, in sync. You can also book a single discipline." },
        { q: "Do you travel outside Barcelona or Madrid?", a: "Yes, we cover destination weddings across Spain and abroad. Message us with your date and location." },
        { q: "When do we get the photos and film?", a: "A preview within days and the full delivery in a few weeks, depending on the season. We agree it before booking." },
        { q: "How do we book our date?", a: "Message us on WhatsApp. We check availability, walk you through the options and hold the date with a deposit." },
      ],
      gallery: g(
        ["Ceremony", "portrait", 1], ["Details", "square", 4], ["Couple", "landscape", 2],
        ["Party", "portrait", 3], ["Emotion", "landscape", 1], ["Destination", "portrait", 2],
      ),
    },
    ca: {
      seoTitle: "Fotògraf i Vídeo de Casaments a Barcelona i Madrid · Satori Arts",
      seoDescription:
        "Fotografia i film de casament amb estil editorial a Barcelona, Madrid i destí. Moments reals, edició amb caràcter i lliurament acurat.",
      h1: "El vostre casament, explicat com es mereix",
      heroIntro:
        "Som un duo de foto i vídeo. Mentre un documenta l'emoció, l'altre roda la pel·lícula. Sense poses eternes: el que viviu, tal com passa.",
      bodyHtml: `
        <h2>Foto i film, el mateix dia i el mateix equip</h2>
        <p>Treballar amb un sol estudi per a foto i vídeo té un gran avantatge: ens coordinem, no competim pel moment. Podeu contractar només fotografia, només film o tots dos.</p>
        <ul>
          <li>Cobertura de preparatius, cerimònia, sessió de parella i festa.</li>
          <li>Galeria en línia privada amb les millors imatges editades.</li>
          <li>Tràiler curt per compartir i pel·lícula llarga per guardar.</li>
        </ul>
        <h2>El nostre estil</h2>
        <p>Documental amb ànima editorial. Busquem la bona llum, els gestos de veritat i els detalls que d'aquí uns anys us tornaran a emocionar. Dirigim just el necessari perquè estigueu còmodes.</p>
        <h2>Casaments de destí</h2>
        <p>Ens movem per tot Espanya i fora. Costa Brava, Empordà, serra de Madrid, masies i hotels amb encant: si el lloc us enamora, hi serem.</p>
      `,
      faqs: [
        { q: "Feu foto i vídeo alhora?", a: "Sí. Som dues persones; una a la foto i una al vídeo, coordinades. També podeu contractar només una disciplina." },
        { q: "Viatgeu fora de Barcelona o Madrid?", a: "Sí, cobrim casaments de destí per tot Espanya i a l'estranger. Escriu-nos amb la data i el lloc." },
        { q: "Quan rebem les fotos i el vídeo?", a: "Un avançament en pocs dies i el lliurament complet en unes setmanes, segons temporada. Ho concretem abans de reservar." },
        { q: "Com reservem la data?", a: "Escriu-nos per WhatsApp. Mirem disponibilitat, t'expliquem les opcions i bloquegem la data amb una bestreta." },
      ],
      gallery: g(
        ["Cerimònia", "portrait", 1], ["Detalls", "square", 4], ["Parella", "landscape", 2],
        ["Festa", "portrait", 3], ["Emoció", "landscape", 1], ["Destí", "portrait", 2],
      ),
    },
  },

  /* ============================ EVENTOS ============================ */
  eventos: {
    es: {
      seoTitle: "Fotógrafo de Eventos en Barcelona y Madrid · Foto y Vídeo · Satori Arts",
      seoDescription:
        "Cobertura de eventos corporativos, presentaciones y celebraciones en Barcelona y Madrid. Foto y vídeo con discreción y entrega rápida.",
      h1: "Eventos que se recuerdan y se comparten",
      heroIntro:
        "Congresos, presentaciones de marca, galas y celebraciones. Cubrimos tu evento con discreción y te entregamos material listo para redes en tiempo récord.",
      bodyHtml: `
        <h2>Cobertura completa, sin estorbar</h2>
        <p>Nos movemos como parte del equipo, no como un obstáculo. Documentamos ponencias, networking, ambiente y esos momentos clave que cuentan cómo fue.</p>
        <ul>
          <li>Reportaje fotográfico editado y con tu marca cuidada.</li>
          <li>Vídeo resumen (aftermovie) para redes y patrocinadores.</li>
          <li>Entrega exprés opcional para publicar el mismo día o al siguiente.</li>
        </ul>
        <h2>Para empresas y agencias</h2>
        <p>Trabajamos con departamentos de marketing y agencias. Nos adaptamos a guion, tiempos y necesidades de comunicación: sabemos qué imágenes necesitas para tu memoria y para vender el próximo evento.</p>
        <h2>Celebraciones privadas</h2>
        <p>Cumpleaños, aniversarios, bautizos y comuniones con el mismo mimo que una boda, en formato más ágil.</p>
      `,
      faqs: [
        { q: "¿Con cuánta antelación hay que reservar?", a: "Cuanto antes mejor, pero también cubrimos eventos con poco margen. Escríbenos y vemos disponibilidad." },
        { q: "¿Entregáis material el mismo día?", a: "Sí, ofrecemos entrega exprés de una selección para redes. El reportaje completo llega después, editado." },
        { q: "¿Facturáis a empresa?", a: "Por supuesto. Emitimos factura y podemos trabajar con pedidos y condiciones de agencia." },
        { q: "¿Foto, vídeo o ambos?", a: "Como quieras. Puedes contratar solo una disciplina o el pack completo con el dúo." },
      ],
      gallery: g(
        ["Ponencia", "landscape", 2], ["Ambiente", "portrait", 1], ["Detalle", "square", 4],
        ["Networking", "landscape", 3], ["Marca", "portrait", 2], ["Gala", "landscape", 1],
      ),
    },
    en: {
      seoTitle: "Event Photographer in Barcelona & Madrid · Photo & Film · Satori Arts",
      seoDescription:
        "Corporate events, launches and celebrations in Barcelona and Madrid. Photo and film, discreet coverage and fast delivery.",
      h1: "Events worth remembering and sharing",
      heroIntro:
        "Conferences, brand launches, galas and celebrations. We cover your event discreetly and deliver social-ready material in record time.",
      bodyHtml: `
        <h2>Full coverage, without getting in the way</h2>
        <p>We move like part of the team, not an obstacle. We document talks, networking, atmosphere and the key moments that tell the story.</p>
        <ul>
          <li>Edited photo report with your brand looked after.</li>
          <li>Aftermovie for social media and sponsors.</li>
          <li>Optional express delivery to publish same or next day.</li>
        </ul>
        <h2>For companies and agencies</h2>
        <p>We work with marketing teams and agencies. We adapt to the run of show, timings and communication needs: we know which images you need for the report and to sell the next event.</p>
        <h2>Private celebrations</h2>
        <p>Birthdays, anniversaries and christenings with the same care as a wedding, in a more agile format.</p>
      `,
      faqs: [
        { q: "How far in advance should we book?", a: "The sooner the better, but we also cover short-notice events. Message us and we'll check availability." },
        { q: "Do you deliver material same day?", a: "Yes, we offer express delivery of a selection for social. The full report follows, edited." },
        { q: "Can you invoice a company?", a: "Of course. We issue invoices and can work with purchase orders and agency terms." },
        { q: "Photo, film or both?", a: "Whatever you need. Book a single discipline or the full duo package." },
      ],
      gallery: g(
        ["Talk", "landscape", 2], ["Atmosphere", "portrait", 1], ["Detail", "square", 4],
        ["Networking", "landscape", 3], ["Brand", "portrait", 2], ["Gala", "landscape", 1],
      ),
    },
    ca: {
      seoTitle: "Fotògraf d'Esdeveniments a Barcelona i Madrid · Foto i Vídeo · Satori Arts",
      seoDescription:
        "Esdeveniments corporatius, presentacions i celebracions a Barcelona i Madrid. Foto i vídeo amb discreció i lliurament ràpid.",
      h1: "Esdeveniments que es recorden i es comparteixen",
      heroIntro:
        "Congressos, presentacions de marca, gales i celebracions. Cobrim el teu esdeveniment amb discreció i t'entreguem material a punt per a xarxes en temps rècord.",
      bodyHtml: `
        <h2>Cobertura completa, sense molestar</h2>
        <p>Ens movem com a part de l'equip, no com un obstacle. Documentem ponències, networking, ambient i els moments clau que expliquen com va anar.</p>
        <ul>
          <li>Reportatge fotogràfic editat i amb la teva marca cuidada.</li>
          <li>Vídeo resum (aftermovie) per a xarxes i patrocinadors.</li>
          <li>Lliurament exprés opcional per publicar el mateix dia o l'endemà.</li>
        </ul>
        <h2>Per a empreses i agències</h2>
        <p>Treballem amb departaments de màrqueting i agències. Ens adaptem al guió, els temps i les necessitats de comunicació.</p>
        <h2>Celebracions privades</h2>
        <p>Aniversaris, bateigs i comunions amb la mateixa cura que un casament, en un format més àgil.</p>
      `,
      faqs: [
        { q: "Amb quanta antelació cal reservar?", a: "Com abans millor, però també cobrim esdeveniments amb poc marge. Escriu-nos i mirem disponibilitat." },
        { q: "Entregueu material el mateix dia?", a: "Sí, oferim lliurament exprés d'una selecció per a xarxes. El reportatge complet arriba després, editat." },
        { q: "Factureu a empresa?", a: "És clar. Emetem factura i podem treballar amb comandes i condicions d'agència." },
        { q: "Foto, vídeo o tots dos?", a: "Com vulguis. Pots contractar només una disciplina o el pack complet amb el duo." },
      ],
      gallery: g(
        ["Ponència", "landscape", 2], ["Ambient", "portrait", 1], ["Detall", "square", 4],
        ["Networking", "landscape", 3], ["Marca", "portrait", 2], ["Gala", "landscape", 1],
      ),
    },
  },

  /* ============================ HOTELES ============================ */
  hoteles: {
    es: {
      seoTitle: "Fotografía de Hoteles y Hostelería en Barcelona y Madrid · Satori Arts",
      seoDescription:
        "Fotografía y vídeo para hoteles, resorts y restaurantes. Imágenes que venden habitaciones y experiencias y suben las reservas directas.",
      h1: "Imágenes que llenan habitaciones",
      heroIntro:
        "Fotografía y film para hoteles, resorts, restaurantes y alojamientos. Contenido que transmite la experiencia y empuja la reserva directa.",
      bodyHtml: `
        <h2>Qué cubrimos</h2>
        <p>Producimos el catálogo visual completo de tu establecimiento, listo para web, OTAs, redes y campañas.</p>
        <ul>
          <li>Habitaciones y suites, con luz y estilismo cuidados.</li>
          <li>Restaurante, gastronomía, spa y zonas comunes.</li>
          <li>Exteriores, arquitectura y lifestyle con modelos.</li>
          <li>Vídeo para web y reels verticales para redes.</li>
        </ul>
        <h2>Pensado para vender</h2>
        <p>No hacemos fotos bonitas sin más: pensamos en conversión. Imágenes coherentes con tu marca que reducen la fricción y aumentan la reserva directa, la que no paga comisión.</p>
        <h2>Producción sin complicaciones</h2>
        <p>Nos coordinamos con dirección y recepción para trabajar sin molestar a los huéspedes. Planificamos horas de luz y ocupación para sacar el máximo partido.</p>
      `,
      faqs: [
        { q: "¿Trabajáis con cadenas y grupos?", a: "Sí, con hoteles independientes, boutique, resorts y grupos. Nos adaptamos a manuales de marca." },
        { q: "¿Incluís vídeo y reels?", a: "Sí. Ofrecemos foto, vídeo para web y reels verticales optimizados para redes." },
        { q: "¿Cómo se factura?", a: "Presupuesto cerrado por proyecto según entregables y jornadas. Emitimos factura." },
        { q: "¿Necesitáis cerrar el hotel?", a: "No. Planificamos por zonas y horarios para no afectar la operativa ni a los huéspedes." },
      ],
      gallery: g(
        ["Suite", "landscape", 1], ["Gastronomía", "square", 4], ["Spa", "portrait", 3],
        ["Exterior", "landscape", 2], ["Lifestyle", "portrait", 1], ["Detalle", "square", 4],
      ),
    },
    en: {
      seoTitle: "Hotel & Hospitality Photography in Barcelona & Madrid · Satori Arts",
      seoDescription:
        "Photography and film for hotels, resorts and restaurants. Images that sell rooms and experiences and grow direct bookings.",
      h1: "Images that fill rooms",
      heroIntro:
        "Photography and film for hotels, resorts, restaurants and rentals. Content that conveys the experience and drives direct bookings.",
      bodyHtml: `
        <h2>What we cover</h2>
        <p>We produce your property's full visual catalogue, ready for web, OTAs, social and campaigns.</p>
        <ul>
          <li>Rooms and suites, with careful light and styling.</li>
          <li>Restaurant, food, spa and common areas.</li>
          <li>Exteriors, architecture and lifestyle with models.</li>
          <li>Film for web and vertical reels for social.</li>
        </ul>
        <h2>Built to sell</h2>
        <p>We don't just make pretty pictures: we think conversion. On-brand images that reduce friction and grow direct, commission-free bookings.</p>
        <h2>Hassle-free production</h2>
        <p>We coordinate with management and front desk to work without disturbing guests. We plan around light and occupancy to get the most out of the shoot.</p>
      `,
      faqs: [
        { q: "Do you work with chains and groups?", a: "Yes, with independent and boutique hotels, resorts and groups. We follow brand guidelines." },
        { q: "Do you include film and reels?", a: "Yes. We offer photo, web film and vertical reels optimised for social." },
        { q: "How do you invoice?", a: "A fixed quote per project based on deliverables and shoot days. We issue invoices." },
        { q: "Do you need to close the hotel?", a: "No. We plan by areas and times so we don't affect operations or guests." },
      ],
      gallery: g(
        ["Suite", "landscape", 1], ["Food", "square", 4], ["Spa", "portrait", 3],
        ["Exterior", "landscape", 2], ["Lifestyle", "portrait", 1], ["Detail", "square", 4],
      ),
    },
    ca: {
      seoTitle: "Fotografia d'Hotels i Hostaleria a Barcelona i Madrid · Satori Arts",
      seoDescription:
        "Fotografia i vídeo per a hotels, resorts i restaurants. Imatges que venen habitacions i experiències i pugen les reserves directes.",
      h1: "Imatges que omplen habitacions",
      heroIntro:
        "Fotografia i film per a hotels, resorts, restaurants i allotjaments. Contingut que transmet l'experiència i empeny la reserva directa.",
      bodyHtml: `
        <h2>Què cobrim</h2>
        <p>Produïm el catàleg visual complet del teu establiment, a punt per a web, OTAs, xarxes i campanyes.</p>
        <ul>
          <li>Habitacions i suites, amb llum i estilisme cuidats.</li>
          <li>Restaurant, gastronomia, spa i zones comunes.</li>
          <li>Exteriors, arquitectura i lifestyle amb models.</li>
          <li>Vídeo per a web i reels verticals per a xarxes.</li>
        </ul>
        <h2>Pensat per vendre</h2>
        <p>No fem fotos boniques sense més: pensem en conversió. Imatges coherents amb la teva marca que redueixen la fricció i augmenten la reserva directa.</p>
        <h2>Producció sense complicacions</h2>
        <p>Ens coordinem amb direcció i recepció per treballar sense molestar els hostes. Planifiquem hores de llum i ocupació per treure'n el màxim partit.</p>
      `,
      faqs: [
        { q: "Treballeu amb cadenes i grups?", a: "Sí, amb hotels independents, boutique, resorts i grups. Ens adaptem a manuals de marca." },
        { q: "Incloeu vídeo i reels?", a: "Sí. Oferim foto, vídeo per a web i reels verticals optimitzats per a xarxes." },
        { q: "Com es factura?", a: "Pressupost tancat per projecte segons lliurables i jornades. Emetem factura." },
        { q: "Cal tancar l'hotel?", a: "No. Planifiquem per zones i horaris per no afectar l'operativa ni els hostes." },
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
      seoTitle: "Fotografía de Paisaje Fine-Art y Copias de Autor · Satori Arts",
      seoDescription:
        "Fotografía de paisaje fine-art de Satori Arts. Copias de autor numeradas para coleccionar o vestir espacios con carácter.",
      h1: "Paisaje para mirar cada día",
      heroIntro:
        "Nuestro lado más personal: paisaje fine-art. Copias de autor, numeradas y cuidadas al detalle, para coleccionar o dar alma a un espacio.",
      bodyHtml: `
        <h2>Copias de autor</h2>
        <p>Cada imagen se edita e imprime con mimo en papeles de calidad museo. Tiradas limitadas y numeradas, listas para enmarcar.</p>
        <ul>
          <li>Varios tamaños y acabados a elegir.</li>
          <li>Impresión giclée en papel fine-art.</li>
          <li>Encargos y proyectos a medida para interiorismo y hostelería.</li>
        </ul>
        <h2>Para espacios con carácter</h2>
        <p>Trabajamos con estudios de interiorismo, hoteles y particulares que quieren piezas únicas, no pósters de catálogo. Cuéntanos el espacio y buscamos la imagen.</p>
      `,
      faqs: [
        { q: "¿Vendéis copias?", a: "Sí, copias de autor numeradas en varios tamaños. Escríbenos y te pasamos opciones y precios." },
        { q: "¿Hacéis encargos a medida?", a: "Sí, para interiorismo, hostelería y particulares. Podemos crear una serie para un espacio concreto." },
        { q: "¿Cómo se envía?", a: "Embalaje protegido y envío asegurado. Concretamos plazos según tamaño y acabado." },
      ],
      gallery: g(
        ["Montaña", "landscape", 3], ["Costa", "portrait", 2], ["Bruma", "square", 1],
        ["Luz", "landscape", 4], ["Horizonte", "portrait", 3], ["Detalle", "square", 2],
      ),
    },
    en: {
      seoTitle: "Fine-Art Landscape Photography & Signed Prints · Satori Arts",
      seoDescription:
        "Fine-art landscape photography by Satori Arts. Signed, numbered prints to collect or dress spaces with character.",
      h1: "Landscape to look at every day",
      heroIntro:
        "Our most personal side: fine-art landscape. Signed, numbered prints, finished with care, to collect or give soul to a space.",
      bodyHtml: `
        <h2>Signed prints</h2>
        <p>Each image is edited and printed with care on museum-quality papers. Limited, numbered editions, ready to frame.</p>
        <ul>
          <li>Several sizes and finishes to choose from.</li>
          <li>Giclée printing on fine-art paper.</li>
          <li>Commissions and bespoke projects for interior design and hospitality.</li>
        </ul>
        <h2>For spaces with character</h2>
        <p>We work with interior studios, hotels and private clients who want unique pieces, not catalogue posters. Tell us about the space and we'll find the image.</p>
      `,
      faqs: [
        { q: "Do you sell prints?", a: "Yes, signed, numbered prints in several sizes. Message us and we'll send options and prices." },
        { q: "Do you take commissions?", a: "Yes, for interior design, hospitality and private clients. We can create a series for a specific space." },
        { q: "How is it shipped?", a: "Protected packaging and insured shipping. We confirm timings by size and finish." },
      ],
      gallery: g(
        ["Mountain", "landscape", 3], ["Coast", "portrait", 2], ["Mist", "square", 1],
        ["Light", "landscape", 4], ["Horizon", "portrait", 3], ["Detail", "square", 2],
      ),
    },
    ca: {
      seoTitle: "Fotografia de Paisatge Fine-Art i Còpies d'Autor · Satori Arts",
      seoDescription:
        "Fotografia de paisatge fine-art de Satori Arts. Còpies d'autor numerades per col·leccionar o vestir espais amb caràcter.",
      h1: "Paisatge per mirar cada dia",
      heroIntro:
        "El nostre costat més personal: paisatge fine-art. Còpies d'autor, numerades i cuidades al detall, per col·leccionar o donar ànima a un espai.",
      bodyHtml: `
        <h2>Còpies d'autor</h2>
        <p>Cada imatge s'edita i s'imprimeix amb cura en papers de qualitat museu. Tiratges limitats i numerats, a punt per emmarcar.</p>
        <ul>
          <li>Diverses mides i acabats a triar.</li>
          <li>Impressió giclée en paper fine-art.</li>
          <li>Encàrrecs i projectes a mida per a interiorisme i hostaleria.</li>
        </ul>
        <h2>Per a espais amb caràcter</h2>
        <p>Treballem amb estudis d'interiorisme, hotels i particulars que volen peces úniques, no pòsters de catàleg. Explica'ns l'espai i busquem la imatge.</p>
      `,
      faqs: [
        { q: "Veneu còpies?", a: "Sí, còpies d'autor numerades en diverses mides. Escriu-nos i t'enviem opcions i preus." },
        { q: "Feu encàrrecs a mida?", a: "Sí, per a interiorisme, hostaleria i particulars. Podem crear una sèrie per a un espai concret." },
        { q: "Com s'envia?", a: "Embalatge protegit i enviament assegurat. Concretem terminis segons mida i acabat." },
      ],
      gallery: g(
        ["Muntanya", "landscape", 3], ["Costa", "portrait", 2], ["Boira", "square", 1],
        ["Llum", "landscape", 4], ["Horitzó", "portrait", 3], ["Detall", "square", 2],
      ),
    },
  },
};
