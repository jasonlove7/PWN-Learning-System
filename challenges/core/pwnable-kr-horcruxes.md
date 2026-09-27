---
id: ch-pwnable-kr-horcruxes
name: horcruxes
platform: pwnable.kr
event: ""
year: ""
category: core
difficulty: intermediate
url: http://pwnable.kr/play.php
knowledge_points:
  - core-rop-basics
  - fnd-got-plt-fundamentals
prerequisites:
  - core-ret2win
why_selected: gandalf 系 ROP 多段调用训练（调用多个函数收集"分片"再触发最终函数）。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# horcruxes（pwnable.kr · Toddler's Bottle）

<details><summary>Hint 1</summary>目标是"收集若干函数的返回值再触发 check"——ROP 链要串多次调用。</details>
<details><summary>Hint 2</summary>每个分片函数的返回值（rax）需要被"存起来"——看看程序自带的存储机制（alarm/全局变量）。</details>
<details><summary>Hint 3</summary>链形：ret 到各分片函数 → 最后 ret 到汇总函数；参数与清栈自己理。</details>
