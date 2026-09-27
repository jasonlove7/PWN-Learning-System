---
id: fnd-c-strings
title: C 字符串与不安全函数
description: 以 NUL 结尾的字符串约定与经典不安全函数的行为模式
importance: 5
difficulty: 2
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-c-memory
why_learn: |
  大多数栈溢出题的入口就是一个不安全字符串函数。见洞的能力从理解这些函数的边界行为开始。
objectives:
  - 能说出 strcpy/strcat/gets/scanf(%s)/sprintf 各自为什么不安全
  - 能对比安全版本（strncpy/strncat/fgets/snprintf）仍存在的陷阱
  - 能解释 NUL 截断与 off-by-one 的成因联系
resources:
  - res-csapp
challenges:
  - ch-pwnable-kr-fd
hints: []
writeups: []
review:
  method: 默写不安全函数清单及各自边界行为
  interval: 首次后 1 周
sources:
  - "CS:APP (verified 2026-09-27)"
  - "Naetw/CTF-pwn-tips 溢出函数清单 (verified 2026-09-27, SUPPLEMENTARY)"
verification_status: verified
last_verified: 2026-09-27
---

# C 字符串与不安全函数

## 字符串约定
- C 字符串 = 字节序列 + `'\0'` 终结符；长度不含终结符。
- 所有 `str*` 家族依赖这个约定——漏写终结符或越界写都属于 UB。

## 入口函数黑名单（PWN 视角）

| 函数 | 问题 | 典型后果 |
|------|------|----------|
| `gets(buf)` | 无长度限制（C11 已移除，教学题仍常见） | 无限溢出 |
| `strcpy(dst,src)` | 拷贝到 NUL 为止 | 溢出长度=src 长度 |
| `strcat(dst,src)` | 追加到 dst 终结符后 | 累积溢出 |
| `sprintf(buf,fmt,...)` | 输出长度不可控 | 格式化+溢出双杀 |
| `scanf("%s",buf)` | 遇空白停止但无长度限制 | 单词级无限溢出 |
| `read(fd,buf,n)` | 本身安全，n 超过 buf 大小时危险 | 溢出 n-buf 字节 |

## "安全版"的陷阱
- `strncpy` **不保证**补 NUL（src 更长时）；仍可能精确 off-by-one。
- `fgets` 读入 `\n`——做题时影响 payload 布局。
- `read` 读不满 n 字节就返回——交互脚本要处理短读。

## 关键联系
- off-by-one（差一字节的溢出）→ 后续 [partial overwrite](../rop/partial-overwrite.md) 与堆 [off-by-null](../heap/heap-overflow.md) 的根基。
- `read` 的"可用字节数 vs 缓冲区大小" → 判断溢出窗口的第一步（配 [binary-tools](binary-tools.md) 的反汇编确认）。
