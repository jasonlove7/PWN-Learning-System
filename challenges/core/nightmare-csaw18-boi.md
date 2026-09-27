---
id: ch-nightmare-csaw18-boi
name: boi (CSAW CTF 2018)
platform: CSAW CTF 2018
event: CSAW CTF
year: 2018
category: core
difficulty: beginner
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-stack-overflow
  - core-ret2win
prerequisites:
  - fnd-pwntools
why_selected: Nightmare §1 首题：纯粹的"溢出到返回地址"第一滴血。
verification_status: platform-verified-challenge-listed
writeup:
  external: []
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 侧栏可见深链 https://guyinatuxedo.github.io/04-bof_variable/csaw18_boi/index.html ，本轮未打开该页正文，故不升为 deep-page verified，也不单列 writeup。
---

# boi（CSAW CTF 2018）

<details><summary>Hint 1</summary>cyclic 定位；目标：覆盖返回地址让程序走进"打印 flag 的分支"。</details>
<details><summary>Hint 2</summary>比较型题目——覆盖的是被比较的变量还是返回地址？先看 vuln 函数结构。</details>
<details><summary>Hint 3</summary>偏移量级 0x20+；64 位题注意地址字节完整。</details>
