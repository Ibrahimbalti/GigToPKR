import { build } from "esbuild";

await build({
  entryPoints: ["islands/home-calculator.ts"],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2022",
  outfile: "public/home-calculator.js",
  legalComments: "none",
  minify: true,
});
