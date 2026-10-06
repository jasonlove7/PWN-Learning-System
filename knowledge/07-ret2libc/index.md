---
title: ret2libc
description: 程序里没有想要的函数时，先泄漏 libc 的地址，再跳进 libc 里的函数。
module: ret2libc
order: 0
difficulty: 4
prerequisites:
  - ret2syscall
objectives:
  - 能解释为什么要先泄漏一个 libc 地址才能调用 system
  - 能从一次泄漏算出 libc 基址
---

# ret2libc

系统调用这条路要求程序里有合适的指令。更常见的情况是程序链接了 libc，而 libc 里有 `system`。问题是 ASLR 让 libc 每次加载的位置不同，所以要先泄漏一个 libc 内部的地址，算出基址，再跳进去。

## 学习前置

[ret2syscall](/knowledge/ret2syscall/)。

## 学完应该能够做什么

- 解释「找不到函数」和「函数在 libc 里但地址不知道」是两个问题。
- 从一个泄漏的地址算出 libc 基址，并说明这个减法为什么成立。

## 本模块的学习顺序

待写。

## 下一模块

[ROP](/knowledge/rop/)。
