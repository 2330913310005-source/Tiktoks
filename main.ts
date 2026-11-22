// bring-the-humans-03 entry: the video ad is the entry, posted on TikTok.
// This program only hands the house the video's address: it copies VIDEO.json
// from the repository (/bot in the grader) into /output.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The full address TikTok shows in a browser; short links (vm./vt./tiktok.com/t/) are refused by the house.
const FULL_URL = /^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/]+\/video\/\d+([?#].*)?$/;

function fail(msg: string): never {
  console.error(`main.ts: ${msg}`);
  process.exit(1);
}

let raw: Buffer;
try {
  raw = readFileSync(join(botDir, 'VIDEO.json'));
} catch (err) {
  fail(`cannot read VIDEO.json in ${botDir}: ${(err as Error).message}`);
}
if (raw.length > 16384) fail('VIDEO.json is over 16384 bytes');

let video: { url?: unknown };
try {
  video = JSON.parse(raw.toString('utf8'));
} catch {
  fail('VIDEO.json is not valid JSON');
}
if (typeof video.url !== 'string' || !FULL_URL.test(video.url)) {
  fail('VIDEO.json url must be https://www.tiktok.com/@<handle>/video/<id>');
}

// Copy the bytes unchanged, so both grader runs write the same output.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'VIDEO.json'), raw);
