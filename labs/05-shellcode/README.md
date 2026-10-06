# 05-shellcode

| 文件 | 观察什么 |
|---|---|
| `run.c` | 6 个字节的机器码放进 `buf`，跳过去执行，`eax` 变成 `0x42` |
| `blocked.c` | 和 `run.c` 完全相同的程序，只是编译时不让栈可执行 |

## 环境

- 架构：x86-64
- 系统：Ubuntu（WSL2）
- GCC：15.2.0
- glibc：2.43
- GDB：17.1，只用 GDB 自带命令

## 编译

`run.c` 要让 CPU 执行栈上的字节，所以栈必须可执行。`-z execstack` 只为构造这个教学环境，不是正常程序该有的编译方式。

`blocked.c` 不加 `-z execstack`。它和 `run.c` 的源码相同，差别只在编译参数。

`-fno-pie -no-pie` 让加载地址固定，方便对照。它为什么能固定地址，是 ELF 模块的内容。`-fno-stack-protector` 让栈帧里没有额外插入的值。

```bash
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -fno-pie -no-pie -z execstack -o run run.c
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -fno-pie -no-pie -o blocked blocked.c
```

## 运行

```bash
./run
./blocked; echo "exit=$?"
```

`run` 打印 `result=66`。`blocked` 不打印，退出码是 139，也就是被信号终止。
