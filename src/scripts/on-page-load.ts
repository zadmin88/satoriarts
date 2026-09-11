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
// [Fix] Por defecto, el navegador puede restaurar automáticamente una
// posición de scroll ANTERIOR guardada en su propio historial para esa
// URL (p. ej. si el usuario ya había scrolleado /bodas/ antes en esta
// pestaña y vuelve a navegar ahí) — un mecanismo del propio navegador,
// nada que ver con nuestro JS, pero con el mismo síntoma exacto que un
// bug nuestro: la página "llega ya scrolleada" sin que el usuario haga
// nada, activando de golpe el sticky de la barra de categorías. Con
// "manual" desactivamos esa restauración automática; cada navegación
// (incluida la SPA vía View Transitions) arranca siempre en su scroll
// real, nunca en uno heredado del historial.
if (typeof history !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

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
