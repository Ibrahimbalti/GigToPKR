import fs from "node:fs";
import path from "node:path";

// The prerendered homepage location can differ between build environments
// (for example when a deployment adapter is active), so look in known spots.
const candidates = [
  ".next/server/app/index.html",
  ".next/server/app/(home).html",
  ".next/server/app/(home)/index.html",
  ".next/server/pages/index.html",
];
const source = candidates.find((file) => fs.existsSync(file));
if (!source) {
  console.warn("strip-home-runtime: prerendered homepage not found; skipping static homepage optimization.");
  process.exit(0);
}
let html = fs.readFileSync(source, "utf8");

html = html.replace(/<link rel="preload" as="script"[^>]*>/g, "");
html = html.replace(/<link rel="preload" href="\/_next\/static\/media\/[^"]+" as="font"[^>]*>/g, "");
html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/g, (full, attrs, body) => {
  if (attrs.includes("application/ld+json")) return full;
  const trimmed = body.trimStart();
  if (trimmed.startsWith("(() => {") && body.includes("[data-nav]")) return full;
  if (trimmed.startsWith('(function(){var root=document.querySelector("[data-home-calc]")')) return full;
  return "";
});

const homeCalcBoot =
  '<script>(function(){var root=document.querySelector("[data-home-calc]");if(!root)return;root.addEventListener("submit",function(event){event.preventDefault();});function load(){if(root.getAttribute("data-booted")==="1")return;root.setAttribute("data-booted","1");var script=document.createElement("script");script.src="/home-calculator.js";script.async=true;document.body.appendChild(script);}root.addEventListener("pointerdown",load,{capture:true,once:true});root.addEventListener("focusin",load,{once:true});root.addEventListener("pointerover",load,{once:true});})();</script>';
if (html.includes("data-home-calc") && !html.includes('document.querySelector("[data-home-calc]")')) {
  html = html.replace("</body>", `${homeCalcBoot}</body>`);
}

const hiddenStart = html.indexOf('<div hidden id="S:0">');
if (hiddenStart !== -1) {
  const openEnd = html.indexOf(">", hiddenStart) + 1;
  let depth = 1;
  let cursor = openEnd;
  while (cursor < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", cursor);
    const nextClose = html.indexOf("</div>", cursor);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      cursor = nextOpen + 4;
    } else {
      depth -= 1;
      cursor = nextClose + 6;
    }
  }
  const inner = html.slice(openEnd, cursor - 6);
  html = html.slice(0, hiddenStart) + html.slice(cursor);
  html = html.replace(
    /<!--\$\?--><template id="B:0"><\/template><div class="shell py-10" aria-busy="true"[\s\S]*?<!--\/\$-->/,
    inner,
  );
}

const cssMatch = html.match(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/);
if (!cssMatch) {
  console.warn("strip-home-runtime: homepage stylesheet missing; skipping static homepage optimization.");
  process.exit(0);
}
const cssUrl = cssMatch[1];
let css = fs.readFileSync(path.join(".next", "static", "chunks", path.basename(cssUrl)), "utf8");
const mediaOut = path.join("public", "media");
fs.mkdirSync(mediaOut, { recursive: true });
css = css.replace(/url\((?:'|")?\.\.\/media\/([^"')]+)(?:'|")?\)/g, (_full, file) => {
  const name = file.split("?")[0];
  fs.copyFileSync(path.join(".next", "static", "media", name), path.join(mediaOut, name));
  return `url(/media/${name})`;
});
fs.writeFileSync(path.join("public", "home.css"), css);
html = html.replaceAll(cssUrl, "/home.css");

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/home-static.html", html);
const scripts = [...html.matchAll(/<script\b[^>]*>/g)].length;
console.log("static homepage bytes", html.length, "script tags", scripts);
