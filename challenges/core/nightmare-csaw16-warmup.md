---
id: ch-nightmare-csaw16-warmup
name: warmup (CSAW CTF 2016)
platform: CSAW CTF 2016
event: CSAW CTF
year: 2016
category: core
difficulty: beginner
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-stack-overflow
  - core-ret2win
prerequisites: []
why_selected: Nightmare §2 首题：程序直接告诉你目标地址——纯"能不能覆盖"的检验。
verification_status: platform-verified-challenge-listed
writeup:
  external: []
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 侧栏可见深链 https://guyinatuxedo.github.io/05-bof_callfunction/csaw16_warmup/index.html ，本轮未打开该页正文，故不升为 deep-page verified，也不单列 writeup。
---

# warmup（CSAW CTF 2016）

<details><summary>Hint 1</summary>题面给了函数地址；gets 溢出覆盖返回地址。</details>
<details><summary>Hint 2</summary>偏移用 cyclic；地址按小端 p64。</details>
<details><summary>Hint 3</summary>答案会以"再输入一次"的方式呈现——注意 interactive 后续操作。</details>
