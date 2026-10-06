---
id: ch-ropemporium-fluff
name: fluff
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: intermediate
url: https://ropemporium.com/challenge/fluff.html
knowledge_points:
  - core-rop-basics
prerequisites:
  - ch-ropemporium-write4
why_selected: 非显然 gadget 的组合训练（官方定位"更难的写原语"）。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# fluff（ROP Emporium #6）

<details><summary>Hint 1</summary>没有好用的 mov [reg],reg——写原语要靠"歪 gadget"拼。</details>
<details><summary>Hint 2</summary>xchg/加法/移位类 gadget 组合出等价效果；ropper 比 ROPgadget 更适合挖这类。</details>
<details><summary>Hint 3</summary>先想清楚"最终要写哪、值是什么"，再倒推 gadget 序列。</details>
