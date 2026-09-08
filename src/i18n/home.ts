/**
 * Contenido de la home por idioma (puntos "por qué", testimonios, ciudades).
 * [PLACEHOLDER] Los testimonios son de ejemplo hasta tener reseñas reales.
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

export const TESTIMONIALS: Record<Locale, Testimonial[]> = {
  es: [
    { quote: "Cada vez que abrimos la galería volvemos a emocionarnos. Captaron momentos que nosotros mismos no vimos ese día.", author: "Laura & Jordi", context: "Boda · Empordà" },
    { quote: "Desde que usamos su material, las reservas directas han subido. Un equipo profesional de principio a fin.", author: "Dirección", context: "Hotel boutique · Barcelona" },
    { quote: "Discreción, agilidad y un ojo excepcional para el detalle. Ya son nuestro proveedor de confianza.", author: "Marta R.", context: "Evento corporativo · Madrid" },
    { quote: "Llegaron, se hicieron invisibles y el resultado fue el mejor recuerdo de la boda. Recomendados al cien por cien.", author: "Clara & Pol", context: "Boda · Costa Brava" },
  ],
  en: [
    { quote: "We look at the photos and cry again. They caught things we didn't even see that day.", author: "Laura & Jordi", context: "Wedding · Empordà" },
    { quote: "The hotel film boosted our direct bookings. Professional from start to finish.", author: "Management", context: "Boutique hotel · Barcelona" },
    { quote: "Discreet, fast and with an incredible eye. We'll definitely book again.", author: "Marta R.", context: "Corporate event · Madrid" },
    { quote: "They showed up, blended in and delivered the best memory of the wedding. We'd recommend them to anyone.", author: "Clara & Pol", context: "Wedding · Costa Brava" },
  ],
  ca: [
    { quote: "Mirem les fotos i tornem a plorar. Van captar coses que ni vam veure aquell dia.", author: "Laura & Jordi", context: "Casament · Empordà" },
    { quote: "El vídeo de l'hotel va disparar les reserves directes. Professionals de cap a peus.", author: "Direcció", context: "Hotel boutique · Barcelona" },
    { quote: "Discrets, ràpids i amb un ull increïble. Repetim segur.", author: "Marta R.", context: "Esdeveniment corporatiu · Madrid" },
    { quote: "Van arribar, es van fer invisibles i el resultat va ser el millor record del casament. Els recomanem al cent per cent.", author: "Clara & Pol", context: "Casament · Costa Brava" },
  ],
};

export const HOME_SEO: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Satori Arts · Fotografía y Film de Bodas, Eventos y Hoteles",
    description:
      "Fotografía y film de autor para bodas, hoteles y marcas de hostelería. Barcelona, Madrid y a destino. Consulta disponibilidad por WhatsApp.",
  },
  en: {
    title: "Satori Arts · Wedding, Event & Hotel Photography and Film",
    description:
      "Photography and film duo in Barcelona and Madrid. Weddings, events, hotels and landscape with an editorial eye. Message us on WhatsApp.",
  },
  ca: {
    title: "Satori Arts · Fotografia i Film de Casaments, Esdeveniments i Hotels",
    description:
      "Duo de fotografia i vídeo a Barcelona i Madrid. Casaments, esdeveniments, hotels i paisatge amb mirada editorial. Escriu-nos per WhatsApp.",
  },
};
