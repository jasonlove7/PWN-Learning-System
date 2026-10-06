---
id: ch-pwnable-kr-fd
name: fd
platform: pwnable.kr
event: ""
year: ""
category: foundation
difficulty: beginner
url: http://pwnable.kr/play.php
knowledge_points:
  - fnd-linux-syscalls
prerequisites: []
why_selected: |
  全球 PWN 入门第一题：用 fd 概念直接决定输入走向。教学价值极高——
  "理解文件描述符"比"会做题"更重要。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
solution_free_note: ""
---

# fd（pwnable.kr · Toddler's Bottle）

## 题目语境
读 `fd.c`，程序根据传入的 fd 数字决定 `read()` 从哪里读。让 `buf` 变成 `"LETMEWIN\n"` 即可通过。

<details><summary>Hint 1（方向）</summary>

题目名字就是答案的方向：这题不关于漏洞，关于 **fd 的语义**（0/1/2 是谁）。想想 `read(fd, ...)` 的 fd 取什么值时读的是"你敲的东西"。

</details>

<details><summary>Hint 2（方法）</summary>

`fd = atoi(argv[1]) - 常数`。先读源码算出需要的 argv[1]，再考虑怎么让 read 读到 LETMEWIN。

</details>

<details><summary>Hint 3（关键细节）</summary>

fd=0 即 stdin。算出 argv[1] 后运行程序，手动输入 `LETMEWIN` 回车。（细节自己算——这一步就是本题全部考点。）

</details>

## 复盘要点
- 学会：fd 语义、atoi、argv 交互。
- 去向：[fnd-linux-syscalls](../../knowledge/fundamentals/linux-syscalls.md) 完成自测清单。
