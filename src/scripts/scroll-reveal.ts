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

document.addEventListener("astro:page-load", () => {
  cleanup();
  setup();
});
document.addEventListener("astro:before-swap", cleanup);
