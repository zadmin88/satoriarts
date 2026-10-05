/**
 * Genera los ficheros web del vídeo del hero a partir de un vídeo original:
 *   public/video/hero-1080.mp4   (escritorio)
 *   public/video/hero-720.mp4    (móvil, ≤ 767px)
 *   public/video/hero-poster.webp (primer fotograma, se ve mientras carga)
 *
 * Sin audio (el vídeo va siempre en silencio), H.264 + "faststart" (empieza a
 * reproducirse antes de descargarse entero). Objetivo: pocos MB, no 18.
 *
 * Requiere ffmpeg en el PATH (https://ffmpeg.org) — o:  npx -y ffmpeg-static
 * Uso:  node scripts/encode-hero-video.mjs <ruta/al/video-original.mp4> [crf=28]
 *       (crf más alto = más ligero y menos calidad; 26–30 va bien de fondo)
 */
import { execFileSync } from "child_process";
import { createRequire } from "module";
import { mkdirSync } from "fs";
import path from "path";

const [src, crf = "28"] = process.argv.slice(2);
if (!src) {
  console.error("Uso: node scripts/encode-hero-video.mjs <video-original.mp4> [crf]");
  process.exit(1);
}

const require = createRequire(import.meta.url);
let ffmpeg = "ffmpeg";
try {
  ffmpeg = require("ffmpeg-static"); // si está instalado, se usa ese binario
} catch {}

const OUT = "public/video";
mkdirSync(OUT, { recursive: true });

const encode = (width, file) =>
  execFileSync(ffmpeg, [
    "-v", "error", "-y", "-i", src, "-an",
    "-vf", `scale=${width}:-2`,
    "-c:v", "libx264", "-preset", "slow", "-crf", crf,
    "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    path.join(OUT, file),
  ], { stdio: "inherit" });

encode(1920, "hero-1080.mp4");
encode(1280, "hero-720.mp4");

const png = path.join(OUT, "_poster.png");
execFileSync(ffmpeg, ["-v", "error", "-y", "-ss", "0", "-i", src, "-frames:v", "1", png], { stdio: "inherit" });
const sharp = require(require.resolve("sharp", { paths: [path.join(process.cwd(), "node_modules")] }));
await sharp(png).resize({ width: 1600 }).webp({ quality: 68 }).toFile(path.join(OUT, "hero-poster.webp"));
(await import("fs")).unlinkSync(png);

console.log("Listo: hero-1080.mp4, hero-720.mp4, hero-poster.webp en", OUT);
