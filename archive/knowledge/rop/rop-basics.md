---
id: core-rop-basics
title: 基础 ROP
description: gadget 的概念与寻找、链式构造、pwntools ROP 对象、栈对齐
importance: 5
difficulty: 3
track: mainline
type: technique
depth: standard
prerequisites:
  - core-ret2win
  - fnd-calling-convention
why_learn: |
  ROP 是现代利用的通用语言。从这里开始，"能不能执行任意逻辑"取决于你能找到哪些 gadget。
objectives:
  - 能用 ROPgadget/ropper/ROP 对象找到并组合 gadget
  - 能手工构造 call func(1,2) 的完整链并解释每一步
  - 能排查 movaps/栈对齐类崩溃
resources:
  - res-ropemporium
  - res-ropgadget
  - res-nightmare
challenges:
  - ch-ropemporium-split
  - ch-ropemporium-callme
  - ch-ropemporium-write4
  - ch-nightmare-bkp16-simplecalc
  - ch-ropemporium-badchars
  - ch-ropemporium-fluff
  - ch-pwnable-kr-horcruxes
hints: []
writeups:
  - wu-nightmare-bkp16-simplecalc
review:
  method: 纯手工（不用 ROP 对象）构造一条三参数链
  interval: 首次后 2 周
sources:
  - "ROP Emporium split/callme/write4 (verified 2026-09-27)"
  - "ROPgadget (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 基础 ROP

## gadget = 以 ret 结尾的指令碎片
```text
pop rdi ; ret        ← 布第一参数
pop rsi ; pop r15 ; ret   ← 布第二参数（连吃一个废寄存器）
ret                  ← 对齐用
```

## 链的构造（以 system("/bin/sh") 为例的骨架）
```text
[padding]
[pop rdi ; ret]
[binsh_addr]
[system_addr]          ← 或 system@plt
```

## 工具
```bash
ROPgadget --binary vuln | grep "pop rdi"
# pwntools:
r = ROP(exe); r.call('system', [next(exe.search(b'/bin/sh'))]); payload = flat(r.chain())
```

## 两个新手大坑
1. **栈 16 字节对齐**：进入 system 时 rsp 对不齐 → movaps 崩 → 链前垫一个 `ret`。
2. **调用 plt 还是 libc 地址**：plt 需要动态解析过/未解析也可（会走 resolver）；有 libc 时优先直接地址。

## 写原语意识（ROP 不只是"调函数"）
- `write4` 关训练"把数据写进可写内存"：`pop rdi/rsi; mov [rdi], rsi; ret` 两个 gadget 组合成 memcpy —— 这是造任意写的 ROP 形态（与格式串 %n 写、堆写原语并列的三种来源之一）。

## 实战
ROP Emporium `split → callme → write4`（一条完美梯度）；Nightmare bkp16_simplecalc。
