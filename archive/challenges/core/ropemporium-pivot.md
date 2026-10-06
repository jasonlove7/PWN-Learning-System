---
id: ch-ropemporium-pivot
name: pivot
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: intermediate
url: https://ropemporium.com/challenge/pivot.html
knowledge_points:
  - core-stack-pivot
prerequisites:
  - core-rop-basics
why_selected: stack pivot 专门训练关：溢出窗口极小，必须把栈迁到第二缓冲区。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# pivot（ROP Emporium #7）

<details><summary>Hint 1</summary>第一次输入给了你一大片可控内存；第二次溢出只够覆盖返回地址——把两件事连起来。</details>
<details><summary>Hint 2</summary>找 xchg rsp,rax / pop rsp / leave;ret 类 gadget；新栈指向大缓冲。</details>
<details><summary>Hint 3</summary>新栈上从头排完整 ROP 链（此时空间自由）。</details>
