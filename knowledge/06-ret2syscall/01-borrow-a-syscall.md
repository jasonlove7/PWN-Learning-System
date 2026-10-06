---
title: 借程序里的 syscall
description: 不执行自己的机器码，把寄存器设好，让 rip 走到程序里已有的 syscall 指令。
module: ret2syscall
order: 1
difficulty: 3
prerequisites:
  - shellcode
objectives:
  - 能说出一次 getpid 系统调用需要 rax 等于 39、rdi 等于 0
  - 能指出 pop rax、pop rdi、syscall 这三段指令各在哪个地址，以及 ret 为什么能把它们串起来
  - 能在 GDB 里确认 syscall 执行前 rax 和 rdi 的值，以及执行后 rax 变成了返回值
lab: labs/06-ret2syscall
environment:
  arch: x86-64
  gcc: "15.2.0"
  glibc: "2.43"
---

# 借程序里的 syscall

上一篇的结论是栈上的字节执行不了，因为栈不可执行。程序自己的代码段是可执行的。所以如果想要的指令已经在代码段里，就把 `rip` 送去那里。

这一篇借的指令是 `syscall`。它是进入内核的入口：执行它时，内核按 `rax` 里的数字决定做什么，按 `rdi`、`rsi`、`rdx` 等寄存器取参数，做完把结果放回 `rax`，回到下一条指令。

内核内部怎么分发这些调用，这里不讲。只用到一件事：`syscall` 这条指令本身，加上它执行前寄存器里的值，就决定了发生什么。

## 一次最小的系统调用

选 `getpid`。它没有参数，返回当前进程的进程号。在 x86-64 Linux 上，它的调用号是 39，参数一个都不取，但约定上第一个参数寄存器 `rdi` 要是 0。

所以执行前需要：

```text
rax = 39
rdi = 0
```

执行 `syscall` 之后，`rax` 里就是进程号。这个值每次运行不同，但一定是个正数，而且和 `echo $$` 一类的方式对得上。选它是因为成功与否看 `rax` 一个寄存器就够了，不需要准备字符串、不需要写内存。

## 程序里已有的指令

`labs/06-ret2syscall/gadget.s`：

```text
gadget:
    pop %rax
    ret
    pop %rdi
    ret
    syscall
    ret
```

这三段是写在实验里的，不是从别的程序里搜出来的。真实程序里同样的指令散落在各处，把它们找出来是后面 ROP 的事。这里把它们放在一起，是为了地址固定、每段只做一件事。

`pop rax` 从栈顶取 8 字节放进 `rax`，`rsp` 加 8。紧跟的 `ret` 再从栈顶取 8 字节当作下一条指令的地址。所以只要栈上按顺序放着「要写进寄存器的值」和「下一段的地址」，这两条指令就把一件事做完，然后跳到下一段。

`pop rdi; ret` 同样。`syscall; ret` 执行系统调用，然后跳到 `ret` 从栈上取到的地址。

这三段每段都以 `ret` 结尾。`ret` 的目标来自栈顶，而栈顶的内容是输入决定的。所以控制了栈，就控制了每一段执行完之后去哪。

按 README 编译，看这三段的地址：

```bash
objdump -d -M intel --no-show-raw-insn vuln | sed -n "/<gadget>:/,/^$/p"
```

这一版是：

```text
40115f:  pop rax
401160:  ret
401161:  pop rdi
401162:  ret
401163:  syscall
401165:  ret
```

地址会随编译器变。用你自己 `objdump` 里看到的，不要抄这里的数字。下面用这一版的数字说明排法。

## 栈上要放什么

`vuln` 的缓冲区在 `rbp-0x10`，16 字节，保存的 `rbp` 占 8 字节。和栈那一节算过的一样，从缓冲区到返回地址是 24 字节。

返回地址本来指向 `vuln` 的调用者。把它换成 `pop rax` 的地址，函数返回时就会跳到那里。

从那以后，栈上每 8 字节是一段指令要取的值。按执行顺序排：

```text
24 字节点 A
pop rax 的地址      40115f
39                  pop rax 取走，放进 rax
pop rdi 的地址      401161    ret 取走，跳过去
0                   pop rdi 取走，放进 rdi
syscall 的地址      401163    ret 取走，跳过去
```

`syscall` 执行时，`rax` 是 39，`rdi` 是 0。这就是 `getpid` 要的全部。

注意这段输入没有放任何机器码。放进去的全是地址和整数，都是数据。CPU 执行的指令全在 `gadget` 里，也就是程序自己的代码段里。

## 看它执行

用 Python 把上面的字节写出来喂给程序，在 GDB 里停在 `vuln` 的 `ret` 上。这一版在 `0x40114a`：

```bash
gdb -nx -q ./vuln
```

```text
(gdb) set debuginfod enabled off
(gdb) set disassembly-flavor intel
(gdb) b *0x40114a
(gdb) run < /tmp/payload
```

停在 `ret` 上时，栈顶是 `0x40115f`，就是 `pop rax` 的地址。`si` 一次，`rip` 到了 `0x40115f`。

再往下走，每段看一次寄存器：

```text
(gdb) si
(gdb) p/x $rax
```

`pop rax` 之后 `rax` 是 `0x27`，也就是 39。

```text
(gdb) si
(gdb) si
(gdb) p/x $rdi
```

`pop rdi` 之后 `rdi` 是 `0x0`。

```text
(gdb) si
(gdb) x/i $rip
```

`rip` 停在 `syscall` 上。这时 `rax` 和 `rdi` 都已经是要的值，还没有执行。

```text
(gdb) si
(gdb) p/x $rax
```

`syscall` 执行完，`rax` 变成 `0x1df` 这种样子，不再是 39。这是内核写回的进程号。你的数字会不同，但一定不是 39，因为 39 是调用号，不是返回值。

整个过程里，`rip` 只在 `0x40115f` 到 `0x401165` 这段里移动，没有进过栈。栈上的输入只被 `pop` 和 `ret` 当作数据读取。

## 这和 shellcode 的差别

shellcode 是你提供指令，CPU 执行你的字节。这里你提供的是数据：几个地址，几个整数。指令是程序里原来就有的，CPU 执行的是代码段里的字节。

所以栈不可执行对这一次没有影响。实验编译时没有加 `-z execstack`，栈的权限是 `rw-`，程序照样跑完了 `syscall`。因为没有任何指令从栈上取。

## 和 ROP 的边界

这一篇把三段指令串了起来，靠的是每段结尾的 `ret`。这个串法后面会一般化成 ROP：任意多段、任意目的，不限于准备一次系统调用。

这里只用了三小段，而且每段只做一件事，目的只有一个：让 `syscall` 执行时寄存器是对的。怎么从一大段程序里找出这样的指令、怎么处理找不到的情况、怎么串更长的链，是 ROP 的内容，不在这里。

## 自己做一遍

1. 用 `objdump` 找出 `pop rax`、`pop rdi`、`syscall` 的地址，不要用文章里的数字。
2. 在 `syscall` 执行前看 `rax` 和 `rdi`，确认是 39 和 0。执行后再看 `rax`，确认它变了。
3. 把输入里的 39 改成别的数，再跑一次，看 `syscall` 之后 `rax` 变成什么。解释为什么结果不同。

## 学完这一节，你应该能够

- 说出 `getpid` 需要 `rax` 等于 39、`rdi` 等于 0，返回值写回 `rax`。
- 指出 `pop rax`、`pop rdi`、`syscall` 三段的地址，并解释每段结尾的 `ret` 为什么能跳到下一段。
- 在 GDB 里确认 `syscall` 前后 `rax` 的变化，并说明执行的指令在代码段里，不在栈上。

## 下一步

这一篇能借到 `syscall`，是因为实验里把这段指令放好了。真实程序里不一定有这么整齐的指令，而且很多时候想调用的不是系统调用，是 libc 里的函数。那种情况下地址在哪、怎么找到，是下一模块的问题。
