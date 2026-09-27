---
id: core-ret2win
title: ret2win
description: 最简控制流劫持：返回到程序自带的"赢"函数
importance: 5
difficulty: 2
track: mainline
type: technique
depth: standard
prerequisites:
  - core-stack-overflow
why_learn: |
  零缓解依赖的第一次 hijack。把"我能控制 rip"变成肌肉记忆。
objectives:
  - 能独立完成：找 win 函数 → 算偏移 → 覆盖 → 拿 flag
  - 能处理"win 函数从未被调用/符号被藏"的变体
resources:
  - res-ropemporium
  - res-nightmare
challenges:
  - ch-ropemporium-ret2win
  - ch-nightmare-csaw16-warmup
hints: []
writeups: []
review:
  method: 一次无提示重做
  interval: 首次后 3 天
sources:
  - "ROP Emporium ret2win (verified 2026-09-27, 4 架构偏移 40/44/~36)"
  - "Nightmare §2 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# ret2win

## 利用形态
```text
payload = padding + p64(win_addr)     # win: 程序里自带的打印 flag/开 shell 的函数
```

## 标准工作流
1. `nm vuln | grep -i win` 或反汇编找可疑函数（不一定叫 win）。
2. cyclic 算偏移。
3. 注意返回到函数的**哪个位置**：偶尔需要 +1/+5 跳过 `push rbp`（栈对齐, movaps 崩溃问题）。
4. **栈 16 字节对齐**：x86-64 ABI 要求调用点 rsp%16==8；不对齐时部分 libc 函数（movaps）会崩 → 链前加一个 `ret` gadget 是标准修法。

## 变体意识
- 无符号（stripped）→ strings/反汇编人工找"看起来在打印东西"的函数。
- win 需要参数 → 预演 ROP 传参（下一知识点的钩子）。

## 实战
ROP Emporium `ret2win`（四架构各一遍体会差异）；Nightmare csaw16_warmup。
