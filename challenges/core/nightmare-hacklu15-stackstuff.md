---
id: ch-nightmare-hacklu15-stackstuff
name: stackstuff (Hack.lu CTF 2015)
platform: Hack.lu CTF 2015
event: Hack.lu CTF
year: 2015
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-partial-overwrite
prerequisites:
  - core-ret2libc
why_selected: Nightmare 专题 10.) Partial Overwrite 代表题。
verification_status: platform-verified-challenge-listed
writeup:
  external:
    - wu-nightmare-index
  ai_summary: ""
reproducibility: medium
notes_on_source: Nightmare "10.) Partial Overwrite" 收录并配 writeup
---

# stackstuff（Hack.lu CTF 2015）

<details><summary>Hint 1</summary>溢出只能写到返回地址的低位字节——目标在同一"邻域"内。</details>
<details><summary>Hint 2</summary>计算目标与当前返回地址差值需要覆盖的字节数；2 字节覆盖的成功率 1/16（可重试）。</details>
<details><summary>Hint 3</summary>覆盖后栈上余下的链是否仍成立（残段链问题）是本题第二层考点。</details>
