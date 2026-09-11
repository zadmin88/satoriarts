// Arrastre con ratón para contenedores con scroll horizontal
// (overflow-x:auto). El scroll táctil/trackpad ya funciona de forma
// nativa; lo que falta en desktop es poder hacer clic y arrastrar con
// un ratón normal (sin rueda horizontal ni trackpad) — este script
// mínimo añade justo eso a cualquier [data-drag-scroll], sin animación
// ni easing propios (deja que sea el propio "scrollLeft" nativo).
import { runOnPageLoad } from "@/scripts/on-page-load";

function setupDragScroll(el: HTMLElement) {
  let dragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  const onPointerDown = (e: PointerEvent) => {
    // Solo ratón: en touch/pen ya hay scroll nativo, y capturar el
    // puntero ahí impediría el gesto táctil normal (tap en un enlace).
    if (e.pointerType !== "mouse") return;
    dragging = true;
    startX = e.clientX;
    startScrollLeft = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    el.scrollLeft = startScrollLeft - (e.clientX - startX);
  };
  const onPointerUp = () => {
    dragging = false;
  };

  el.addEventListener("pointerdown", onPointerDown);
  el.addEventListener("pointermove", onPointerMove);
  el.addEventListener("pointerup", onPointerUp);
  el.addEventListener("pointercancel", onPointerUp);
}

function setup() {
  document.querySelectorAll<HTMLElement>("[data-drag-scroll]").forEach(setupDragScroll);
}

runOnPageLoad(setup);
