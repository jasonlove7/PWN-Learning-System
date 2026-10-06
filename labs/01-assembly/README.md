# 01-assembly

三个小程序，只为观察 x86-64 汇编，不包含任何漏洞。

| 文件 | 观察什么 |
|---|---|
| `call.c` | 函数调用前后栈和寄存器怎么变 |
| `branch.c` | 条件判断编译成什么 |
| `loop.c` | 循环编译成什么 |

## 环境

在 WSL（Ubuntu）里编译和调试，不在 Windows 的 cmd / PowerShell 里。

- 架构：x86-64
- 系统：Ubuntu（WSL2）
- GCC：15.2.0
- GDB：17.1（本文只用 GDB 自带命令，不依赖 pwndbg / gef）

换一台机器、换一个 GCC 版本，指令的具体样子会变，观察步骤不变。

## 编译

```bash
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -o call call.c
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -o branch branch.c
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -o loop loop.c
```

`-g` 保留调试信息，`-O0` 关掉优化，否则编译器会把函数调用整个删掉，没有东西可看。`-fno-omit-frame-pointer` 让函数用 `rbp` 保存旧栈帧，方便对照。

## 运行

```bash
./call; echo "exit=$?"
```

`call` 应打印 `exit=7`。`branch` 应打印 `exit=0`。`loop` 应打印 `exit=10`。
