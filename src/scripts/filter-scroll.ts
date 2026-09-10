import { getLenis } from "@/scripts/smooth-scroll";
import { runOnPageLoad } from "@/scripts/on-page-load";

// Filtro de Proyectos (radio + :has(), cero JS para el filtrado en sí):
// al seleccionar una categoría, la barra de pestañas puede desplazarse
// horizontalmente y la cuadrícula de fotos cambia de alto, así que este
// script mínimo (a) mantiene la pestaña elegida visible dentro de la
// barra y (b) lleva la cuadrícula justo debajo de la barra de categorías
// sticky. Progressive enhancement: sin JS, el filtro sigue funcionando.
//
// NOTA: ya NO hay lógica de "is-stuck"/centinela. El título "PROYECTOS"
// vive en flujo normal y se va con el scroll; solo la barra de
// categorías es sticky (ver ProjectsGallery.astro). Antes el título se
// colapsaba por JS al quedar pegado, lo que causaba el salto/oscilación
// en móvil que este cambio elimina.

// [Fix] "scrollIntoView" nativo movería TODOS los contenedores con
// scroll (incluida la página entera), y en desktop eso desincroniza a
// Lenis. Esta función solo toca el "scrollLeft" del contenedor
// horizontal de la barra, nunca el documento. Alinea la pestaña al borde
// IZQUIERDO del área visible, para que se vean de un vistazo las que
// vienen después.
function scrollPillIntoView(pill: HTMLElement, behavior: ScrollBehavior) {
  const container = pill.closest<HTMLElement>(".no-scrollbar");
  if (!container) return;
  const pillRect = pill.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  container.scrollBy({ left: pillRect.left - containerRect.left, behavior });
}

// Cambiar de categoría en las páginas de servicio (/bodas/, /eventos/...)
// es una navegación real (enlaces <a>). Para que se sienta como "solo
// cambiaron las fotos" (igual que el filtro CSS de /proyectos/), se
// guarda la posición de scroll al pulsar una pestaña y se restaura al
// cargar la página siguiente.
const SCROLL_KEY = "proyectos-scroll-y";

function preserveScrollOnCategoryNav() {
  document.querySelectorAll<HTMLAnchorElement>(".filter-pill[href]").forEach((link) => {
    link.addEventListener("click", () => {
      sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    });
  });
}

// IMPORTANTE: nunca "window.scrollTo" nativo si Lenis está activo (solo
// desktop): Lenis lleva su propio valor de scroll animado; moverlo por
// fuera lo desincroniza y "corrige" de golpe al siguiente gesto. En
// móvil Lenis está desactivado (scroll nativo), así que ahí sí se usa
// window.scrollTo. Se limita a la altura real del documento por si la
// nueva categoría tiene menos fotos que la anterior.
function restoreScrollFromCategoryNav(lenis: ReturnType<typeof getLenis>) {
  const saved = sessionStorage.getItem(SCROLL_KEY);
  sessionStorage.removeItem(SCROLL_KEY);
  if (saved === null) return;
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const y = Math.min(Number(saved), maxY);
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

  preserveScrollOnCategoryNav();

  document.querySelectorAll<HTMLInputElement>('input[name="pf-filter"]').forEach((input) => {
    input.addEventListener("change", () => {
      // Pestaña elegida siempre visible dentro de la barra horizontal.
      const label = document.querySelector<HTMLElement>(`label[for="${input.id}"]`);
      if (label) scrollPillIntoView(label, "smooth");

      // Cuadrícula filtrada, siempre visible justo debajo de la barra
      // sticky. Se usa Lenis (si está activo) en vez de scrollIntoView
      // nativo, porque mezclar ambos motores produce un salto/parpadeo.
      if (!grid) return;
      const headerHeight = header?.offsetHeight ?? 0;
      if (lenis) {
        lenis.scrollTo(grid, { offset: -headerHeight, duration: 1 });
      } else {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Páginas de servicio: el filtro activo se marca por navegación, no por
  // radio; al llegar puede estar fuera de la vista en móvil, así que se
  // desplaza al inicio de la barra sin animación.
  const active = document.querySelector<HTMLElement>(".filter-pill.is-active");
  if (active) scrollPillIntoView(active, "auto");
}

runOnPageLoad(setup);
