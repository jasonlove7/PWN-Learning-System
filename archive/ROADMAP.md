# PWN Learning System — ROADMAP

> 总路线：`Foundation → PWN Core → Advanced PWN → Specializations`
> 决策依据与来源证据：见 [ROADMAP-RESEARCH.md](ROADMAP-RESEARCH.md)（五来源交叉验证 + 8 项冲突决策记录）。

## 如何使用本路线

1. 按顺序学习主线（mainline）知识点，`knowledge/` 目录内每个知识点标注了前置依赖。
2. 每学完一个知识点，做关联的 `challenges/` 中题目：**先独立尝试，再看渐进 Hint，最后才看 writeup**。
3. 值得沉淀的题记入 `notebook/`；用 `reviews/` 的方法定期重做。
4. 状态只有三种：🔴 未学习 / 🟡 熟悉 / 🟢 已掌握（在 `progress/PROGRESS.md` 跟踪）。
5. Specializations 是自选方向，**不是必修**；完成 PWN Core 后按兴趣进入。

## 依赖关系图（Knowledge Dependency Graph）

```mermaid
graph TD
    subgraph Foundation
    F1[C 内存模型与指针] --> F2[C 字符串与不安全函数]
    F1 --> F3[struct/函数指针]
    F4[编译与链接基础] --> F13[静态/动态链接 GOT/PLT]
    F5[栈与堆内存布局] --> F9[x86/x64 汇编]
    F6[Linux 进程与虚拟内存] --> F12[ELF 文件格式]
    F7[fd/pipe/signal/syscall]
    F9 --> F10[调用约定与函数调用]
    F11[GDB 与 pwndbg/gef]
    F12 --> F13
    F14[二进制分析工具链]
    F15[pwntools 入门]
    end

    subgraph PWN Core
    C1[栈溢出原理] --> C2[缓解机制总览]
    C1 --> C3[ret2win]
    C2 --> C4[ret2shellcode/NX]
    C3 --> C5[基础 ROP]
    C4 --> C5
    F10 --> C5
    C5 --> C6[ret2syscall]
    C5 --> C9[信息泄漏 GOT/puts]
    F13 --> C9
    C9 --> C7[ret2libc ★pilot]
    C8[libc 版本识别] --> C7
    C7 --> C10[partial overwrite]
    C7 --> C11[stack pivot]
    C11 --> C12[ret2csu]
    C5 --> C12
    C12 --> C13[SROP]
    C9 --> C14[格式化字符串原理]
    C14 --> C15[格式化字符串进阶]
    end

    subgraph Advanced PWN
    A1[堆基础 chunk/arena] --> A2[bins 体系]
    A2 --> A3[tcache 与 safe-linking]
    A1 --> A4[堆溢出/off-by-null]
    A2 --> A5[UAF/double free]
    A3 --> A11[现代堆组合拳]
    A4 --> A6[fastbin attack]
    A5 --> A7[unsorted bin attack]
    A7 --> A8[largebin attack]
    A4 --> A9[unsafe unlink]
    A6 --> A10[house of 系列]
    A10 --> A12[IO_FILE/FSOP]
    C15 --> A12
    end

    Foundation --> C1
    PWN Core --> Advanced
    Advanced --> SPEC[Specializations]
```

## 主线知识点总表

> 完整字段（objectives/resources/challenges/review）见 `knowledge/` 对应文件。
> ⭐ = Importance（体系价值）｜◆ = Difficulty（掌握难度）——二者独立，见 schema。

### Foundation（15 点）

| ID | 知识点 | ⭐ | ◆ | 文件 |
|----|--------|----|----|------|
| fnd-c-memory | C 内存模型与指针 | 5 | 3 | [knowledge/fundamentals/c-memory.md](knowledge/fundamentals/c-memory.md) |
| fnd-c-strings | C 字符串与不安全函数 | 5 | 2 | [knowledge/fundamentals/c-strings.md](knowledge/fundamentals/c-strings.md) |
| fnd-c-struct-funcptr | struct / 函数指针 / union | 4 | 3 | [knowledge/fundamentals/c-struct-funcptr.md](knowledge/fundamentals/c-struct-funcptr.md) |
| fnd-compiling-linking | 编译与链接基础 | 4 | 3 | [knowledge/fundamentals/compiling-linking.md](knowledge/fundamentals/compiling-linking.md) |
| fnd-stack-heap-model | 内存布局：栈与堆 | 5 | 3 | [knowledge/fundamentals/stack-heap-model.md](knowledge/fundamentals/stack-heap-model.md) |
| fnd-linux-process | Linux 进程与虚拟内存 | 5 | 3 | [knowledge/fundamentals/linux-process.md](knowledge/fundamentals/linux-process.md) |
| fnd-linux-syscalls | fd / pipe / signal / 常用 syscall | 4 | 2 | [knowledge/fundamentals/linux-syscalls.md](knowledge/fundamentals/linux-syscalls.md) |
| fnd-proc-shell | /proc 与 shell 基础 | 3 | 2 | [knowledge/fundamentals/proc-shell.md](knowledge/fundamentals/proc-shell.md) |
| fnd-assembly | x86 / x86-64 汇编与寄存器 | 5 | 3 | [knowledge/fundamentals/assembly.md](knowledge/fundamentals/assembly.md) |
| fnd-calling-convention | 调用约定与函数调用过程 | 5 | 4 | [knowledge/fundamentals/calling-convention.md](knowledge/fundamentals/calling-convention.md) |
| fnd-gdb | GDB 与 pwndbg / gef | 5 | 3 | [knowledge/fundamentals/gdb.md](knowledge/fundamentals/gdb.md) |
| fnd-elf | ELF 文件格式 | 5 | 3 | [knowledge/fundamentals/elf.md](knowledge/fundamentals/elf.md) |
| fnd-got-plt-fundamentals | 静态/动态链接、GOT/PLT | 5 | 4 | [knowledge/fundamentals/got-plt-fundamentals.md](knowledge/fundamentals/got-plt-fundamentals.md) |
| fnd-binary-tools | 二进制分析工具链 | 4 | 2 | [knowledge/fundamentals/binary-tools.md](knowledge/fundamentals/binary-tools.md) |
| fnd-pwntools | pwntools 入门 | 5 | 2 | [knowledge/fundamentals/pwntools.md](knowledge/fundamentals/pwntools.md) |

### PWN Core（14 点）

| ID | 知识点 | ⭐ | ◆ | 文件 |
|----|--------|----|----|------|
| core-stack-overflow | 栈溢出原理与偏移计算 | 5 | 3 | [knowledge/stack/stack-overflow.md](knowledge/stack/stack-overflow.md) |
| core-mitigations | 安全缓解机制总览 | 5 | 3 | [knowledge/stack/mitigations.md](knowledge/stack/mitigations.md) |
| core-ret2win | ret2win | 5 | 2 | [knowledge/stack/ret2win.md](knowledge/stack/ret2win.md) |
| core-ret2shellcode | ret2shellcode 与 NX | 5 | 3 | [knowledge/stack/ret2shellcode.md](knowledge/stack/ret2shellcode.md) |
| core-rop-basics | 基础 ROP | 5 | 3 | [knowledge/rop/rop-basics.md](knowledge/rop/rop-basics.md) |
| core-ret2syscall | ret2syscall | 4 | 3 | [knowledge/rop/ret2syscall.md](knowledge/rop/ret2syscall.md) |
| core-leak-basics | 信息泄漏：GOT 泄漏 / puts-leak | 5 | 4 | [knowledge/rop/leak-basics.md](knowledge/rop/leak-basics.md) |
| core-libc-basics | libc 版本识别与符号偏移 | 5 | 3 | [knowledge/rop/libc-basics.md](knowledge/rop/libc-basics.md) |
| core-ret2libc | **ret2libc（Pilot 模块）** | 5 | 4 | [knowledge/rop/ret2libc.md](knowledge/rop/ret2libc.md) |
| core-partial-overwrite | partial overwrite | 4 | 4 | [knowledge/rop/partial-overwrite.md](knowledge/rop/partial-overwrite.md) |
| core-stack-pivot | stack pivot | 4 | 4 | [knowledge/rop/stack-pivot.md](knowledge/rop/stack-pivot.md) |
| core-ret2csu | ret2csu | 4 | 4 | [knowledge/rop/ret2csu.md](knowledge/rop/ret2csu.md) |
| core-srop | SROP | 4 | 4 | [knowledge/rop/srop.md](knowledge/rop/srop.md) |
| core-fmt-string | 格式化字符串（原理+进阶） | 5 | 4 | [knowledge/format-string/fmt-string.md](knowledge/format-string/fmt-string.md) |

### Advanced PWN（12 点）

| ID | 知识点 | ⭐ | ◆ | 文件 |
|----|--------|----|----|------|
| adv-heap-overview | 堆基础：brk/mmap、arena、chunk | 5 | 4 | [knowledge/heap/heap-overview.md](knowledge/heap/heap-overview.md) |
| adv-heap-bins | bins 体系：fastbin/small/large/unsorted | 5 | 4 | [knowledge/heap/heap-bins.md](knowledge/heap/heap-bins.md) |
| adv-tcache | tcache 机制与 safe-linking | 5 | 4 | [knowledge/heap/tcache.md](knowledge/heap/tcache.md) |
| adv-heap-overflow | 堆溢出与 off-by-one/null | 4 | 4 | [knowledge/heap/heap-overflow.md](knowledge/heap/heap-overflow.md) |
| adv-uaf-double-free | UAF 与 double free | 5 | 4 | [knowledge/heap/uaf-double-free.md](knowledge/heap/uaf-double-free.md) |
| adv-fastbin-attack | fastbin attack | 4 | 4 | [knowledge/heap/fastbin-attack.md](knowledge/heap/fastbin-attack.md) |
| adv-unsorted-bin-attack | unsorted bin attack 与 libc 泄漏 | 4 | 4 | [knowledge/heap/unsorted-bin-attack.md](knowledge/heap/unsorted-bin-attack.md) |
| adv-largebin-attack | largebin attack | 3 | 5 | [knowledge/heap/largebin-attack.md](knowledge/heap/largebin-attack.md) |
| adv-unsafe-unlink | unsafe unlink | 4 | 5 | [knowledge/heap/unsafe-unlink.md](knowledge/heap/unsafe-unlink.md) |
| adv-house-of | house of 系列总览 | 3 | 5 | [knowledge/heap/house-of.md](knowledge/heap/house-of.md) |
| adv-heap-modern | 现代堆利用组合拳与版本差异 | 4 | 5 | [knowledge/heap/heap-modern.md](knowledge/heap/heap-modern.md) |
| adv-io-file | IO_FILE / FSOP | 4 | 5 | [knowledge/advanced/io-file.md](knowledge/advanced/io-file.md) |

### Specializations（8 方向，骨架级）

| 方向 | 入口文件 | 研究状态 |
|------|----------|----------|
| Linux Kernel PWN | [roadmap/specializations/linux-kernel.md](roadmap/specializations/linux-kernel.md) | ✅ 骨架完整 |
| Windows Kernel Security | [roadmap/specializations/windows-kernel.md](roadmap/specializations/windows-kernel.md) | ✅ 骨架完整 |
| ARM / AArch64 | [roadmap/specializations/arm-aarch64.md](roadmap/specializations/arm-aarch64.md) | ✅ 骨架完整 |
| Android Security | [roadmap/specializations/android.md](roadmap/specializations/android.md) | ✅ 骨架完整 |
| IoT Security | [roadmap/specializations/iot.md](roadmap/specializations/iot.md) | ✅ 骨架完整 |
| Browser Security | [roadmap/specializations/browser.md](roadmap/specializations/browser.md) | ⚠️ 研究不足（诚实标注） |
| Sandbox Security | [roadmap/specializations/sandbox.md](roadmap/specializations/sandbox.md) | ✅ 骨架完整 |
| Hypervisor / Virtualization | [roadmap/specializations/hypervisor.md](roadmap/specializations/hypervisor.md) | ⚠️ 研究不足（诚实标注） |

## 学习循环（系统使用方式）

```text
Roadmap → Knowledge → Resources → Challenges
   → Independent Attempt → Hints → Writeups
   → Mastery → Review → Personal Notebook → Reattempt
```

核心纪律：**AI/答案不是引擎，是教练**。卡住时按 Hint 1→2→3 渐进获取，不直接跳 writeup。
