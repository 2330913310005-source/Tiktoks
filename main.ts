// bring-the-humans-03 entry: copies VIDEO.json from the repository root to the output directory, where the grader's
// gate reads it. The entry itself is the TikTok ad VIDEO.json names; nothing this program writes about it is scored.
//
// Locally, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate accepts only a full video address; short links (vm./vt.tiktok.com, tiktok.com/t/) and /photo/ posts fail.
const VIDEO_URL = /^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/?#]+\/video\/\d+([?#].*)?$/;

let raw: Buffer;
try {
  raw = readFileSync(join(botDir, 'VIDEO.json'));
} catch (err) {
  console.error(`could not read VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

// Warn (on stderr only) when the address will not pass the gate, but always hand the file on unchanged: the gate,
// not this program, decides, and both grader runs must write the same bytes.
try {
  const url = (JSON.parse(raw.toString('utf8')) as { url?: unknown }).url;
  if (typeof url !== 'string' || !VIDEO_URL.test(url)) {
    console.error(`warning: VIDEO.json url is not a full TikTok video address: ${JSON.stringify(url)}`);
  }
} catch (err) {
  console.error(`warning: VIDEO.json is not valid JSON: ${(err as Error).message}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'VIDEO.json'), raw);
