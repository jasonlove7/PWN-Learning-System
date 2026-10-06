# 06-ret2syscall

| 文件 | 作用 |
|---|---|
| `vuln.c` | 一个 16 字节的缓冲区，用 `read` 读入 64 字节 |
| `gadget.s` | 三段指令：`pop rax; ret`、`pop rdi; ret`、`syscall; ret` |

`gadget.s` 是单独写的，不是从别的程序里找出来的。这样地址固定，每段只做一件事，方便看清每一步。真实程序里这些指令散落在各处，找它们是后面 ROP 的内容，这里不找。

## 环境

- 架构：x86-64
- 系统：Ubuntu（WSL2）
- GCC：15.2.0
- glibc：2.43
- GDB：17.1，只用 GDB 自带命令

## 编译

不加 `-z execstack`。这个实验的重点就是不执行栈上的代码，栈保持默认的不可执行。

`-fno-pie -no-pie` 让 `gadget` 的地址固定。`-fno-stack-protector` 让返回地址前面没有额外的检查值，否则函数返回前会被拦住，看不到后面的事。

```bash
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -fno-pie -no-pie -c vuln.c -o vuln.o
gcc -c gadget.s -o gadget.o
gcc -fno-pie -no-pie -o vuln vuln.o gadget.o
```

## 运行

单独运行 `./vuln` 会停在 `read` 上等输入。输入内容由文章里的实验给出，不在这里写死。
