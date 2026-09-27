---
id: core-partial-overwrite
title: partial overwrite
description: 只覆盖地址低位若干字节，在 ASLR/PIE 下"低成本"修正跳转目标
importance: 4
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - core-ret2libc
why_learn: |
  溢出窗口只有 1-2 字节时（off-by-one 时代的前奏），以及无法泄漏时的低成本路径。
objectives:
  - 能解释 64 位地址"高 6 字节有效"带来的半覆盖机会
  - 能计算覆盖 1/2 字节时的对齐要求与碰撞概率
  - 能识别哪些场景"同页内偏移差"使 partial overwrite 必然成功
resources:
  - res-nightmare
  - res-ctf-wiki-stack-intro
challenges:
  - ch-nightmare-hacklu15-stackstuff
  - ch-nightmare-tu17-vulnchat2
hints: []
writeups: []
review:
  method: 计算题：给偏移差算需要覆盖的字节数与成功率
  interval: 首次后 1 个月
sources:
  - "Nightmare 10.) Partial Overwrite 三题 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# partial overwrite

## 物理基础
- 用户态 64 位地址 ≤ `0x00007fff_ffff_ffff`：最高两字节恒 0。
- ASLR 随机化的是高位；**低 12 bit（页内偏移）永远不变**。
- PIE 下映像内两个地址通常只差高位 → 覆盖低 1-2 字节即可在"同一 64KB 区域"内重定向。

## 三种典型用法
1. **覆盖返回地址低 2 字节**：从函数 A 跳到同二进制内的函数 B（需 |A-B| < 0x10000 且无跨页问题；2 字节覆盖成功率通常 1/16 —— 对齐粒度 f*ck）。
2. **半覆盖 rbp**（低 1 字节）→ 配合 leave;ret 做栈迁移到附近可控区（EBP2Ret 变体）。
3. **堆指针 partial**：只改指针低字节使其指向同 chunk 家族的其他对象（UAF 场景常见）。

## 成功率速算
- 覆盖 n 字节、目标地址低 n 字节已随机化部分为 4 bit（x86-64 Linux mmap 低位随机粒度）→ 1/16 per 随机化半字节；远程可暴力（fork 服务器复活）。

## 实战
Nightmare `hacklu15_stackstuff`、`tu17_vulnchat2`。
