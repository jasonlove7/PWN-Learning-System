---
id: core-stack-pivot
title: stack pivot（栈迁移）
description: 把 rsp 指向可控内存区，在溢出空间不足时展开完整 ROP 链
importance: 4
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - core-ret2libc
  - core-partial-overwrite
why_learn: |
  "只能覆盖 0x10 字节"的题怎么打？把栈搬到 bss/堆上的大缓冲。这是小溢出题的标准答案。
objectives:
  - 能用 xchg rsp,rax / pop rsp / leave;ret 三类 gadget 完成迁移
  - 能选择合适的"新栈"位置（可写+地址已知+够长）
resources:
  - res-ropemporium
  - res-nightmare
challenges:
  - ch-ropemporium-pivot
# InCTF 2017 的 Nightmare 深页是 SROP（stupidrop），不是 stack pivot。
# 正式题为 ch-nightmare-inctf17-stupidrop，挂在 core-srop。旧 id stupiddrop 已废弃。
hints: []
writeups: []
review:
  method: 默写三类 pivot gadget 及各自前置条件
  interval: 首次后 1 个月
sources:
  - "ROP Emporium pivot (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# stack pivot

## 为什么需要
- 溢出只够覆盖返回地址 ±几个字长 → 放不下完整链。
- 解法：返回地址处放**pivot gadget**，把 rsp 搬到你能写一大片的区域（bss、堆、第二个输入缓冲）。

## 三类 gadget
| gadget | 前置 | 说明 |
|--------|------|------|
| `xchg eax, esp ; ret` | rax 可控（返回值/输入） | 常见于有"返回缓冲区指针"的函数 |
| `pop rsp ; ret` | 栈上下一字长可控 | 直接指定新栈顶 |
| `leave ; ret`（两次帧） | rbp 可控 | 覆盖 saved rbp → 函数 epilogue 自动迁移（EBP 迁移链） |

## 新栈选址
- `.bss`（no PIE 时地址已知）✓；有 PIE 时需泄漏或结合 partial。
- 堆上缓冲（有堆地址时）。
- 注意新栈不要踩坏后续要用的数据（GOT/environ）。

## 实战
ROP Emporium `pivot`（专门训练此技术，含 badchars 综合前作）；Nightmare `inctf17_stupiddrop`（SROP 前置常一起出现）。
