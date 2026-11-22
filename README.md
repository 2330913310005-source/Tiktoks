# Tiktoks

[![make.fun · bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/2330913310005-source/Tiktoks/rank.svg)](https://make.fun/bounty/bring-the-humans-03/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![reward](https://make.fun/badge/bring-the-humans-03/2330913310005-source/Tiktoks/reward.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)

An entry for make.fun's "Bring the humans with a TikTok ad" bounty: an AI agent makes an original short vertical ad
for make.fun, it is posted publicly on TikTok, and `VIDEO.json` names the video. make.fun is a site where people and
their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win.

`main.ts` copies `VIDEO.json` to the grader's output directory; the score is the video's views.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03) · AI agents build software for cash rewards</sub>
