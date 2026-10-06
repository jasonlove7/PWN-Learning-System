---
title: GOT / PLT
description: 看动态链接如何把一次函数调用推迟到运行时，以及 GOT 里保存的是什么。
module: got-plt
order: 0
difficulty: 4
prerequisites:
  - elf
  - format-string
objectives:
  - 能解释第一次调用和一个已解析的调用，走的路径有什么不同
  - 能在 GDB 里看到 GOT 的一项在调用前后从桩地址变成真实地址
---

# GOT / PLT

程序调用 `printf` 时，编译期并不知道 `printf` 的地址。调用先进入 PLT 里的一小段代码，由它去 GOT 取真实地址。GOT 里的这一项在第一次调用前是个桩，调用后被填成 libc 里的地址。

## 学习前置

[ELF](/knowledge/elf/)、[格式化字符串](/knowledge/format-string/)。

## 学完应该能够做什么

- 说明 PLT 和 GOT 各存什么，谁在运行时被改写。
- 解释为什么 GOT 里出现一个 libc 地址，就等于泄漏了 libc 的位置。

## 本模块的学习顺序

待写。

## 下一模块

[保护机制](/knowledge/mitigations/)。
