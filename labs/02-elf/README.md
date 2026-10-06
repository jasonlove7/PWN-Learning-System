# 02-elf

三个小程序，只为观察 ELF 文件本身。

| 文件 | 观察什么 |
|---|---|
| `tiny.c` | 一个什么都不做的程序，ELF header 长什么样 |
| `data.c` | 代码、只读数据、已初始化数据、未初始化数据各落在哪个 section，又被装进哪个 segment |
| `hello.c` | 调用一个自己没有实现的函数时，文件里记了什么 |

## 环境

- 架构：x86-64
- 系统：Ubuntu（WSL2）
- GCC：15.2.0
- glibc：2.43
- binutils：`file`、`readelf`、`objdump`、`nm` 用系统自带的

这一组不关 PIE。GCC 15 默认生成 position-independent executable，文件里的地址是相对加载基址的偏移，不是运行时的绝对地址。这正是第三篇要观察的事，所以这里保持默认。

## 编译

```bash
gcc -o tiny tiny.c
gcc -o data data.c
gcc -o hello hello.c
```

不需要 `-g`。这一组看的是文件，不是源码行号。

## 运行

```bash
./tiny; echo "exit=$?"
./hello
```

`tiny` 的退出码是 0。`hello` 打印 `hello`。
