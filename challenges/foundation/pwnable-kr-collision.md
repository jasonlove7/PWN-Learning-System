---
id: ch-pwnable-kr-collision
name: collision
platform: pwnable.kr
event: ""
year: ""
category: foundation
difficulty: beginner
url: http://pwnable.kr/play.php
knowledge_points:
  - fnd-c-memory
prerequisites: []
why_selected: 整数/内存解释视角的入门题：让一段字节按 int 数组求和等于目标。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# collision（pwnable.kr · Toddler's Bottle）

<details><summary>Hint 1</summary>
passcode 长度 20 字节 = 5 个 int；目标是"5 个 int 之和 == 某哈希值"。
</details>
<details><summary>Hint 2</summary>
可以出现负数（有符号求和）；把目标拆成 5 个可打印可输入的 4 字节值。
</details>
<details><summary>Hint 3</summary>
用 pwntools p32 打包 5 个值拼接发送（注意大小端与你算的一致）。
</details>
