---
id: core-libc-basics
title: libc 版本识别与符号偏移
description: 从泄漏值反查 libc 版本；libc-database/one_gadget 的使用
importance: 5
difficulty: 3
track: mainline
type: tool
depth: standard
prerequisites:
  - core-leak-basics
why_learn: |
  远程题的 libc 几乎永远和你本地不同。不会定位版本，第二段 payload 全是错地址。
objectives:
  - 能用两个已知符号的末 12 bit 反查 libc 版本
  - 能用 one_gadget 快速出手，并解释其约束失败的原因
resources:
  - res-libc-database
  - res-one-gadget
  - res-pwntools-docs
challenges:
  - ch-nightmare-csaw17-svc
hints: []
writeups: []
review:
  method: 给定 puts/write 泄漏末3位，手工走一遍版本锁定流程
  interval: 首次后 2 周
sources:
  - "libc-database (verified 2026-09-27, libc.rip)"
  - "one_gadget (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# libc 版本识别与符号偏移

## 版本锁定的四条路
1. **题目附件**：给了 libc.so.6 → 直接用（最理想）。
2. **末 12 bit 反查**：ASLR 只随机高位；页对齐使低 12 bit 恒定 → 把泄漏的 puts/write 末 3 位十六进制丢进 libc.rip 或本地 libc-database：
   ```bash
   ./find puts 7a0 write 3b0
   ```
3. **Build ID**：能读到 .note 时最精确。
4. **行为侧写**：不同版本符号偏移差的比对（兜底）。

## 下载对应版本
```bash
./dump libc6_2.35-0ubuntu3.x_amd64      # libc-database
# pwntools:
pwn libcdb download ubuntu:22.04 amd64
```

## one_gadget
```bash
one_gadget libc.so.6
# 0x50a37 execve("/bin/sh", rsp+0x??, environ) 约束: [rsp+..]==NULL
```
- 每个 gadget 带**约束条件**（栈/寄存器状态）→ 失败就换下一个或改布局。
- 常与 fmt/堆写原语配合（单点写即可出手）。

## 版本差异意识（串起后面堆方向）
- 2.23（无 tcache）→ fastbin/unlink 时代
- 2.26 tcache 引入；2.29 tcache 加 key/double-free 检查；2.32 safe-linking
- 2.34 移除 hooks → 出口转向 IO_FILE
详见 [heap-modern](../heap/heap-modern.md)。
