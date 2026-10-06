---
id: ch-nightmare-dcquals16-feedme
name: feedme (DEF CON Quals 2016)
platform: DEF CON Quals 2016
event: DEF CON Quals
year: 2016
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/07-bof_static/dcquals16_feedme/index.html
knowledge_points:
  - core-ret2syscall
prerequisites:
  - core-rop-basics
why_selected: |
  Nightmare 静态 ROP 模块的 DEF CON Quals 2016 feedme：子进程反复给机会逐字节猜 canary，
  之后用 ROP 做 shell syscall。用来把 ret2syscall 放在「有 canary、无 libc」的静态题上。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-dcquals16-feedme
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页，标题 defcon quals 2016 feedme。
  旧笔记里的赛事名 DCQuals 即此页的 DEF CON Quals。原题归档 URL 未验证。
---

# feedme（DEF CON Quals 2016）

> 入口：<https://guyinatuxedo.github.io/07-bof_static/dcquals16_feedme/index.html>

## 任务

先逐字节恢复 canary，再在静态二进制里用 syscall gadget 拿 shell。

<details><summary>Hint 1（方向）</summary>

程序会 fork。子进程崩溃不会杀掉你继续猜的机会。canary 每次一样吗？

</details>

<details><summary>Hint 2（方法）</summary>

一次只改 canary 的一个字节，用崩溃与否当 oracle。凑齐后再谈 ROP。

</details>

<details><summary>Hint 3（关键细节）</summary>

静态链接：在二进制里找 syscall 与 `"/bin/sh"`，按 32 位或 64 位调用约定布寄存器。本题不是 ret2libc。

</details>

## 复盘要点

- 学会：fork 场景下的逐字节 canary，以及静态题的 syscall 出口。
- 去向：[core-ret2syscall](../../knowledge/rop/ret2syscall.md)。
