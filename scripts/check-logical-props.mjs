// Fails the build if physical-direction Tailwind utilities appear (PRD REQ-006/REQ-008:
// RTL correctness relies on logical properties only — ps/pe, ms/me, start/end, inset-x).
// Physical values in inline `style` objects (e.g. clipPath geometry) are not utilities and pass.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src';
const EXT = /\.(tsx?|css)$/;
// A utility token: optional variants (md:, hover:, rtl:), optional negative, then a banned prefix.
const BANNED = /(?:^|[\s"'`{])(?:[a-z-]+:)*-?(?:pl|pr|ml|mr|left|right)-[a-z0-9[\]./%-]+/g;

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : EXT.test(path) ? [path] : [];
  });
}

const violations = [];
for (const file of walk(ROOT)) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const match of line.matchAll(BANNED)) {
        violations.push(`${file}:${i + 1}  ${match[0].trim()}`);
      }
    });
}

if (violations.length) {
  console.error(
    `\n✖ ${violations.length} physical-direction utility class(es) found — use logical properties (ps-/pe-, ms-/me-, start-/end-, inset-x-):\n`,
  );
  violations.forEach((v) => console.error(`  ${v}`));
  console.error('');
  process.exit(1);
}
console.log('✔ logical properties: no physical-direction utilities in src/');
