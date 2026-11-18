import { readFileSync } from "node:fs";
import { join } from "node:path";

const headers = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=0, must-revalidate",
};

export async function GET(request: Request) {
  try {
    const html = readFileSync(join(process.cwd(), "public/home-static.html"), "utf8");
    return new Response(html, { headers });
  } catch {
    // On Netlify, files in public/ are served by the CDN and are not bundled
    // into the server function, so fetch the deployed static copy instead.
    const res = await fetch(new URL("/home-static.html", request.url));
    if (!res.ok) return Response.redirect(new URL("/", request.url), 307);
    return new Response(await res.text(), { headers });
  }
}
