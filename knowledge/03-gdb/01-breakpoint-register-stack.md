---
title: 断点、寄存器和栈
description: 在一个正在运行的程序里停下，读寄存器，读栈上的原始字节。
module: gdb
order: 1
difficulty: 3
prerequisites:
  - assembly
objectives:
  - 能用地址下断点并让程序停在那一条指令
  - 能读出 rip、rsp、rbp 并说出它们此刻各指什么
  - 能用 x/gx 读栈上的一个 8 字节值
lab: labs/03-gdb
---

# 断点、寄存器和栈

上一篇的结论是看出来的，但命令是照抄的。这一篇把那几条命令本身弄清楚：程序停在哪、寄存器里是什么、栈上的字节怎么读。

只用 GDB 自带的命令。不安装 pwndbg 或 gef，那些是后面真正常用的工具，但它们的输出会把这里要看的东西包起来，不适合第一次。

## 一个最小的程序

`labs/03-gdb/call.c`，和汇编那一节是同一个程序：`main` 调用 `add(3, 4)`，返回 7。

```bash
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -o call call.c
gdb -nx -q ./call
```

`-nx` 让 GDB 不读你的配置文件，避免被别的插件影响。`-q` 去掉启动时的版本信息。

## 先让它停下来

```text
(gdb) set debuginfod enabled off
(gdb) set disassembly-flavor intel
(gdb) start
```

`start` 会把程序跑到 `main` 的第一行停下。`set debuginfod enabled off` 是为了不让 GDB 尝试联网下载调试信息，否则它会在第一次停下时问你一个问题，打断操作。

停下之后看它停在哪：

```text
(gdb) info registers rip rsp rbp
```

`rip` 是下一条要执行的指令的地址。`rsp` 是栈顶。`rbp` 在 `main` 刚进入时还没被设成这一帧的值，先记住它的数，等下对比。

把 `rip` 附近的指令打出来：

```text
(gdb) disas main
```

这就是上一篇看过的那段。现在要做的是停在其中某一条上，而不是停在函数开头。

## 用地址下断点

`disas` 的输出里，每行前面有地址，也有 `<+N>` 这种相对函数开头的偏移。用偏移下断点，不用抄绝对地址：

```text
(gdb) b *main+22
(gdb) continue
```

`*` 表示后面是地址，不是函数名。`main+22` 在这一版编译结果里是 `call add` 那一行。如果你的 `disas` 显示 `call` 在别的偏移，用你看到的那个。

停下后确认：

```text
(gdb) x/i $rip
```

`x/i` 把一个地址当指令来反汇编。这里应该显示 `call` 和 `add` 的地址。如果显示的是别的指令，说明偏移数错了，回到 `disas` 重数。

## 读栈

栈顶是 `$rsp` 指向的内存。一次读 4 个 8 字节：

```text
(gdb) x/4gx $rsp
```

`x` 是查看内存。`4` 是数量，`g` 是每个 8 字节，`x` 是按十六进制打印。输出的第一列是地址，后面是那个地址上的值。

把这一屏留着。然后执行一条指令：

```text
(gdb) si
(gdb) x/4gx $rsp
```

`si` 是单步一条指令，并且会跟进 `call`。对比两次输出：第二次多出来一行，地址比第一次小 8，值是一个落在 `main` 里的地址。

再用指令方式看这个值：

```text
(gdb) x/i 这里填你看到的那个值
```

它应该是 `call` 的下一条指令。这就是返回地址，和上一篇的结论一致，只是这次是你自己从字节里读出来的。

## rsp 和 rbp 的差别

再看一次寄存器：

```text
(gdb) info registers rsp rbp
```

此刻在 `add` 的第一条指令，`push rbp` 还没执行。`rbp` 仍然是 `main` 的帧指针，`rsp` 已经因为 `call` 压栈而减小了。

往前走两条：

```text
(gdb) si
(gdb) si
(gdb) info registers rsp rbp
```

这两条是 `push rbp` 和 `mov rbp, rsp`。走完后 `rbp` 和 `rsp` 相等，都指向刚压进去的旧 `rbp`。

所以这两个寄存器不是一回事。`rsp` 跟着每次压栈弹栈移动，`rbp` 在函数入口被设一次，函数内部保持不动，局部变量相对它寻址。

## 自己做一遍

1. 停在 `add` 的 `ret` 上，用 `x/gx $rsp` 读栈顶，确认它和进入 `add` 时栈顶的值相同。
2. 用 `x/i` 把这个值反汇编出来，确认它是 `main` 里的哪一条。
3. 把 `x/4gx` 换成 `x/8wx`，看同一块内存被按 4 字节拆开后长什么样。注意字节序：低位字节在低地址。

## 学完这一节，你应该能够

- 用 `b *函数+偏移` 把程序停在某一条指令上，并用 `x/i $rip` 确认。
- 读 `rip`、`rsp`、`rbp`，说出它们此刻各指什么。
- 用 `x/gx` 读栈上的一个 8 字节值，并判断它是不是一个代码地址。

## 下一步

这一篇停在了函数内部。下一篇从调用方开始，把 `call` 前后的栈连续看完，确认返回地址是在哪一步出现的。
