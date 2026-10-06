---
id: ch-ropemporium-badchars
name: badchars
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: intermediate
url: https://ropemporium.com/challenge/badchars.html
knowledge_points:
  - core-stack-overflow
  - core-rop-basics
prerequisites:
  - ch-ropemporium-write4
why_selected: 坏字符处理（程序会破坏特定字符）——write4 的进阶：写入前先编码。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# badchars（ROP Emporium #5）

<details><summary>Hint 1</summary>程序会"翻译/破坏"若干坏字符（页面上会告诉你哪些）；你要写的字符串恰好含它们。</summary>
<details><summary>Hint 2</summary>两种思路：写入"加密版"再调用程序自带的解密 gadget；或写不含坏字符的等价物（xchg/加减偏移）。</details>
<details><summary>Hint 3</summary>write4 的链 + 编码一步——具体编码方案由程序的 badchar 表决定。</details>
