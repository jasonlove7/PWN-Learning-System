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
  - 能指出哪些材料是 ARM32（Azeria、ROP Emporium ARMv5），哪些是 AArch64（只有 AAPCS64）
  - 能用 AAPCS64 说出 r0–r7 传参、r29 是 FP、r30 是 LR，以及 BL 把返回地址写入 LR
  - 能说明目前没有经过核对的 AArch64 题目，因此本方向还不是完整实践闭环
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

# ARM32 与 AArch64（骨架）

> depth: skeleton。没有 AArch64 题目，不能当成完整模块。

## 不要混用的两套材料

| 材料 | 架构 | 依据 |
|------|------|------|
| Azeria Part 1 | ARM32 / ARMv6 | 页面写明 32-bit |
| ROP Emporium ret2win | ARMv5（ARM32） | 下载名是 `ret2win_armv5.zip`。页面没有 AArch64 / ARM64 |
| AAPCS64（`res-aapcs64`） | 仅 AArch64 | 标题与正文写 Arm 64-bit / A64 |

CTF Wiki 的 ARM 栈深链此前 404，不在这张表里。

## 从 x86-64 过来时，AAPCS64 里已经写明的差别

这些句子来自 2026-09-27 打开的 `aapcs64.rst`，不是从 ARM32 推出来的。

- 通用寄存器是 r0–r30，64 位上下文里称 X 寄存器。SP 单独列出，是栈指针。
- r0–r7 用来传入参数并返回结果。
- r29 的特殊名是 FP（frame pointer）。r30 的特殊名是 LR（link register）。
- `BL` 把顺序上的下一条指令地址（返回地址）写入 LR，再转到目标。
- 正常返回是回到调用者放在 LR 里的那个地址，例如用 `RET`。
- 通过 SP 访问内存时，以及在公开接口上，SP 必须 16 字节对齐（`SP mod 16 = 0`）。
- 帧记录是栈上两个 64 位值，把当前帧链到调用者。平台可以要求始终维护，也可以允许小函数不建帧，甚至把 FP 当普通被调用者保存寄存器。所以不能假设每份二进制都有 x86-64 那种固定的 saved RBP。

x86-64 上返回地址在栈上，`ret` 从栈里弹出。AArch64 上调用时返回地址先在 LR。溢出要影响返回，通常得先让函数把 LR 存进栈帧，再覆盖那一份。这一点是从上面的 BL/LR 规则推到利用上的，AAPCS64 本身不是漏洞文档。

## 还没有

- AArch64 的指令教程、ELF64 专页、ROP / ret2libc / syscall 题目
- PAC、BTI 的正文。索引里有 `pauthabielf64.rst` 链接，没打开。BTI 没有单独文档链接

没有这些，就不建 `spec-aarch64-*` 分文件，也不标 A。

