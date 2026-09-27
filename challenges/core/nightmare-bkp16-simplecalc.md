---
id: ch-nightmare-bkp16-simplecalc
name: simplecalc (BKP CTF 2016)
platform: BKP CTF 2016
event: BKP CTF
year: 2016
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-rop-basics
prerequisites:
  - core-ret2syscall
why_selected: Nightmare §4 静态 ROP 代表题：长链构造与 syscall 出口综合训练。
verification_status: platform-verified-challenge-listed
writeup:
  external: []
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 侧栏可见深链 https://guyinatuxedo.github.io/07-bof_static/bkp16_simplecalc/index.html ，本轮未打开该页正文，故不升为 deep-page verified，也不单列 writeup。
---

# simplecalc（BKP CTF 2016）

<details><summary>Hint 1</summary>静态链接+NX：syscall gadget 与寄存器装载全在二进制里找。</details>
<details><summary>Hint 2</summary>输入以"运算结果"形式写栈——payload 要通过计算器表达（工程量题）。</details>
<details><summary>Hint 3</summary>execve("/bin/sh",0,0) 的 ROP 布局 + 4 字节粒度写入约束。</details>
