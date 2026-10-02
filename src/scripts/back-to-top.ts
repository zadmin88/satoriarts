import { getLenis } from "@/scripts/smooth-scroll";
import { runOnPageLoad } from "@/scripts/on-page-load";

// Flecha flotante "Volver arriba" (BackToTop.astro): visible tras
// scrollear un poco; al pulsarla sube al inicio. Con Lenis activo se le
// pide el scroll a él (el nativo lo desincronizaría); en táctil, scroll
// nativo suave.
const SHOW_AFTER = 400;

let onScroll: (() => void) | undefined;

function setup() {
  const btn = document.querySelector<HTMLElement>("[data-back-to-top]");
  if (!btn) return;

  // Se oculta al llegar al footer, que ya trae su propio "Volver arriba".
  const footer = document.querySelector("footer");
  onScroll = () => {
    const footerInView = !!footer && footer.getBoundingClientRect().top < window.innerHeight;
    btn.classList.toggle("is-visible", window.scrollY > SHOW_AFTER && !footerInView);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function cleanup() {
  if (onScroll) window.removeEventListener("scroll", onScroll);
  onScroll = undefined;
}

runOnPageLoad(setup, cleanup);
