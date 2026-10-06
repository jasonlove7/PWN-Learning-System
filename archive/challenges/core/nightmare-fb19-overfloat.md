---
id: ch-nightmare-fb19-overfloat
name: overfloat (Facebook CTF 2019)
platform: Facebook CTF 2019
event: Facebook CTF
year: 2019
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/08-bof_dynamic/fb19_overfloat/index.html
knowledge_points:
  - core-ret2libc
prerequisites:
  - ch-nightmare-csaw19-babyboi
why_selected: |
  Pilot ③（综合检验）：输入经过浮点解析（strtof 循环写入栈）——payload 也要"能被浮点编码"。
  检验对两段式的本质理解是否脱离"背 exp"。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-fb19-overfloat
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 Facebook CTF 2019 Overfloat。未检查的栈溢出来自反复写入 float。原赛事归档 URL 未验证。
---

# overfloat（Facebook CTF 2019）—— Pilot ③

<details><summary>Hint 1</summary>
输入循环把浮点数字符串转成 4 字节浮点写栈——你的 payload 字节必须"长得像浮点文本"。
</details>
<details><summary>Hint 2</summary>
思路一：找只有少量可变字节的链（如 partial 思路）；思路二：利用浮点能精确表示的值逼近地址字节。两段式结构不变。
</details>
<details><summary>Hint 3</summary>
写出"目标字节序列 → 可被 strtof 接受的文本"的转换函数是本题核心工程量。
</details>
