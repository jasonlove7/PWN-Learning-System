---
id: ch-nightmare-csaw16-warmup
name: warmup (CSAW CTF 2016)
platform: CSAW CTF 2016
event: CSAW CTF
year: 2016
category: core
difficulty: beginner
url: https://guyinatuxedo.github.io/05-bof_callfunction/csaw16_warmup/index.html
knowledge_points:
  - core-stack-overflow
  - core-ret2win
prerequisites: []
why_selected: Nightmare §2 首题：程序直接告诉你目标地址——纯"能不能覆盖"的检验。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-csaw16-warmup
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 Csaw 2016 Quals Warmup。无界栈读可以覆盖保存的返回指针。原赛事归档 URL 未验证。
---

# warmup（CSAW CTF 2016）

<details><summary>Hint 1</summary>题面给了函数地址；gets 溢出覆盖返回地址。</details>
<details><summary>Hint 2</summary>偏移用 cyclic；地址按小端 p64。</details>
<details><summary>Hint 3</summary>答案会以"再输入一次"的方式呈现——注意 interactive 后续操作。</details>
