import { SITE, CITIES, LOCALE_LANG } from "@/config";
import type { Locale } from "@/config";

/**
 * Schema.org base del negocio (LocalBusiness / ProfessionalService).
 * Se inyecta en todas las páginas desde BaseLayout.
 */
export function businessSchema(locale: Locale): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": SITE.url + "/#business",
    name: SITE.brand,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    image: SITE.url + "/og-image.jpg",
    priceRange: "€€€",
    inLanguage: LOCALE_LANG[locale],
    sameAs: [SITE.instagramUrl],
    areaServed: CITIES.map((c) => ({ "@type": "City", name: c.name })),
    knowsLanguage: ["es", "en", "ca"],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding photography & film" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event photography & film" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hotel & hospitality photography" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landscape fine-art photography" } },
    ],
  };
}
