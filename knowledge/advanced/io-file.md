---
id: adv-io-file
title: IO_FILE / FSOP
description: glibc stdio 的 FILE 结构与 vtable：hook 后时代的核心出口
importance: 4
difficulty: 5
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-heap-modern
  - adv-largebin-attack
why_learn: |
  glibc ≥2.34 之后最重要的"从任意写到代码执行"出口之一；现代中高阶堆题标配。
objectives:
  - 能画出 \_IO_FILE 结构关键字段与 vtable 指针位置
  - 能解释 \_IO_list_all 链与 exit/fflush 触发路径
  - 能描述 house of orange 的经典触发（历史理解）与现代变体思想
resources:
  - res-ctf-wiki-heap-overview
  - res-how2heap
  - res-nightmare
challenges:
  - ch-nightmare-swampctf19-badfile
hints: []
writeups: []
review:
  method: 口述一次"伪造 FILE → 触发"的完整事件链
  interval: 首次后 2 个月
sources:
  - "CTF Wiki IO_FILE 章节存在性 (verified 2026-09-27)"
  - "Nightmare §17 File Exploitation (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# IO_FILE / FSOP

## FILE = 带"行为表"的大结构
```c
struct _IO_FILE {
    _flags;               // 魔数/标志（要满足检查）
    read/write ptr/end/base ...
    _chain;               // 串起所有打开的 FILE（_IO_list_all 是头）
    _fileno;
    vtable *;             // ★ 行为表：xsputn/overflow/...
};
```
- stdin/stdout/stderr 本身就是 libc 数据段里的 FILE → 直接可打（无需堆布局的题更简单）。

## 触发面
```text
exit() → _IO_cleanup → 遍历 _IO_list_all → flush 每个 FILE → 调 vtable 方法
putchar/printf 缓冲满 → overflow
```
- 控制 vtable 指针或 \_chain 插入假 FILE → 程序退出/输出时执行你的"方法"。

## 版本演化（vtable 检查）
- 2.24 起 vtable 必须落在 \_\_libc_IO_vtables 段 → 假 vtable 死 → 转向"合法 vtable 内偏移"（如 \_IO_str_jumps）技巧与后续各 house of apple 等变体。
- **再次强调版本先行的思维习惯。**

## 入门路径
1. CTF Wiki IO_FILE 章（中文原理）
2. Nightmare swampctf19_badfile（File Exploitation 入门题）
3. house of orange 历史案例（how2heap/orange 讲解）作"组合拳"范本
