---
id: core-ret2shellcode
title: ret2shellcode 与 NX
description: 栈/堆/bss 上注入代码并跳转执行；NX 存在时的 mprotect 思路
importance: 5
difficulty: 3
track: mainline
type: technique
depth: standard
prerequisites:
  - core-ret2win
why_learn: |
  shellcode 是"任意代码执行"的直观形态；理解它被 NX 封杀的历史，才能理解 ROP 为什么成为主流。
objectives:
  - 能写出 pwntools shellcraft 生成 + 跳转的完整利用
  - 能解释 NX 下 mprotect 阶段化方案（先 ROP 调 mprotect 再跳 shellcode）
  - 知道 shellcode 的自定位（位置无关）写法与坏字符适配
resources:
  - res-nightmare
  - res-pwntools-docs
challenges:
  - ch-nightmare-csaw17-pilot
  - ch-nightmare-tamu19-pwn3
hints: []
writeups: []
review:
  method: 手写 execve("/bin/sh",0,0) 无 NULL 版 shellcode 的伪代码级解释
  interval: 首次后 2 周
sources:
  - "Nightmare §3 Shellcode (verified 2026-09-27)"
  - "pwntools shellcraft 文档 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# ret2shellcode 与 NX

## 利用形态（无 NX 时）
```text
1. 输入 shellcode 到 buf（栈/堆/.bss——checksec 看哪段 rwx 或可写可跳）
2. 溢出返回地址 → buf 地址（栈上时需要地址可知: no PIE/ASLR off）
payload = shellcode + padding + p64(buf_addr)
```

## shellcode 来源
```python
from pwn import *
context.arch='amd64'
sc = shellcraft.sh()          # 或手写
payload = asm(sc)             # 适配坏字符: shellcraft 前手动改写
```

## NX 的存在意义（历史转折点）
- NX = 数据段不可执行 → 直接注入失效 → **代码复用**（ROP）成为主线。
- 但注意检查映射：`vmmap` 里找 `rwx` 段（部分题故意留 rw× 段）。

## mprotect 复活术（NX 下仍可用）
```text
ROP: pop rdi/rsi/rdx; mprotect(page, len, 7); → 跳到已注入的 shellcode
```
- 页对齐（0x1000）；常见于栈地址已知或 bss 可控的题。

## 实战
Nightmare §3：csaw17_pilot（栈上 shellcode）、tamu19_pwn3。
