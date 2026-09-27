---
id: core-srop
title: SROP（Sigreturn Oriented Programming）
description: 伪造 sigreturn 帧让内核替你恢复全套寄存器，一次完成 syscall 布局
importance: 4
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - core-ret2csu
  - fnd-linux-syscalls
why_learn: |
  寄存器布局的"大招"：一个 syscall(rt_sigreturn) 恢复所有寄存器+栈指针+rip。小溢出+syscall 指令即可调用任意 syscall。
objectives:
  - 能解释 rt_sigreturn 机制与 SigreturnFrame 的 248 字节结构
  - 能用 pwntools SigreturnFrame 构造 execve/mprotect 帧
  - 能识别 SROP 适用信号（溢出小/有 syscall/无 libc 地址）
resources:
  - res-nightmare
  - res-ctf-wiki-stack-intro
  - res-pwntools-docs
challenges:
  - ch-nightmare-inctf17-stupiddrop
  - ch-nightmare-csaw19-smallboi
  - ch-nightmare-swamp19-syscaller
hints: []
writeups: []
review:
  method: 画 SigreturnFrame 关键字段图；默写触发序列（rax=15 → syscall）
  interval: 首次后 1 个月
sources:
  - "Nightmare 12.) SROP 三题 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# SROP

## 机制
```text
信号处理返回时 内核执行 rt_sigreturn(syscall 号 15/x86-64)
  → 从栈上读 sigcontext 结构，恢复: 全部通用寄存器 + rip + rsp + eflags...
  → "内核帮你要什么寄存器就有什么寄存器"
```

## 利用形态
```python
from pwn import *
frame = SigreturnFrame()
frame.rax = constants.SYS_execve
frame.rdi = binsh_addr; frame.rsi = 0; frame.rdx = 0
frame.rip = syscall_addr; frame.rsp = fake_stack

payload = flat(pop_rax_ret, 15, syscall_addr, bytes(frame))
```

## 前提与识别
- 需要一个 `syscall` 指令地址（静态题/泄露 libc 后均可）。
- 帧约 0xf8 字节 → 常配 stack pivot（新栈放帧）。
- 32 位变体：sigreturn 号 119（int 0x80 时代），帧布局不同。

## 实战
Nightmare `inctf17_stupiddrop`（pivot+SROP 组合）、`csaw19_smallboi`（经典最小 SROP）、`swamp19_syscaller`。
