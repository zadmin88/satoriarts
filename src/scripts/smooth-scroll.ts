// Scroll suave con inercia (como videinfra.com), vía Lenis, sincronizado
// con el ticker de GSAP (integración oficial de Lenis+GSAP) para que
// ScrollTrigger reciba la posición de scroll "falseada" por Lenis y no
// se desincronice. Se (re)inicializa en cada navegación de las View
// Transitions de Astro (astro:page-load, que también dispara en la
// carga inicial). Respeta prefers-reduced-motion: si el usuario lo
// pide, no se activa.
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { runOnPageLoad } from "@/scripts/on-page-load";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | undefined;

function tick(time: number) {
  lenis?.raf(time * 1000);
}

function start() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function stop() {
  gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = undefined;
}

runOnPageLoad(() => {
  stop();
  start();
}, stop);

/**
 * Otros scripts (p. ej. filter-scroll.ts) necesitan desplazar la página
 * verticalmente por JS. Usar el "scrollIntoView" nativo del navegador
 * ahí generaría un salto/parpadeo: Lenis lleva su propio estado interno
 * de scroll animado y desconoce ese scroll nativo, así que se
 * desincroniza hasta el siguiente evento de rueda/touch. Exponemos la
 * instancia para que puedan pedirle el scroll a Lenis mismo.
 */
export function getLenis(): Lenis | undefined {
  return lenis;
}
