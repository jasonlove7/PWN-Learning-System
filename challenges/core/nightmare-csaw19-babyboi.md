---
id: ch-nightmare-csaw19-babyboi
name: babyboi (CSAW CTF 2019)
platform: CSAW CTF 2019
event: CSAW CTF
year: 2019
category: core
difficulty: basic
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-ret2libc
  - core-leak-basics
prerequisites:
  - core-rop-basics
why_selected: |
  Pilot 模块第 1 题：教科书级 ret2libc——puts 泄漏 + 回 main + 二段 system("/bin/sh")。
  Nightmare（已验证索引）收录本题并配完整讲解 writeup。
verification_status: platform-verified-challenge-listed
writeup:
  external:
    - wu-nightmare-index
  ai_summary: wu-ai-babyboi-summary
reproducibility: medium
notes_on_source: 学习入口为 Nightmare §5（ROP Dynamically Compiled）；原赛事归档 URL 未验证
---

# babyboi（CSAW CTF 2019）—— Pilot ①

> 入口：https://guyinatuxedo.github.io/ → "5.) ROP Dynamically Compiled" → babyboi（含完整 writeup，做题后再看）

## 任务
标准 ret2libc 全流程：泄漏 puts 真实地址 → 定 libc → system("/bin/sh")。

<details><summary>Hint 1（方向）</summary>

程序把"你输入的地址的字符串"打出来（printf("%s")）。哪类地址打印出来对你最有价值？——想想动态链接下谁的真实地址藏在 GOT 里。

</details>

<details><summary>Hint 2（方法）</summary>

两段式：第一段 ROP 调 puts(puts@got) 后返回 main 重开；用泄漏值减去 puts 偏移得基址（版本→末 12bit 反查）。第二段 pop rdi + libc 里 "/bin/sh" + system。

</details>

<details><summary>Hint 3（关键细节）</summary>

泄漏接收补 \x00 到 8 字节；libc.address 校验 &0xfff==0；system 前垫 ret 保对齐。

</details>

## 复盘（notebook 记录点）
- 时长 / 卡点 / 第一次泄漏成功的瞬间
- 四个易错点（短读/版本/对齐/返回点）各自踩了没
