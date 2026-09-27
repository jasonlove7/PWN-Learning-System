---
id: adv-heap-overflow
title: 堆溢出与 off-by-one / off-by-null
description: 越界写堆元数据的两大入口；NULL 字节的特殊作用
importance: 4
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-heap-bins
why_learn: |
  "写溢出到元数据"是堆攻击的第一原语来源；off-by-null 是 CTF 最爱的精确溢出形态。
objectives:
  - 能区分"溢出到下一 chunk 的 size"与"溢出到 fd/bk"两条利用路线
  - 能解释 off-by-null 清 PREV_INUSE 触发向后合并的完整链条
resources:
  - res-how2heap
  - res-ctf-wiki-heap-overview
challenges:
  - ch-nightmare-protostar-heap2
hints: []
writeups: []
review:
  method: 画 off-by-null 触发 unlink 合并的布局图
  interval: 首次后 2 周
sources:
  - "how2heap poison_null_byte (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 堆溢出与 off-by-one/null

## 两条基本路线
1. **改 size**：溢出到下一 chunk 的 size 字段 → 让 malloc"看错大小" → overlap / 错误分箱。
2. **改 fd/bk**（已 free 的块）：直接寄生 unlink/fastbin 检查逻辑 → 后续攻击面。

## off-by-null（一字节 \x00）
```c
for (i=0; i<=n; i++) buf[i]=0;    // 多写一个 NUL
```
- 落在下一 chunk 的 size 最低字节 → 清掉 PREV_INUSE 位 → free 时 ptmalloc 以为"前一块是空闲的" → 走 **向后合并（unlink prev）**。
- 伪造 prev_size + 精确布局 → overlap 诞生。
- 这是 house of einherjar / poison null byte 技术族的核心。

## 学习路径
1. how2heap `poison_null_byte.c`（对应版本目录）逐步单步。
2. CTF Wiki Off-By-One 章（概念对照）。
3. 实战题见 Nightmare 堆模块（protostar_heap1 为最简入门）。

## 检查意识
- modern glibc 对 size/prev_size 一致性检查在增强 → 每个版本行为要实测（how2heap 按版本组织正为此）。
