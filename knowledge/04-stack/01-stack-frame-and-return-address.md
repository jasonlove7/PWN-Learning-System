---
title: 栈帧和返回地址
description: 在一次真实的调用里，把局部变量、保存的 rbp 和返回地址三个位置标出来。
module: stack
order: 1
difficulty: 3
prerequisites:
  - assembly
  - gdb
objectives:
  - 能指出返回地址在 rbp 之上 8 字节处
  - 能指出保存的旧 rbp 就在 rbp 指向的位置
  - 能说出局部变量位于 rbp 之下，离返回地址隔着保存的 rbp
lab: labs/04-stack
---

# 栈帧和返回地址

前面确认了 `call` 把返回地址压进栈。这一篇在一个有局部变量的函数里，把局部变量、保存的 `rbp`、返回地址三者的位置一次标清。后面算偏移就是在数这三个东西之间的距离。

## 一个最小的程序

`labs/04-stack/frame.c`：

```c
void leaf(int n) {
    int local = n + 1;
    (void)local;
}

void parent(void) {
    leaf(10);
}
```

按 `labs/04-stack/README.md` 编译。这里加了 `-fno-pie -no-pie`，只为让加载地址固定，使你看到的地址和下面写的一致。这个选项为什么能固定地址，是 ELF 模块的内容，这里先不解释，把它当作实验条件即可。

```bash
gdb -nx -q ./frame
```

```text
(gdb) set debuginfod enabled off
(gdb) set disassembly-flavor intel
(gdb) disas parent
(gdb) disas leaf
```

`parent` 里 `call leaf` 在 `parent+13`，下一条在 `parent+18`。`leaf` 开头是 `endbr64`、`push rbp`、`mov rbp, rsp`，然后把参数存到 `rbp-0x14`，局部变量 `local` 在 `rbp-0x4`。

## 进入 leaf 之后看栈

停在 `leaf` 刚设好 `rbp` 的地方，也就是 `mov rbp, rsp` 的下一条：

```text
(gdb) b *leaf+8
(gdb) run
(gdb) info registers rsp rbp
```

这两个值现在相等。看从这里往上的三段内存：

```text
(gdb) x/4gx $rbp-0x10
```

在这一版里，输出是这样的结构（具体地址每次运行不同，值的含义不变）：

```text
rbp-0x10:  参数 n 所在的位置附近
rbp+0x00:  一个栈地址，指向 parent 的帧
rbp+0x08:  parent 里 call 的下一条指令的地址
```

逐项对一下。

`rbp` 指向的那 8 个字节是个栈地址。它是 `push rbp` 压进去的，也就是 `parent` 自己的 `rbp`。所以「保存的旧 `rbp`」就在 `rbp` 指向的位置。

`rbp+8` 的那 8 个字节是个代码地址。用 `x/i` 看它，会落到 `parent+18`，也就是 `call` 的下一条。这是 `call` 压进去的返回地址。

`rbp-0x4` 是 `local`，`rbp-0x14` 是参数 `n`。它们都在 `rbp` 下面，也就是更低的地址。

## 为什么是这个顺序

把 `leaf` 被调用时栈的变化按时间排一下。

`call` 先执行，压入返回地址，`rsp` 减 8。然后 `leaf` 的 `push rbp` 再压入旧 `rbp`，`rsp` 再减 8。接着 `mov rbp, rsp` 让 `rbp` 指向刚压入的旧 `rbp`。

所以从低地址到高地址，顺序是：局部变量，然后是 `rbp` 指向的旧 `rbp`，然后是返回地址。返回地址在最高处，离缓冲区最远。

这个顺序是调用约定决定的，不随你的变量名变化。变的只是局部变量占多少、编译器把它们放在 `rbp` 减去多少的位置。

## 自己做一遍

1. 用 `x/i` 确认 `rbp+8` 处的值确实是 `parent` 里的一条指令，而不是 `leaf` 里的。
2. 用 `x/wx $rbp-0x4` 看 `local`，单步执行 `mov DWORD PTR [rbp-0x4], eax` 之后再看一次，确认这个位置被写成了 `n + 1`。
3. 数一数从 `rbp-0x4` 到 `rbp+8` 隔了多少字节。这个距离后面会变成「要覆盖返回地址需要填多少」。

## 学完这一节，你应该能够

- 在一个函数里指出：局部变量在 `rbp` 之下，保存的旧 `rbp` 在 `rbp` 处，返回地址在 `rbp+8`。
- 解释这个顺序来自 `call` 先压返回地址、函数再压旧 `rbp`。
- 把 `rbp+8` 的值反汇编，对上调用方的具体指令。

## 下一步

现在知道返回地址在 `rbp+8`。下一篇给函数一个缓冲区，让输入越过它，看返回地址是在第几个字节被碰到的。
