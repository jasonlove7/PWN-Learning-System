---
id: ch-nightmare-inctf17-stupidrop
name: stupidrop (InCTF 2017)
platform: InCTF 2017
event: InCTF
year: 2017
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/16-srop/inctf17_stupidrop/index.html
knowledge_points:
  - core-srop
prerequisites:
  - core-ret2syscall
why_selected: |
  Nightmare SROP 模块的 InCTF 2017 stupidrop（站点拼写是 stupidrop，不是 stupiddrop）。
  用 sigreturn 帧设置寄存器并发起 syscall。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-inctf17-stupidrop
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页，标题 Inctf 2017 stupidrop。
  侧栏链接拼写为 stupidrop；索引正文里另有未链接的 stupiddrop 字样。
  旧 id ch-nightmare-inctf17-stupiddrop 废弃。
  该深页是 SROP，未见 stack pivot 作为本题技术，故去掉 core-stack-pivot。
  原赛事归档 URL 未验证。
---

# stupidrop（InCTF 2017）

> 入口：<https://guyinatuxedo.github.io/16-srop/inctf17_stupidrop/index.html>

## 任务

用一帧 sigreturn 布好寄存器，再发起你需要的 syscall。

<details><summary>Hint 1（方向）</summary>

二进制里有没有能把 syscall 号放进 rax 再执行 syscall 的 gadget？

</details>

<details><summary>Hint 2（方法）</summary>

SigreturnFrame 填目标 syscall 的寄存器。帧本身放在溢出之后的栈上。

</details>

<details><summary>Hint 3（关键细节）</summary>

`rt_sigreturn` 的调用号要先就位，然后才是那一帧。帧里的 rip 决定 sigreturn 返回后去哪。

</details>

## 复盘要点

- 学会：SROP 与普通 ROP 的差别是「一次恢复所有寄存器」。
- 去向：[core-srop](../../knowledge/rop/srop.md)。
