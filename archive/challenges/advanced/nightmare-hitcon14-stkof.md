---
id: ch-nightmare-hitcon14-stkof
name: stkof (HITCON CTF 2014)
platform: HITCON CTF 2014
event: HITCON CTF
year: 2014
category: advanced
difficulty: intermediate
url: https://guyinatuxedo.github.io/30-unlink/hitcon14_stkof/index.html
knowledge_points:
  - adv-unsafe-unlink
prerequisites:
  - adv-heap-bins
why_selected: |
  Nightmare unlink 模块的 HITCON 2014 stkof。页内主原语是 unsafe unlink。
  how2heap 的 unsafe_unlink 示例也把这道题列在 Applicable CTF Challenges，但示例本身不收录为题。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-hitcon14-stkof
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页，标题 Hitcon 2014 stkof。
  how2heap README 对这道题的外链（acez.re）本轮没有打开，不收为第二条 writeup。
  原赛事归档 URL 未验证。
---

# stkof（HITCON CTF 2014）

> 入口：<https://guyinatuxedo.github.io/30-unlink/hitcon14_stkof/index.html>

## 任务

把伪造的空闲块送进 unlink，得到一次写指针，再考虑泄漏和改写。

<details><summary>Hint 1（方向）</summary>

这是 2014 的题。how2heap changelog 里 2.26 才加上 size 与 prev_size 的一致性检查。先看本题二进制链的是哪一版 libc，不要用新版本的检查去否定旧题。

</details>

<details><summary>Hint 2（方法）</summary>

unsafe unlink 要过当时的 fd/bk 自检。画清「全局指针指向块」和「块的 fd/bk 指回指针附近」。

</details>

<details><summary>Hint 3（关键细节）</summary>

unlink 的直接结果通常是改掉那个全局指针，不是立刻拿到 shell。下一步才是用改后的指针去读或写 GOT。

</details>

## 复盘要点

- 学会：unlink 是写原语，年份决定检查有多少。
- 去向：[adv-unsafe-unlink](../../knowledge/heap/unsafe-unlink.md)。
