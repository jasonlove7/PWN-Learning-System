---
title: 文件里的东西怎么进内存
description: 把 readelf -l 里的虚拟地址和 GDB 里看到的实际映射对上，看两者什么时候相同。
module: elf
order: 3
difficulty: 3
prerequisites:
  - elf
objectives:
  - 能把一个 LOAD segment 的 VirtAddr 和运行时映射的起始地址对应起来
  - 能解释 PIE 下文件里的地址为什么是一个很小的数
  - 能说出文件里的虚拟地址和运行时地址不是永远相同的
lab: labs/02-elf
environment:
  arch: x86-64
  gcc: "15.2.0"
  glibc: "2.43"
---

# 文件里的东西怎么进内存

上一篇的 `LOAD` 段写着 `VirtAddr 0x1000`。这个数是文件作者希望这块东西被放在内存里的位置。这一篇看程序真的跑起来之后，它在不在这个位置。

## 先看文件里写的

用上一篇的 `data`，或者重新编译 `labs/02-elf/data.c`。

```bash
readelf -l data
```

四个 `LOAD`：

```text
LOAD  0x000000  0x0000000000000000  R
LOAD  0x001000  0x0000000000001000  R E
LOAD  0x002000  0x0000000000002000  R
LOAD  0x002df0  0x0000000000003df0  RW
```

可执行的那段从 `0x1000` 开始。入口地址是 `0x1040`，落在这段里面。

## 再看运行时

```bash
gdb -nx -q ./data
```

```text
(gdb) set debuginfod enabled off
(gdb) start
(gdb) info proc mappings
```

`start` 让程序停在 `main`。`info proc mappings` 打印这个进程的内存映射。找到文件名是 `data` 的那几行：

```text
0x555555554000  0x555555555000  r--p  data
0x555555555000  0x555555556000  r-xp  data
0x555555556000  0x555555557000  r--p  data
0x555555558000  0x555555559000  rw-p  data
```

你的地址会和这里不同，而且每次运行都不同。这是正常的。

对照权限。文件里四个 `LOAD` 的权限是 `R`、`R E`、`R`、`RW`，运行时这几段是 `r--p`、`r-xp`、`r--p`、`rw-p`。权限对得上，顺序也对得上。

地址对不上。文件里可执行段从 `0x1000` 开始，运行时它从 `0x555555555000` 开始。差了 `0x555555554000`。

## 这个差是什么

看第一段的起始地址 `0x555555554000`。用它加上文件里的 `VirtAddr`，就得到运行时的地址：

```text
0x555555554000 + 0x1000 = 0x555555555000
```

正好是可执行段的起始。入口 `0x1040` 在运行时就是 `0x555555554000 + 0x1040`。

所以文件里的 `VirtAddr` 不是绝对地址，是相对加载基址的偏移。加载基址每次运行都不一样，这就是上面那几行地址每次都变的原因。

`file` 输出里的 `pie executable` 和 `readelf -h` 里的 `Type: DYN` 说的就是这件事。PIE 是 position-independent executable，文件不假定自己会被放在固定地址。GCC 15 默认就生成这种文件。

## 什么时候两者相同

重新编译一份关掉 PIE 的：

```bash
gcc -fno-pie -no-pie -o data-nopie data.c
readelf -h data-nopie | grep Entry
```

入口变成 `0x401040` 这种样子，不再是 `0x1040`。再看映射：

```bash
gdb -nx -q -ex "set debuginfod enabled off" -ex "start" -ex "info proc mappings" ./data-nopie
```

这次文件名是 `data-nopie` 的那几段从 `0x400000` 开始，和文件里写的 `VirtAddr` 一致。关掉 PIE 之后，文件里的地址就是运行时的地址。

前面的栈实验用 `-fno-pie -no-pie` 编译，就是为了让你在 GDB 里看到的地址和 `disas` 里的地址相同，不用每次加基址。那个选项不是默认行为。默认行为是你刚才看到的：基址每次都变。

## 这和后面的关系

后面要算一个函数的真实地址时，不能直接用文件里读到的数。文件里的数是偏移，真实地址是基址加偏移。基址从哪来，是后面的问题。这里只需要记住这两件事不是永远相等的。

ASLR 是让这个基址每次都变的机制。它怎么工作、能不能关掉，留到 mitigations 再讲。

## 自己做一遍

1. 在默认编译的 `data` 上跑两次，记录每次可执行段的起始地址，确认两次不同。
2. 用其中一次的基址加上 `readelf -h` 里的入口地址，算出运行时入口，和 `info proc mappings` 里可执行段的范围对比，确认它落在这段里。
3. 用 `-fno-pie -no-pie` 再编译一次，确认这次文件里的入口地址和运行时一致。

## 学完这一节，你应该能够

- 把 `readelf -l` 里一个 `LOAD` 的 `VirtAddr` 加上加载基址，得到它在运行时的地址。
- 解释 PIE 下文件里的地址为什么是 `0x1040` 这种小数字。
- 说出文件里的虚拟地址和运行时地址只在非 PIE 时相同。

## 下一步

到这里看的都是程序自己的代码和数据。`printf` 这种函数的代码在哪个文件里？下一篇看程序怎么记录「这个函数不是我的」。
