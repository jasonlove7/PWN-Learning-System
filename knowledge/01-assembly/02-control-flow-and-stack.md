---
title: 跳转、循环和函数调用
description: 看一次函数调用在栈上留下什么，以及 ret 为什么知道该回到哪里。
module: assembly
order: 2
difficulty: 2
prerequisites:
  - assembly
objectives:
  - 能在 call 执行后指出栈顶多出来的 8 个字节是什么
  - 能说出参数走哪个寄存器，返回值走哪个寄存器
  - 能解释 ret 和 jmp 的差别
lab: labs/01-assembly
---

# 跳转、循环和函数调用

上一篇的 `jle` 跳到一个写死的地址。函数调用不是这样：同一个函数可以被不同的地方调用，返回时要回到各自的调用点。这一篇看这个返回地址是谁放进栈的。

## 一个最小的程序

`labs/01-assembly/call.c`：

```c
int add(int a, int b) {
    int sum = a + b;
    return sum;
}

int main(void) {
    int result = add(3, 4);
    return result;
}
```

按 `labs/01-assembly/README.md` 编译。`./call` 的退出码是 7，因为 `main` 返回了 `add` 的结果。

先看两边的指令：

```bash
gdb -nx -q -ex "set debuginfod enabled off" -ex "set disassembly-flavor intel" \
    -ex "disas main" -ex "disas add" ./call
```

`main` 里和调用有关的几行：

```text
sub    rsp,0x10
mov    esi,0x4
mov    edi,0x3
call   0x1129 <add>
mov    DWORD PTR [rbp-0x4],eax
```

`add` 的开头和结尾：

```text
endbr64
push   rbp
mov    rbp,rsp
...
pop    rbp
ret
```

## 先看 call 前后栈上多了什么

光看指令看不出 `call` 做了什么。把它跑起来，在 `call` 那一行停下，执行这一条，再看栈。

```bash
gdb -nx -q ./call
```

```text
(gdb) set debuginfod enabled off
(gdb) set disassembly-flavor intel
(gdb) b main
(gdb) run
```

停在 `main` 开头后，先把 `call` 的地址找出来。上面的反汇编里它在 `main+22`。用这个地址下断点，而不是靠猜行号：

```text
(gdb) b *main+22
(gdb) continue
```

停下时 `rip` 正指着 `call`。看寄存器和栈顶：

```text
(gdb) info registers rip rsp rbp
(gdb) x/4gx $rsp
```

记下来。然后只执行一条指令：

```text
(gdb) si
(gdb) info registers rip rsp rbp
(gdb) x/4gx $rsp
```

你会看到三件事。

`rip` 变成了 `add` 的地址。`rsp` 比刚才小了 8。栈顶，也就是 `$rsp` 指向的那 8 个字节，是一个地址，它落在 `main` 里、紧跟在 `call` 后面的那条指令上。

这 8 个字节不是 `add` 写的。`si` 只执行了 `call` 一条。是 `call` 自己把返回地址压进栈，然后跳走。

## ret 做的是相反的事

在 `add` 里继续走，直到 `ret`：

```text
(gdb) disas add
```

找到 `ret` 的地址，下断点，`continue`，再看一次栈顶：

```text
(gdb) b *add+29
(gdb) continue
(gdb) x/gx $rsp
```

栈顶还是刚才那个返回地址。执行这一条：

```text
(gdb) si
(gdb) info registers rip rsp
```

`rip` 回到了 `main` 里 `call` 的下一条，`rsp` 加回 8。`ret` 从栈顶取出 8 个字节当作下一条指令的地址，同时把栈顶往上收。

所以 `jmp` 和 `ret` 的差别在这：`jmp` 的目标写在指令里，`ret` 的目标在栈顶，是调用的时候放进去的。

## 参数和返回值

回到 `call` 之前的那两行。`mov edi, 0x3` 把第一个参数放进 `edi`，`mov esi, 0x4` 把第二个放进 `esi`。整数参数走寄存器，前六个依次是 `rdi`、`rsi`、`rdx`、`rcx`、`r8`、`r9`。这里只用到前两个，而且 `int` 是 4 字节，所以写的是 `edi`、`esi`，即这些寄存器的低 32 位。

`add` 结尾前有 `mov eax, DWORD PTR [rbp-0x4]`，把结果放进 `eax`。回到 `main` 后，第一条指令就是 `mov DWORD PTR [rbp-0x4], eax`，从 `eax` 把结果取走。返回值走 `eax`。

这些是 x86-64 System V ABI 的规定，Linux 上的 C 编译器都按它来。Windows 的调用约定不同，不在这里讨论。

## 这两条 push rbp 是干什么的

`add` 开头的 `push rbp` 然后 `mov rbp, rsp`，把调用者的 `rbp` 存到栈上，再让 `rbp` 指向刚存好的位置。函数内部的局部变量都相对这个新 `rbp` 寻址，所以上一篇能写 `rbp-0x4`。

`pop rbp` 在 `ret` 之前把原来的值还回去。所以函数返回后，调用者的 `rbp` 没有变。

`push rbp` 和 `call` 压的是两个不同的东西，都在栈上，但是挨着的：先是 `call` 压的返回地址，进入函数后才是 `push rbp` 压的旧 `rbp`。下一节讲栈帧时就靠这个顺序。

## 自己做一遍

1. 在 `call` 执行后、`push rbp` 执行前，栈顶的 8 个字节是什么？把它和 `disas main` 里的某条指令对上。
2. 把 `add` 改成三个 `int` 参数，重新编译，看第三个参数用了哪个寄存器。
3. 解释如果 `ret` 执行时栈顶的 8 个字节被改成了别的值，`rip` 会去哪。先只回答，不改程序。

## 学完这一节，你应该能够

- 在 `call` 执行后指出栈顶多出来的 8 个字节是返回地址，并说它指向哪里。
- 说出整数参数走 `rdi`、`rsi` 等寄存器，返回值走 `rax`。
- 解释 `ret` 的目标来自栈顶，而 `jmp` 的目标写在指令里。

## 下一步

这一篇的观察靠 GDB，但步骤是照着做的。下一模块把 GDB 本身当作工具来学：怎么下断点、怎么读寄存器、怎么单步，这样后面的实验你能自己做，而不是照抄命令。
