---
title: 格式化字符串
description: 看 printf 怎么按格式串取参数，以及格式串来自输入时它会读到哪里。
module: format-string
order: 0
difficulty: 4
prerequisites:
  - stack
  - gdb
objectives:
  - 能解释 printf 的参数从哪些寄存器和栈上的哪些位置来
  - 能在自己编译的程序上找出输入落在第几个参数
---

# 格式化字符串

前面几章都是通过溢出去碰返回地址。这一章的起点不同：`printf` 会按照格式串去取参数，而如果格式串本身来自输入，取多少个参数、从哪取，就由输入决定。

这一模块按 `printf` 的行为一步步往下推，不从利用技巧开始。

## 学习前置

[栈溢出](/knowledge/stack/)、[GDB](/knowledge/gdb/)。不依赖 ret2libc 或 ROP。

## 学完应该能够做什么

- 说出 `printf` 的前几个参数在哪些寄存器里，其余的在栈上。
- 解释格式符比实际参数多时，多出来的值是从哪读到的。
- 在一个自己编译的程序上，找到输入对应的参数序号。

## 本模块的学习顺序

1. `printf` 到底在读什么
2. 找到输入落在第几个参数

任意地址读、`%n` 的写入、和 GOT 的关系，留到这两篇确认教学方式之后再写。

## 下一模块

[GOT / PLT](/knowledge/got-plt/)。
