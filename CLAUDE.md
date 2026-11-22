# News image design rules

This repo makes news images for TikTok / Instagram. When asked for a news image,
use `news-image/` and follow these rules. Do not invent a new layout each time.

## How to make one
1. Copy `news-image/examples/story.json` (vertical 1080x1920) or `feed.json` (4:5, 1080x1350).
2. Fill in the fields. Wrap the ONE most important word or number in `*stars*` to color it.
3. Optional `photo`: a path next to the JSON file, or a URL. Leave empty for the gradient background.
4. `cd news-image && node render.js examples/<name>.json` → PNG in `news-image/out/`.
5. Open the PNG and check it yourself before sending: nothing cut off, headline readable at phone size.

## Rules that make it look good
- **One message per image.** Headline ≤ 10 words, subtitle (dek) ≤ 18 words. Cut, don't shrink.
- **One accent color per image**, chosen by category, used on: category label, highlighted word, small line, dot.
  Ekonomi `#FF3B30`, Teknologi `#2F7BFF`, Olahraga `#00C389`, Politik `#FF9F0A`,
  Hiburan `#FF2D78`, Kesehatan `#14B8A6`, Dunia `#8B5CF6`, Cuaca/Bencana `#FFCC00`.
- **Highlight only one thing**: the number or keyword the viewer should remember.
- **Type**: Archivo Black-weight for the headline (tight, big); Inter for everything else. Never more than 2 fonts.
- **Hierarchy**: category → headline → subtitle → source/date. Each step clearly smaller and quieter.
- **Contrast**: always text on the dark scrim, white text; never text straight on a busy photo.
- **Spacing**: 80px side margins; generous empty space above the text block. Empty space is not wasted.
- **TikTok safe zone**: keep text out of the bottom ~300px and right ~140px (app buttons/caption cover them).
  The `story` format already does this.
- **Always show the source.** Never fabricate quotes, numbers, logos or sources; use only facts the user gives.
- **Photos**: use the user's own or properly licensed photos; prefer a face or a clear subject in the top half.
- Avoid: drop shadows on everything, more than 3 colors, all-caps headlines, centered long text, emoji in headlines,
  clip-art icons, stretched images.
