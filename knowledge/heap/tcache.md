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
version_dependent: true
verified_versions:
  - glibc: "2.26"
    notes: how2heap glibc_ChangeLog.md 写 tcache（per-thread cache）在 2.26 引入，Ubuntu 构建从 2.27 起启用。Nightmare tcache 讲解页写 2.26 之前做不了这种攻击。
  - glibc: "> 2.25"
    notes: how2heap README 把 tcache_poisoning.c 标成 > 2.25，并写 2.32 及之后需要 heap leak。
  - glibc: ">= 2.32"
    notes: how2heap README 把 decrypt_safe_linking.c 标成 >= 2.32。仓库有 glibc_2.32/ 目录，其中有该文件；glibc_2.31/ 的文件列表里没有它。
practice_status: no_verified_challenge
---

# tcache 与 safe-linking

## 结构（概念级）
```c
tcache_perthread_struct { counts[64]; entries[64]; }  // 每 size class 一个单链，最多 7 块
tcache_entry { next; key; }                            // key = tcache_struct 地址（防 double free 探测）
```
- tcache_perthread_struct 本身是**堆上第一个 chunk** → 控制它 = 控制整个 tcache（heap 泄漏后的高价值目标）。

## 演进（只保留打开过来源的句子）

| 依据 | 版本写法 | 含义 |
|------|----------|------|
| how2heap `glibc_ChangeLog.md` | 2.26 引入；Ubuntu 构建自 2.27 启用 | 更早的 glibc 没有这条 per-thread cache |
| Nightmare tcache 讲解页 | 2.26 之前做不了 | 与上一行一致，不是新的版本事实 |
| how2heap README `tcache_poisoning.c` | > 2.25；2.32 及之后需要 heap leak | 投毒示例的适用范围，不是「所有版本同一写法」 |
| how2heap README `decrypt_safe_linking.c` | >= 2.32 | 密文指针从这一档示例才出现 |

2.29 的 key、双 free 全链扫描没有出现在这次打开的 how2heap changelog 或 README 里，所以不写进 `verified_versions`。正文若仍提到，只当作待核对，不能当成已证实的断代。

## safe-linking 手算（概念，不是某一版的源码摘录）
```text
存入: PROTECT_PTR(&e->next, T) = T ^ ((uintptr_t)&e->next >> 12)
读出: T = next ^ (存位置 >> 12)
```
- 想让 tcache next 指向 target：写 `target ^ (slot_addr>>12)`。
- 已知一个明文指针+其密文 → 反推堆地址（堆泄漏新来源）。

## 与相邻技术的关系
- tcache 满溢出条件 → 块落入 fastbin/unsorted → 经典技术复活（[fastbin-attack](fastbin-attack.md)）
- tcache poisoning = 现代版 fastbin dup：见 [heap-modern](heap-modern.md)
