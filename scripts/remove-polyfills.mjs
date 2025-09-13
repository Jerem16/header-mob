import { glob } from "glob";
import fs from "node:fs/promises";

const files = await glob("{app,pages,src}/**/*.{js,jsx,ts,tsx}");

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const modules = [
  "core-js/stable",
  "regenerator-runtime/runtime",
  "whatwg-fetch",
];
const pattern = modules.map(escapeRegExp).join("|");
const importRx = new RegExp(
  `^\\s*(?:import\\s+['"](?:${pattern})['"];?|require\\(\\s*['"](?:${pattern})['"]\\s*\\);?)\\s*\\n?`,
  "gm",
);
const scriptRx = new RegExp(
  "<Script[^>]*src=[\"'][^\"']*polyfill\\.io[^\"']*[\"'][^>]*>(?:\\s*<\\/Script>)?|<Script[^>]*src=[\"'][^\"']*polyfill\\.io[^\"']*[\"'][^>]*\\/?>",
  "g",
);

for (const f of files) {
  const src = await fs.readFile(f, "utf8");
  const cleaned = src.replace(importRx, "").replace(scriptRx, "");
  if (cleaned !== src) {
    await fs.writeFile(f, cleaned);
    console.log(`Nettoyé ${f}`);
  }
}
