---
title: 堆
description: 从 malloc 和 free 的现象开始，建立 chunk 和分配器的模型，再看漏洞为什么危险。
module: heap
order: 0
difficulty: 5
prerequisites:
  - mitigations
objectives:
  - 能指出 malloc 返回的指针和 chunk 起点之间差多少
  - 能在 GDB 里看到 free 之后一块内存去了哪里
---

# 堆

前面所有章节都在栈上。堆是程序运行时另一块按需增长的内存，由分配器管理。这一模块先看 `malloc` 和 `free` 前后内存发生了什么，再谈 chunk、bin 和漏洞。不从利用技巧开始。

堆的行为依赖 glibc 版本。每一篇都会写明实验用的版本，不会把一个版本的行为说成所有版本都这样。

## 学习前置

[保护机制](/knowledge/mitigations/)。

## 学完应该能够做什么

- 画出一个 chunk，标出 metadata 和用户数据的分界。
- 用 GDB 观察 free 之后 chunk 进入了哪里。
- 解释一种堆漏洞为什么让你写到了分配器自己使用的指针。

## 本模块的学习顺序

待写。这一模块是第一阶段篇幅最多的部分，会拆成连续的小实验，不在这里一次列完。

## 下一模块

没有。堆是第一阶段的终点。
