---
id: ch-nightmare-utc19-shellme
name: shellme (UTC CTF 2019)
platform: UTC CTF 2019
event: UTC CTF
year: 2019
category: core
difficulty: basic
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-ret2libc
  - core-stack-pivot
prerequisites:
  - ch-nightmare-csaw19-babyboi
why_selected: |
  Pilot ②：极小缓冲的 ret2libc 变体——考验"溢出窗口受限时怎么办"。
verification_status: platform-verified-challenge-listed
writeup:
  external:
    - wu-nightmare-index
  ai_summary: ""
reproducibility: medium
notes_on_source: Nightmare §5 收录并配 writeup
---

# shellme（UTC CTF 2019）—— Pilot ②

<details><summary>Hint 1</summary>
缓冲区小到放不下完整链？你有一次大输入的机会不在这块缓冲上（或需要迁移）。
</details>
<details><summary>Hint 2</summary>
libc 里有现成的 gadget 与字符串；最小链 = 一个 pop rdi + binsh + system——数一下你的可用字长。
</details>
<details><summary>Hint 3</summary>
对齐与短读依然是两大杀手；返回点选择让程序再给你一次输入机会。
</details>
