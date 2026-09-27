---
id: spec-linux-kernel
title: Linux Kernel PWN（方向骨架）
description: 内核利用方向的知识点骨架与入口资源索引
importance: 4
difficulty: 5
track: specialization
type: concept
depth: skeleton
prerequisites:
  - core-ret2libc
  - adv-heap-overview
why_learn: |
  CTF 国际赛主力方向；用户态方法论（泄漏/ROP/堆）向内核的直接迁移。
objectives:
  - 完成 roadmap/specializations/linux-kernel.md 的 8 级阶梯
resources:
  - res-xairy-kernel
  - res-kernel-memory-allocation
  - res-ctf-wiki
  - res-pwn-college
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "xairy/linux-kernel-exploitation (verified 2026-09-27)"
  - "CTF Wiki 内核章导航 (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# Linux Kernel PWN（骨架）

> ⚠️ depth: skeleton —— 本方向在 v0.1 为骨架级：阶梯与入口资源已验证，知识点逐步扩展。
> 定位纪律：仅限 CTF / 自建 qemu / kernelCTF 等授权环境。

## 知识点骨架（待逐个扩为独立文件）

```text
spec-kernel-basics      用户态/内核态、syscall 路径、内核内存布局(modules/vmalloc/physmap)
spec-kernel-lkm         模块编写加载、ioctl 攻击面、设备文件
spec-kernel-debug       qemu+gdb 调试（vmlinux/kallsymbols/panic 分析）
spec-kernel-slab        slab/SLUB 分配器（对照 ptmalloc 学）
spec-kernel-bugs        内核 UAF/OOB/竞争(double fetch)/refcount
spec-kernel-privesc     cred/commit_creds/ret2usr(已死)/modprobe_path/usermodehelper
spec-kernel-mitigation  KASLR/SMEP/SMAP/KPTI/CFI/fg-KASLR
spec-kernel-modern      cross-cache/dirty pagetable 等现代手法（研究跟进行政）
```

## 已验证入口（详见 resources/）
- xairy 合集（论文/技巧/题库索引，双月更新）
- CTF Wiki 内核章（中文系统入口）
- pwn.college（系统安全 dojo；遵守不公开题解政策）

## 下一版本计划
把 8 个骨架点扩成 standard 深度（含实验环境搭建文档 + 题目验证集）。
