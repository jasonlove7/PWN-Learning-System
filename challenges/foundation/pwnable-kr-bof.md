---
id: ch-pwnable-kr-bof
name: bof
platform: pwnable.kr
event: ""
year: ""
category: foundation
difficulty: beginner
url: http://pwnable.kr/play.php
knowledge_points:
  - core-stack-overflow
prerequisites:
  - fnd-c-strings
why_selected: |
  第一道真正的栈溢出：覆盖函数参数（32 位题参数在栈上的直观体验）。
  与 ret2win 同级但需要"算覆盖长度到参数"的思考。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# bof（pwnable.kr · Toddler's Bottle）

## 题目语境
32 位程序：`overflowme` 中 `gets(buf)` 无界写入；目标是让 `func` 的关键参数变成指定值。

<details><summary>Hint 1（方向）</summary>

32 位 cdecl：参数在栈上（返回地址上方）。gets 写到哪一层才能影响参数？

</details>

<details><summary>Hint 2（方法）</summary>

反汇编看 `buf` 与参数 `key` 的相对位置（不是源码看出来的，是 gdb/IDA 看出来的）；pwntools `process` 交互发送。

</details>

<details><summary>Hint 3（关键细节）</summary>

buf 与 key 的距离用 pwndbg 直接量（payload 长度=距离，无需管返回地址——参数在缓冲区上方同帧内）。

</details>

## 复盘要点
- 学会：32 位参数布局、buf→参数的覆盖路径、远程交互。
- 去向：[core-stack-overflow](../../knowledge/stack/stack-overflow.md)。
