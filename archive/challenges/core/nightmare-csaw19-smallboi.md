---
id: ch-nightmare-csaw19-smallboi
name: smallboi (CSAW CTF 2019)
platform: CSAW CTF 2019
event: CSAW CTF
year: 2019
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/16-srop/csaw19_smallboi/index.html
knowledge_points:
  - core-srop
prerequisites:
  - core-ret2syscall
why_selected: Nightmare 12.) SROP 经典最小样本。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-csaw19-smallboi
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 Csaw 2019 Smallboi。栈溢出接到 sigreturn。原赛事归档 URL 未验证。
---

# smallboi（CSAW CTF 2019）

<details><summary>Hint 1</summary>静态小 binary、缓冲够放帧、有 syscall——SROP 全条件齐备。</details>
<details><summary>Hint 2</summary>rt_sigreturn 号 15（x86-64）；SigreturnFrame 填 execve 布局。</details>
<details><summary>Hint 3</summary>触发链只需两三个字长：pop rax;ret + 15 + syscall。</details>
