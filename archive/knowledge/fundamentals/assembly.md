---
id: fnd-assembly
title: x86 / x86-64 汇编与寄存器
description: 读汇编的最小集合：寄存器、常见指令、寻址方式、AT&T 与 Intel 语法
importance: 5
difficulty: 3
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-stack-heap-model
why_learn: |
  找 gadget、看漏洞函数、读 writeup，全部以"能读汇编"为前提。不需要会写，必须会读。
objectives:
  - 能读懂一个 50 行函数的 -O0 汇编并说出它在做什么
  - 能在 AT&T 与 Intel 语法间切换阅读
  - 能识别 ROP gadget 的形态（pop/mov/xchg…; ret）
resources:
  - res-csapp
  - res-compiler-explorer
challenges:
  - ch-pwnable-kr-leg
hints: []
writeups: []
review:
  method: Compiler Explorer 对照读 3 个小函数
  interval: 首次后 1 周
sources:
  - "CS:APP ch3 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# x86 / x86-64 汇编

## 寄存器速览（64位）
| 64 | 32 | 16 | 8 | 备注 |
|----|----|----|---|------|
| rax | eax | ax | al | 返回值 / syscall 号 |
| rdi | edi | di | dil | **第1参数** |
| rsi | esi | si | sil | 第2参数 |
| rdx | edx | dx | dl | 第3参数 |
| rcx/r8/r9 | | | | 第4/5/6参数 |
| rbp/rsp | | | | 栈帧/栈顶 |
| rip | eip | | | 指令指针（不可直接写→劫持靠 ret/jmp） |

## 高频指令
```text
mov rax, [rbp-0x8]     ; 读栈
lea rdi, [rip+0x2f13]  ; 取地址（字符串常出现在这）
call qword ptr [rax+8] ; 间接调用（函数指针/GOT）
leave ; ret            ; mov rsp,rbp; pop rbp; pop rip  ← 栈迁移常客
syscall                ; 64位系统调用
```

## 语法差异
- AT&T（gcc 默认）: `mov src, dst`、`%reg`、`$imm`；Intel（pwndbg 默认）: `mov dst, src`。
- ROPgadget 输出为 Intel 语法。

## gadget 形态敏感度
- `pop rdi ; ret`、`pop rsi ; pop r15 ; ret`、`xchg rsp, rax`、`add rsp, 0x?? ; ret`——见 [rop-basics](../rop/rop-basics.md)。

## 动手
pwnable.kr `leg` 用 ARM 汇编考察同一能力（跨架构迁移预习）。
