---
id: ch-nightmare-bkp16-cookbook
name: cookbook (Boston Key Party 2016)
platform: Boston Key Party 2016
event: Boston Key Party
year: 2016
category: advanced
difficulty: advanced
url: https://guyinatuxedo.github.io/41-house_of_force/bkp16_cookbook/index.html
knowledge_points:
  - adv-house-of
prerequisites:
  - adv-unsorted-bin-attack
why_selected: |
  Nightmare House of Force 模块里唯一有赛事名的题。页内在堆和 libc 泄漏之后使用 House of Force。
  和 Hack.lu 2014 Oreo（House of Spirit）是两种不同的 house，不要并成一条技巧。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-bkp16-cookbook
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 Boston Key Party 2016 Cookbook。页内打印 glibc 2.24。
  原赛事归档 URL 未验证。同名的栈题 simple calc 是另一道（ch-nightmare-bkp16-simplecalc）。
---

# cookbook（Boston Key Party 2016）

> 入口：<https://guyinatuxedo.github.io/41-house_of_force/bkp16_cookbook/index.html>（做完再看）

## 任务

先拿到堆和 libc 的地址，再用 House of Force 让后续分配落到你选的位置。页内打印的库是 glibc 2.24。

<details><summary>Hint 1（方向）</summary>

House of Force 动的是 top chunk 的 size，不是 fastbin 的 fd，也不是 House of Spirit 那种伪造块。先确认你已经有泄漏，否则目标地址算不出来。

</details>

<details><summary>Hint 2（方法）</summary>

把 top 的 size 改成一个很大的值，下一次 malloc 的大小用来把 top 推到目标附近。2.24 还没有 tcache；不要套 2.26 之后的 tcache 路径。

</details>

<details><summary>Hint 3（关键细节）</summary>

页内的出口是让一次 free 走到你改过的 hook，再进 system。hook 的版本结论以这道题打印的 2.24 为准，不要写成「所有现代 glibc 仍有 malloc hook」。

</details>

## 复盘要点

- 学会：House of Force 依赖「能改 top size」和「已经知道 libc 在哪」。
- 去向：[adv-house-of](../../knowledge/heap/house-of.md)。
