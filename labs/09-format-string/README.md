# 09-format-string

| 文件 | 观察什么 |
|---|---|
| `args.c` | `printf` 有两个正常参数时，参数在寄存器里的位置 |
| `fmt.c` | 格式串本身来自输入，而且格式符比参数多 |
| `probe.c` | 和 `fmt.c` 相同，单独放一份给找 offset 用 |

`fmt.c` 和 `probe.c` 把输入直接交给 `printf` 当格式串。这是一个真实的漏洞，这里只用来观察 `printf` 读参数的方式。不要对任何不属于你的程序做同样的事。

## 环境

- 架构：x86-64
- 系统：Ubuntu（WSL2）
- GCC：15.2.0
- glibc：2.43
- GDB：17.1，只用 GDB 自带命令

`printf` 的参数传递由 x86-64 System V ABI 规定，不随 glibc 版本变化。glibc 版本写在这里，是为了让实验可以复现，不是因为这一节的结论依赖某个版本。

## 编译

```bash
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -fno-pie -no-pie -o args args.c
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -fno-pie -no-pie -o fmt fmt.c
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -fno-pie -no-pie -o probe probe.c
```

关掉 PIE 是为了地址固定，方便把同一次运行的输出和 GDB 里看到的值对上。

## 运行

```bash
./args
printf 'hello\n' | ./fmt
```

`args` 应打印 `1111 2222`。`fmt` 在输入不含 `%` 时应原样打印输入。
