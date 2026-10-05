/**
 * Comprobación SEO automática del sitio construido (./dist).
 * Aplica las reglas de .claude/skills/satori-seo/SKILL.md.
 *
 * Uso:   npm run seo:check        (hace build + comprobación)
 *        node scripts/seo-check.mjs   (solo comprobación, sobre ./dist)
 *
 * ERROR → sale con código 1 (no desplegar hasta corregirlo).
 * AVISO → revisar, no bloquea.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import path from "path";

const DIST = "dist";
const SITE = "https://satoriarts.es";

if (!existsSync(DIST)) {
  console.error("No existe ./dist — ejecuta antes `npm run build`.");
  process.exit(1);
}

const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") files.push(p);
  }
})(DIST);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const m1 = (re, s) => (s.match(re) || [])[1];
const all = (re, s) => [...s.matchAll(re)];

const PLACEHOLDER = /\[(PENDIENTE|PENDING|PENDENT|Contenido temporal|Contingut temporal|Placeholder content)\]|Contenido temporal|Contingut temporal|Placeholder content|lorem ipsum|34600000000|600 00 00 00/i;

const sitemap = existsSync(path.join(DIST, "sitemap-0.xml")) ? readFileSync(path.join(DIST, "sitemap-0.xml"), "utf8") : "";
const inSitemap = new Set(all(/<loc>([^<]+)<\/loc>/g, sitemap).map((x) => x[1].replace(SITE, "")));

const pages = [];
const linksOf = new Map(); // url → Set de URLs internas enlazadas con <a>

for (const f of files) {
  const raw = readFileSync(f, "utf8");
  const html = raw.replace(/<!--[\s\S]*?-->/g, ""); // los comentarios no cuentan
  const rel = path.relative(DIST, path.dirname(f)).replace(/\\/g, "/");
  const url = rel ? `/${rel}/` : "/";
  const head = m1(/<head>([\s\S]*?)<\/head>/, html) || "";
  const body = m1(/<body[^>]*>([\s\S]*)<\/body>/, html) || "";
  const visible = body
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

  const p = {
    url,
    title: decode(m1(/<title>([^<]*)<\/title>/, head) || ""),
    desc: decode(m1(/<meta name="description" content="([^"]*)"/, head) || ""),
    noindex: /<meta name="robots" content="noindex/.test(head),
    canonical: m1(/<link rel="canonical" href="([^"]+)"/, head),
    xdefault: /hreflang="x-default"/.test(head),
    h1: all(/<h1[\s>]/g, body).length,
    imgs: all(/<img\b[^>]*>/g, body).map((x) => x[0]),
    words: visible.trim().split(" ").filter(Boolean).length,
    placeholder: (PLACEHOLDER.exec(visible + " " + head) || [])[0],
  };
  pages.push(p);

  linksOf.set(url, new Set(all(/<a\b[^>]*\shref="(\/[^"#?]*)"/g, body).map((a) => a[1])));
}

// Páginas alcanzables desde las 3 homes siguiendo enlaces <a>, como haría
// Google. Una página que solo enlazan sus propias versiones en otros
// idiomas (selector ES/EN/CA) forma una "isla" y NO es alcanzable.
const reachable = new Set();
const queue = ["/", "/en/", "/ca/"].filter((u) => linksOf.has(u));
while (queue.length) {
  const u = queue.shift();
  if (reachable.has(u)) continue;
  reachable.add(u);
  for (const v of linksOf.get(u) || []) if (linksOf.has(v) && !reachable.has(v)) queue.push(v);
}

const errors = [];
const warns = [];
const E = (url, msg) => errors.push(`${url}  ${msg}`);
const W = (url, msg) => warns.push(`${url}  ${msg}`);

const indexable = pages.filter((p) => !p.noindex);
const byTitle = new Map();
const byDesc = new Map();

for (const p of pages) {
  if (p.h1 !== 1) E(p.url, `debe tener exactamente 1 <h1> (tiene ${p.h1})`);
  if (!p.title) E(p.url, "falta <title>");
  for (const img of p.imgs) {
    const decorative = /aria-hidden="true"/.test(img) || /role="presentation"/.test(img);
    if (!/\salt="/.test(img)) E(p.url, `imagen sin atributo alt: ${img.slice(0, 90)}…`);
    else if (/\salt=""/.test(img) && !decorative) E(p.url, `imagen con alt vacío (y no marcada como decorativa): ${img.slice(0, 90)}…`);
  }
}

for (const p of indexable) {
  if (!p.desc) E(p.url, "falta meta description");
  if (p.placeholder) E(p.url, `texto provisional visible/indexable: "${p.placeholder}" (complétalo o marca la página noindex/draft)`);
  if (!p.canonical || !p.canonical.startsWith(SITE)) E(p.url, `canonical ausente o fuera de ${SITE}: ${p.canonical}`);
  if (!p.xdefault) E(p.url, "falta hreflang x-default (¿se pasó `alternates` a BaseLayout?)");
  if (sitemap && !inSitemap.has(p.url)) E(p.url, "página indexable que NO está en el sitemap");
  if (p.title.length > 65) W(p.url, `title de ${p.title.length} caracteres (máx. ~65): "${p.title}"`);
  if (p.title.length && p.title.length < 20) W(p.url, `title muy corto (${p.title.length}): "${p.title}"`);
  if (p.desc && (p.desc.length < 70 || p.desc.length > 160)) W(p.url, `description de ${p.desc.length} caracteres (ideal 70–160)`);
  if (!reachable.has(p.url)) W(p.url, "no se llega a ella navegando desde la home (huérfana o solo enlazada por el selector de idioma)");
  if (p.words < 250 && /^\/(?:(?:en|ca)\/)?(bodas|hoteles|paisaje|weddings|hotels|landscape|casaments|paisatge|fotograf|wedding-|hotel-|landscape-)/.test(p.url))
    W(p.url, `contenido escaso para una página que debe posicionar (${p.words} palabras, objetivo ≥ 250)`);
  if (p.title) (byTitle.get(p.title) || byTitle.set(p.title, []).get(p.title)).push(p.url);
  if (p.desc) (byDesc.get(p.desc) || byDesc.set(p.desc, []).get(p.desc)).push(p.url);
}

for (const [t, urls] of byTitle) if (urls.length > 1) E(urls.join(", "), `title duplicado: "${t}"`);
for (const [d, urls] of byDesc) if (urls.length > 1) E(urls.join(", "), `description duplicada: "${d.slice(0, 60)}…"`);
for (const p of pages.filter((p) => p.noindex)) if (inSitemap.has(p.url)) E(p.url, "página noindex que SÍ aparece en el sitemap (añádela al filtro de astro.config.mjs)");

console.log(`SEO check: ${pages.length} páginas (${indexable.length} indexables, ${pages.length - indexable.length} noindex)\n`);
if (errors.length) {
  console.log(`✖ ${errors.length} ERROR(ES):`);
  errors.forEach((e) => console.log("  - " + e));
  console.log();
}
if (warns.length) {
  console.log(`⚠ ${warns.length} AVISO(S):`);
  warns.forEach((w) => console.log("  - " + w));
  console.log();
}
if (!errors.length && !warns.length) console.log("✔ Todo correcto.");
else if (!errors.length) console.log("✔ Sin errores (revisa los avisos).");
process.exit(errors.length ? 1 : 0);
