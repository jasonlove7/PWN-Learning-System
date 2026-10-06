---
id: ch-nightmare-0ctf17-babyheap
name: babyheap (0CTF 2017)
platform: 0CTF 2017
event: 0CTF
year: 2017
category: advanced
difficulty: intermediate
url: https://guyinatuxedo.github.io/28-fastbin_attack/0ctf_babyheap/index.html
knowledge_points:
  - adv-fastbin-attack
  - adv-heap-overflow
prerequisites:
  - adv-heap-bins
why_selected: |
  Nightmare fastbin 模块的 0CTF 2017 babyheap。页内是未检查的堆写入，
  用来破坏相邻块并走到 fastbin 分配。和 2016 的 zerostorage 不是同一题。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-0ctf17-babyheap
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节名 0ctf babyheap，菜单文字有 Baby Heap in 2017。
  原赛事归档 URL 未验证。
---

# babyheap（0CTF 2017）

> 入口：<https://guyinatuxedo.github.io/28-fastbin_attack/0ctf_babyheap/index.html>

## 任务

堆上的写入没有长度检查。先碰到相邻块的元数据，再看它会不会进入 fastbin。

<details><summary>Hint 1（方向）</summary>

这是溢出进邻块，不是一上来就 double free。fastbin 是溢出之后的分配器路径。

</details>

<details><summary>Hint 2（方法）</summary>

用调试器看 fill 能碰到下一块的 size / fd 中的哪一个。合并（consolidate）和 fastbin 是两步。

</details>

<details><summary>Hint 3（关键细节）</summary>

how2heap 把 fastbin_dup 标成 < 2.43，把 fastbin_reverse_into_tcache 标成 2.26–2.42。本题菜单写 2017，先确认二进制的 libc 再选哪条，不要默认有 tcache。

</details>

## 复盘要点

- 学会：fastbin 题的入口经常是溢出，不是技巧名字本身。
- 去向：[adv-fastbin-attack](../../knowledge/heap/fastbin-attack.md)。
