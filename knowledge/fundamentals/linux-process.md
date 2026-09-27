---
id: fnd-linux-process
title: Linux 进程与虚拟内存
description: 进程地址空间布局、/proc/maps、进程的创建与程序如何变成进程
importance: 5
difficulty: 3
track: mainline
type: concept
depth: standard
prerequisites: []
why_learn: |
  ASLR、泄漏、PIE 全部挂在"进程虚拟地址空间"这个概念上。做题时 /proc/<pid>/maps 是第一诊断工具。
objectives:
  - 能读懂 /proc/self/maps 每一段的含义
  - 能解释 PIE 开/关时地址空间表现的差异
  - 能描述 execve 之后地址空间如何建立
resources:
  - res-csapp
challenges: []
hints: []
writeups: []
review:
  method: 读三个不同缓解配置的 maps 输出并解释差异
  interval: 首次后 2 周
sources:
  - "CS:APP ch7/9 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# Linux 进程与虚拟内存

## /proc/<pid>/maps 解读
```text
55f...000-55f...000 r--p 00000000 /vuln        ← 映像只读段（代码/rodata）
55f...000-55f...000 rw-p ...      /vuln        ← .data/.bss（GOT 也在动态段）
7f2...000-7f2...000 r--p ...      libc.so.6     ← libc 只读
7f2...000-7f2...000 r-xp ...      libc.so.6     ← libc 代码（system 在这里）
...                                            ← [heap] / [stack] / ld.so
```
- 判断三件事：静态/动态、PIE 与否（有无可执行文件基址随机）、heap/stack 位置。

## 关键概念
- **虚拟地址空间**：每个进程看到的是独立连续地址；页表翻译到物理页。
- **ASLR**：栈/堆/库/映像基址随机化的统称。PIE = "映像也参与随机化"。
- **execve 建立映像**：内核解析 ELF、映射 segments、ld.so 完成动态链接，然后才跳 main。

## 做题诊断流
```bash
cat /proc/$(pgrep vuln)/maps        # 远程题不可用时靠泄漏推断
```

## 连接
- 泄漏技术 → [leak-basics](../rop/leak-basics.md)；libc 内部结构 → [libc-basics](../rop/libc-basics.md)
