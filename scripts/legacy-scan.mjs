import { glob } from "glob";
import fs from "node:fs/promises";

const PATTERNS = [
    /__core-js_shared__/g,
    /core-js\//g,
    /regeneratorRuntime/g,
    /babelHelpers/g,
    /_classCallCheck/g,
    /_createClass/g,
    /_extends/g,
    /\$jscomp\./g,
];

const files = await glob(".next/static/**/*.js");
let total = 0,
    legacy = 0;

for (const f of files) {
    const b = await fs.readFile(f);
    total += b.byteLength;
    const t = b.toString("utf8");
    if (PATTERNS.some((rx) => rx.test(t))) legacy += b.byteLength;
}

console.log(
    JSON.stringify(
        {
            totalKB: +(total / 1024).toFixed(1),
            legacyKB: +(legacy / 1024).toFixed(1),
        },
        null,
        2
    )
);
