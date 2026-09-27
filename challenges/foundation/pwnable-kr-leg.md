---
id: ch-pwnable-kr-leg
name: leg
platform: pwnable.kr
event: ""
year: ""
category: foundation
difficulty: beginner
url: http://pwnable.kr/play.php
knowledge_points:
  - fnd-assembly
prerequisites: []
why_selected: ARM 汇编读题 + 手工模拟寄存器——跨架构思维的第一滴水（为 ARM 方向埋种子）。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# leg（pwnable.kr · Toddler's Bottle）

<details><summary>Hint 1</summary>
三种"值"来源不同：汇编立即数、pc 相对读取、函数返回值——分别等于什么？
</details>
<details><summary>Hint 2</summary>
ARM 的 pc 永远指向"当前指令+8"（流水线特性）；key1/key2/key3 各取哪种来源要分开算。
</details>
<details><summary>Hint 3</summary>
加起来就是 key；注意 key2 里 pc 的真实值（不是你想的那个地址）。
</details>
