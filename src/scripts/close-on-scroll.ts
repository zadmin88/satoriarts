// El desplegable de idioma (<details data-lang-menu>) es un dropdown de
// solo-CSS (sin JS para abrir/cerrar). Al hacer scroll con el dropdown
// abierto, se queda flotando "pegado" en pantalla porque su posición es
// "absolute" respecto al trigger (que va dentro del header, position:
// fixed) — visualmente no se cierra solo. Este script mínimo lo cierra
// en cuanto detecta cualquier scroll, sin esperar a un clic.
import { runOnPageLoad } from "@/scripts/on-page-load";

function close() {
  const menu = document.querySelector<HTMLDetailsElement>("[data-lang-menu]");
  if (menu?.open) menu.open = false;
}

function setup() {
  // "passive" para no bloquear el scroll (incluido el de Lenis) ni el
  // de otros elementos con su propio scroll interno, como la barra de
  // filtros o el carrusel de testimonios.
  window.addEventListener("scroll", close, { passive: true });
}

function stop() {
  window.removeEventListener("scroll", close);
}

// El header (y su <details data-lang-menu>) suele sobrevivir a las
// View Transitions de Astro sin remontarse, así que hay que quitar el
// listener antes de cada navegación para no acumular uno por página.
runOnPageLoad(setup, stop);
