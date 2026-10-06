---
title: 找到偏移
description: 让输入越过缓冲区，数出从缓冲区到返回地址的字节数。
module: stack
order: 2
difficulty: 3
prerequisites:
  - stack
objectives:
  - 能在 GDB 里指出缓冲区起点、保存的 rbp、返回地址三个地址
  - 能算出覆盖返回地址需要的字节数，并说明这个数是怎么来的
  - 能解释崩溃时 rbp 变成 0x4141414141414141 的原因
lab: labs/04-stack
---

# 找到偏移

上一篇标出了返回地址在 `rbp+8`。这一篇看一个不检查长度的拷贝，会从缓冲区一直写到那里。要算的是：从缓冲区的第一个字节到返回地址，隔着多少字节。

## 一个会越界的程序

`labs/04-stack/overflow.c`：

```c
void vuln(const char *input) {
    char buf[16];
    strcpy(buf, input);
}
```

`strcpy` 一直拷贝到遇到 `\0` 为止，不看 `buf` 只有 16 字节。输入来自 `main` 里一个 64 字节的数组，所以可以比 `buf` 长。

按 `labs/04-stack/README.md` 编译。这里关掉了栈保护，因为栈保护会在返回前发现栈被改过并直接终止程序，那样就看不到返回地址变成了什么。它挡住的是哪一步，留到 mitigations 再讲。

先用短输入确认程序本身能跑完：

```bash
printf 'hello\n' | ./overflow; echo "exit=$?"
```

应打印 `done`，退出码 0。

## 先找缓冲区在哪

```bash
gdb -nx -q ./overflow
```

```text
(gdb) set debuginfod enabled off
(gdb) set disassembly-flavor intel
(gdb) disas vuln
```

`vuln` 里有一行：

```text
lea    rax,[rbp-0x10]
```

这就是 `buf` 的地址。`strcpy` 的目标是 `rdi`，而这里把 `rax` 传给了 `rdi`。所以 `buf` 在 `rbp-0x10`，不是在 `rbp` 减别的数。`char buf[16]` 占 16 字节，也就是 `0x10`，编译器把它放在了紧挨着保存的 `rbp` 的下方。

这个位置是编译器决定的。换一个 GCC 版本，`buf` 可能不在 `rbp-0x10`。所以偏移不能从 `char buf[16]` 直接算成 16，要看实际放在哪。

## 用一组已知字节去覆盖

`strcpy` 会把源字符串连同结尾的 `\0` 一起拷贝。为了看清每一段被写成了什么，输入一串 `A`。`A` 的字节是 `0x41`，在内存里很好认。

先看 8 个 `A` 够不到哪里。在 `strcpy` 返回之后、函数返回之前停下，也就是 `leave` 那一行：

```text
(gdb) b *vuln+36
(gdb) run < <(python3 -c "import sys;sys.stdout.buffer.write(b'A'*8)")
(gdb) x/gx $rbp-0x10
(gdb) x/gx $rbp
(gdb) x/gx $rbp+8
```

`rbp-0x10` 是 `0x4141414141414141`。`rbp` 处和 `rbp+8` 处还是原来的值，没有被碰到。8 个字节只填满了 `buf` 的前一半。

再看 24 个：

```text
(gdb) run < <(python3 -c "import sys;sys.stdout.buffer.write(b'C'*24)")
(gdb) x/2gx $rbp
```

这次 `rbp` 处变成了 `0x4343434343434343`，而 `rbp+8` 只被改了一个字节。24 个字节越过了 `buf` 的 16 字节，写满了保存的 `rbp` 那 8 字节，再多出的 1 个 `\0` 落进了返回地址的最低字节。

## 数清楚

把三段的距离加起来。

`buf` 从 `rbp-0x10` 开始，到 `rbp` 是 `0x10`，也就是 16 字节。这是缓冲区本身。

`rbp` 到 `rbp+8` 是 8 字节。这是保存的旧 `rbp`。

所以从 `buf` 的第一个字节到返回地址的第一个字节，是 16 + 8 = 24 字节。第 25 个字节开始进入返回地址。

这个 24 就是偏移。它等于「缓冲区实际所在的位置到 `rbp` 的距离」加上「`rbp` 到返回地址的 8 字节」，不是 `buf` 的声明长度。声明长度碰巧等于距离，是因为编译器把 `buf` 紧挨着放在了 `rbp` 下面。

## 看崩溃时的寄存器

不在 `leave` 前停下，让它真的返回，用 40 个 `A`：

```text
(gdb) delete
(gdb) run < <(python3 -c "import sys;sys.stdout.buffer.write(b'A'*40)")
(gdb) info registers rip rbp
```

程序收到 `SIGSEGV`。`rbp` 是 `0x4141414141414141`。这就是刚才被覆盖的旧 `rbp`，函数返回时 `leave` 把它弹回了 `rbp` 寄存器。

`rip` 没有变成 `0x4141414141414141`，是因为 40 个 `A` 加上 `strcpy` 补的 `\0` 已经越过了返回地址，写到了更远处，返回地址被完整覆盖后又被后续字节继续覆盖，具体停在哪个地址取决于你填了多长。要点不是这个崩溃地址，而是你能在 `leave` 之前直接读到 `rbp+8` 被写成了什么。

## 自己做一遍

1. 只用 `disas vuln` 的输出，不运行，说出 `buf` 在 `rbp` 减去多少。再运行验证。
2. 构造一段输入，让 `rbp+8` 恰好变成 `0x0000424242424242`，同时不要再往上写。算出需要几个字节，用 GDB 在 `leave` 前确认。
3. 解释为什么第 2 步里返回地址的最高字节必须是 `0x00`，它是谁写进去的。

## 学完这一节，你应该能够

- 从 `disas` 里找出缓冲区的实际位置，而不是从声明的长度推测。
- 算出从缓冲区到返回地址的字节数，并把它拆成「缓冲区到 `rbp`」和「`rbp` 到返回地址」两段。
- 解释崩溃现场里 `rbp` 变成一串相同字节的原因。

## 下一步

现在能把返回地址改成任意值，但改成什么、程序会走向哪里，取决于栈上的机器码能不能执行。下一模块看 shellcode：一段你自己提供的机器码，以及它为什么要求栈是可执行的。
