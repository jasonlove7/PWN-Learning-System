# Foundation 阶段路线

> 定位：进入 PWN 的**真实前置**。跳过 Foundation 直接做 PWN 题是常见的挫败来源——不是题难，是地基缺块。
> 来源依据：五来源前置章节共识（Nightmare §0 Introduction、CTF Wiki Assembly/ELF 章、pwn.college 前置模块、ir0nstone 前置章节、CS:APP 对应章节）。见 ROADMAP-RESEARCH.md §3。

## 推荐顺序（4 个子阶段）

### 阶段 F-A：C 与内存（1-2 周）
```text
fnd-c-memory → fnd-c-strings → fnd-c-struct-funcptr → fnd-stack-heap-model
```
- 目标：能用 C 写出带指针操作的小程序；能在纸上画出一段 C 代码的栈帧布局。
- 参照系：CS:APP 第 2/3 章（中文版《深入理解计算机系统》）。
- 实践：Compiler Explorer（godbolt.org）上对照 C 代码与汇编。

### 阶段 F-B：汇编与调用过程（1-2 周）
```text
fnd-assembly → fnd-calling-convention
```
- 目标：能读懂 x86-64 常见指令序列；能手工跟踪一次函数调用（参数传递、栈帧建立、返回）。
- 关键点：System V AMD64 前 6 个整型参数寄存器顺序 rdi/rsi/rdx/rcx/r8/r9 —— 这直接决定后面 ROP 的参数布局。

### 阶段 F-C：Linux 与二进制格式（1-2 周）
```text
fnd-linux-process → fnd-linux-syscalls → fnd-proc-shell
fnd-compiling-linking → fnd-elf → fnd-got-plt-fundamentals
```
- 目标：理解进程虚拟地址空间布局；理解 GOT/PLT 为什么存在（后面 ret2libc/泄漏的根基）。

### 阶段 F-D：工具链（1 周，可与上面并行）
```text
fnd-binary-tools → fnd-gdb → fnd-pwntools
```
- 目标：checksec 能看懂每个字段；pwndbg 下断点/看栈/看寄存器熟练；pwntools 能写 local process 交互脚本。

## 自测清单（进入 PWN Core 的门槛）

- [ ] 能解释 `char *p = malloc(8); strcpy(p, src);` 为什么可能出事
- [ ] 能说出 64 位下 `func(1,2,3,4,5,6,7)` 各参数在哪
- [ ] 能用 gdb 在某函数入口停住并打印其栈帧
- [ ] 能解释 NX、PIE、Canary、RELRO 各自挡住什么（概念级）
- [ ] 能用 pwntools 连接本地二进制并发送/接收数据
- [ ] 知道 `readelf -d` / `objdump -d` / `strings` 各自能回答什么问题

## 配套挑战

见 [challenges/foundation/](../challenges/foundation/)（pwnable.kr Toddler's Bottle 前段：fd、collision、bof、leg 等）。
