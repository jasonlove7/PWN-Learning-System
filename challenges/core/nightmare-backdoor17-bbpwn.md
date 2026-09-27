---
id: ch-nightmare-backdoor17-bbpwn
name: bbpwn (BackdoorCTF 2017)
platform: BackdoorCTF 2017
event: BackdoorCTF
year: 2017
category: core
difficulty: basic
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-fmt-string
prerequisites:
  - core-rop-basics
why_selected: Nightmare §6 格式化字符串入门代表。
verification_status: platform-verified-challenge-listed
writeup:
  external:
    - wu-nightmare-index
  ai_summary: ""
reproducibility: medium
notes_on_source: Nightmare §6 收录并配 writeup
---

# bbpwn（BackdoorCTF 2017）

<details><summary>Hint 1</summary>printf(buf) 直接可控 → 先 %p 探栈。</summary>
<details><summary>Hint 2</summary>目标：把"判断密码的变量/返回地址"改掉——%n 家族；先把参数槽位定准（%n$p 探测）。</details>
<details><summary>Hint 3</summary>64 位下注意前 5 个变参在寄存器；写大值拆 %hn。</details>
