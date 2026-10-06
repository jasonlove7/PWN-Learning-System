# 03-gdb

和 `labs/01-assembly/call.c` 是同一个程序。单独放一份，是为了这一节的调试步骤不依赖别的目录。

## 环境

- 架构：x86-64
- 系统：Ubuntu（WSL2）
- GCC：15.2.0
- GDB：17.1，只用 GDB 自带命令

## 编译

```bash
gcc -g -O0 -fno-omit-frame-pointer -fno-stack-protector -o call call.c
```

## 运行

```bash
./call; echo "exit=$?"
```

应打印 `exit=7`。
