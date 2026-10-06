---
id: fnd-stack-heap-model
title: 内存布局——栈与堆
description: 进程地址空间分区；栈帧结构；栈的生长方向与内容
importance: 5
difficulty: 3
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-c-memory
why_learn: |
  栈溢出的每一个偏移计算都发生在栈帧模型里。这是 Foundation 与 PWN Core 的桥梁。
objectives:
  - 能画出 x86-64 下一次函数调用的完整栈帧（参数/返回地址/saved rbp/局部变量）
  - 能解释栈从高地址向低地址生长带来的溢出覆盖顺序
  - 能区分栈帧中"谁写的、给谁用"
resources:
  - res-csapp
  - res-ctf-wiki-stack-intro
challenges: []
hints: []
writeups: []
review:
  method: 白纸默画栈帧 + 标注溢出覆盖顺序
  interval: 首次后 1 周
sources:
  - "CS:APP ch3 (verified 2026-09-27)"
  - "CTF Wiki 栈介绍 (verified 2026-09-27, /pwn/linux/user-mode/stackoverflow/x86/stack-intro/)"
verification_status: verified
last_verified: 2026-09-27
---

# 内存布局——栈与堆

## x86-64 经典栈帧（System V，无 frame pointer 时布局仍类似）
```text
高地址
  ┌──────────────────┐
  │ 调用者的局部数据   │
  │ 参数 #7+（若有）   │ ← 栈传参
  ├──────────────────┤
  │ 返回地址          │ ← ret 读这里
  ├──────────────────┤
  │ saved rbp        │ ← leave 依赖
  ├──────────────────┤
  │ 被调函数局部变量    │ ← buf 通常在这里
  │ （buf 越界向上覆盖）│
  └──────────────────┘
低地址
```

## 关键结论（做题前必须内化）
1. 溢出覆盖顺序：局部数据 → saved rbp → **返回地址** → 更高处的调用者栈帧。
2. x86：参数在栈上（返回地址上方）→ 直接溢出顺带布置参数。
3. x86-64：参数在寄存器 → 需要ROP 传参（这正是 [rop-basics](../rop/rop-basics.md) 存在的原因）。
4. 64 位地址最高两字节为 0（用户空间 ≤ 0x00007fff...）→ partial overwrite 的物理基础。

## 堆（对比先行）
- 堆由 malloc 管理、从低向高生长、内容生命周期手动控制 → 细节全部放在 [heap-overview](../heap/heap-overview.md)。

## 动手实验
```bash
gcc -g -O0 -no-pie test.c && gdb ./a.out
# 断在被调函数，观察：p $rsp / x/20gx $rsp / info frame
```
