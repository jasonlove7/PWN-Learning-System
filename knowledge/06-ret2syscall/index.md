---
title: ret2syscall
description: 栈不可执行时，用程序里已有的指令片段凑一次系统调用。
module: ret2syscall
order: 0
difficulty: 3
prerequisites:
  - shellcode
objectives:
  - 能解释 ret2syscall 和 shellcode 的差别在哪里
  - 能指出凑一次 syscall 需要哪些寄存器，以及每个寄存器从哪条指令获得
---

# ret2syscall

栈上的机器码不能执行了，但程序自己的代码区可以执行。这一模块看怎么把执行流送进程序里已有的 `syscall` 指令，并在那之前把寄存器设好。

## 学习前置

[Shellcode](/knowledge/shellcode/)。

## 学完应该能够做什么

- 说明这一节为什么还是在用系统调用，只是机器码换成了程序里现成的。
- 为一次系统调用列出需要的寄存器，并给每个寄存器找到设置它的指令。

## 本模块的学习顺序

1. 借程序里的 syscall

## 下一模块

[ret2libc](/knowledge/ret2libc/)。
