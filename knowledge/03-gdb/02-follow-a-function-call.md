---
title: 跟一次函数调用
description: 从调用方连续单步，看返回地址在哪一条指令之后出现在栈上。
module: gdb
order: 2
difficulty: 3
prerequisites:
  - gdb
objectives:
  - 能在 call 之前和之后各截一次栈，指出多出来的那一项
  - 能把栈顶的值和调用方里的某条指令对上
  - 能解释 si 和 ni 在 call 上的差别
lab: labs/03-gdb
---

# 跟一次函数调用

上一篇在函数内部看栈。这一篇从调用的那一行开始，一条指令一条指令走，看栈在哪一步发生变化。

还是 `labs/03-gdb/call.c`。

## 停在 call 的前一条

```bash
gdb -nx -q ./call
```

```text
(gdb) set debuginfod enabled off
(gdb) set disassembly-flavor intel
(gdb) start
(gdb) disas main
```

找到 `call` 的前一条。在这一版里是 `mov edi, 0x3`，位于 `main+17`。`call` 本身在 `main+22`。

```text
(gdb) b *main+17
(gdb) continue
(gdb) x/i $rip
```

确认停在 `mov edi, 0x3`。记下现在的 `rsp`，把栈顶四项记下来：

```text
(gdb) info registers rsp
(gdb) x/4gx $rsp
```

## 走到 call，但先不执行它

```text
(gdb) si
(gdb) x/i $rip
```

现在 `rip` 指着 `call`。再看一次栈：

```text
(gdb) x/4gx $rsp
```

和上一次比，没有变化。`mov edi, 0x3` 只改了寄存器，没有动栈。

参数已经就位了。看一下：

```text
(gdb) info registers edi esi
```

`edi` 是 3，`esi` 是 4。这是上一条和再上一条 `mov` 写的。

## 执行 call

```text
(gdb) si
```

`si` 会跟进调用，所以停下时 `rip` 已经在 `add` 的第一条。

```text
(gdb) info registers rip rsp
(gdb) x/4gx $rsp
```

对照你记下来的那一屏。`$rsp` 小了 8，新的栈顶是一个地址。用它反汇编：

```text
(gdb) x/i 栈顶那个值
```

它指向 `main` 里 `call` 的下一条，也就是 `mov DWORD PTR [rbp-0x4], eax`。

到这里可以下一个结论：返回地址是 `call` 这一条指令放进栈的，不是 `add` 里的任何指令放的。因为从 `call` 到现在，`add` 还一条指令都没执行。

## si 和 ni 的差别

重新跑一次，这次在 `call` 上用 `ni`：

```text
(gdb) run
(gdb) b *main+22
(gdb) continue
(gdb) ni
(gdb) x/i $rip
```

`ni` 把 `call` 当成一条指令跨过去，不停在 `add` 里面。停下时 `rip` 已经是 `call` 的下一条，`add` 已经执行完并返回了。

所以看「调用内部发生了什么」用 `si`，看「调用的结果」用 `ni`。后面要观察栈帧内部时，都用 `si`。

## 自己做一遍

1. 在 `call` 执行前记录 `$rsp`，执行后用 `p $rsp` 算出差值，确认是 8 而不是别的数。
2. 把栈顶的返回地址和 `disas main` 的输出逐行对，找出它对应的 `<+N>`。
3. 在 `add` 的 `ret` 上停下，执行 `si`，确认 `rip` 回到的就是这个地址，并且 `$rsp` 加回了 8。

## 学完这一节，你应该能够

- 在 `call` 前后各截一次栈，指出多出来的那 8 个字节，并说它是哪条指令放进去的。
- 把栈顶的值反汇编，对上调用方里的具体一条指令。
- 说明 `si` 跟进 `call`、`ni` 跨过 `call`，以及什么时候该用哪个。

## 下一步

返回地址躺在栈上，而栈是程序自己能写的内存。下一模块看一个函数把输入抄进栈上的缓冲区时，这些字节离返回地址有多远。
