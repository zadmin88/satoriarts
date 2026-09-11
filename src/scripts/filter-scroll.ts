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

// [Fix] Antes había un "preserveScrollOnCategoryNav"/
// "restoreScrollFromCategoryNav" que guardaba la posición de scroll en
// sessionStorage al pulsar una pestaña y la restauraba en la página
// siguiente — pensado para que cambiar de categoría (una navegación
// real en /bodas/, /eventos/...) no hiciera "saltar" el título
// "PROYECTOS", que entonces vivía DENTRO del bloque sticky y se
// colapsaba por JS. Ese colapso ya no existe (el título va en flujo
// normal, ver ProjectsGallery.astro), así que ese mecanismo ya no
// arreglaba nada — y se había convertido en la causa de un bug nuevo:
// cualquier valor que quedara en sessionStorage (de una pestaña
// pulsada en CUALQUIER visita anterior de la sesión del navegador, no
// solo la actual) se aplicaba igual en la siguiente carga, aunque el
// usuario llegara sin haber hecho scroll — auto-desplazando la página
// y haciendo que la barra sticky pareciera "pegada" desde el primer
// instante, sin que el usuario hubiera scrolleado. Eliminado por
// completo: cada página ahora carga siempre en su scroll real (0,
// salvo restauración nativa del navegador), y la barra solo se pega
// cuando el usuario de verdad hace scroll hasta ahí.
// [Fix adicional] Además de quitar el "restore" propio y desactivar la
// restauración nativa del navegador (on-page-load.ts), esta página
// fuerza su propio scroll a 0 al cargar — sin condiciones ni
// excepciones. Es la garantía definitiva: pase lo que pase durante la
// transición entre categorías (View Transitions, un frame intermedio
// del cross-fade con el scroll de la página anterior aún visible,
// cualquier comportamiento del navegador que se nos escape), cada
// categoría de Proyectos SIEMPRE arranca arriba del todo, con
// "PROYECTOS" visible, nunca a mitad de scroll ni con la barra ya
// pegada. Se hace de forma inmediata (sin animación) para que no se
// note como un salto — el usuario nunca debería percibir esto, solo
// beneficiarse de que ya no ocurra el bug.
function forceScrollTopOnLoad(lenis: ReturnType<typeof getLenis>) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
}

function setup() {
  const lenis = getLenis();
  forceScrollTopOnLoad(lenis);

  const header = document.querySelector<HTMLElement>("[data-fixed-header]");
  const grid = document.querySelector<HTMLElement>("[data-portfolio-grid]");

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
