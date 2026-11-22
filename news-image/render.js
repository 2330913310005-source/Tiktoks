// Usage: node render.js examples/story.json [out/name.png]
// Renders a news image from a JSON file. Set "format": "story" (1080x1920) or "feed" (1080x1350).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const input = process.argv[2];
  if (!input) { console.error('usage: node render.js <data.json> [out.png]'); process.exit(1); }
  const data = JSON.parse(fs.readFileSync(input, 'utf8'));
  if (data.photo && !/^(https?:|data:)/.test(data.photo)) {
    const p = path.resolve(path.dirname(input), data.photo);
    data.photo = `data:image/${path.extname(p).slice(1).replace('jpg','jpeg')};base64,` + fs.readFileSync(p).toString('base64');
  }
  const out = process.argv[3] || path.join(__dirname, 'out', path.basename(input, '.json') + '.png');
  const height = data.format === 'feed' ? 1350 : 1920;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height }, deviceScaleFactor: 1 });
  await page.addInitScript(d => { window.DATA = d; }, data);
  await page.goto('file://' + path.join(__dirname, 'template.html'));
  await page.waitForSelector('body[data-ready="1"]', { timeout: 15000 });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out });
  await browser.close();
  console.log('saved', out);
})();
