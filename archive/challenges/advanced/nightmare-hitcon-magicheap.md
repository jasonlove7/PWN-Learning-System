---
id: ch-nightmare-hitcon-magicheap
name: magicheap (HITCON Training)
platform: HITCON Training
event: HITCON Training
year: ""
category: advanced
difficulty: intermediate
url: https://guyinatuxedo.github.io/31-unsortedbin_attack/hitcon_magicheap/index.html
knowledge_points:
  - adv-unsorted-bin-attack
prerequisites:
  - adv-heap-bins
why_selected: |
  Nightmare unsorted bin 模块的 HITCON Training magicheap。页内明确用 unsorted bin attack
  向目标写一个大整数。用来把「读 fd 泄漏」和「写 bk 打全局」分成两面来记。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-hitcon-magicheap
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开 Nightmare 深页，标题为 Hitcon Training Magicheap。
  年份页内未给出，故 year 留空，不猜测。原题归档 URL 未验证。
  该题在 unsorted bin 模块，不在 House 模块；adv-house-of 不再把它当 house 例题。
---

# magicheap（HITCON Training）

> 入口：<https://guyinatuxedo.github.io/31-unsortedbin_attack/hitcon_magicheap/index.html>

## 任务

用 unsorted bin 的写副作用，让程序接受一个本来到不了的大数值。

<details><summary>Hint 1（方向）</summary>

哪个全局量只要变成「很大的数」就能过检查？unsorted bin 的写入恰好是这种大数。

</details>

<details><summary>Hint 2（方法）</summary>

整理出唯一的 unsorted chunk，让它在从 bin 取下时把目标地址写成那个大数。先画 fd/bk，再动手。

</details>

<details><summary>Hint 3（关键细节）</summary>

写入发生在 unlink/取下的时刻，不是在你 free 的那一行。确认触发分配确实走到了 unsorted。

</details>

## 复盘要点

- 学会：unsorted bin attack 写的是什么、在哪一步写。
- 去向：[adv-unsorted-bin-attack](../../knowledge/heap/unsorted-bin-attack.md)。
