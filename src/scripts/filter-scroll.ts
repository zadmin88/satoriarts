import { getLenis } from "@/scripts/smooth-scroll";
import { runOnPageLoad } from "@/scripts/on-page-load";

// Filtro de Proyectos (radio + :has(), cero JS para el filtrado en sí):
// al seleccionar una categoría, la barra de pestañas puede desplazarse
// horizontalmente y la cuadrícula de fotos cambia de alto, así que este
// script mínimo (a) mantiene la pestaña elegida visible dentro de la
// barra y (b) lleva la cuadrícula justo debajo del bloque "PROYECTOS +
// filtros". Progressive enhancement: sin JS, el filtro sigue
// funcionando igual, solo sin estos ajustes de scroll.

// El bloque "PROYECTOS + filtros" es "sticky", no "fixed": ocupa
// espacio real en el flujo (no hace falta spacer) y se libera solo
// antes del CTA/footer. Mientras está "pegado" (stuck), sigue tapando
// la franja superior del viewport, así que al cambiar de categoría
// hay que compensar ese alto al desplazar el grid hasta él.

// CSS no tiene forma fiable (entre navegadores) de saber si un
// elemento "sticky" está actualmente pegado o no — no existe un
// ":stuck" estándar. El truco habitual: un centinela de altura 0
// justo antes del bloque sticky; en cuanto ese centinela sale del
// viewport por arriba, el sticky ya está pegado. Con eso se alterna
// ".is-stuck" en el bloque, y el título "PROYECTOS" se encoge (ver
// global.css) en vez de desaparecer, como indicador de sección.
let stuckObserver: IntersectionObserver | undefined;

// [Fix] "scrollIntoView" mueve TODOS los contenedores con scroll
// necesarios para hacer visible el elemento — no solo el contenedor
// horizontal de pestañas al que estaba dirigido, sino también la
// página entera si hace falta (su eje vertical), usando el scroll
// NATIVO del navegador. Como el scroll vertical del sitio lo lleva
// Lenis (no el nativo), cada cambio de categoría desincronizaba un
// poco más a Lenis de la posición real — el error se iba acumulando y
// solo se notaba a partir del segundo cambio en adelante (el primero
// aún no arrastraba desajuste), manifestándose como el header
// "moviéndose" de sitio. Esta función solo toca el contenedor
// horizontal de la barra (su propio "scrollLeft"), nunca el documento,
// así es imposible que afecte al scroll vertical ni a Lenis.
function scrollPillIntoView(pill: HTMLElement, behavior: ScrollBehavior) {
  const container = pill.closest<HTMLElement>(".no-scrollbar");
  if (!container) return;
  const pillRect = pill.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  if (pillRect.left < containerRect.left) {
    container.scrollBy({ left: pillRect.left - containerRect.left, behavior });
  } else if (pillRect.right > containerRect.right) {
    container.scrollBy({ left: pillRect.right - containerRect.right, behavior });
  }
}

function watchStuckState(header: HTMLElement) {
  const sentinel = document.querySelector<HTMLElement>("[data-sticky-sentinel]");
  if (!sentinel) return;

  stuckObserver = new IntersectionObserver(([entry]) => header.classList.toggle("is-stuck", !entry.isIntersecting), { threshold: 0 });
  stuckObserver.observe(sentinel);
}

// Las páginas de servicio (/bodas/, /eventos/...) son documentos
// distintos de verdad: cambiar de categoría ahí es una navegación real
// (enlaces <a>, no radios), así que cada una vuelve a arrancar con el
// bloque sticky en su estado inicial (título visible, sin scroll). Si
// el usuario venía con la barra ya "stuck" (scrolleado, título
// colapsado), eso se sentía como un salto: el título "reaparecía" de
// golpe y el scroll volvía arriba. Guardamos la posición justo antes
// de navegar y la restauramos (de forma instantánea, sin animación)
// nada más cargar la página siguiente, para que el bloque sticky
// arranque ya en el mismo estado en el que estaba.
const SCROLL_KEY = "proyectos-scroll-y";

function preserveScrollOnCategoryNav(header: HTMLElement) {
  document.querySelectorAll<HTMLAnchorElement>(".filter-pill[href]").forEach((link) => {
    link.addEventListener("click", () => {
      if (header.classList.contains("is-stuck")) {
        sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
      }
    });
  });
}

// IMPORTANTE: nunca "window.scrollTo" nativo aquí. Lenis lleva su
// propio valor de scroll animado por dentro, separado del scroll
// nativo del navegador; si se mueve la página por fuera de Lenis (como
// hacía esta función antes), Lenis no se entera y se queda con su
// valor interno desactualizado. La UI seguía viéndose bien en el acto,
// pero en cuanto el usuario volvía a tocar la rueda/el táctil, Lenis
// "corregía" de golpe hacia su posición interna vieja — un salto que
// solo aparecía tras seguir navegando (justo el "funciona la primera
// vez, luego cambia" reportado), no en el instante de la restauración.
// "lenis.scrollTo(..., { immediate: true })" mueve Lenis Y el scroll
// real a la vez, sin animación, así ambos quedan sincronizados desde
// el primer momento.
function restoreScrollFromCategoryNav(lenis: ReturnType<typeof getLenis>) {
  const saved = sessionStorage.getItem(SCROLL_KEY);
  sessionStorage.removeItem(SCROLL_KEY);
  if (saved === null) return;
  const y = Number(saved);
  if (lenis) {
    lenis.scrollTo(y, { immediate: true });
  } else {
    window.scrollTo(0, y);
  }
}

function setup() {
  const lenis = getLenis();
  restoreScrollFromCategoryNav(lenis);

  const header = document.querySelector<HTMLElement>("[data-fixed-header]");
  const grid = document.querySelector<HTMLElement>("[data-portfolio-grid]");

  if (header) {
    watchStuckState(header);
    preserveScrollOnCategoryNav(header);
  }

  document.querySelectorAll<HTMLInputElement>('input[name="pf-filter"]').forEach((input) => {
    input.addEventListener("change", () => {
      // Pestaña elegida siempre visible dentro de la barra horizontal.
      const label = document.querySelector<HTMLElement>(`label[for="${input.id}"]`);
      if (label) scrollPillIntoView(label, "smooth");

      // Cuadrícula filtrada, siempre visible justo debajo del bloque
      // fijo: se usa Lenis (si está activo) en vez de scrollIntoView
      // nativo, porque mezclar ambos motores de scroll en la misma
      // página produce un salto/parpadeo perceptible.
      if (!grid) return;
      const headerHeight = header?.offsetHeight ?? 0;
      if (lenis) {
        lenis.scrollTo(grid, { offset: -headerHeight, duration: 1 });
      } else {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Páginas de servicio (bodas, eventos...): el filtro activo se marca
  // por navegación de página, no por radio; al llegar puede estar fuera
  // de la vista en móvil, así que se desplaza al inicio sin animación
  // (ya estamos cargando la página, no hace falta el "smooth").
  const active = document.querySelector<HTMLElement>(".filter-pill.is-active");
  if (active) scrollPillIntoView(active, "auto");
}

function cleanup() {
  stuckObserver?.disconnect();
  stuckObserver = undefined;
}

runOnPageLoad(setup, cleanup);
