---
id: fnd-linux-syscalls
title: 文件描述符 / pipe / signal / 常用 syscall
description: 用户态到内核态的边界；fd 语义；做题高频 syscall 清单
importance: 4
difficulty: 2
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-linux-process
why_learn: |
  ret2syscall 与沙箱题直接操作 syscall；stdin/stdout 的 fd 语义决定远程交互脚本的行为。
objectives:
  - 能解释 0/1/2 三个标准 fd 与重定向的关系
  - 能列出做题高频 syscall（read/write/open/execve/mprotect/mmap/sendfile/orw 组合）及参数
  - 能解释 seccomp 拦截发生在哪一层
resources:
  - res-man7-seccomp
challenges:
  - ch-pwnable-kr-fd
  - ch-pwnable-kr-blukat
hints: []
writeups: []
review:
  method: 手写 execve("/bin/sh",0,0) 的寄存器布局（64位与32位各一遍）
  interval: 首次后 1 周
sources:
  - "seccomp(2) man page (verified 2026-09-27, man7.org)"
verification_status: verified
last_verified: 2026-09-27
---

# fd / pipe / signal / syscall

## fd 语义
- fd 是进程级整数索引的"打开文件"句柄；0=stdin 1=stdout 2=stderr。
- `dup2(old, new)` 重定向的基础 → orw 题把 flag fd 抄到 stdout 的标准动作。
- pwnable.kr `fd` 一题即是这个概念的直接考察。

## 做题高频 syscall（x86-64）
| syscall | rax | 关键参数 | 用途 |
|---------|-----|----------|------|
| read | 0 | rdi=fd rsi=buf rdx=n | 交互读 |
| write | 1 | 同上 | 泄漏输出 |
| open | 2 | rdi=path rsi=flags | orw 起 |
| mprotect | 10 | rdi=addr rsi=len rdx=prot | 改权限（ret2shellcode 复活） |
| mmap | 9 | — | 布置可执行区 |
| execve | 59 | rdi=path rsi=argv rdi/envp | 拿 shell |

- 32 位：int 0x80、参数在 ebx/ecx/edx（详见 [ret2syscall](../rop/ret2syscall.md)）。

## signal
- SIGSEGV/SIGILL 是"利用失败"的反馈信号；sigreturn 是 [SROP](../rop/srop.md) 的机制基础。

## seccomp 拦截层
- syscall 指令执行处被 BPF 过滤器拦截 → 沙箱题（[sandbox specialization](../specializations/sandbox.md)）。
