---
id: ch-pwnable-kr-blukat
name: blukat
platform: pwnable.kr
event: ""
year: ""
category: foundation
difficulty: beginner
url: http://pwnable.kr/play.php
knowledge_points:
  - fnd-proc-shell
  - fnd-linux-syscalls
prerequisites: []
why_selected: Linux 权限/组/文件语义题——PWN 不只是溢出，还有系统语义的攻击面。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# blukat（pwnable.kr · Toddler's Bottle）

<details><summary>Hint 1</summary>
"打不开的文件"真的是权限问题吗？看看那个文件的属组和你所在的组（id 命令）。
</details>
<details><summary>Hint 2</summary>
从有权限读取的成员视角想：文件内容其实是可读的——错误信息在误导你。
</details>
<details><summary>Hint 3</summary>
把读到的字符串作为下一题密码输入即可。
</details>
