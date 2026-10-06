---
title: 保护机制
description: 逐个看 NX、Canary、PIE、RELRO、ASLR 各挡住了前面哪一步。
module: mitigations
order: 0
difficulty: 4
prerequisites:
  - stack
  - shellcode
  - rop
  - got-plt
objectives:
  - 能对每一种保护说出它阻止的是哪一个具体步骤
  - 能在一个二进制里查出这些保护哪些开着
---

# 保护机制

前面的章节为了把现象看清，关掉了不少保护。这一模块把它们一个个打开，每次只看一个问题：它挡住的是前面哪一步，没挡住的又是哪一步。

## 学习前置

[栈溢出](/knowledge/stack/)、[Shellcode](/knowledge/shellcode/)、[ROP](/knowledge/rop/)、[GOT / PLT](/knowledge/got-plt/)。

## 学完应该能够做什么

- 说出 NX 挡住 shellcode、挡不住 ROP 的原因。
- 说出 canary 在返回前检查什么，以及它为什么需要被泄漏才能绕过。
- 说出 PIE 和 ASLR 各自随机化的是哪一段地址。

## 本模块的学习顺序

待写。

## 下一模块

[堆](/knowledge/heap/)。
