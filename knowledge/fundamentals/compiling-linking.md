---
id: fnd-compiling-linking
title: 编译与链接基础
description: 预处理→编译→汇编→链接四阶段；静态与动态链接的差异
importance: 4
difficulty: 3
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-c-memory
why_learn: |
  checksec 的输出（RELRO/PIE/静态动态）全部围绕链接机制；ret2libc 的存在本身就是动态链接的"副作用"。
objectives:
  - 能区分 .i/.s/.o/可执行文件各阶段产物并动手走完一遍
  - 能解释静态链接与动态链接在体积/加载/符号解析上的差异
  - 能用 gcc 常用编译选项（-g -O0 -static -no-pie -fno-stack-protector）复现教学环境
resources:
  - res-csapp
  - res-book-linkers-loaders-cn
challenges: []
hints: []
writeups: []
review:
  method: 从零手动 gcc -E/-S/-c 走一遍并解释产物
  interval: 首次后 2 周
sources:
  - "CS:APP 链接章 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 编译与链接基础

## 四阶段
```text
hello.c →(cpp)→ hello.i →(cc1)→ hello.s →(as)→ hello.o →(ld)→ hello
```
- `-E` / `-S` / `-c` 可分别在每步停下观察。
- `.s` 文件是后面读汇编的直接素材。

## 静态 vs 动态链接
| 维度 | 静态 (-static) | 动态（默认） |
|------|----------------|--------------|
| libc 代码 | 拷入可执行文件 | 运行时映射 libc.so |
| 体积 | 大 | 小 |
| 符号地址 | 编译期定死 | 加载时重定位（GOT） |
| PWN 含义 | 有 syscall gadgets、无 libc 泄漏问题 | ret2libc / GOT 覆写的主场 |

## 教学环境复现选项（做题常备）
```bash
gcc -g -no-pie -fno-stack-protector -z execstack -o vuln vuln.c   # 教学最小防护
gcc -g -o hard hard.c                                              # 现代默认（全开）
```

## 连接
- 动态链接细节 → [got-plt-fundamentals](got-plt-fundamentals.md)（本目录）
- 《程序员的自我修养》中文系统参考（书目录见 resources/books.md，标注：URL 未验证）
