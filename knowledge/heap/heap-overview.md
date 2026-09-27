---
id: adv-heap-overview
title: 堆基础——brk/mmap、arena、chunk 结构
description: glibc ptmalloc 的分层模型与 chunk 内存表示
importance: 5
difficulty: 4
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-linux-process
  - fnd-c-struct-funcptr
why_learn: |
  堆利用的一切技术都是"与分配器博弈"。不建立 allocator 心智模型，每个技术都是孤立咒语。
objectives:
  - 能画出 malloc_chunk 结构与三种状态（allocated/free/top）
  - 能解释 brk 与 mmap 两条堆内存来源及其阈值
  - 能解释 arena 概念与 main_arena 的位置意义（libc 数据段！）
resources:
  - res-ctf-wiki-heap-overview
  - res-sploitfun-malloc
  - res-how2heap
challenges: []
hints: []
writeups: []
review:
  method: 白纸画 chunk 结构图（含 prev_size/size/flag bits）
  interval: 首次后 1 周
sources:
  - "CTF Wiki 堆概述 (verified 2026-09-27)"
  - "sploitfun Understanding glibc malloc (verified 2026-09-27)"
  - "how2heap (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 堆基础：arena 与 chunk

## 分层模型
```text
程序 (malloc/free) ↔ ptmalloc (arena/bins/chunks) ↔ brk/mmap ↔ 内核页
```
- `brk`：主线程堆（[heap] 段，start_brk 随 ASLR）。
- `mmap`：大请求（>128KB 阈值默认）与线程 arena。
- **main_arena 是 libc 里的全局数据结构** → unsorted bin 的 fd/bk 指向它 → 堆泄漏 libc 的根源（后面 [unsorted-bin-attack](unsorted-bin-attack.md)）。

## malloc_chunk（64 位）
```c
struct chunk {
    prev_size;   // 前一 chunk free 时存其大小；allocated 时被前一 chunk 的数据复用！
    size;        // 本 chunk 大小 | PREV_INUSE(1) | IS_MMAPPED(2) | NON_MAIN_ARENA(4)
    fd; bk;      // free 时生效（allocated 时是用户数据）
    fd_nextsize; bk_nextsize;  // largebin 专用
};
```
- 有效大小对齐 0x10（64位）；最小 0x20。
- **prev_size 复用规则**是 off-by-null/overlap 技术的物理基础。

## 眼见为实
```bash
pwndbg> heap          # chunk 列表
pwndbg> parse_heap
# 或读 CTF Wiki 堆概述的 brk/mmap 实验代码
```

## 连接
bins 组织 → [heap-bins](heap-bins.md)；现代默认路径 → [tcache](tcache.md)
