---
title: printf 到底在读什么
description: 看 printf 的参数放在哪些寄存器里，以及格式符比参数多时它继续从栈上读。
module: format-string
order: 1
difficulty: 4
prerequisites:
  - stack
  - gdb
objectives:
  - 能指出 printf 的格式串在 rdi，前两个取值参数在 rsi 和 rdx
  - 能解释格式符多于参数时，多出来的值是从栈上读的
  - 能把一段 %p 的输出和 GDB 里看到的栈对上
lab: labs/09-format-string
environment:
  arch: x86-64
  gcc: "15.2.0"
  glibc: "2.43"
---

# printf 到底在读什么

`printf("%x %x\n", a, b)` 和 `printf(buf)` 看起来只差一个参数。这一篇看 `printf` 到底从哪取它要打印的值，以及当格式串要求的值比你传的多时，它去哪拿。

实验环境是 x86-64、GCC 15.2.0、glibc 2.43。参数放在哪些寄存器由 x86-64 System V ABI 规定，不随 glibc 版本变化。glibc 版本写出来是为了让输出可以复现。

## 先看参数放对了的情况

`labs/09-format-string/args.c`：

```c
int a = 0x1111;
int b = 0x2222;
printf("%x %x\n", a, b);
```

按 `labs/09-format-string/README.md` 编译。直接运行打印 `1111 2222`。

看调用前的寄存器：

```bash
gdb -nx -q ./args
```

```text
(gdb) set debuginfod enabled off
(gdb) set disassembly-flavor intel
(gdb) disas main
```

找到 `call printf` 那一行，在它上面下断点。这一版在 `main+44`：

```text
(gdb) b *main+44
(gdb) run
(gdb) info registers rdi rsi rdx
(gdb) x/s $rdi
```

`rdi` 指向的字符串是 `"%x %x\n"`。`esi` 是 `0x1111`，`edx` 是 `0x2222`。

和函数调用那一节的结论接上：第一个参数走 `rdi`，第二个走 `rsi`，第三个走 `rdx`。对 `printf` 来说，第一个参数是格式串，后面的才是要打印的值。所以格式串在 `rdi`，`%x` 要的两个值在 `rsi` 和 `rdx`。

再看栈：

```text
(gdb) x/4gx $rsp
```

栈顶附近没有 `0x1111` 和 `0x2222`。这两个值只在寄存器里。前几个参数走寄存器，这是 ABI 决定的，不是 `printf` 决定的。

## 格式串来自输入

`labs/09-format-string/fmt.c`：

```c
char buf[128];
fgets(buf, sizeof(buf), stdin);
printf(buf);
```

这里只有一个参数。`buf` 既是格式串，也是唯一传进去的东西。

```bash
printf 'hello\n' | ./fmt
```

输入不含 `%`，原样打印 `hello`。`printf` 把格式串里的普通字符直接输出，不取参数。

现在让格式串要求取值：

```bash
python3 -c 'import sys;sys.stdout.buffer.write(b"%p.%p.%p.%p.%p.%p\n")' | ./fmt
```

输出是一串用点分开的十六进制数，类似：

```text
0x141f5011.0x739aebc14760.0x739aebc14760.0x141f5028.(nil).0x70252e70252e7025
```

你的前五个值会和这里不同，因为它们来自寄存器里当时残留的内容，每次运行都变。第六个不会变。先记住第六个是 `0x70252e70252e7025`，等下对它。

程序没有传这六个值。`printf` 还是打印了六个。

## 多出来的值从哪读的

在 GDB 里停在 `fmt` 的 `call printf` 上。这一版在 `main+60`：

```text
(gdb) b *main+60
(gdb) run < <(python3 -c 'import sys;sys.stdout.buffer.write(b"%p.%p.%p.%p.%p.%p\n")')
(gdb) x/s $rdi
(gdb) x/8gx $rsp
```

`rdi` 指向的就是你输入的那串 `%p.%p...`，它躺在 `main` 的 `buf` 里，也就是栈上。

前五个 `%p` 取走的是寄存器：格式串自己占了 `rdi`，剩下 `rsi`、`rdx`、`rcx`、`r8`、`r9` 五个寄存器里当时碰巧有的值。你没有给 `printf` 准备这些参数，所以这五个寄存器里是之前的函数调用留下的内容。它们是什么不重要，重要的是它们不是你传的。

第六个 `%p` 开始，寄存器不够了，`printf` 改从栈上取。栈上第一个 8 字节槽对应第六个参数。

现在看第六个值 `0x70252e70252e7025`。按小端把它拆成字节：`25 70 25 2e 70 25 2e 70`。`0x25` 是 `%`，`0x70` 是 `p`，`0x2e` 是 `.`。这正是你输入的 `%p.%p.%p` 的开头。

也就是说，第六个参数读到的就是你的输入本身。因为输入存在栈上的 `buf` 里，而 `printf` 取到第六个参数时已经在读栈了。

## 为什么这和普通的函数调用不同

普通函数的参数个数在编译时是确定的，编译器会为每个参数生成传递它的指令。`printf` 的参数个数由格式串在运行时决定。格式串说要六个值，它就去取六个：先取寄存器，寄存器取完取栈。没有人检查这些位置是不是真的被当作参数传递过。

所以「多读」不是读到了不存在的内存。那些内存都存在，只是本来不是给 `printf` 当参数的。格式串决定了它把哪些内存当成参数。

## 自己做一遍

1. 在 `args` 里把格式串改成三个 `%x`，只传两个值，重新编译运行。看第三个打印出来的是什么，再在 GDB 里找出它来自哪个位置。
2. 在 `fmt` 里只输入一个 `%p`，确认它来自寄存器而不是栈。再逐个增加 `%p`，找出从第几个开始读到你自己的输入。
3. 解释为什么第六个值能和输入对上，而前五个对不上。

## 学完这一节，你应该能够

- 指出 `printf` 的格式串在 `rdi`，随后的取值参数依次在 `rsi`、`rdx`、`rcx`、`r8`、`r9`，再往后在栈上。
- 解释格式符多于实际参数时，多出来的值来自寄存器里的残留和栈上的内容，不是来自一次新的传参。
- 把一段 `%p` 输出里的某个值拆成字节，判断它是不是自己的输入。

## 下一步

这一篇看到输入出现在了第六个参数的位置。下一篇把这件事变成一个可重复的步骤：给定一个程序，找出你的输入落在第几个参数，并且用 `%<n>$p` 直接把它读出来。
