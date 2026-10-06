---
title: 栈不能执行时会怎样
description: 去掉 -z execstack 重新编译同一段程序，看跳到栈上的机器码为什么没有被执行。
module: shellcode
order: 2
difficulty: 3
prerequisites:
  - shellcode
objectives:
  - 能在 info proc mappings 里读出栈的权限，并指出它没有可执行
  - 能解释为什么 rip 指向了正确的字节，程序仍然崩溃
  - 能说出 -z execstack 改变的是内存权限，不是机器码本身
lab: labs/05-shellcode
environment:
  arch: x86-64
  gcc: "15.2.0"
  glibc: "2.43"
---

# 栈不能执行时会怎样

上一篇的 6 个字节被执行了。那次编译加了 `-z execstack`。这一篇把这个选项去掉，看同一段程序发生什么。

## 同一个程序，两种编译

`labs/05-shellcode/blocked.c` 和 `run.c` 的源码完全相同：6 个字节抄进 `buf`，函数指针跳过去。差别只在编译命令里没有 `-z execstack`。

按 `labs/05-shellcode/README.md` 编译两份，各跑一次：

```bash
./run; echo "exit=$?"
./blocked; echo "exit=$?"
```

`run` 打印 `result=66`，退出码 0。`blocked` 什么都不打印，退出码 139。

139 是 128 加 11。11 是 `SIGSEGV` 的信号编号。程序在跳进 `buf` 的那一刻被终止了，没有执行到 `printf`。

## 看栈的权限

```bash
gdb -nx -q ./blocked
```

```text
(gdb) set debuginfod enabled off
(gdb) start
(gdb) info proc mappings
```

找到 `[stack]` 那一行。这一版里是：

```text
0x7ffffffde000  0x7ffffffff000  rw-p  [stack]
```

`Perms` 列是 `rw-p`。`r` 是可读，`w` 是可写，第三个位置是可执行，这里是 `-`，也就是不可执行。

对比 `./run` 的同一行，第三个位置是 `x`。`-z execstack` 改的就是这个标记，没有改机器码，也没有改 `buf` 的位置。

再看程序自己的代码段，也就是文件名是 `blocked`、权限带 `x` 的那一行：

```text
0x401000  0x402000  r-xp  blocked
```

这段是可执行的。栈不是。

## 地址是对的，仍然崩溃

让它跑到崩溃：

```text
(gdb) run
```

```text
Program received signal SIGSEGV, Segmentation fault.
```

看 `rip`：

```text
(gdb) p/x $rip
```

`rip` 是 `0x7fffffffe360` 这种样子，落在 `[stack]` 那一段的范围里。也就是说跳转成功了，`rip` 确实到了 `buf` 的地址。

再看那个地址上的字节：

```text
(gdb) x/6xb $rip
```

还是 `b8 42 00 00 00 c3`。字节没变，和上一篇执行成功时一模一样。

所以崩溃不是因为跳错了地方，也不是因为字节写错了。CPU 拿到了正确的地址、正确的字节，但这块内存的权限是 `rw-`，不允许从这里取指令。取指令被拒绝，进程收到 `SIGSEGV`。

上一篇能执行，是因为 `-z execstack` 把这块内存标成了可执行。去掉它，标记回到 `rw-`，同样的字节就执行不了。

## 这意味着什么

控制 `rip` 只决定 CPU 去哪个地址取指令。那个地址所在的内存还要允许取指令，这件事才会发生。

栈默认不在允许之列。所以「把机器码放进缓冲区再跳过去」这条路，只在栈被显式标成可执行时才走得通。正常编译的程序不给这个标记。

这块内存为什么默认不可执行、这个标记记在 ELF 的什么地方、能不能绕过，是后面 mitigations 的内容。这里只需要记住一件事：地址对了不够，权限也要有。

## 自己做一遍

1. 在 `blocked` 里确认 `[stack]` 的 `Perms` 是 `rw-p`，在 `run` 里确认是 `rwxp`。两份程序的源码相同，差别只在这一列。
2. 在崩溃现场用 `p/x $rip` 和 `info proc mappings` 对照，确认 `rip` 落在栈的范围里，而不是落在代码段里。
3. 解释为什么 `x/6xb $rip` 能读出字节，但 CPU 不能执行它们。提示：读和执行是两个权限。

## 学完这一节，你应该能够

- 在 `info proc mappings` 里读出一段内存的权限，并指出栈默认没有可执行。
- 解释 `rip` 指向了正确的字节而程序仍然崩溃，是因为那段内存不允许取指令。
- 说出 `-z execstack` 改变的是内存的权限标记，不是机器码本身。

## 下一步

自己放进去的机器码执行不了，是因为栈不可执行。程序自己的代码段是可执行的。如果想要的指令已经在代码段里，能不能把 `rip` 送去那里，而不是送去栈上？下一模块回答这个问题。
