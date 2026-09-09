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

  // Sin Lenis en pantallas táctiles: el scroll "falseado" por JS que
  // usa Lenis para suavizar la inercia entra en conflicto con
  // "position: sticky" en el scroll táctil real (el navegador recalcula
  // el sticky en su propio hilo de composición mientras Lenis intenta
  // sincronizarlo por rAF a la vez) — se notaba como un brinco/
  // parpadeo justo al activarse el sticky de la barra de categorías de
  // Proyectos, solo en mobile/tablet. El scroll nativo por inercia de
  // iOS/Android ya es fluido de por sí y no tiene ese problema, así
  // que en pantallas táctiles se deja el scroll 100% nativo; el
  // suavizado de Lenis se reserva para scroll de rueda de ratón
  // (desktop/trackpad), donde no hay ese conflicto.
  if (window.matchMedia("(pointer: coarse)").matches) return;

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
