---
title: 寄存器、立即数和内存
description: 用三条指令看清汇编里的值从哪来、到哪去。
module: assembly
order: 1
difficulty: 2
prerequisites: []
objectives:
  - 能读出 mov eax, DWORD PTR [rbp-0x4] 的源和目的
  - 能把 cmp 加一条条件跳转对应回 C 里的判断
  - 能指出循环里被反复改写的是哪个内存位置
lab: labs/01-assembly
---

# 寄存器、立即数和内存

读汇编之前，先解决一个问题：一条指令里出现的数，到底是「这个数本身」，还是「去这个地方把数取出来」。分不清这两件事，后面每一行都是猜。

## 一个最小的程序

`labs/01-assembly/branch.c`：

```c
int pick(int x) {
    int y;
    if (x > 0) {
        y = 1;
    } else {
        y = -1;
    }
    return y;
}
```

按 `labs/01-assembly/README.md` 编译，然后只看 `pick`：

```bash
gdb -nx -q -ex "set debuginfod enabled off" -ex "set disassembly-flavor intel" -ex "disas pick" ./branch
```

在 GCC 15.2、`-O0` 下，函数体是这样的：

```text
mov    DWORD PTR [rbp-0x14],edi
cmp    DWORD PTR [rbp-0x14],0x0
jle    0x1143 <pick+26>
mov    DWORD PTR [rbp-0x4],0x1
jmp    0x114a <pick+33>
mov    DWORD PTR [rbp-0x4],0xffffffff
mov    eax,DWORD PTR [rbp-0x4]
pop    rbp
ret
```

先别解释。把这九行和 C 代码对一下，标出你认为对应 `if`、对应 `y = 1`、对应 `y = -1` 的各是哪几行。

## 这几行在做什么

`edi` 是寄存器，`pick` 的参数 `x` 就是通过它传进来的。第一行把 `edi` 里的值写进内存，位置是 `rbp` 减去 `0x14`。`DWORD PTR` 表示这个内存位置上取 4 个字节，因为 `int` 是 4 字节。

所以 `x` 同时存在于两个地方：寄存器 `edi`，和栈上 `rbp-0x14`。`-O0` 下编译器习惯把参数先存到栈上再使用，这是编译选项造成的，不是语言要求的。

`cmp` 那一行拿 `rbp-0x14` 处的 4 字节和 `0x0` 比。`0x0` 这里没有寄存器、没有方括号，它就是数零本身。这种直接写在指令里的数叫立即数。

`jle` 看的是上一条比较的结果。小于等于就跳到 `0x1143`，那里把 `0xffffffff` 写进 `rbp-0x4`。`0xffffffff` 作为 4 字节有符号数读就是 -1。不跳的那条路把 `0x1` 写进同一个位置。

最后 `mov eax, DWORD PTR [rbp-0x4]` 把 `rbp-0x4` 的 4 字节读回 `eax`。返回值走 `eax`。

## 为什么地址要写成 rbp 减一个数

`rbp` 在函数入口被设成当时的栈顶，函数内部的局部变量都放在它下面。所以局部变量的位置都是 `rbp` 减一个固定的数：`x` 在 `rbp-0x14`，`y` 在 `rbp-0x4`。这两个数是编译器排出来的，换一个编译器会变。不变的是「局部变量在 `rbp` 之下」这件事。

`rbp` 自己怎么来的，下一篇看函数调用时再讲。这里只需要知道它是一个寄存器，里面存着一个地址。

## 再看一个循环

`labs/01-assembly/loop.c` 的 `sum_to`，同样的编译方式：

```text
mov    DWORD PTR [rbp-0x4],0x0
mov    DWORD PTR [rbp-0x8],0x1
jmp    0x114e <sum_to+37>
mov    eax,DWORD PTR [rbp-0x8]
add    DWORD PTR [rbp-0x4],eax
add    DWORD PTR [rbp-0x8],0x1
mov    eax,DWORD PTR [rbp-0x8]
cmp    eax,DWORD PTR [rbp-0x14]
jle    0x1144 <sum_to+27>
```

`rbp-0x4` 先被写成 0，之后每次循环用 `add` 往上累加，这是 `total`。`rbp-0x8` 从 1 开始，每次加 1，这是 `i`。`rbp-0x14` 是参数 `n`，只被读取，没有被改写。

循环的判断不在开头。这里是先 `jmp` 到比较，比较成立再跳回循环体。这是 `-O0` 下 `for` 的常见形状，不是唯一形状。

## 自己做一遍

1. 在 `sum_to` 里指出 `total`、`i`、`n` 各在 `rbp` 减去多少的位置。
2. 把 `jle` 换成你认为相反的跳转，只在纸上改，说出 `sum_to(4)` 的返回值会变成什么。
3. 解释 `add DWORD PTR [rbp-0x4], eax` 里，`eax` 和 `rbp-0x4` 哪一个是被读取的，哪一个是被改写的。

## 学完这一节，你应该能够

- 读一条 `mov`，说出源是寄存器、立即数还是内存，目的是寄存器还是内存。
- 把 `cmp` 加一条条件跳转对应回一段 `if`。
- 在一个循环里指出哪个内存位置在被累加，哪个在被当作计数器。

## 下一步

这些指令都在一个函数内部。函数是怎么被进入的、`rbp` 是谁设置的、返回之后执行从哪继续，下一篇看函数调用。
