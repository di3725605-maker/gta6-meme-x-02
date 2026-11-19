// Entry 2 for make.fun's gta6-meme-x-01 bounty: an HR memo meme.
// The joke lives on the break-room cork board: all 2026 sick leave is
// now "GTA 6 launch leave", with the make.fun ghost as the office
// mascot perched on the board. The X post is the entry. This program
// has one job: copy POST.json (the post's address) into the output
// directory so the grader can read it. The house fetches the post
// from X itself, so nothing written here is judged.
//
// Verified locally: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
// writes out/POST.json byte for byte.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');

if (!existsSync(source)) {
  console.error(`POST.json not found in ${botDir}`);
  process.exit(1);
}

// Read it once so a malformed file fails loudly here instead of handing
// a bad address downstream. The gate needs an object with a url string.
const parsed: unknown = JSON.parse(readFileSync(source, 'utf8'));
if (
  typeof parsed !== 'object' ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== 'string'
) {
  console.error('POST.json must be a JSON object with a url string');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, 'POST.json'));
