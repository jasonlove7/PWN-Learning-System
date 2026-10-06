---
title: 一个 ELF 文件是什么
description: 用 readelf -h 看一个最小程序的文件头，找出入口地址和两张表的位置。
module: elf
order: 1
difficulty: 2
prerequisites:
  - assembly
objectives:
  - 能用 file 判断一个文件是不是 ELF，并读出位数和字节序
  - 能用 readelf -h 指出入口地址
  - 能说出 program header 和 section header 在文件里各有一张表，以及它们的用途不同
lab: labs/02-elf
environment:
  arch: x86-64
  gcc: "15.2.0"
  glibc: "2.43"
---

# 一个 ELF 文件是什么

`gcc` 产出的不是一堆机器码直接拼起来。它是一个有固定开头的文件，开头告诉你后面的东西放在哪。这一篇只看这个开头。

## 一个什么都不做的程序

`labs/02-elf/tiny.c`：

```c
int main(void) {
    return 0;
}
```

按 `labs/02-elf/README.md` 编译，先用 `file` 看它：

```bash
file tiny
```

输出的前半段是：

```text
ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2
```

这几个词后面每一篇都会用到。先记下来，不解释。

## 看文件头

```bash
readelf -h tiny
```

开头是这样的：

```text
Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
Class:                             ELF64
Data:                              2's complement, little endian
Type:                              DYN (Position-Independent Executable file)
Machine:                           Advanced Micro Devices X86-64
Entry point address:               0x1040
Start of program headers:          64 (bytes into file)
Start of section headers:          13912 (bytes into file)
Size of this header:               64 (bytes)
Size of program headers:           56 (bytes)
Number of program headers:         14
Size of section headers:           64 (bytes)
Number of section headers:         29
```

你的 `Entry point address` 和两个 `Start of` 后面的数字可能和这里不同。GCC 版本一变，这些就会变。字段的名字不会变。

## 这几个字段在说什么

`Magic` 的前四个字节是 `7f 45 4c 46`，也就是字节 `0x7f` 加上字符 `ELF`。`file` 就是靠这四个字节判断它是 ELF。不是这四个字节开头的文件，`readelf` 会直接拒绝。

`Class: ELF64` 对应 `file` 输出里的 `64-bit`。这是一个 64 位的 ELF，里面的地址是 8 字节。

`Data: little endian` 对应 `LSB`。多字节的数低位在前，这和前面汇编里看到的字节序是同一件事。

`Machine` 说这个文件的机器码是给 x86-64 的。拿去给别的架构跑，加载器会拒绝。

`Entry point address` 是程序开始执行的地址。注意它不是 `main`。`main` 之前还有一段启动代码，入口指的是那段的开头。这个数字是 `0x1040`，很小，不像一个真实的内存地址。它为什么这么小，第三篇再看。

## 两张表

文件头里有两组几乎对称的字段。

`Start of program headers` 是 64，`Size of this header` 也是 64。所以 program header 这张表紧挨着文件头，从第 64 个字节开始。表里有 14 项，每项 56 字节。

`Start of section headers` 是 13912，靠近文件末尾。section header 这张表有 29 项，每项 64 字节。

两张表都是「文件里有哪些块」的目录。差别在于谁读它们：program header 是加载器读的，用来决定把哪一段映射进内存；section header 是链接器和 `readelf`、`objdump` 这类工具读的，用来知道每一块叫什么名字、装的是什么。

这个差别下一篇用实际的块来看，这里只需要知道文件里有两张表，而且它们的位置都写在文件头里。

## 自己做一遍

1. 用 `file` 看一个不是 ELF 的文件，比如 `tiny.c` 本身，对比输出差在哪。
2. 在 `readelf -h` 的输出里找出 program header 表的起始位置和项数，算出这张表在文件里占多少字节。
3. 找出入口地址。先别假设它等于 `main` 的地址，下一篇会验证这件事。

## 学完这一节，你应该能够

- 用 `file` 判断一个文件是不是 ELF，并读出它是 64 位还是 32 位、字节序是什么。
- 用 `readelf -h` 指出入口地址。
- 说出 program header 和 section header 是文件里的两张表，一张给加载器用，一张给工具用。

## 下一步

文件头只说了两张表在哪，没说表里有什么。下一篇打开这两张表，看同一块代码在两张表里各是什么样子。
