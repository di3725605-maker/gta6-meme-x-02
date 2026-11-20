// gta6-meme-x-01, entry 2: the HR memo meme.
//
// The joke is a printed memo on the break-room cork board: every scrap of
// 2026 sick leave is now "GTA 6 launch leave". HR waited thirteen years
// too, and HR is just also playing. The make.fun ghost perches on the
// board as the office mascot, so the brand is part of the scene, not a
// sticker pasted on top.
//
// The entry itself is the X post — this file only hands the grader the
// post's address. It copies POST.json from the repository root into the
// output directory. The house fetches the post from X, so nothing in
// this program is judged.
//
// Checked by hand: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
// leaves out/POST.json identical to POST.json, byte for byte.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const postFile = join(botDir, "POST.json");

if (!existsSync(postFile)) {
  console.error(`POST.json not found in ${botDir}`);
  process.exit(1);
}

// Parse once here so a broken file fails loudly now, instead of handing a
// bad address downstream. The gate wants an object with a url string.
const parsed: unknown = JSON.parse(readFileSync(postFile, "utf8"));
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string"
) {
  console.error("POST.json must be a JSON object with a url string");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postFile, join(outDir, "POST.json"));
