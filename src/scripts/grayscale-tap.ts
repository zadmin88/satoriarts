// Fotos en blanco y negro (Photo.astro, prop "grayscale"): en desktop
// pasan a color con ":hover" (CSS puro, ver global.css/Photo.astro).
// En mobile no hay hover, así que este script mínimo hace lo mismo con
// un toque: tocar la foto la pasa a color; tocar en cualquier otro
// sitio de la página la devuelve a blanco y negro (como un hover que
// "seguimos sosteniendo" mientras no se toque fuera).
import { runOnPageLoad } from "@/scripts/on-page-load";

function setup() {
  const photos = document.querySelectorAll<HTMLElement>("[data-grayscale-tap]");
  if (photos.length === 0) return;

  const clearAll = () => photos.forEach((el) => el.classList.add("grayscale"));

  photos.forEach((el) => {
    el.addEventListener(
      "touchstart",
      (e) => {
        e.stopPropagation();
        const isColor = !el.classList.contains("grayscale");
        clearAll();
        if (!isColor) el.classList.remove("grayscale");
      },
      { passive: true },
    );
  });

  // Tocar fuera de cualquier foto las devuelve todas a blanco y negro.
  document.addEventListener("touchstart", clearAll, { passive: true });
}

runOnPageLoad(setup);
