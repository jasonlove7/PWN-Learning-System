---
id: ch-ropemporium-ret2win
name: ret2win
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: beginner
url: https://ropemporium.com/challenge/ret2win.html
knowledge_points:
  - core-stack-overflow
  - core-ret2win
prerequisites:
  - fnd-pwntools
why_selected: 本系列第一关；官方偏移 x64=40/x86=44（已验证），最干净的控制流劫持入门。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# ret2win（ROP Emporium #1）

覆盖返回地址到程序自带的 `ret2win` 函数拿 flag。x86_64 / x86 / ARMv5 / MIPSel 四架构各做一遍。

<details><summary>Hint 1</summary>cyclic 定位偏移；nm/反汇编找目标函数。</details>
<details><summary>Hint 2</summary>x64=40、x86=44（官方页公开此值——先自己 cyclic 算一遍再对答案）。</details>
<details><summary>Hint 3</summary>若崩溃考虑返回地址+1 跳过 prologue 与栈对齐问题。</details>
