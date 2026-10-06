---
id: fnd-binary-tools
title: 二进制分析工具链
description: file/strings/readelf/objdump/nm/checksec/ltrace/strace 的分工
importance: 4
difficulty: 2
track: mainline
type: tool
depth: standard
prerequisites:
  - fnd-elf
why_learn: |
  拿到题的前 5 分钟决定效率。工具链是"体检"环节。
objectives:
  - 能对陌生二进制在 5 分钟内输出完整"体检报告"
  - 能逐字段解释 checksec 输出的安全含义
resources:
  - res-pwntools
challenges: []
hints: []
writeups: []
review:
  method: 对 3 个不同配置的二进制各出一份体检报告
  interval: 持续使用
sources:
  - "pwntools checksec (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 二进制分析工具链

## 标准体检流程
```bash
file vuln                    # 架构/静态动态/stripped
checksec --file=vuln         # 缓解矩阵
strings -tx vuln | head -50  # 线索: 提示语/函数名/路径
readelf -d vuln | head       # 依赖库（Ubuntu 的 libc 版本线索!）
objdump -d -M intel vuln > dis.txt   # 静态反汇编
nm vuln | grep ' [tT] '      # 符号（未 strip 时）
```

## checksec 逐字段（速查）
| 字段 | 含义 | 对利用的直接影响 |
|------|------|------------------|
| NX (GNU_STACK) | 栈/数据不可执行 | 堵 ret2shellcode → ROP |
| PIE | 映像基址随机 | 需泄漏或 partial overwrite |
| Canary | 栈保护 | 堵线性溢出 → 需泄漏 canary/绕过 |
| RELRO | 见 got-plt | GOT 攻击面 |
| FORTIFY | _chk 函数替换 | 部分堵溢出函数 |
| Symbols | 未 strip | 静态分析成本大降 |

## 动态三件套
- `ltrace`（库调用）/ `strace`（syscall）/ `LD_PRELOAD` 替换——教学题定位输入路径极快。
