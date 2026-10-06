---
title: 栈溢出
description: 看清一次函数调用的栈帧，然后看输入越过缓冲区之后覆盖了什么。
module: stack
order: 0
difficulty: 3
prerequisites:
  - assembly
  - gdb
objectives:
  - 能在 GDB 里指出返回地址相对 rbp 的位置
  - 能算出从缓冲区到返回地址要填多少字节
---

# 栈溢出

函数调用把返回地址留在栈上。如果一个函数把输入抄进栈上的缓冲区，而且不检查长度，输入就会越过缓冲区，碰到返回地址。这一模块先看返回地址在哪，再看它怎么被覆盖。

## 学习前置

[汇编](/knowledge/assembly/)、[GDB](/knowledge/gdb/)。

## 学完应该能够做什么

- 在一个函数里指出缓冲区、保存的 `rbp`、返回地址三者的位置。
- 给定一个会越界写的程序，算出覆盖返回地址需要的字节数。
- 解释为什么程序崩溃时 `rip` 里是你输入的字节。

## 本模块的学习顺序

1. 栈帧和返回地址
2. 找到偏移

## 下一模块

[Shellcode](/knowledge/shellcode/)。
