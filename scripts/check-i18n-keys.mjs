// Fails the build when en.json and ar.json drift apart — a key present in one
// locale but not the other makes next-intl throw at render time.
import fs from "node:fs";

const load = (l) => JSON.parse(fs.readFileSync(`src/messages/${l}.json`, "utf8"));
const keys = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" ? keys(v, `${p}${k}.`) : [`${p}${k}`]));

const en = new Set(keys(load("en")));
const ar = new Set(keys(load("ar")));
const missingAr = [...en].filter((k) => !ar.has(k));
const missingEn = [...ar].filter((k) => !en.has(k));

if (missingAr.length || missingEn.length) {
  if (missingAr.length) console.error("Missing in ar.json:\n  " + missingAr.join("\n  "));
  if (missingEn.length) console.error("Missing in en.json:\n  " + missingEn.join("\n  "));
  process.exit(1);
}
console.log(`i18n keys OK (${en.size} keys, en/ar in sync)`);
