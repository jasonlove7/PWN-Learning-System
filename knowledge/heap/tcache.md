---
id: adv-tcache
title: tcache 机制与 safe-linking
description: 现代堆的第一现场：per-thread cache、key 检查、safe-linking 指针加密
importance: 5
difficulty: 4
track: mainline
type: concept
depth: standard
prerequisites:
  - adv-heap-bins
why_learn: |
  glibc ≥2.26 的默认路径；现代 CTF 堆题主战场。所有现代技术都以 tcache 为背景板。
objectives:
  - 能描述 tcache_entry/tcache_perthread_struct 结构
  - 能手工完成 safe-linking 加解密（addr>>12 ^ ptr）
  - 能列出 tcache 的三道防线（count/对齐/key）及各自绕过条件
resources:
  - res-how2heap
  - res-ctf-wiki-heap-overview
challenges: []
planned_challenges:
  - id: ch-how2heap-lab
    name: how2heap lab
    platform: how2heap
    status: planned
    note: how2heap 是已验证的示例仓库（res-how2heap），不是单道题目。不伪造 challenge 条目。见 adv-heap-modern 的同一说明。
hints: []
writeups: []
review:
  method: 手算一个 safe-linking 加密/解密例子
  interval: 首次后 1 周
sources:
  - "how2heap glibc_2.32+/tcache_poisoning 与 decrypt_safe_linking (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# tcache 与 safe-linking

## 结构（概念级）
```c
tcache_perthread_struct { counts[64]; entries[64]; }  // 每 size class 一个单链，最多 7 块
tcache_entry { next; key; }                            // key = tcache_struct 地址（防 double free 探测）
```
- tcache_perthread_struct 本身是**堆上第一个 chunk** → 控制它 = 控制整个 tcache（heap 泄漏后的高价值目标）。

## 演进三步（做题必须知道版本）
| 版本 | 变化 | 攻击含义 |
|------|------|----------|
| 2.26 | tcache 引入 | LIFO 直进直出，无任何检查 |
| 2.29 | tcache_entry 加 key；double free 时全链扫描 | naive double free 死；换 key（UAF 改写）仍活 |
| 2.32 | **safe-linking**: next 存 `ptr ^ (addr>>12)` | 投毒需先知堆地址（heap leak 前置化） |

## safe-linking 手算
```text
存入: PROTECT_PTR(&e->next, T) = T ^ ((uintptr_t)&e->next >> 12)
读出: T = next ^ (存位置 >> 12)
```
- 想让 tcache next 指向 target：写 `target ^ (slot_addr>>12)`。
- 已知一个明文指针+其密文 → 反推堆地址（堆泄漏新来源）。

## 与相邻技术的关系
- tcache 满溢出条件 → 块落入 fastbin/unsorted → 经典技术复活（[fastbin-attack](fastbin-attack.md)）
- tcache poisoning = 现代版 fastbin dup：见 [heap-modern](heap-modern.md)
