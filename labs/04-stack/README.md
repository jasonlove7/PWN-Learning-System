# 04-stack

| 文件 | 观察什么 |
|---|---|
| `frame.c` | 一次调用里，返回地址落在栈的哪个位置 |
| `overflow.c` | 输入超过缓冲区之后，返回地址被什么覆盖 |

## 环境

- 架构：x86-64
- 系统：Ubuntu（WSL2）
- GCC：15.2.0
- GDB：17.1，只用 GDB 自带命令

`overflow.c` 故意有一个会越界写的 `strcpy`。它只用于观察栈，不要对任何不属于你的程序做同样的事。

## 编译

栈保护会在函数返回前检查栈是否被改过，并把程序直接终止。这一节要看的是「返回地址被改成了什么」，所以先关掉它。`-fno-pie -no-pie` 让加载地址固定，这样你在 GDB 里看到的地址和下面写的一致，不用每次重算。为什么默认不固定、这个选项做了什么，是 ELF 那一模块的内容，这里先只用它。

这两个实验都不在栈上执行代码，所以不开 `-z execstack`。

```bash
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -fno-pie -no-pie -o frame frame.c
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -fno-pie -no-pie -o overflow overflow.c
```

## 运行

```bash
printf 'hello\n' | ./overflow; echo "exit=$?"
```

输入很短时应打印 `done`，退出码 `0`。输入很长时程序会崩溃，这是 `02-find-the-offset.md` 要观察的现象。
