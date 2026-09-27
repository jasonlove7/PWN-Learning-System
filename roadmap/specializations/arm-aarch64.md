# ARM32 与 AArch64

> track: specialization ｜ 依赖：PWN Core 的利用方法可以迁移，寄存器和调用约定不能混用。
> 本文件不再把 ARM32 和 AArch64 写在同一条 8 级阶梯里。

## ARM32（已有核对过的入口）

Azeria《Writing ARM Assembly》Part 1 写明教程重点是 32 位，示例在 ARMv6（Raspberry Pi 1）。系列后面是寄存器、指令、内存访问、条件与分支、栈与函数。ROP Emporium 的 ret2win 页提供 `ret2win_armv5.zip`（`ch-ropemporium-ret2win`）。这是 ARMv5，不是 AArch64。

```text
ARM32
  寄存器与 ARM/Thumb     — Azeria Part 1 已打开
  栈与函数               — Azeria 系列后部；本轮只打开了 Part 1
  调用约定               — 返回地址在 lr；溢出常覆盖栈上保存的 lr
  利用                   — 只核对了 ROP Emporium 的 ARMv5 包，没有新的 ARM32 CTF 题
```

Thumb 的地址奇偶性只属于 ARM32 / Thumb，不要写到 AArch64 上。

## AArch64（本轮只核对了调用约定）

2026-09-27 打开了 Arm 的 AAPCS64：`res-aapcs64`。标题是 Procedure Call Standard for the Arm 64-bit Architecture (AArch64)。章节包括通用寄存器、栈、参数传递。

没有打开 AArch64 的利用教程，也没有 AArch64 题目。因此：

- 不新建 `spec-aarch64-*` 知识点
- 不把 Azeria 或 ROP Emporium ARMv5 写成 AArch64 练习
- 不新增 `architecture: AArch64` 的 challenge。现有 ret2win 的 ARM 包是 ARMv5

```text
AArch64
  寄存器与调用约定   — 已核对：AAPCS64
  指令与 ELF         — 未核对
  ROP / ret2libc     — 未核对，Research Needed
  PAC / BTI          — 见下，不放进入门
```

## PAC / BTI

二者都是控制流保护，放在传统 ROP（改返回地址或函数指针）之后，不是 AArch64 入门。

abi-aa 索引页上有一份单独链接：PAuth ABI Extension to ELF（`pauthabielf64/pauthabielf64.rst`）。本轮只看见链接，没有打开正文，所以不建知识点、不建资源条目。同一索引页没有单独的 BTI 文档链接。BTI 保持 Research Needed。

## 仍然 404

CTF Wiki `.../stackoverflow/arm/stack-intro/` 在 2026-09-27 返回 404。不要引用那条深链。

## 从 x86-64 迁移时已经能讲清楚的部分

AAPCS64 写的是 A64，不是 ARM32。

- 参数和返回值用 r0–r7。
- 调用（`BL`）把返回地址放进 LR（r30），不是压到栈上。
- 正常返回回到 LR 里的地址（文中举了 `RET`）。
- SP 在访问和公开接口上要 16 字节对齐。
- FP（r29）是否被用来串栈帧，由平台和函数自己决定，不是每份二进制都有。

因此：x86-64 里「覆盖栈上的返回地址再 `ret`」不能原样搬过来。AArch64 上要先确认这个函数有没有把 LR 存进栈。ROP gadget 的形态本轮没有打开利用教程，不往下写。

## 仍然没有的实践

没有核对过架构为 AArch64 的 CTF 题，也没有对应 writeup。ROP Emporium 的 ARM 包是 ARMv5。本方向保持 skeleton，不标 A。

PAC / BTI 仍是 Research Needed。索引链接 `pauthabielf64.rst` 的正文没打开。

