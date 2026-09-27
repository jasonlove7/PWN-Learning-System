---
id: ch-nightmare-hs19-storytime
name: storytime (Hackover CTF 2019)
platform: Hackover CTF 2019
event: Hackover CTF
year: 2019
category: core
difficulty: basic
url: https://guyinatuxedo.github.io/08-bof_dynamic/hs19_storytime/index.html
knowledge_points:
  - core-ret2libc
prerequisites:
  - ch-nightmare-csaw19-babyboi
why_selected: Pilot ⑤：大缓冲满 read——最接近"理想条件"的 ret2libc，适合作为 1 个月后的复测题。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-hs19-storytime
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 hs 2019 storytime（HSCTF 2019）。读入过小的局部数组，无 canary。原赛事归档 URL 未验证。
---

# storytime（Hackover CTF 2019）—— Pilot ⑤

<details><summary>Hint 1</summary>
read 读满大缓冲（0x400 级）——布局空间充裕，难点只在"泄漏什么"。
</details>
<details><summary>Hint 2</summary>
一次输入完成全部？还是两段式？取决于程序给你几轮输入。
</details>
<details><summary>Hint 3</summary>
标准链+对齐即可；把它当作"一个月后无提示重做"的对照组。
</details>
