// Module loader for ai-qa.mjs: lets Node's native TS type-stripping import the
// app's source directly — resolves the "@/…" tsconfig alias and extensionless
// relative imports inside src/ to their .ts/.tsx files.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src");

function probe(p) {
  for (const cand of [p, `${p}.ts`, `${p}.tsx`, path.join(p, "index.ts")]) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) return cand;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const hit = probe(path.join(SRC, specifier.slice(2)));
    if (hit) return { url: pathToFileURL(hit).href, shortCircuit: true };
  }
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    const parent = fileURLToPath(context.parentURL);
    if (parent.startsWith(SRC)) {
      const hit = probe(path.resolve(path.dirname(parent), specifier));
      if (hit) return { url: pathToFileURL(hit).href, shortCircuit: true };
    }
  }
  return nextResolve(specifier, context);
}
