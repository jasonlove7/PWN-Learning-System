---
id: adv-fastbin-attack
title: fastbin attack
description: fastbin 单链的检查逻辑与 fastbin dup/to-stack/into-tcache 技术族
importance: 4
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-uaf-double-free
why_learn: |
  历史题与教学题的主力；理解"fake chunk 过检查"的第一次完整训练。
objectives:
  - 能解释 fastbin 的 size 检查与"malloc 得到伪造地址"的条件
  - 能独立完成 fastbin dup → arbitrary allocation 流程
resources:
  - res-how2heap
  - res-nightmare
challenges: []
planned_challenges: []
# 0CTF 2016 zerostorage 曾被记成 fastbin 例题（旧 id ch-nightmare-0ctf16-zer0storage）。
# 2026-09-27 打开 Nightmare 深页后，它在 unsorted bin 模块，正式条目是
# ch-nightmare-0ctf16-zerostorage，挂在 adv-unsorted-bin-attack。此处不再引用。
hints: []
writeups: []
review:
  method: 默写 fastbin dup 的三次 malloc/free 序列
  interval: 首次后 1 个月
sources:
  - "how2heap fastbin_dup 系列 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# fastbin attack

## 检查逻辑（攻击面所在）
- malloc 从 fastbin 取块：只查 **size 字段属于该 fastbin 的范围**（`chunksize(victim) != nb` 类检查）。
- fd 完全可信 → 谁控制 fd，谁决定下一次分到哪。

## fastbin dup（最简形态）
```text
free(a); free(b); free(a);      // a,b 同 size；a 在链中出现两次
malloc→a  malloc→b  malloc→a     // 同一块两次交出 → 两个指针指向同一块 → 任意改 fd
```
- 之后 malloc 序列会把**伪造地址**当 chunk 交出（伪造处只需一个合法 size 头）。

## 技术族（how2heap 对应示例）
| 技术 | 要点 |
|------|------|
| fastbin_dup | 基础重复分配 |
| fastbin_dup_into_stack | 伪造 stack 上的假 chunk（size 头手写） |
| fastbin_dup_consolidate | 用 malloc_consolidate 打破重复检查 |
| fastbin_reverse_into_tcache | 新老 bin 联动（2.3x 题目常见） |

## 常见落点
- __malloc_hook（≤2.33）附近 -0x23 的 0x7f 魔数假 chunk（历史经典）
- tcache_perthread_struct（控制全部 tcache）
- 任意可写且能伪造 size 的地址

## 实战
Nightmare `0ctf16_zer0storage`（fastbin attack 代表题）。
