// Entry program for make.fun's "Post a GTA 6 meme on X" bounty (gta6-meme-x-01).
// The grader runs this file twice, offline, with the repository mounted read-only.
// Its job: copy POST.json (the address of the meme's post on X) into the output
// directory, byte for byte, so both runs write exactly the same bytes.
import { readFileSync, writeFileSync, mkdirSync, chmodSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? process.cwd();
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");

const raw = readFileSync(join(botDir, "POST.json"));

// Fail loudly if the file is not the shape the bounty expects.
const post = JSON.parse(raw.toString("utf8")) as { url?: unknown };
if (typeof post.url !== "string" || !/^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+/.test(post.url)) {
  console.error("POST.json must be {\"url\": \"https://x.com/<handle>/status/<id>\"}");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "POST.json");
writeFileSync(target, raw);
chmodSync(target, 0o644);
console.log(`Copied ${post.url} to ${target}`);
