---
id: adv-unsorted-bin-attack
title: unsorted bin attack 与 libc 泄漏
description: 双链中转站的两面：读它泄 libc，写它打全局变量
importance: 4
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-uaf-double-free
  - adv-heap-bins
why_learn: |
  unsorted bin 是堆与 libc 的交界（fd/bk 指向 main_arena）；也是历史"写大值到目标"的标准手段。
objectives:
  - 能用 unsorted bin 唯一 chunk 的 fd 完成 libc 泄漏
  - 能解释 unsorted bin attack 的写入语义与 2.29 后的检查限制
resources:
  - res-how2heap
  - res-ctf-wiki-heap-overview
  - res-nightmare
challenges:
  - ch-nightmare-hitcon-magicheap
hints: []
writeups: []
review:
  method: 解释"为什么 unsorted 唯一块的 fd == main_arena+88（概念）"
  interval: 首次后 1 个月
sources:
  - "how2heap unsorted_bin_attack (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# unsorted bin attack

## 读面：libc 泄漏（现代主力用途）
- 唯一 unsorted chunk 的 fd/bk 指向 main_arena（libc 数据段）。
- UAF/溢出读一个已 free 的大块的前 8 字节 → libc 地址到手（配 libc-basics 定版本）。
- 这是**堆题获取 libc 的标准动作**，务必形成条件反射。

## 写面：写入 main_arena 地址到目标（历史用途）
```text
原理: unsorted 取出时 victim->bk->fd = victim->bk（写回）
伪造: bk = target-0x10  →  target 被写入 main_arena+0x??（一个大且有用的值）
经典: 改 global_max_fast → 让任意 size 进 fastbin → 打开新攻击面
```
- **glibc 2.29 起加了 bck->fd == victim 检查** → 老式 unsorted bin attack 大量失效（版本意识案例又一枚）。

## 实战
Nightmare `hitcon_magicheap`（unsorted+交互菜单堆题经典）。
配 tcache 的现代版本 → [heap-modern](heap-modern.md)。
