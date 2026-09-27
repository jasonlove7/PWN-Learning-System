---
id: spec-windows-kernel
title: Windows Kernel Security（方向骨架）
description: Windows 内核机制认知与驱动攻击面研究入门
importance: 3
difficulty: 5
track: specialization
type: concept
depth: skeleton
prerequisites:
  - fnd-assembly
  - fnd-elf
why_learn: |
  系统安全研究的重要分支；仅限 CTF/Lab/授权研究场景。
objectives:
  - 完成 roadmap/specializations/windows-kernel.md 的 8 级阶梯
resources:
  - res-windows-internals
  - res-ctf-wiki
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "Windows Internals 7th 官方页 (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# Windows Kernel Security（骨架）

> ⚠️ depth: skeleton ｜ **纪律：仅限 CTF / 自建实验 VM / 授权研究；不引导未授权攻击真实系统。**

## 知识点骨架

```text
spec-win-arch        ntoskrnl/hal/系统调用路径、用户态↔内核态切换
spec-win-objects     EPROCESS/KPCR/句柄表/对象管理器
spec-win-memory      页表/VAD/pool（对照内核堆）
spec-win-pe          PE 格式（导入/重定位/SEH；对照 ELF 学）
spec-win-drivers     WDM/WDF、IRP/IOCTL 攻击面
spec-win-windbg      双机内核调试、常用扩展命令（!process !pool）
spec-win-mitigations SMEP/CFG/KASLR(x64)/HVCI/VBS/PatchGuard
spec-win-bugclasses  驱动池溢出/UAF/竞争（公开 CVE 实验复现）
```

## 已验证入口
- Windows Internals 7th ed（Part 1/2，Microsoft Press）——机制地基
- CTF Wiki Windows 章——中文实战视角
- learn.microsoft.com 驱动开发文档体系（官方）

## v0.2 计划
WinDbg 实验 VM 搭建文档 + 驱动漏洞实验靶（自编译漏洞驱动）方案验证。
