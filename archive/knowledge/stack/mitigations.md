---
id: core-mitigations
title: 安全缓解机制总览
description: NX/PIE/Canary/ASLR/RELRO/FORTIFY 各自挡什么、互相如何配合、绕过思路总索引
importance: 5
difficulty: 3
track: mainline
type: mitigation
depth: standard
prerequisites:
  - fnd-got-plt-fundamentals
  - fnd-linux-process
why_learn: |
  现代利用 = "在缓解矩阵的缝隙里拼出原语"。这张总表是所有后续技术的坐标系。
objectives:
  - 能对任意 checksec 输出立刻说出"哪些路被堵、哪些路开着"
  - 能为每个缓解说出至少一种标准绕过思路及其前置条件
resources:
  - res-ctf-wiki-stack-intro
  - res-nightmare
  - res-pwnable-kr
challenges:
  - ch-ropemporium-ret2win
hints: []
writeups: []
review:
  method: 默写"缓解→挡什么→绕过→绕过的前置"四列表
  interval: Core 中段/进 Advanced 前各一次
sources:
  - "CTF Wiki 防御(Canary)与各利用章 (verified 2026-09-27)"
  - "Nightmare 缓解交织式教学结构 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 安全缓解机制总览

## 四列总表（本知识点核心）

| 缓解 | 挡住什么 | 标准绕过思路 | 思路的前置 |
|------|----------|--------------|------------|
| NX (DEP) | 栈/堆上数据执行 | ROP / ret2libc / mprotect | 可控返回地址 |
| Canary | 线性覆盖到返回地址 | 泄漏 canary；逐字节爆破（fork 场景）；改走不经过 canary 的路径（如只覆盖到函数指针） | 溢出窗口足够/有泄漏原语 |
| PIE + ASLR | 映像/库/栈地址未知 | 泄漏；partial overwrite；相对地址不动的场景 | 任意泄漏或低位可覆盖 |
| Full RELRO | GOT 改写 | 转向 libc 内数据（stdout 结构/IO/hook 替代品）、栈上的返回地址 | 已有泄漏+写原语 |
| FORTIFY | 危险函数加长度检查 | 换入口函数/逻辑缺陷 | — |
| ASLR alone | 库地址 | GOT 泄漏 → libc 基址 | 可读已知偏移处内容 |

## 缓解的"组合读法"（实战）
```text
NX only        → 纯 ROP 自由发挥（no PIE 时地址全知）
NX+Canary      → 先解决 canary 再 ROP
NX+PIE         → 先泄漏映像基址（partial/格式串）再 ROP
NX+PIE+Full RELRO → 教科书链: fmt/GOT 泄漏 → libc → 覆写栈返回地址或 __free_hook 时代→IO 时代
```

## 版本演进时间线（对做题很重要）
- 2000s: NX → ROP 时代
- Stack Canary 普及（gcc 默认 -fstack-protector-strong, ~2010s Ubuntu 默认）
- Full RELRO（发行版渐普及）
- glibc 2.32: tcache safe-linking → 堆攻击面变化
- glibc 2.34: 移除 __malloc_hook/__free_hook → 出口转移到 IO_FILE 等
- 现代: CET/shadow stack（IBT）在部分环境启用

> 交织式教学说明：本表先建立坐标系；每个绕过思路的完整技术在其专属知识点展开。
