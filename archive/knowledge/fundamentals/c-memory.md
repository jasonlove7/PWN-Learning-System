---
id: fnd-c-memory
title: C 内存模型与指针
description: 理解 C 程序如何把内存抽象为对象、指针的语义、数组与指针的关系
importance: 5
difficulty: 3
track: mainline
type: concept
depth: standard
prerequisites: []
why_learn: |
  PWN 的对象是"内存中出错的程序"。不理解指针与内存对象，一切利用技术都是背咒语。
objectives:
  - 能解释指针变量、指针运算、解引用的内存层面含义
  - 能画出数组的内存布局并解释数组名退化
  - 能区分栈上对象 / 堆上对象 / 静态区对象的生命周期
  - 能识别常见的未定义行为（越界、悬垂指针、严格别名违规的基本形态）
resources:
  - res-csapp
  - res-hacking-arte
  - res-compiler-explorer
challenges:
  - ch-pwnable-kr-collision
hints: []
writeups: []
review:
  method: 重读自己写的指针笔记 + Compiler Explorer 对照实验
  interval: 首次后 1 周
sources:
  - "CS:APP 第2-3章 (verified 2026-09-27, csapp.cs.cmu.edu)"
  - "Hacking: The Art of Exploitation ch0x200 (verified 2026-09-27, nostarch.com)"
verification_status: verified
last_verified: 2026-09-27
---

# C 内存模型与指针

## 核心内容

### 1. 内存 = 字节数组 + 地址
- 每个字节有地址；C 的对象占据一段连续字节。
- 指针本质是"存地址的变量"，类型只决定解引用的解释方式。

### 2. 数组与指针
- `char buf[8]` 在栈上占 8 字节；`buf` 在表达式中退化为首地址。
- `buf[i]` ≡ `*(buf + i)`——越界访问在语言层面**没有护栏**（未定义行为）。

### 3. 生命周期三区
| 区域 | 分配方式 | 释放方式 | 典型漏洞 |
|------|----------|----------|----------|
| 栈 | 函数调用自动 | 返回自动 | 栈溢出（主线） |
| 堆 | malloc/new | free/delete | UAF/溢出（Advanced） |
| 静态区(.data/.bss) | 程序加载 | 进程退出 | 全局缓冲区溢出 |

### 4. PWN 视角的 UB 清单
越界读写、use-after-free、double free、返回局部变量地址、有符号溢出、未初始化读取——后续每个利用技术都对应其中一条。

## 实验建议（Compiler Explorer）
```c
char buf[8];
int *p = (int *)(buf + 1);   // 未对齐指针：看编译器如何处理
void f() { int x = 1; return_ptr(&x); }  // 观察栈地址的复用
```

## 与后续知识的连接
- 栈布局细节 → [stack-overflow](../stack/stack-overflow.md)
- 堆对象生命周期 → [heap-overview](../heap/heap-overview.md)
