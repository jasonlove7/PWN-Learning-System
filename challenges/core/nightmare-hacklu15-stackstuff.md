---
id: ch-nightmare-hacklu15-stackstuff
name: stackstuff (Hack.lu CTF 2015)
platform: Hack.lu CTF 2015
event: Hack.lu CTF
year: 2015
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/15-partial_overwrite/hacklu15_stackstuff/index.html
knowledge_points:
  - core-partial-overwrite
prerequisites:
  - core-ret2libc
why_selected: Nightmare 专题 10.) Partial Overwrite 代表题。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-hacklu15-stackstuff
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 hacklu 2015 stackstuff。有长度限制的读仍然溢出并改到保存的返回地址。原赛事归档 URL 未验证。
---

# stackstuff（Hack.lu CTF 2015）

<details><summary>Hint 1</summary>溢出只能写到返回地址的低位字节——目标在同一"邻域"内。</details>
<details><summary>Hint 2</summary>计算目标与当前返回地址差值需要覆盖的字节数；2 字节覆盖的成功率 1/16（可重试）。</details>
<details><summary>Hint 3</summary>覆盖后栈上余下的链是否仍成立（残段链问题）是本题第二层考点。</details>
