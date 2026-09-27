---
id: ch-nightmare-csaw19-smallboi
name: smallboi (CSAW CTF 2019)
platform: CSAW CTF 2019
event: CSAW CTF
year: 2019
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-srop
prerequisites:
  - core-ret2syscall
why_selected: Nightmare 12.) SROP 经典最小样本。
verification_status: platform-verified-challenge-listed
writeup:
  external: []
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 侧栏可见深链 https://guyinatuxedo.github.io/16-srop/csaw19_smallboi/index.html ，本轮未打开该页正文，故不升为 deep-page verified，也不单列 writeup。
---

# smallboi（CSAW CTF 2019）

<details><summary>Hint 1</summary>静态小 binary、缓冲够放帧、有 syscall——SROP 全条件齐备。</details>
<details><summary>Hint 2</summary>rt_sigreturn 号 15（x86-64）；SigreturnFrame 填 execve 布局。</details>
<details><summary>Hint 3</summary>触发链只需两三个字长：pop rax;ret + 15 + syscall。</details>
