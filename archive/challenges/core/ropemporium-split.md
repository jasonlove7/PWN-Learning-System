---
id: ch-ropemporium-split
name: split
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: basic
url: https://ropemporium.com/challenge/split.html
knowledge_points:
  - core-rop-basics
prerequisites:
  - core-ret2win
why_selected: 第一个"真 ROP"：需要 pop rdi + 程序内现成字符串 + system 调用拼接。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# split（ROP Emporium #2）

<details><summary>Hint 1</summary>程序里有现成的"有用字符串"和"有用函数"（strings + 符号表）。</details>
<details><summary>Hint 2</summary>链形：pop rdi; ret → 字符串地址 → 目标函数。</details>
<details><summary>Hint 3</summary>16 字节对齐不齐时垫 ret。</details>
