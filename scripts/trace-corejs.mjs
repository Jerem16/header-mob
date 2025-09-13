import { glob } from "glob";
import fs from "node:fs/promises";

const maps = await glob(".next/static/chunks/**/*.js.map");
const hits = [];
for (const m of maps) {
    const txt = await fs.readFile(m, "utf8");
    if (!txt.includes("core-js")) continue;
    const map = JSON.parse(txt);
    const found = (map.sources || []).filter((s) => s.includes("core-js"));
    if (found.length) hits.push({ map: m, sources: [...new Set(found)] });
}
console.log(JSON.stringify(hits, null, 2));
