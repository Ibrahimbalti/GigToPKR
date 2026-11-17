import { readFileSync } from "node:fs";
import { join } from "node:path";

export function GET() {
  const html = readFileSync(join(process.cwd(), "public/home-static.html"), "utf8");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
