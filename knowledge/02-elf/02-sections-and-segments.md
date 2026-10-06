---
title: section 和 segment
description: 用同一个文件对比 readelf -S 和 readelf -l，看一块代码在两张表里的不同身份。
module: elf
order: 2
difficulty: 2
prerequisites:
  - elf
objectives:
  - 能指出 .text、.rodata、.data、.bss 各装什么，以及 .bss 为什么不占文件空间
  - 能从 section to segment mapping 里指出一个 LOAD segment 包含哪些 section
  - 能说出 section 是给工具看的名字，segment 是给加载器看的一块带权限的内存
lab: labs/02-elf
environment:
  arch: x86-64
  gcc: "15.2.0"
  glibc: "2.43"
---

# section 和 segment

上一篇看到文件里有两张表。这一篇看同一份内容在两张表里分别长什么样。

## 一个有数据的程序

`labs/02-elf/data.c`：

```c
const char *msg = "hello";
int initialized = 0x1234;
int uninitialized;

int add(int a, int b) {
    return a + b;
}
```

它故意放了四种东西：一段代码、一个字符串、一个有初值的变量、一个没初值的变量。按 README 编译。

## 先看 section

```bash
readelf -S data
```

输出很长，只看这四行：

```text
[12] .text    PROGBITS  0000000000001040  00001040
              0000000000000120  0000000000000000  AX
[14] .rodata  PROGBITS  0000000000002000  00002000
              000000000000000a  0000000000000000   A
[23] .data    PROGBITS  0000000000004000  00003000
              0000000000000020  0000000000000000  WA
[24] .bss     NOBITS    0000000000004020  00003020
              0000000000000008  0000000000000000  WA
```

每行有两个容易混的列。`Address` 是这块东西在内存里的地址，`Offset` 是它在文件里的偏移。`.text` 的地址是 `0x1040`，文件偏移也是 `0x1040`，这两个数碰巧一样，下一篇会看到它们不是一回事。

标志列里，`A` 表示这块要被加载进内存，`X` 表示可执行，`W` 表示可写。`.text` 是 `AX`，只执行不写。`.rodata` 只有 `A`，读，不能写也不能执行。`.data` 和 `.bss` 是 `WA`，可写。

现在验证里面装的是什么。

```bash
readelf -x .rodata data
```

```text
0x00002000 01000200 68656c6c 6f00        ....hello.
```

`68 65 6c 6c 6f` 是 `hello`。字符串在 `.rodata`。

```bash
readelf -x .data data
```

```text
0x00004010 34120000 00000000
```

`34 12 00 00` 按小端读是 `0x1234`，这就是 `initialized`。有初值的全局变量在 `.data`。

`.bss` 的类型是 `NOBITS`，不是 `PROGBITS`。它的 `Size` 是 8，但文件里没有对应的字节。`uninitialized` 没有初值，所以编译器只记录「这块内存要有 8 字节」，不在文件里放 8 个零。加载时这块内存会被清零，但那是加载的事，文件里没有它。

## 再看 segment

```bash
readelf -l data
```

只看类型是 `LOAD` 的四项：

```text
LOAD  0x000000  0x0000000000000000  0x0005e8  0x0005e8  R
LOAD  0x001000  0x0000000000001000  0x00016d  0x00016d  R E
LOAD  0x002000  0x0000000000002000  0x000148  0x000148  R
LOAD  0x002df0  0x0000000000003df0  0x000230  0x000238  RW
```

四列里，`Offset` 是文件偏移，`VirtAddr` 是内存地址，`FileSiz` 是文件里占多少字节，`MemSiz` 是内存里占多少字节，`Flg` 是权限。

注意第四个 `LOAD`。`FileSiz` 是 `0x230`，`MemSiz` 是 `0x238`，内存比文件大 8 字节。这 8 字节就是 `.bss`：文件里没有，内存里要有。

输出末尾有一段 `Section to Segment mapping`：

```text
02  .note.gnu.build-id .interp .gnu.hash .dynsym .dynstr ...
03  .init .plt .plt.got .text .fini
04  .rodata .eh_frame_hdr .eh_frame .note.gnu.property .note.ABI-tag
05  .init_array .fini_array .dynamic .got .data .bss
```

编号和上面的 `LOAD` 对得上。第二个 `LOAD`（编号 03）包含 `.text`，权限是 `R E`，和 `.text` 的 `AX` 一致。第三个 `LOAD`（编号 04）包含 `.rodata`，权限是 `R`。第四个 `LOAD`（编号 05）包含 `.data` 和 `.bss`，权限是 `RW`。

一个 segment 装了好几个 section。`.text`、`.plt`、`.init`、`.fini` 在文件里是四块，进内存时合成一块可执行的。

## 两张表为什么都要

section 有名字。你想知道字符串在哪，就找 `.rodata`。segment 没有这样的名字，它只有一段范围和一组权限。

加载器不关心名字。它读 `LOAD` 这两行，把文件里从 `Offset` 开始的 `FileSiz` 个字节映射到 `VirtAddr`，权限按 `Flg` 设。`.text` 叫什么、里面是不是代码，加载器不过问。

所以看「这块东西是什么」用 section，看「这块东西以什么权限进内存」用 segment。后面判断栈能不能执行、某段地址能不能写，看的都是 segment 的 `Flg`，不是 section 的名字。

## 自己做一遍

1. 在 `readelf -S` 里找出 `.text` 的 `Address` 和 `Offset`，再在 `readelf -l` 的 mapping 里确认它落在哪个 `LOAD` 里。
2. 算出第四个 `LOAD` 的 `MemSiz` 和 `FileSiz` 之差，和 `.bss` 的 `Size` 对比。
3. 解释为什么 `.rodata` 和 `.text` 不在同一个 `LOAD` 里。提示看它们的权限。

## 学完这一节，你应该能够

- 指出 `.text` 放代码、`.rodata` 放只读数据、`.data` 放有初值的可写数据、`.bss` 只记录大小不占文件。
- 从 `Section to Segment mapping` 里说出一个 `LOAD` segment 包含哪些 section。
- 说明 section 是带名字的组织单位，segment 是带权限的加载单位，一个 segment 可以包含多个 section。

## 下一步

这些地址都是文件里写的。程序跑起来之后，内存里的地址还是这些吗？下一篇把文件里的 `VirtAddr` 和运行时实际映射到的地址对一下。
