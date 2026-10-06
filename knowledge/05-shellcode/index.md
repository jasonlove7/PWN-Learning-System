---
title: Shellcode
description: 看机器码放进内存并被执行是怎么发生的，以及栈不允许执行时这条路为什么断掉。
module: shellcode
order: 0
difficulty: 3
prerequisites:
  - stack
objectives:
  - 能解释 shellcode 是一段准备放进进程并获得执行的机器码
  - 能说出栈不可执行时，跳到栈上的机器码为什么不会被执行
---

# Shellcode

控制了执行流之后，最直接的去处是一段你自己放进内存的机器码。这一模块先看这件事能不能发生，再看栈不允许执行时它为什么发生不了。

## 学习前置

[栈溢出](/knowledge/stack/)。

## 本模块的学习顺序

1. 机器码放进内存并被执行
2. 栈不能执行时会怎样

## 学完应该能够做什么

- 把一段机器码逐字节对应回汇编指令。
- 在 GDB 里确认 CPU 执行的是缓冲区里的字节，而不是 `.text` 里的指令。
- 说明 shellcode 是一段准备放进进程并获得执行的机器码，不一定要启动 shell。

## 下一模块

[ret2syscall](/knowledge/ret2syscall/)。
