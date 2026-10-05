import { runOnPageLoad } from "@/scripts/on-page-load";

// Vídeo de fondo del hero: "autoplay" no siempre basta. Tras una
// navegación con las View Transitions de Astro (volver a la home desde
// otra página), o si el navegador pausa la carga, el <video> puede
// quedarse congelado en su primer fotograma — el "se queda la imagen y
// el vídeo no carga" reportado. Aquí se fuerza play() en cuanto se
// puede, y se reintenta cuando hay datos suficientes. Si el navegador lo
// bloquea (p. ej. modo de ahorro de batería en iOS), se queda el poster:
// es el comportamiento esperado, sin errores en consola.
function setup() {
  document.querySelectorAll<HTMLVideoElement>("video[data-hero-video]").forEach((video) => {
    video.muted = true; // requisito de autoplay en todos los navegadores
    const tryPlay = () => {
      if (video.paused) video.play().catch(() => {});
    };
    tryPlay();
    video.addEventListener("canplay", tryPlay, { once: true });
    video.addEventListener("loadeddata", tryPlay, { once: true });
  });
}

runOnPageLoad(setup);
