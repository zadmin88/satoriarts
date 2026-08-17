/**
 * Diccionario de textos de interfaz (UI) por idioma.
 * Los textos largos de página viven en las propias páginas;
 * aquí van rótulos y microcopy que se repiten (nav, footer, CTAs).
 *
 * Uso:
 *   import { useT } from "@/i18n/ui";
 *   const t = useT(locale);
 *   t("nav.weddings")
 */
import type { Locale } from "@/config";

export const UI = {
  es: {
    "nav.services": "Servicios",
    "nav.portfolio": "Portfolio",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.journal": "Journal",
    "nav.home": "Inicio",
    "cta.whatsapp": "WhatsApp",
    "cta.whatsapp.long": "Escríbenos por WhatsApp",
    "cta.book": "Consultar disponibilidad",
    "cta.seeMore": "Ver más",
    "cta.viewService": "Ver servicio",
    "cta.instagram": "Míranos en Instagram",
    "hero.eyebrow": "Fotografía & Film · Barcelona · Madrid",
    "hero.title": "Historias que merecen mirarse mil veces",
    "hero.subtitle":
      "Somos Satori Arts, un dúo de fotografía y film de bodas, eventos, hoteles y paisaje. Capturamos lo real con una mirada editorial.",
    "section.services": "Qué hacemos",
    "section.services.sub": "Foto y vídeo, juntos o por separado. Tú eliges.",
    "section.disciplines": "Foto, film o ambos",
    "section.why": "Por qué Satori Arts",
    "section.social": "Confían en nosotros",
    "section.testimonials": "Lo que dicen las parejas y las marcas",
    "section.cities": "Dónde trabajamos",
    "section.journal": "Del journal",
    "cta.blockTitle": "¿Hablamos de tu proyecto?",
    "cta.blockText":
      "Cuéntanos la fecha, el lugar y qué imaginas. Te respondemos por WhatsApp con disponibilidad e ideas, sin compromiso.",
    "footer.tagline":
      "Dúo de fotografía y film para bodas, eventos, hoteles y paisaje en Barcelona, Madrid y allá donde nos lleve la historia.",
    "footer.services": "Servicios",
    "footer.explore": "Explora",
    "footer.legal": "Legal",
    "footer.legalNotice": "Aviso legal",
    "footer.privacy": "Privacidad",
    "footer.rights": "Todos los derechos reservados.",
    "legal.pending": "[PENDIENTE]",
    "a11y.skip": "Saltar al contenido",
    "a11y.menu": "Menú",
    "a11y.langMenu": "Cambiar idioma",
    "discipline.photo.blurb": "Foto de autor, edición cuidada y entrega en galería online.",
    "discipline.film.blurb": "Vídeo cinematográfico: tráiler corto y película larga.",
  },
  en: {
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.journal": "Journal",
    "nav.home": "Home",
    "cta.whatsapp": "WhatsApp",
    "cta.whatsapp.long": "Message us on WhatsApp",
    "cta.book": "Check availability",
    "cta.seeMore": "See more",
    "cta.viewService": "View service",
    "cta.instagram": "Follow us on Instagram",
    "hero.eyebrow": "Photography & Film · Barcelona · Madrid",
    "hero.title": "Stories worth looking at a thousand times",
    "hero.subtitle":
      "We are Satori Arts, a photography and film duo for weddings, events, hotels and landscape. We capture the real with an editorial eye.",
    "section.services": "What we do",
    "section.services.sub": "Photo and video, together or separately. Your call.",
    "section.disciplines": "Photo, film or both",
    "section.why": "Why Satori Arts",
    "section.social": "Trusted by",
    "section.testimonials": "What couples and brands say",
    "section.cities": "Where we work",
    "section.journal": "From the journal",
    "cta.blockTitle": "Shall we talk about your project?",
    "cta.blockText":
      "Tell us the date, the place and what you picture. We'll reply on WhatsApp with availability and ideas, no strings attached.",
    "footer.tagline":
      "Photography and film duo for weddings, events, hotels and landscape in Barcelona, Madrid and wherever the story takes us.",
    "footer.services": "Services",
    "footer.explore": "Explore",
    "footer.legal": "Legal",
    "footer.legalNotice": "Legal notice",
    "footer.privacy": "Privacy",
    "footer.rights": "All rights reserved.",
    "legal.pending": "[PENDING]",
    "a11y.skip": "Skip to content",
    "a11y.menu": "Menu",
    "a11y.langMenu": "Change language",
    "discipline.photo.blurb": "Signature stills, careful editing, delivered in an online gallery.",
    "discipline.film.blurb": "Cinematic film: a short highlight and a long feature.",
  },
  ca: {
    "nav.services": "Serveis",
    "nav.portfolio": "Portfolio",
    "nav.about": "Nosaltres",
    "nav.contact": "Contacte",
    "nav.journal": "Journal",
    "nav.home": "Inici",
    "cta.whatsapp": "WhatsApp",
    "cta.whatsapp.long": "Escriu-nos per WhatsApp",
    "cta.book": "Consultar disponibilitat",
    "cta.seeMore": "Veure més",
    "cta.viewService": "Veure servei",
    "cta.instagram": "Segueix-nos a Instagram",
    "hero.eyebrow": "Fotografia & Film · Barcelona · Madrid",
    "hero.title": "Històries que mereixen mirar-se mil vegades",
    "hero.subtitle":
      "Som Satori Arts, un duo de fotografia i film de casaments, esdeveniments, hotels i paisatge. Capturem el real amb una mirada editorial.",
    "section.services": "Què fem",
    "section.services.sub": "Foto i vídeo, junts o per separat. Tu tries.",
    "section.disciplines": "Foto, film o tots dos",
    "section.why": "Per què Satori Arts",
    "section.social": "Confien en nosaltres",
    "section.testimonials": "Què diuen les parelles i les marques",
    "section.cities": "On treballem",
    "section.journal": "Del journal",
    "cta.blockTitle": "Parlem del teu projecte?",
    "cta.blockText":
      "Explica'ns la data, el lloc i què imagines. Et responem per WhatsApp amb disponibilitat i idees, sense compromís.",
    "footer.tagline":
      "Duo de fotografia i film per a casaments, esdeveniments, hotels i paisatge a Barcelona, Madrid i allà on ens porti la història.",
    "footer.services": "Serveis",
    "footer.explore": "Explora",
    "footer.legal": "Legal",
    "footer.legalNotice": "Avís legal",
    "footer.privacy": "Privacitat",
    "footer.rights": "Tots els drets reservats.",
    "legal.pending": "[PENDENT]",
    "a11y.skip": "Salta al contingut",
    "a11y.menu": "Menú",
    "a11y.langMenu": "Canvia d'idioma",
    "discipline.photo.blurb": "Foto d'autor, edició acurada i lliurament en galeria en línia.",
    "discipline.film.blurb": "Vídeo cinematogràfic: un tràiler curt i una pel·lícula llarga.",
  },
} as const;

export type UIKey = keyof (typeof UI)["es"];

/** Devuelve una función de traducción para un idioma */
export function useT(locale: Locale) {
  return (key: UIKey): string => UI[locale][key] ?? UI.es[key];
}
