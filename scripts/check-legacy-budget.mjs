import { execSync } from "node:child_process";
const out = execSync("node scripts/legacy-scan.mjs", {
    stdio: ["ignore", "pipe", "inherit"],
}).toString();
const { legacyKB } = JSON.parse(out);
const LIMIT = 0.5; // tolérance
if (legacyKB > LIMIT) {
    console.error(
        `❌ Legacy JS budget dépassé: ${legacyKB} KiB > ${LIMIT} KiB`
    );
    process.exit(1);
}
console.log(`✅ Legacy JS OK: ${legacyKB} KiB ≤ ${LIMIT} KiB`);
