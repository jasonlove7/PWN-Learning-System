---
id: core-ret2syscall
title: ret2syscall
description: ROP 直接发起 syscall：execve("/bin/sh",0,0) 与 orw 变体
importance: 4
difficulty: 3
track: mainline
type: technique
depth: standard
prerequisites:
  - core-rop-basics
  - fnd-linux-syscalls
why_learn: |
  静态链接题的标准出口；也是沙箱（seccomp 放行 orw）场景的基本功。
objectives:
  - 能在静态二进制里定位 syscall gadget 与字符串
  - 能构造 64/32 位 execve 链与 orw 链
resources:
  - res-nightmare
  - res-ropemporium
challenges:
  - ch-nightmare-dcquals16-feedme
hints: []
writeups: []
review:
  method: 默写 64/32 位两种寄存器布局
  interval: 首次后 2 周
sources:
  - "Nightmare §4 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# ret2syscall

## 64 位 execve 链
```text
rax=59(execve) rdi="/bin/sh" rsi=0 rdx=0 → syscall
pop rax ; ret
pop rdi ; ret
pop rsi ; ret
pop rdx ; ret        ← 稀缺！没有它见 ret2csu
syscall
```
```bash
ROPgadget --binary vuln --only "pop|ret"
ROPgadget --binary vuln --string "/bin/sh"    # 静态题通常自带
```

## 32 位差异
- `int 0x80`；eax=11；ebx=路径 ecx=argv edx=envp。

## orw 变体（沙箱题基本功）
```text
open(flag) → read(fd, buf, n) → write(1, buf, n)
```
- 常配 mprotect 或固定 bss 作 buf。

## 适用判断
- 静态链接（无 libc 可 ret2libc）✓
- 有 syscall 指令且参数 gadget 齐 ✓
- 动态链接也可（libc 里有 syscall; ret），但通常直接 ret2libc 更省事。
