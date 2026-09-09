// Carrusel de clientes/testimonios: JS mínimo y aislado —sigue
// funcionando por arrastre/scroll táctil aunque este script no
// cargue—. Cada instancia vive dentro de un contenedor [data-carousel]
// con su propia pista y, opcionalmente, una barra de progreso delgada
// (en vez de flechas) que refleja cuánto se ha desplazado. Se
// reengancha en cada navegación de las View Transitions de Astro
// (astro:page-load).
import { runOnPageLoad } from "@/scripts/on-page-load";

function setupCarousel(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>("[data-carousel-track]");
  const progress = root.querySelector<HTMLElement>("[data-carousel-progress]");
  if (!track) return;

  const step = () => {
    const card = track.querySelector<HTMLElement>(":scope > *");
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    return card.getBoundingClientRect().width + gap;
  };

  const updateProgress = () => {
    const bar = progress?.parentElement;
    if (!progress || !bar) return;
    const max = track.scrollWidth - track.clientWidth;
    const visibleFraction = track.scrollWidth > 0 ? track.clientWidth / track.scrollWidth : 1;
    const thumbWidth = visibleFraction * bar.clientWidth;
    const maxThumbOffset = bar.clientWidth - thumbWidth;
    const scrolledFraction = max > 0 ? track.scrollLeft / max : 0;
    progress.style.width = `${thumbWidth}px`;
    progress.style.transform = `translateX(${scrolledFraction * maxThumbOffset}px)`;
  };

  const goNext = () => {
    const max = track.scrollWidth - track.clientWidth - 1;
    if (track.scrollLeft >= max) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step(), behavior: "smooth" });
    }
  };

  track.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Auto-avance: la pista se desplaza sola cada pocos segundos, en
  // bucle. Se detiene si el usuario interactúa (hover o arrastre) o si
  // prefiere menos movimiento, y no vuelve a arrancar sola tras esa
  // pausa —evita pelearse con un usuario que está navegando manualmente.
  //
  // El intervalo NO arranca en cuanto carga la página: "Testimonios"
  // está lejos, al final del home, y un "setInterval" empezando ya
  // desde astro:page-load avanzaba el carrusel varias veces (cada
  // 4.5s) mientras el usuario aún ni había llegado a verlo con el
  // scroll — por eso, al llegar, ya se veía descentrado en la segunda
  // o tercera reseña en vez de la primera. Con un IntersectionObserver
  // sobre la sección entera, el autoplay solo empieza la primera vez
  // que "Testimonios" es realmente visible, así el punto de partida
  // que ve el usuario es siempre la reseña 1.
  let autoplay: ReturnType<typeof setInterval> | undefined;
  const stopAutoplay = () => {
    if (autoplay) clearInterval(autoplay);
    autoplay = undefined;
  };
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        visibilityObserver.disconnect();
        autoplay = setInterval(goNext, 4500);
        root.addEventListener("pointerenter", stopAutoplay, { once: true });
        root.addEventListener("touchstart", stopAutoplay, { once: true, passive: true });
      },
      { threshold: 0.5 },
    );
    visibilityObserver.observe(root);
  }

  // La tarjeta más visible dentro de la pista (la que queda en primer
  // plano) recibe "is-active": una pequeña animación de escala/opacidad
  // (ver .carousel-track > * en global.css) marca cuál es el foco
  // actual del carrusel.
  const cards = track.querySelectorAll<HTMLElement>(":scope > *");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-active", entry.intersectionRatio >= 0.6);
      }
    },
    { root: track, threshold: [0, 0.6, 1] },
  );
  cards.forEach((card) => observer.observe(card));
}

function setup() {
  document.querySelectorAll<HTMLElement>("[data-carousel]").forEach(setupCarousel);
}

runOnPageLoad(setup);
