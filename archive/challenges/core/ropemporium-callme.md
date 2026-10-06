---
id: ch-ropemporium-callme
name: callme
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: basic
url: https://ropemporium.com/challenge/callme.html
knowledge_points:
  - core-rop-basics
  - fnd-calling-convention
prerequisites:
  - core-rop-basics
why_selected: 多参数×多次调用的链式训练；官方明示 64/32 位调用约定差异是本关考点。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# callme（ROP Emporium #3）

按序调用 `callme(0xdeadbeef, 0xcafebabebabe, 0xd00df00d)` 三次（参数魔数见官方页）。

<details><summary>Hint 1</summary>三个参数都要布进寄存器——找齐 pop rdi/rsi/rdx 类 gadget。</details>
<details><summary>Hint 2</summary>x64 缺 rdx 时：本题附带的 libc 里有 `__libc_csu_init` 类 gadget 或组合 gadget（ret2csu 预热）。</details>
<details><summary>Hint 3</summary>同一组 gadget 重复三次即完成三连调用。</details>
