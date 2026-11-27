/**
 * Contenido de la home por idioma (puntos "por qué", testimonios, ciudades).
 *
 * TESTIMONIOS = reseñas REALES de la ficha de Google Business, copiadas
 * literalmente (los "…" marcan fragmentos omitidos, sin cambiar el
 * sentido) y en su idioma original en los 3 idiomas: traducir una reseña
 * es alterarla. Nunca inventes ni retoques una reseña (Ley de Competencia
 * Desleal, art. 27). Antes de añadir una, pide permiso a su autor.
 */
import type { Locale } from "@/config";

export interface WhyPoint {
  title: string;
  text: string;
}
export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export const WHY: Record<Locale, WhyPoint[]> = {
  es: [
    { title: "Un equipo, dos disciplinas", text: "Foto y film se documentan a la vez, con un mismo criterio. Ninguna escena, ni ningún detalle del proyecto, queda sin contar." },
    { title: "Mirada editorial, sin impostura", text: "Documentamos lo que ocurre de verdad. Pocas poses, mucha emoción contenida y una edición con carácter propio." },
    { title: "Entrega cuidada, con tiempos claros", text: "Galería privada online, primer avance en días y entrega final en semanas. Sabrás siempre cuándo y cómo recibes tu trabajo." },
    { title: "En tres idiomas, en cualquier destino", text: "Trabajamos en español, inglés y catalán, con sede en Barcelona y Madrid y disponibilidad para destino." },
  ],
  en: [
    { title: "One duo, two eyes", text: "Photo and film at once, in sync. Nothing gets missed because there are always two of us on the scene." },
    { title: "Editorial, not posey", text: "We document what really happens. Little posing, lots of emotion, and editing with character." },
    { title: "Careful, on-time delivery", text: "Private online gallery, a fast preview and the final film. You always know when and how you get your work." },
    { title: "Bilingual and well-travelled", text: "We work in Spanish, English and Catalan, in Barcelona, Madrid and wherever you need us." },
  ],
  ca: [
    { title: "Un duo, dues mirades", text: "Foto i film alhora, coordinats. No us perdeu res perquè sempre hi ha dos ulls a l'escena." },
    { title: "Estil editorial, sense postureig", text: "Documentem el que passa de veritat. Poca pose, molta emoció i una edició amb caràcter." },
    { title: "Lliurament acurat i puntual", text: "Galeria en línia privada, avançament ràpid i pel·lícula final. Sempre sabràs quan i com reps la teva feina." },
    { title: "Bilingües i viatjats", text: "Treballem en castellà, anglès i català, a Barcelona, Madrid i allà on ens necessitis." },
  ],
};

/** Reseñas reales de Google (texto original, ver cabecera). */
const GOOGLE_REVIEWS: { quote: string; author: string; ctx: "wedding" | "pro" }[] = [
  { quote: "Desde el primer momento Manu y Stephanie fueron muy cercanos, atentos y profesionales, haciéndonos sentir muy cómodos durante todo el día. … Los vídeos han superado nuestras expectativas y nos han permitido revivir uno de los días más especiales de nuestra vida.", author: "Judith A.", ctx: "wedding" },
  { quote: "Nos acompañaron desde los preparativos de los novios hasta aproximadamente una hora después de empezar la fiesta, … consiguiendo que en ningún momento nos sintiéramos incómodos o demasiado pendientes de la cámara. … Y el resultado final, para nosotros, ha sido increíble.", author: "Raquel G.", ctx: "wedding" },
  { quote: "Son unos chicos muy profesionales, atentos y cercanos. Desde el primer momento nos hicieron sentir muy cómodos y tranquilos, algo que valoramos muchísimo en un día tan especial como nuestra boda.", author: "Isis S.", ctx: "wedding" },
  { quote: "Always a pleasure to work with Manu and Satori ARTS!! Great attitude, punctual, super pro … Don't hesitate one second!", author: "Frederic S.", ctx: "pro" },
  { quote: "Tefi nos acompañó el día de nuestra boda y todo fue genial! Amabilidad y profesionalidad, siempre con una sonrisa! El vídeo ha quedado precioso, súper emotivo.", author: "Ana M.", ctx: "wedding" },
];

const REVIEW_CONTEXT: Record<Locale, Record<"wedding" | "pro", string>> = {
  es: { wedding: "Boda · Reseña de Google", pro: "Cliente profesional · Reseña de Google" },
  en: { wedding: "Wedding · Google review", pro: "Business client · Google review" },
  ca: { wedding: "Casament · Ressenya de Google", pro: "Client professional · Ressenya de Google" },
};

export const TESTIMONIALS: Record<Locale, Testimonial[]> = Object.fromEntries(
  (["es", "en", "ca"] as const).map((l) => [
    l,
    GOOGLE_REVIEWS.map((r) => ({ quote: r.quote, author: r.author, context: REVIEW_CONTEXT[l][r.ctx] })),
  ]),
) as Record<Locale, Testimonial[]>;

export const HOME_SEO: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Satori Arts · Fotografía y Film de Bodas y Hoteles",
    description:
      "Fotografía y film de autor para bodas, hoteles y marcas de hostelería. Barcelona, Madrid y a destino. Consulta disponibilidad por WhatsApp.",
  },
  en: {
    title: "Satori Arts · Wedding & Hotel Photography and Film",
    description:
      "Photography and film duo in Barcelona and Madrid. Weddings, hotels and landscape with an editorial eye. Message us on WhatsApp.",
  },
  ca: {
    title: "Fotografia i Film de Casaments i Hotels · Satori Arts",
    description:
      "Duo de fotografia i vídeo a Barcelona i Madrid. Casaments, hotels i paisatge amb mirada editorial. Escriu-nos per WhatsApp.",
  },
};
