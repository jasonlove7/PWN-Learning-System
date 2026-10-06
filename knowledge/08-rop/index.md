---
title: ROP
description: 把程序里以 ret 结尾的指令片段串起来，让每次返回都进入下一段。
module: rop
order: 0
difficulty: 4
prerequisites:
  - ret2libc
objectives:
  - 能解释一个 gadget 是什么，以及 ret 为什么让它们可以串联
  - 能自己构造一条只做一件事的 ROP chain，并在 GDB 里跟完它
---

# ROP

ret2syscall 和 ret2libc 都是在借程序里已有的指令。ROP 把这件事一般化：任何以 `ret` 结尾的几条指令都可以用，因为 `ret` 会从栈上取下一个地址，而栈上的内容是你安排的。

## 学习前置

[ret2libc](/knowledge/ret2libc/)。

## 学完应该能够做什么

- 指出一个 gadget 从哪条指令开始、在 `ret` 处结束。
- 画出一条 chain 执行时栈的变化：每次 `ret` 弹出什么、跳到哪。
- 不借助自动生成，手写一条完成单个目标的 chain。

## 本模块的学习顺序

待写。

## 下一模块

[格式化字符串](/knowledge/format-string/)。
