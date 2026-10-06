---
id: ch-ropemporium-ret2csu
name: ret2csu
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: intermediate
url: https://ropemporium.com/challenge/ret2csu.html
knowledge_points:
  - core-ret2csu
prerequisites:
  - core-stack-pivot
why_selected: ret2csu 专门训练关（官方已验证：三参数 ret2win 调用 + __libc_csu_init gadget 讲解入口）。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# ret2csu（ROP Emporium #8 · 系列收官）

<details><summary>Hint 1</summary>官方建议：先试 ropper 创意组合（如 mov rdx,rbp+pop rbp）；不行再上 csu。</details>
<details><summary>Hint 2</summary>csu 两段式：pop rbx/rbp/r12-r15 布参数 → 调用段 mov rdx,r15; mov rsi,r14; mov edi,r13d; call [r12+rbx*8]。</details>
<details><summary>Hint 3</summary>rbx=0、rbp=1 使调用后计数判断顺利 ret；官方警告：新版 gcc 的 __libc_csu_init 寄存器映射可能不同（先实测本题二进制）。</details>
