---
id: spec-arm-aarch64
title: ARM / AArch64（方向骨架）
description: 非 x86 架构的二进制利用迁移
importance: 4
difficulty: 4
track: specialization
type: concept
depth: skeleton
prerequisites:
  - core-rop-basics
why_learn: |
  嵌入式/移动方向的基础架构；ROP 方法论直接迁移，细节全面换新。
objectives:
  - 完成 roadmap/specializations/arm-aarch64.md 的 8 级阶梯
resources:
  - res-azeria-arm
  - res-ropemporium
  - res-ctf-wiki
  - res-aapcs64
challenges:
  - ch-ropemporium-ret2win
# ARMv5 不是独立题目。2026-09-27 打开 ret2win 页，下载项含 ret2win_armv5.zip。
# 旧 id ch-ropemporium-ret2win-arm 已废弃，做同题的 ARMv5 二进制即可。
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "Azeria ARM 系列 7 部分 (verified 2026-09-27)"
  - "ROP Emporium ARMv5 版本 (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# ARM / AArch64（骨架）

## 知识点骨架

```text
spec-arm-asm        ARM(32)与Thumb模式、条件执行、RISC 特性（对照 x86）
spec-arm-registers  r0-r15（sp/lr/pc）；AArch64 x0-x30/sp/xzr
spec-arm-insts      ldr/str、ldm/stm（多寄存器传输）、b/bl
spec-arm-callconv   r0-r3 / x0-x7 传参；返回地址在 lr
spec-arm-elf        ELF on ARM（interp/属性、soft/hard float）
spec-arm-debug      qemu-arm + gdb-multiarch；pwndbg/gef 的 ARM 支持
spec-arm-rop        gadget 形态差异（pc 在寄存器/无条件区）、pivot 变体
spec-arm64-modern   AArch64 专属缓解（PAC/BTI）与应对
```

## 已验证入口
- Azeria Labs《Writing ARM Assembly》7 部（附 exploit 系列预告）
- ROP Emporium 每关 ARMv5 版（从 ret2win 开始跨架构重训）
- CTF Wiki 栈溢出 ARM/MIPS/RISC-V 变体章

## v0.2 计划
qemu 用户态/system 态实验环境文档 + ARM CTF 题目验证集。
