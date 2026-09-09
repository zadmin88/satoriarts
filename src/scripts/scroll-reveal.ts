// Animaciones de scroll (estilo verostudio.com) con GSAP + ScrollTrigger:
// - Reveal genérico (fade + slide-up sutil) para bloques marcados con las
//   clases ya usadas en todo el sitio: .reveal, .reveal-img, .reveal-scale,
//   .reveal-text-l, .reveal-text-r. Sustituye a las animaciones CSS por
//   scroll-timeline nativo que había antes (mismo propósito, ahora con
//   control real de easing/stagger vía GSAP).
// - Reveal palabra a palabra para títulos marcados con [data-reveal-words]:
//   cada palabra entra con fade + slide-up y un pequeño retraso creciente.
// - Parallax sutil para elementos marcados con [data-parallax="0.2"]
//   (el número es la velocidad relativa, 0 = sin parallax).
// Progressive enhancement: sin JS, todo el contenido queda visible tal
// cual (nunca depende de CSS para ocultarlo primero), así que si este
// script no carga no hay contenido invisible ni roto.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { runOnPageLoad } from "@/scripts/on-page-load";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power2.out";
const START = "top 88%";

function splitIntoWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.split === "true") {
    return Array.from(el.querySelectorAll<HTMLElement>(":scope .gsap-word"));
  }
  const text = el.textContent ?? "";
  el.textContent = "";
  const parts = text.split(/(\s+)/);
  const words: HTMLElement[] = [];
  for (const part of parts) {
    if (part === "") continue;
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part));
      continue;
    }
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.verticalAlign = "top";
    wrap.style.lineHeight = "1.3";
    const word = document.createElement("span");
    word.className = "gsap-word";
    word.style.display = "inline-block";
    word.textContent = part;
    wrap.appendChild(word);
    el.appendChild(wrap);
    words.push(word);
  }
  el.dataset.split = "true";
  return words;
}

function setup() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const revealSelector = ".reveal, .reveal-img, .reveal-scale, .reveal-text-l, .reveal-text-r";

  // Cuadrículas con stagger (Clientes, Testimonios, Por qué Satori Arts...):
  // los hijos .reveal de un mismo .stagger-grid arrancan juntos, con un
  // pequeño retraso creciente entre ellos, en vez de disparar cada uno
  // por separado según su propia posición de entrada.
  gsap.utils.toArray<HTMLElement>(".stagger-grid").forEach((grid) => {
    const items = gsap.utils.toArray<HTMLElement>(revealSelector, grid);
    if (items.length === 0) return;
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        stagger: 0.09,
        scrollTrigger: { trigger: grid, start: START, once: true },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>(revealSelector).forEach((el) => {
    if (el.closest(".stagger-grid")) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: EASE,
        scrollTrigger: { trigger: el, start: START, once: true },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>("[data-reveal-words]").forEach((el) => {
    const words = splitIntoWords(el);
    if (words.length === 0) return;
    gsap.fromTo(
      words,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: EASE,
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: START, once: true },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || "0.15");
    if (!speed) return;
    const container = el.closest<HTMLElement>("section") ?? el.parentElement ?? el;
    // "top top" → "bottom top": el progreso va de 0 a 1 mientras la
    // sección atraviesa la pantalla de scroll normal (no "top bottom",
    // que para una sección pegada arriba del todo —como el hero— ya
    // empieza con progreso adelantado incluso sin haber scrolleado,
    // desplazando el contenido desde la carga inicial y dejando un
    // hueco vacío arriba).
    gsap.fromTo(
      el,
      { y: 0 },
      {
        y: () => window.innerHeight * speed,
        ease: "none",
        scrollTrigger: { trigger: container, start: "top top", end: "bottom top", scrub: true },
      },
    );
  });
}

function cleanup() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

// Las posiciones de disparo (ScrollTrigger) se calculan con el alto de
// página que hay en ese momento. En páginas con muchas fotos que aún
// no han terminado de cargar (p. ej. "Proyectos" en mobile, donde el
// grid es de 1 sola columna — mucha más altura por foto que en
// desktop, que reparte en 2 columnas), el alto real de la página sigue
// creciendo después del cálculo inicial. Sin refrescar, el CTA y el
// footer —al final del todo— quedan con un disparador mal ubicado y
// se quedan invisibles (autoAlpha:0) para siempre, aunque existan en
// el DOM. Se espera a que cada imagen termine de cargar (o ya lo
// estuviera) y entonces se recalcula con el alto definitivo de la
// página — funciona tanto en la carga inicial como en cada navegación
// SPA (astro:page-load), a diferencia del evento "load" de la ventana
// (que solo dispara una vez, en la primera carga).
//
// Los <video> (p. ej. el vídeo de cada categoría en Proyectos) cuentan
// igual que las imágenes: hasta que el navegador no conoce sus
// dimensiones reales (evento "loadedmetadata"), ocupan un alto
// provisional y el cálculo de ScrollTrigger vuelve a quedar
// desactualizado — el mismo problema que con las fotos, solo que con
// otro tipo de elemento (por eso categorías con vídeo, como "Eventos",
// podían quedarse con el CTA/footer invisibles aunque las fotos ya
// hubiesen cargado bien).
function refreshAfterImagesLoad() {
  const images = Array.from(document.images);
  const videos = Array.from(document.querySelectorAll("video"));

  let pending =
    images.filter((img) => !img.complete).length +
    videos.filter((v) => v.readyState < 1).length; // HAVE_NOTHING: aún sin metadata

  if (pending === 0) {
    ScrollTrigger.refresh();
    return;
  }

  const onReady = () => {
    pending -= 1;
    if (pending <= 0) ScrollTrigger.refresh();
  };
  images.forEach((img) => {
    if (!img.complete) img.addEventListener("load", onReady, { once: true });
  });
  videos.forEach((v) => {
    if (v.readyState < 1) v.addEventListener("loadedmetadata", onReady, { once: true });
  });
}

// Red de seguridad adicional para la carga en frío (primera visita o
// recarga directa de la URL, a diferencia de navegar desde otra página
// del sitio ya cargada): con la caché vacía, fuentes, imágenes y vídeo
// tardan más y en orden menos predecible, así que el seguimiento
// "imagen a imagen" de arriba puede no cubrir el 100% de los casos.
// "load" de window (todo el documento, incluidas fuentes y hojas de
// estilo) y un margen de reflow adicional garantizan que, pase lo que
// pase, se recalculen las posiciones al menos una vez más con el
// layout ya totalmente asentado.
function scheduleSafetyRefresh() {
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  setTimeout(() => ScrollTrigger.refresh(), 1200);
}

runOnPageLoad(() => {
  cleanup();
  setup();
  refreshAfterImagesLoad();
  scheduleSafetyRefresh();
}, cleanup);
