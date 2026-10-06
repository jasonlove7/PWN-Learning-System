---
id: fnd-pwntools
title: pwntools 入门
description: process/remote、IO 交互、packing、cyclic、ELF/ROP 对象
importance: 5
difficulty: 2
track: mainline
type: tool
depth: standard
prerequisites:
  - fnd-gdb
why_learn: |
  写 exp 的标准库。交互、打包、gadget、gdb 联动一站式。
objectives:
  - 能写本地/远程切换的标准 exp 骨架
  - 能用 p64/p32/cyclic/ELF/ROP 完成基础利用脚本
resources:
  - res-pwntools
  - res-pwntools-docs
challenges: []
hints: []
writeups: []
review:
  method: 持续使用
  interval: —
sources:
  - "pwntools 官方文档 (verified 2026-09-27, docs.pwntools.com)"
verification_status: verified
last_verified: 2026-09-27
---

# pwntools 入门

## 标准 exp 骨架（背下来）
```python
from pwn import *
context.arch = 'amd64'
context.log_level = 'info'

exe = ELF('./vuln', checksec=False)
libc = ELF('./libc.so.6', checksec=False)

p = process('./vuln')          # 本地
# p = remote('host', 1337)     # 远程——只改这一行

p.sendlineafter(b'> ', payload)
p.interactive()                # 交互拿 shell
```

## 高频 API
| API | 用途 |
|-----|------|
| p64()/p32()/u64() | 打包/解包地址 |
| cyclic(n) / cyclic_find() | 偏移定位 |
| ELF().symbols['func'] | 符号地址 |
| ELF().got / .plt | GOT/PLT 表 |
| ELF().search(b'/bin/sh') | 找字符串 |
| ROP(exe).find_gadget(['pop rdi','ret']) | gadget |
| gdb.attach() / gdb.debug() | 联调 |
| shellcraft.sh() / asm() | shellcode |

## 命令行
```bash
pwn checksec vuln; pwn cyclic 200; pwn disasm ...; pwn libcdb lookup puts 0x7f...
```

## 连接
下一步 → [stack-overflow](../stack/stack-overflow.md) 完成第一次实战。
