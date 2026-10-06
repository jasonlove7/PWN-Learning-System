---
id: ch-nightmare-backdoor17-bbpwn
name: bbpwn (BackdoorCTF 2017)
platform: BackdoorCTF 2017
event: BackdoorCTF
year: 2017
category: core
difficulty: basic
url: https://guyinatuxedo.github.io/10-fmt_strings/backdoor17_bbpwn/index.html
knowledge_points:
  - core-fmt-string
prerequisites:
  - core-rop-basics
why_selected: Nightmare §6 格式化字符串入门代表。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-backdoor17-bbpwn
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 Backdoorctf 17 bbpwn。用户文本直接作为 printf 格式串。原赛事归档 URL 未验证。
---

# bbpwn（BackdoorCTF 2017）

<details><summary>Hint 1</summary>printf(buf) 直接可控 → 先 %p 探栈。</summary>
<details><summary>Hint 2</summary>目标：把"判断密码的变量/返回地址"改掉——%n 家族；先把参数槽位定准（%n$p 探测）。</details>
<details><summary>Hint 3</summary>64 位下注意前 5 个变参在寄存器；写大值拆 %hn。</details>
