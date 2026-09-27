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
prerequisites:
  - ch-nightmare-csaw19-babyboi
why_selected: |
  Pilot 队列中的 ret2libc 变体。深页本轮没有找到，技术细节不要从文件名推断。
  已去掉 core-stack-pivot：没有打开的页面证明这道题在练栈迁移。
verification_status: platform-verified-challenge-listed
writeup:
  external: []
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 首页索引有未加链接的 utc19_shellme 字样，归在动态 ROP 列表。
  猜测的深页 URL（08-bof_dynamic 与 11-stack_pivoting）均为 404。
  因此不挂 wu-nightmare-* writeup，URL 保持站点根，状态维持 listed 而不是 deep-page verified。
  原赛事归档 URL 未验证。
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
