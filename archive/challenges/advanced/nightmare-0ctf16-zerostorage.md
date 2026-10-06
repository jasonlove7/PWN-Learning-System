---
id: ch-nightmare-0ctf16-zerostorage
name: zerostorage (0CTF 2016)
platform: 0CTF 2016
event: 0CTF
year: 2016
category: advanced
difficulty: intermediate
url: https://guyinatuxedo.github.io/31-unsortedbin_attack/0ctf16_zerostorage/index.html
knowledge_points:
  - adv-unsorted-bin-attack
prerequisites:
  - adv-heap-bins
why_selected: |
  Nightmare 把 0CTF 2016 zerostorage 放在 unsorted bin 模块：先把 fastbin 的上限抬高，
  再放入伪造块去碰 free hook。用来看 unsorted 技术怎样接到更后面的出口。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-0ctf16-zerostorage
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。站点 slug 是 0ctf16_zerostorage（字母 o），
  旧 id ch-nightmare-0ctf16-zer0storage 已废弃。
  页内主技术是 unsorted bin attack，不是 fastbin dup；因此挂在 adv-unsorted-bin-attack，
  不挂 adv-fastbin-attack。原题归档 URL 未验证。
---

# zerostorage（0CTF 2016）

> 入口：<https://guyinatuxedo.github.io/31-unsortedbin_attack/0ctf16_zerostorage/index.html>

## 任务

unsorted bin 写一个「上限」类全局量，使后续的伪造块能落到不该落的尺寸档。

<details><summary>Hint 1（方向）</summary>

题目限制了你能申请的大小。unsorted 写入能改的那个全局量，和这个限制是什么关系？

</details>

<details><summary>Hint 2（方法）</summary>

先完成一次 unsorted 写入，再检查 fastbin 相关上限是否已经变大，然后才构造伪造块。

</details>

<details><summary>Hint 3（关键细节）</summary>

出口在 free hook 一类函数指针上，不在返回地址上。确认伪造块的 size 能通过那一档的检查。

</details>

## 复盘要点

- 学会：unsorted 写入可以改「分配器自己的阈值」，而不只是改一个 flag。
- 去向：[adv-unsorted-bin-attack](../../knowledge/heap/unsorted-bin-attack.md)。
