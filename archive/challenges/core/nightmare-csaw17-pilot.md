---
id: ch-nightmare-csaw17-pilot
name: pilot (CSAW CTF 2017)
platform: CSAW CTF 2017
event: CSAW CTF
year: 2017
category: core
difficulty: basic
url: https://guyinatuxedo.github.io/06-bof_shellcode/csaw17_pilot/index.html
knowledge_points:
  - core-ret2shellcode
prerequisites:
  - core-ret2win
why_selected: Nightmare §3 代表题：栈上 shellcode 的标准场景（无 NX 的现代赛题样本）。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-csaw17-pilot
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 Csaw 2017 pilot。栈溢出可以覆盖保存的返回地址。原赛事归档 URL 未验证。
---

# pilot（CSAW CTF 2017）

<details><summary>Hint 1</summary>checksec：NX 关。程序把你输入的东西原样放栈上并告诉你它的地址。</summary>
<details><summary>Hint 2</summary>shellcraft.sh() 生成 → asm → 填充到偏移 → 返回地址=栈缓冲地址。</details>
<details><summary>Hint 3</summary>注意 shellcode 长度与偏移的关系（shellcode 在前 padding 在后）。</details>
