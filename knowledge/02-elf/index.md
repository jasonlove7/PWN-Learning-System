---
title: ELF
description: 看懂一个 ELF 文件里和后面利用有关的部分：入口、段、符号、动态链接信息。
module: elf
order: 0
difficulty: 2
prerequisites:
  - assembly
objectives:
  - 能用 readelf 指出程序的入口地址
  - 能区分段和节，并说出加载时用的是哪一个
  - 能解释为什么 printf 的实现不在自己的 ELF 里
---

# ELF

编译器产出的是一个 ELF 文件。后面要找函数地址、看 GOT、判断保护是否打开，都要从这个文件里读。这一模块只讲到那些步骤需要的程度，不讲 ELF 规范本身。

## 学习前置

[汇编](/knowledge/assembly/)。

## 学完应该能够做什么

- 指出一个程序从哪个地址开始执行，并说这个地址是文件里的还是运行时的。
- 说明 `.text`、`.rodata`、`.data`、`.bss` 里各放什么，以及它们被装进哪个 `PT_LOAD`。
- 解释为什么 `printf` 的实现不在自己的 ELF 里，以及程序靠什么在运行时找到它。

## 本模块的学习顺序

1. 一个 ELF 文件是什么
2. section 和 segment 的区别
3. 文件里的东西怎么进内存
4. 符号和动态链接
5. 为什么需要 GOT 和 PLT

## 下一模块

[GDB](/knowledge/gdb/)。
