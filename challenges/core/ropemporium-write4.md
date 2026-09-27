---
id: ch-ropemporium-write4
name: write4
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: basic
url: https://ropemporium.com/challenge/write4.html
knowledge_points:
  - core-rop-basics
prerequisites:
  - core-rop-basics
why_selected: ROP 形态的"写原语"训练：用 gadget 把数据写进可写内存（.data）。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# write4（ROP Emporium #4）

<details><summary>Hint 1</summary>字符串不在程序里——你要自己把它写进 .data 段。</details>
<details><summary>Hint 2</summary>找 `mov [寄存器], 寄存器` 型 gadget + 配套 pop。</details>
<details><summary>Hint 3</summary>写字符串到 .data → pop rdi 指向它 → 调用目标函数。</details>
