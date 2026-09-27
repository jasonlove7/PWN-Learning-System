---
id: fnd-gdb
title: GDB 与 pwndbg / gef
description: 用 GDB 系工具完成漏洞定位、偏移计算、运行时验证
importance: 5
difficulty: 3
track: mainline
type: tool
depth: standard
prerequisites:
  - fnd-assembly
why_learn: |
  所有偏移计算与利用验证都在调试器里发生。这是"做题的手"。
objectives:
  - 能用 cyclic + gdb 定位溢出偏移
  - 能熟练：break/run/continue、x 系列查看、info registers、stack、vmmap
  - 能在 pwndbg/gef 下附加本地进程并观察 GOT 变化
resources:
  - res-gdb
  - res-pwndbg
  - res-gef
challenges: []
hints: []
writeups: []
review:
  method: 完整调试一道溢出题并记录每步命令
  interval: 持续使用即复习
sources:
  - "GDB 官方 (verified 2026-09-27, sourceware 18.1)"
  - "pwndbg (verified 2026-09-27, 11k stars)"
  - "GEF (verified 2026-09-27, 8.4k stars)"
verification_status: verified
last_verified: 2026-09-27
---

# GDB 与 pwndbg / gef

## 安装（二选一即可）
```bash
git clone https://github.com/pwndbg/pwndbg && cd pwndbg && ./setup.sh
# 或
bash -c "$(curl -fsSL https://gef.blah.cat/sh)"
```

## 做题核心命令集
```text
pwndbg> cyclic 200          # 生成模式串
$ python solve.py           # 崩溃后:
pwndbg> cyclic -l 0x61616168 # 求偏移（aaa h → 偏移）
pwndbg> b *0x401234         # 地址断点 / b main / b *main+46
pwndbg> r < payload         # 喂输入
pwndbg> x/20gx $rsp         ; 看栈
pwndbg> x/4gx &buf          ; 看缓冲区
pwndbg> info frame          ; 帧信息（返回地址位置）
pwndbg> vmmap               ; 段权限（NX 一目了然）
pwndbg> got                 ; pwndbg: 看 GOT 表现状
pwndbg> tel 20              ; gef/pwndbg 栈回溯链
pwndbg> watch *(long*)0x... # 观察写（GOT 劫持验证）
```

## pwntools 联动（推荐工作流）
```python
from pwn import *
p = process("./vuln")
gdb.attach(p, gdbscript="b vuln\n")
```

## 分工
- GDB 裸用：远程/精简环境兜底。
- pwndbg：pwn 主流选择（本仓库示例默认 pwndbg 命令）。
- gef：多架构（ARM/MIPS）场景常用。
