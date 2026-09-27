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

## 与 x86 的差别（只保留 ARM32 上已能从 Azeria / ROP Emporium 对上的部分）

- ARM32：返回地址在 `lr`，gadget 不是 x86 的 `ret`
- AArch64 的寄存器宽度、SP 和调用约定以 AAPCS64 为准，不要从 ARM32 表推过去
