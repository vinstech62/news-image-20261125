import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry: copy the front-page image (drawn by work/make_frontpage.py)
// into the harness output directory. No network, no randomness.
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if (!existsSync(src)) {
  throw new Error("entry.png missing next to main.ts: " + src);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
const bytes = statSync(join(outDir, "entry.png")).size;
console.log(`wrote ${join(outDir, "entry.png")} (${bytes} bytes)`);
