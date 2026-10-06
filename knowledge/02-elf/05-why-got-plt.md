---
title: 为什么需要 GOT 和 PLT
description: 跟一次 puts 调用，看 call 跳进 PLT，PLT 再从 GOT 里取真正的地址。
module: elf
order: 5
difficulty: 3
prerequisites:
  - elf
objectives:
  - 能在 objdump 里指出 call puts 的目标是 PLT 里的一条 jmp，不是 puts 本身
  - 能指出这条 jmp 读取的内存位置，并在 readelf -r 里找到对应的重定位项
  - 能观察到这个位置在第一次调用前和调用后装的不是同一个值
lab: labs/02-elf
environment:
  arch: x86-64
  gcc: "15.2.0"
  glibc: "2.43"
---

# 为什么需要 GOT 和 PLT

上一篇的矛盾是：`call` 在编译时就要有目标，而 `puts` 的地址要到运行时才知道。这一篇看这个矛盾怎么解。

为了让地址固定、方便对照，这一篇关掉 PIE。默认的 PIE 下结论相同，只是每次都要加基址。

```bash
gcc -fno-pie -no-pie -o hello-nopie hello.c
```

## call 到底跳去哪

```bash
objdump -d -M intel --no-show-raw-insn hello-nopie
```

找到 `main`：

```text
40113e:  mov    edi,0x402004
401143:  call   401040 <puts@plt>
```

`call` 的目标是 `0x401040`，标注是 `puts@plt`，不是 `puts`。这个地址在 `hello-nopie` 自己的代码段里，是编译时就定死的。

再看 `0x401040` 处有什么：

```text
0000000000401040 <puts@plt>:
  401040:  endbr64
  401044:  jmp    QWORD PTR [rip+0x2fb6]    # 404000 <puts@GLIBC_2.2.5>
```

两条指令。第一条不用管。第二条是间接跳转：不跳到一个写死的地址，而是先从 `0x404000` 这个内存位置读出 8 个字节，把读到的值当作目标。

所以 `call` 跳到一个固定的位置，那个位置再去读一个内存里的值。`call` 的目标编译时就定了，真正跳去哪取决于 `0x404000` 里当时装的是什么。

## 那个内存位置是谁的

```bash
readelf -r hello-nopie
```

在 `.rela.plt` 里有一行：

```text
000000404000  R_X86_64_JUMP_SLOT  puts@GLIBC_2.2.5
```

`0x404000` 正是刚才那条 `jmp` 读取的地址。这一行说：这个位置要填的是 `puts` 的地址，类型是 `JUMP_SLOT`。

这就是分工。`0x401040` 那段叫 PLT，是代码，编译时定死，负责去读一个地址再跳过去。`0x404000` 这个位置在 GOT 里，是数据，运行时由动态链接器填上 `puts` 的真实地址。

`call` 不需要知道 `puts` 在哪。它只需要知道 PLT 在哪，而 PLT 在自己的文件里。

## 填之前和填之后

在 GDB 里看这个位置的变化。先停在 `call` 之前：

```bash
gdb -nx -q ./hello-nopie
```

```text
(gdb) set debuginfod enabled off
(gdb) b *0x401143
(gdb) run
(gdb) x/gx 0x404000
```

这里看到的是 `0x401030`，一个落在 `hello-nopie` 自己代码段里的地址。这不是 `puts`。第一次调用之前，GOT 的这一项里放的是另一段桩代码的地址，那段代码会去找动态链接器。

执行这次调用，让它返回，再看：

```text
(gdb) finish
(gdb) x/gx 0x404000
```

这次是 `0x7ffff7c8eae0` 这种样子，落在 `libc.so.6` 的地址范围内。你可以在 `info proc mappings` 里确认它落在 `libc.so.6` 的可执行段里。

同一次运行，同一个内存位置，调用前装的是桩，调用后装的是 `puts` 的真实地址。第一次调用把地址解析出来，之后的调用走 `jmp` 就直接到 `puts`。

你的 `libc` 地址会和这里不同。要确认的不是这个数，是「调用前后这个位置的值变了，而且变之后的值落在 `libc.so.6` 的映射里」。

## 这解决了什么

把这条链倒过来看。

`puts` 的地址每次运行都不同，所以不能写进 `call`。于是 `call` 跳到一个固定的 PLT 项，PLT 项从 GOT 里读地址再跳。GOT 是可写的数据，动态链接器可以在运行时把它改成真实地址。

代码不需要改，数据改一下就行。这是 GOT 和 PLT 存在的原因。

第一次调用时那个桩具体做了什么、动态链接器怎么算出 `puts` 的地址、GOT 能不能被改写成别的东西，这些留到后面的 GOT / PLT 模块。这里只建立这一条链：`call` 到 PLT，PLT 读 GOT，GOT 里最终是 libc 里的地址。

## 自己做一遍

1. 在 `objdump -d` 里找出 `call` 的目标地址，确认它落在本文件的地址范围内，而不是 `libc` 的范围。
2. 用 `readelf -r` 找出 `puts` 对应的那一行，确认 `Offset` 列和 `jmp` 读取的地址相同。
3. 在 GDB 里分别在调用前和调用后读这个地址，确认值变了，并用 `info proc mappings` 确认新值落在 `libc.so.6` 里。

## 学完这一节，你应该能够

- 指出 `call puts` 的目标是 PLT 里的一条间接跳转，不是 `puts` 本身。
- 把这条跳转读取的地址和 `readelf -r` 里的一条 `JUMP_SLOT` 对上。
- 观察到这个地址在第一次调用前后装的不是同一个值，调用后的值落在 `libc` 里。

## 下一步

ELF 这一模块到这里够用了。后面用 GDB 看程序时，你应该能把看到的地址对应回文件里的 section 和 segment，也能解释为什么一个外部函数的调用要绕过 GOT。GOT 里的值能不能改、改了会发生什么，是 [GOT / PLT](/knowledge/got-plt/) 的内容，不在这里。
