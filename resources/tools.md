# 工具链资源

```yaml
id: res-pwntools
title: pwntools
author: Gallopsled
source: https://github.com/Gallopsled/pwntools
url: https://github.com/Gallopsled/pwntools
source_type: tool
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（13.7k stars、MIT、活跃维护）
license: MIT
summary: CTF exploit 开发标准库（tubes/ELF/ROP/shellcraft/gdb/fmtstr/libcdb）。
why_useful: 本项目所有示例脚本的默认工具
related_knowledge: [fnd-pwntools]
maintenance_status: active
---
id: res-pwntools-docs
title: pwntools documentation
author: Gallopsled
source: https://docs.pwntools.com/
url: https://docs.pwntools.com/
source_type: official-docs
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问文档站核对模块索引（tubes/elf/rop/shellcraft/gdb/fmtstr/libcdb 等）
license: unknown
summary: pwntools 官方文档（stable/beta/dev）。
why_useful: API 权威参考
related_knowledge: [fnd-pwntools]
maintenance_status: active
---
id: res-pwndbg
title: pwndbg
author: pwndbg org（原创建者 Zach Riggle）
source: https://github.com/pwndbg/pwndbg
url: https://github.com/pwndbg/pwndbg
source_type: tool
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（约 11k stars、MIT、GDB12.1+/LLDB 支持活跃开发）
license: MIT
summary: GDB/LLDB 的 pwn 向增强插件（heap/bins/got/vmmap 可视化命令）。
why_useful: 本仓库调试示例的默认环境
related_knowledge: [fnd-gdb]
maintenance_status: active
---
id: res-gef
title: GEF (GDB Enhanced Features)
author: hugsy
source: https://github.com/hugsy/gef
url: https://github.com/hugsy/gef
source_type: tool
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（8.4k stars、MIT、多架构支持）
license: MIT
summary: 另一主流 GDB 插件，x86/64/ARM/MIPS/PPC/SPARC 全覆盖。
why_useful: 多架构调试（ARM/MIPS 方向）常用
related_knowledge: [fnd-gdb, spec-arm-aarch64]
maintenance_status: active
---
id: res-gdb
title: GDB: The GNU Project Debugger
author: GNU Project / Free Software Foundation
source: https://www.sourceware.org/gdb/
url: https://www.sourceware.org/gdb/
source_type: official-docs
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问官网（最新 18.1，2026-09-25 发布）
license: GPL
summary: GNU 调试器官方站（文档/wiki/errata）。
why_useful: 裸 GDB 能力与远程/精简环境兜底
related_knowledge: [fnd-gdb]
maintenance_status: active
---
id: res-ropgadget
title: ROPgadget
author: Jonathan Salwan
source: https://github.com/JonathanSalwan/ROPgadget
url: https://github.com/JonathanSalwan/ROPgadget
source_type: tool
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（4.5k stars、BSD、Capstone 多架构）
license: BSD-3-Clause（页面标注 BSD）
summary: gadget 搜索工具（ELF/PE/Mach-O/Raw；多架构）。
why_useful: ROP 构造标准工具
related_knowledge: [core-rop-basics]
maintenance_status: active
---
id: res-one-gadget
title: one_gadget
author: david942j
source: https://github.com/david942j/one_gadget
url: https://github.com/david942j/one_gadget
source_type: tool
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（2.4k stars、MIT、多架构支持活跃）
license: MIT
summary: 在 libc 中查找 execve("/bin/sh") 一发 gadget（带约束输出）。
why_useful: ret2libc 出口变体
related_knowledge: [core-ret2libc]
maintenance_status: active
---
id: res-libc-database
title: libc-database（libc.rip）
author: niklasb
source: https://github.com/niklasb/libc-database
url: https://github.com/niklasb/libc-database
source_type: tool
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（1.9k stars、MIT、libc.rip 网页版）
license: MIT
summary: 按泄漏符号末位反查 libc 版本并下载对应库。
why_useful: 远程题版本锁定的标准流程
related_knowledge: [core-libc-basics]
maintenance_status: active
---
id: res-seccomp-tools
title: seccomp-tools
author: david942j
source: https://github.com/david942j/seccomp-tools
url: https://github.com/david942j/seccomp-tools
source_type: tool
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（1.1k stars、MIT、子命令 dump/disasm/asm/emu/audit）
license: MIT
summary: seccomp 过滤器分析与构造工具（CTF 向）。
why_useful: 沙箱题 dump→分析标准流
related_knowledge: [spec-sandbox]
maintenance_status: active
---
id: res-binwalk
title: binwalk v3
author: ReFirmLabs
source: https://github.com/ReFirmLabs/binwalk
url: https://github.com/ReFirmLabs/binwalk
source_type: tool
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（14.4k stars、MIT、v3 Rust 重写、CI 活跃）
license: MIT
summary: 固件识别/提取/熵分析（IoT 方向第一工具）。
why_useful: IoT 固件解包
related_knowledge: [spec-iot]
maintenance_status: active
---
id: res-compiler-explorer
title: Compiler Explorer
author: Matt Godbolt
source: https://godbolt.org/
url: https://godbolt.org/
source_type: tool
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问站点（免费/捐赠支持、多语言多编译器）
license: 开源（compiler-explorer/compiler-explorer，站点内容免费使用）
summary: 在线 C/C++→汇编对照（含 AST/预处理/CFG 视图）。
why_useful: Foundation 阶段学 C 与汇编对照的最佳辅助
related_knowledge: [fnd-c-memory, fnd-assembly]
maintenance_status: active
```
