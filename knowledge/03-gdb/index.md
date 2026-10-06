---
title: GDB
description: 用 GDB 在一个正在运行的程序里看寄存器、看栈、跟一次函数调用。
module: gdb
order: 0
difficulty: 3
prerequisites:
  - assembly
objectives:
  - 能在指定地址停下，读出 rip、rsp、rbp 和栈顶的几个值
  - 能单步越过一条 call，并指出栈上多出来的是什么
---

# GDB

前面的汇编是静态的。这一模块让你在程序跑起来之后看它：停在某一条指令、读寄存器、读栈、单步走。后面每一节的实验都靠这里的操作。

## 学习前置

[汇编](/knowledge/assembly/)。

## 学完应该能够做什么

- 用地址下断点，而不是只靠函数名。
- 读 `rip`、`rsp`、`rbp`，并说出它们此刻各指什么。
- 在 `call` 前后各看一次栈，指出返回地址。

## 本模块的学习顺序

1. 断点、寄存器和栈
2. 跟一次函数调用

## 下一模块

[栈溢出](/knowledge/stack/)。
