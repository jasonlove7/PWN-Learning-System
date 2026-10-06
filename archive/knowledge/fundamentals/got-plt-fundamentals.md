---
id: fnd-got-plt-fundamentals
title: 静态/动态链接、GOT/PLT
description: 延迟绑定机制、GOT/PLT 结构、RELRO 的三档状态
importance: 5
difficulty: 4
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-elf
why_learn: |
  ret2libc 的泄漏靠 GOT；ret2dlresolve 与 GOT 覆写攻击 PLT；RELRO 决定这些是否可行。PWN Core 最重的一块地基。
objectives:
  - 能画出第一次/第二次调用库函数时 GOT/PLT 的状态变化
  - 能解释 Lazy Binding 的完整流程（PLT→GOT→_dl_runtime_resolve）
  - 能说出 no/partial/full RELRO 下 GOT 可写性差异
resources:
  - res-csapp
  - res-ctf-wiki-elf
challenges:
  - ch-pwnable-kr-passcode
hints: []
writeups: []
review:
  method: 默画 lazy binding 流程图 + 三档 RELRO 对比表
  interval: 首次后 2 周，进入堆阶段前再复习
sources:
  - "CS:APP ch7 (verified 2026-09-27)"
  - "pwnable.kr passcode 存在性 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# GOT / PLT 与动态链接

## 为什么存在
- 动态链接的函数地址装载期才确定；但每次调用都查表太慢 → **延迟绑定(lazy binding)**：第一次用到才解析。

## 结构与流程（x86-64 典型）
```text
调用 puts@plt
   → jmp [puts@got]          ← 第一次: 指回 plt 下一条
   → push reloc_index        ; 标识是哪个符号
   → jmp PLT0                ; 跳公共解析入口
   → _dl_runtime_resolve     ; ld.so 查 libc 里真地址
   → 写回 puts@got           ; 此后再次调用直接跳真地址
```

## 三档 RELRO（checksec 直接相关）
| 状态 | .got.plt 可写? | 利用含义 |
|------|----------------|----------|
| No RELRO | ✅ 可写 | GOT 覆写完全开放 |
| Partial RELRO（常见默认） | ✅ 可写（.got 只读、.got.plt 可写） | GOT 覆写仍可行 |
| Full RELRO | ❌ 全只读 | GOT 攻击面关闭 → 转向 libc 内目标（hook 时代→IO_FILE 时代） |

## 经典联系
- **泄漏**: 读 GOT 中已解析的函数地址 → libc 基址 → [leak-basics](../rop/leak-basics.md)
- **写**: 覆写 GOT 条目为 system → [fmt-string](../format-string/fmt-string.md) 的 %n 应用
- **无泄漏场景**: 伪造重定位记录让 resolver 替你解析 → ret2dlresolve（CTF Wiki 高级 ROP 章）
- pwnable.kr `passcode`：scanf("%d", 已死指针) 的 GOT 覆写入门题。
