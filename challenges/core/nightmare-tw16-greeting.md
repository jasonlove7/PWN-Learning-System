---
id: ch-nightmare-tw16-greeting
name: greeting (Tokyo Westerns CTF 2016)
platform: Tokyo Westerns CTF 2016
event: Tokyo Westerns CTF
year: 2016
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-fmt-string
  - core-got-plt-leak
prerequisites:
  - ch-nightmare-backdoor17-bbpwn
why_selected: Nightmare §6 进阶代表：泄漏+写的组合应用。
verification_status: platform-verified-challenge-listed
writeup:
  external:
    - wu-nightmare-index
  ai_summary: ""
reproducibility: medium
notes_on_source: Nightmare §6 收录并配 writeup
---

# greeting（Tokyo Westerns CTF 2016）

<details><summary>Hint 1</summary>一次 printf 机会？多次？决定你的泄漏与写是否要合并。</details>
<details><summary>Hint 2</summary>经典目标：printf 自己的 GOT → system；此后输入 /bin/sh 类字符串。</details>
<details><summary>Hint 3</summary>pwntools fmtstr_payload 自动化前先手推一遍槽位。</details>
