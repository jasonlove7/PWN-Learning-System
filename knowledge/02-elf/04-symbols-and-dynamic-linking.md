---
title: 符号和动态链接
description: 看一个程序怎么记录自己没有实现的函数，以及它靠谁在运行时把这个函数找来。
module: elf
order: 4
difficulty: 3
prerequisites:
  - elf
objectives:
  - 能用 nm 区分一个符号是定义在本文件里还是未定义
  - 能用 readelf -d 指出程序依赖哪个共享库
  - 能用 readelf -p .interp 指出谁负责在运行时加载这些共享库
lab: labs/02-elf
environment:
  arch: x86-64
  gcc: "15.2.0"
  glibc: "2.43"
---

# 符号和动态链接

`puts("hello")` 能编译、能运行，但你没有写 `puts`。这一篇看编译器把这个事实记在了文件的什么地方。

## 一个调用外部函数的程序

`labs/02-elf/hello.c`：

```c
#include <stdio.h>

int main(void) {
    puts("hello");
    return 0;
}
```

按 README 编译。

## 哪些符号是自己的，哪些不是

```bash
nm hello
```

`nm` 列出文件里的符号。只看这几行：

```text
0000000000001149 T main
                 U puts@GLIBC_2.2.5
                 U __libc_start_main@GLIBC_2.34
```

`T` 表示这个符号在本文件的代码段里有定义，地址是 `0x1149`。这就是 `main`。

`U` 表示未定义。文件里记录了名字 `puts`，但没有它的地址，也没有它的代码。`__libc_start_main` 同样，它是调用 `main` 之前的那段启动代码，也来自别的地方。

所以「程序里没有 `puts` 的实现」不是猜测，是文件里写明的：这个符号的地址栏是空的。

## 它在哪个文件里

```bash
readelf -d hello
```

只看第一行：

```text
0x0000000000000001 (NEEDED)  Shared library: [libc.so.6]
```

`NEEDED` 是一份清单，列出这个程序运行时必须有的共享库。这里只有 `libc.so.6`。`puts` 的实现在这个库里，不在 `hello` 里。

再看谁负责把这个库找来：

```bash
readelf -p .interp hello
```

```text
[     0]  /lib64/ld-linux-x86-64.so.2
```

`.interp` 里是一个路径。这是动态链接器。程序启动时，内核不直接跳到入口，而是先把这个文件加载起来，由它去读 `NEEDED` 清单，找到 `libc.so.6`，加载进来，再把 `puts` 这类未定义符号的地址填上。

这个顺序是：内核加载 `hello` 和 `.interp` 指向的动态链接器，动态链接器加载 `libc.so.6`，然后才轮到 `hello` 的入口。`main` 能调用 `puts`，是因为在它被调用之前，这件事已经做完了。

## 地址为什么不能写死

`puts` 的代码在 `libc.so.6` 里。上一篇看到，一个 PIE 文件每次加载的基址都不同，`libc.so.6` 也是这样。所以 `puts` 的运行时地址每次都变，不可能在编译 `hello` 的时候写成一个固定的数。

这就是 `U` 的含义落到地址上的结果：文件里没有这个地址，因为编译的时候还不知道。地址要等动态链接器在运行时算出来。

它算出来之后填到哪里、程序又怎么用这个填好的值，是下一篇的事。

## 自己做一遍

1. 用 `nm` 在 `hello` 里找出所有 `U` 开头的行，说出哪些是你自己调用的，哪些是编译器加的。
2. 用 `readelf -d` 确认 `NEEDED` 里有 `libc.so.6`，再用 `readelf -p .interp` 确认动态链接器的路径。
3. 解释为什么 `main` 有地址而 `puts` 没有。把答案落到「代码在不在这个文件里」上，而不是落到「它是不是库函数」上。

## 学完这一节，你应该能够

- 用 `nm` 区分一个符号是本文件定义的还是未定义的。
- 用 `readelf -d` 指出程序依赖哪个共享库。
- 用 `readelf -p .interp` 指出动态链接器的路径，并说明它在 `main` 之前运行。

## 下一步

`puts` 的地址要在运行时填上。程序里的 `call` 指令不能等，它在编译时就得有一个目标。下一篇看这个矛盾是怎么解决的：`call` 跳到一个固定的位置，那个位置再去读运行时填好的地址。
