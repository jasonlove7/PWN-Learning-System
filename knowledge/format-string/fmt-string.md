---
id: core-fmt-string
title: 格式化字符串漏洞（原理与进阶）
description: printf 族 user-controlled format：任意读（%p/%s）与任意写（%n）的完整技术面
importance: 5
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - core-ret2libc
why_learn: |
  独立于溢出的第二大漏洞原语家族；泄漏与任意写一体的"瑞士军刀"。放在 ROP 后、堆前（见 ROADMAP-RESEARCH 冲突决策#3）。
objectives:
  - 能手工推演参数栈布局，定位第 n 个参数（%n$... 定位符）
  - 能完成：泄漏任意地址、%hn/%hhn 精确写、GOT 改写、返回地址改写
  - 能用 pwntools fmtstr 模块并解释其生成的 payload
resources:
  - res-ctf-wiki-stack-intro
  - res-nightmare
  - res-pwntools-docs
  - res-hacking-arte
challenges:
  - ch-nightmare-backdoor17-bbpwn
  - ch-nightmare-tw16-greeting
  - ch-pwnable-kr-passcode
hints: []
writeups: []
review:
  method: 手工推一道 %n 写的参数布局（不用 pwntools）
  interval: 首次后 2 周；进堆前再复习 %n 改指针思想
sources:
  - "Nightmare §6 Format Strings 四题 (verified 2026-09-27)"
  - "Hacking: The Art of Exploitation 格式串章 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 格式化字符串漏洞

## 原理一句话
`printf(buf)` 中 buf 可控 → 攻击者用格式符把**栈上数据当参数**读/写。

## 读：定位与泄漏
```text
%p%p%p%p...     ← 探针，看栈上有什么
%2$p ... %40$p  ← 精确定位第 n 个"参数"（从 format 下一栈槽算起）
%s              ← 把栈上值当指针解引用 → 任意读（配 %n$s 指定槽位+你压入的地址）
```
- 64 位：前 5 个变参在 rsi/rdx/rcx/r8/r9，之后进栈 → 定位序号有 +5 偏移感。
- 常规产出：泄漏 libc（栈上的返回 libc 的地址）、栈地址（environ 附近）、canary（%n$p 找 0x...00 结尾的随机值）。

## 写：%n 家族
```text
%100c%8$hn      ← 输出 100 字符后把"第8参数指向的 2 字节"写成 100
%hhn = 1字节 %hn = 2字节 %n = 4字节
```
- 把目标地址压进参数区（payload 里带地址），`%k$hn` 指向它 → 任意地址写。
- 大数值拆多次 %hn（pwntools `fmtstr_payload(offset, {addr: value})` 全自动，但要会手推）。

## 四大应用
1. **改 GOT**：partial RELRO 下 printf@got → system（此后 printf(buf) 输入 /bin/sh 即得手）。
2. **改返回地址**：栈上已有 ret addr（需栈泄漏定位）。
3. **泄漏全家桶**：libc/栈/canary 一次拿齐。
4. **改函数指针/结构体成员**：堆方向的入场券（改 next 指针/print 函数指针 → 连接 UAF）。

## 实战
Nightmare `backdoor17_bbpwn`（入门改写）、`tw16_greeting`（泄漏+写组合）、pwnable.kr `passcode`（GOT 覆写思想的姊妹题，scanf 版）。
