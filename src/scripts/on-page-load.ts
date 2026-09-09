// Todos los scripts del sitio dependen del evento "astro:page-load"
// para inicializarse. Astro lo dispara tanto en la navegación interna
// (View Transitions) como en la carga inicial de la página — pero
// nuestros scripts son módulos con carga diferida (<script> en el
// <head>), y en una carga en frío/primera visita (sin nada en caché,
// más lenta en parsear/ejecutar JS) existe una condición de carrera
// real: si el navegador dispara "astro:page-load" ANTES de que el
// script llegue a registrar su listener, ese "page-load" se pierde
// para siempre y el script nunca se inicializa en esa carga — mientras
// que al navegar desde otra página del sitio ya cargada, el módulo
// sigue activo y sí llega a tiempo. Esto explica el patrón reportado
// varias veces: "funciona navegando, falla al recargar la URL
// directamente" (vídeo/fotos/footer con opacity:0 para siempre, por
// culpa de un ScrollTrigger que nunca llegó a crearse).
//
// runOnPageLoad(setup, cleanup) cubre ambos casos sin arriesgar una
// doble ejecución: si el evento SÍ llega a tiempo, se usa tal cual; si
// no, un macrotask (setTimeout 0, que le da al navegador margen de
// sobra para disparar el evento primero de forma normal) actúa de
// respaldo, ejecutando setup() una sola vez de todas formas.
export function runOnPageLoad(setup: () => void, cleanup?: () => void) {
  let hasRun = false;
  const runOnce = () => {
    if (hasRun) return;
    hasRun = true;
    setup();
  };

  document.addEventListener("astro:page-load", runOnce);
  document.addEventListener("astro:before-swap", () => {
    hasRun = false;
    cleanup?.();
  });

  setTimeout(runOnce, 0);
}
