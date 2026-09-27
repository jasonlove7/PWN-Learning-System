---
id: adv-largebin-attack
title: largebin attack
description: 利用 largebin 插入时的 nextsize 指针写，向两个目标写堆/libc 地址
importance: 3
difficulty: 5
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-unsorted-bin-attack
why_learn: |
  "写堆地址到任意位置"的稀有原语；现代 chain（如 house of storm 系）的组件。
objectives:
  - 能描述 largebin 链内排序与 fd_nextsize/bk_nextsize 双链结构
  - 能解释插入时两处写目标的推导与伪造条件
resources:
  - res-how2heap
challenges: []
hints: []
writeups: []
review:
  method: 画一次 largebin 插入的指针变化图
  interval: 首次后 2 个月
sources:
  - "how2heap large_bin_attack (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# largebin attack

## 结构回顾
- largebin 每 size 区间一条链，链内按大小排序，**fd_nextsize/bk_nextsize** 构成第二条链（跳表式）。
- 插入新块时的指针修复逻辑多、写目标多 → 检查相对宽松（历史上）。

## 写入语义（概念）
```text
把一个比链上最小块还小的块插入时:
  伪造链上块的 bk_nextsize → 目标-0x20
  插入动作会把 "新块地址" 写到 目标 处（另一处也可写 libc 内地址）
```
- 产出：**任意地址 ← 堆地址**（对比 unsorted：任意地址 ← arena 值）。

## 典型用途
- 把堆地址写进 `tcache_perthread_struct` 相关位置 / `_IO_list_all`（配 FSOP）。
- house of storm（unsorted+largebin 组合造任意分配）。

## 版本注意
- glibc 对 largebin 的检查在 2.30+ 逐步增强（size 一致性类）；做题先确认版本行为（how2heap 版本目录实测）。

## 定位
importance 3：出题频率低于 tcache/UAF，但理解它是中高阶题（与 IO_FILE 联动）的门票。
