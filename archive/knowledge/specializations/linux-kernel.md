---
id: spec-linux-kernel
title: Linux Kernel PWN（方向骨架）
description: 内核利用方向的知识点骨架与入口资源索引
importance: 4
difficulty: 5
track: specialization
type: concept
depth: skeleton
prerequisites:
  - core-ret2libc
  - adv-heap-overview
why_learn: |
  CTF 国际赛主力方向；用户态方法论（泄漏/ROP/堆）向内核的直接迁移。
objectives:
  - 能说出 kmalloc 在内核文档里的定位：小于一页的对象，通常用它；文档把这一节叫做 Slab Cache
  - 能说出 kgdb 是给 gdb 用的内核源码级调试器，并知道启动参数里有 kgdboc、kgdbwait、nokaslr
  - 能按参数表区分：nokaslr 关的是内核/模块基址 ASLR；pti= 在 X86-64 上控制用户与内核页表隔离；nosmep/nosmap 这两条的架构标记是 PPC，不是 x86
  - 能拒绝背「某内核版本默认开启 SMEP/SMAP/KPTI」——本轮没有这样的原文
resources:
  - res-xairy-kernel
  - res-kernel-memory-allocation
  - res-kernel-mm-api
  - res-kernel-kgdb
  - res-kernel-parameters
  - res-ctf-wiki
  - res-pwn-college
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "xairy/linux-kernel-exploitation (verified 2026-09-27)"
  - "CTF Wiki 内核章导航 (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# Linux Kernel（骨架）

> depth: skeleton。没有打开过的内核 CTF 题，不能当成完整模块。
> 只在自己的 qemu / 公开题目里练习。这里不写利用步骤。

## 已经打开、可以当作入口的文档

文档版本都是打开时页面上的 7.3.0-rc4，以后会变。

| 文档 | 能支撑的一句 |
|------|----------------|
| Memory Allocation Guide | 内核分配器怎么选、GFP。不是漏洞教程 |
| Memory Management APIs | 「The Slab Cache」。kmalloc 是小于一页的对象的常规分配方式。同节有 kfree。没有单独的 SLUB 标题 |
| kgdb | 用 gdb 做内核源码级调试。参数名里有 kgdboc、kgdbwait、nokaslr。没有写 QEMU 怎么接 |
| kernel-parameters | 见下 |

xairy 仍是链接集，不是课。CTF Wiki 内核深链此前 404。pwn.college 的题不收录。

## 命令行参数里读到的缓解（不要外推版本）

来自 `admin-guide/kernel-parameters.html`，只写参数说明本身：

- `nokaslr`：在 `CONFIG_RANDOMIZE_BASE` 打开时，关掉内核和模块基址的 ASLR。
- `pti=`，标记 `[X86-64]`：控制用户地址空间和内核地址空间的页表隔离。关掉会去掉这项加固。`nopti` 在 X86-64 上等价于 `pti=off`。
- `nosmep` / `nosmap`：关掉 SMEP / SMAP，即使处理器支持。这两条的架构标记是 `[PPC64s]` 和 `[PPC]`，不是 x86。

没有读到「从某个内核版本起默认开启」。`hw-vuln` 索引里没有 KASLR、SMEP、SMAP、KPTI 这四个词。

和用户态的差别只停留在文档范围：用户态的 ASLR/NX 管的是进程；这里的 `nokaslr` 和 `pti=` 写的是内核基址和内核页表。SMEP/SMAP 在这份参数表里没有 x86 条目，所以不把它们写成 x86 内核的已核对事实。

## 还没有

- QEMU 启动内核的官方步骤（本轮没打开到这样一篇）
- SLUB 内部结构
- 内核 UAF、任意读写、提权的教学页
- 任何核对过「这是 Linux 内核题」的 challenge 和 writeup

下面的名字只是以后可以拆的方向，不是已经存在的知识点：

```text
内核态与系统调用
模块与 ioctl
kgdb（已有文档，还没有实验）
slab / kmalloc（只有上面那一句）
KASLR 与 X86-64 的 pti（只有参数表）
漏洞原语与提权（没有来源，不写）
```

