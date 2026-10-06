---
id: fnd-calling-convention
title: 调用约定与函数调用过程
description: System V AMD64 调用约定、prologue/epilogue、返回值与 callee-saved
importance: 5
difficulty: 4
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-assembly
  - fnd-stack-heap-model
why_learn: |
  ROP 的每一步都在回答"参数怎么放到寄存器、控制流怎么到函数"。调用约定就是规则书。
objectives:
  - 能写出任意 6 参以内 C 函数调用的寄存器/栈布局
  - 能解释 prologue/epilogue 与 leave;ret 的等价性
  - 能说明 32 位 cdecl 与 64 位 System V 的差异对利用的影响
resources:
  - res-csapp
challenges:
  - ch-ropemporium-callme
hints: []
writeups: []
review:
  method: 默写参数寄存器顺序 + 解释 ret2csu 为什么存在
  interval: 首次后 2 周
sources:
  - "CS:APP ch3 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 调用约定与函数调用过程

## System V AMD64（Linux 默认）
```text
参数: rdi, rsi, rdx, rcx, r8, r9 → 栈（第7个起，逆序压栈）
返回值: rax（浮点 xmm0）
callee-saved: rbx, rbp, r12-r15（被调函数负责恢复）
```

## 调用的完整生命周期
```text
caller:                          callee:
  参数入寄存器                      push rbp
  call f  ← 压返回地址              mov rbp, rsp
                                   sub rsp, N    ; 开局部空间
                                   ...函数体...
                                   leave          ; mov rsp,rbp; pop rbp
                                   ret            ; pop rip
```

## 对利用的直接意义
| 约定事实 | 利用技术 |
|----------|----------|
| 参数在寄存器 | 需要 `pop rdi; ret` 类 gadget → [rop-basics](../rop/rop-basics.md) |
| 没有现成 rdx gadget | ret2csu 的动机 → [ret2csu](../rop/ret2csu.md) |
| 返回地址在栈上 | 栈溢出的靶心 → [stack-overflow](../stack/stack-overflow.md) |
| leave;ret 依赖 rbp | 栈迁移（EBP2Ret/leave 迁移）→ [stack-pivot](../rop/stack-pivot.md) |
| 32 位 cdecl 参数在栈 | 32 位题直接溢出布参 |

## 实验
```c
int f6(int a,int b,int c,int d,int e,int f){return a+b+c+d+e+f;}
int f7(..., int g)  // 观察 g 落在返回地址上方哪个位置
```
ROP Emporium `callme`（x86 与 x64 各做一遍）是本知识点的实战检验。
