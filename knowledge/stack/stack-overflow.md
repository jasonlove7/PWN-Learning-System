---
id: core-stack-overflow
title: 栈溢出原理与偏移计算
description: 覆盖返回地址的完整方法：模式串定位、覆盖顺序、坏字符与截断
importance: 5
difficulty: 3
track: mainline
type: technique
depth: standard
prerequisites:
  - fnd-stack-heap-model
  - fnd-c-strings
  - fnd-gdb
why_learn: |
  一切控制流劫持的起点。第一次把返回地址改成目标函数的瞬间，PWN 正式开始。
objectives:
  - 能用 cyclic + 崩溃现场在 5 分钟内算出返回地址偏移
  - 能解释覆盖顺序并处理 saved rbp 的影响
  - 能识别坏字符（\x00 \x0a \x20 等）对 payload 的截断
resources:
  - res-ctf-wiki-stack-intro
  - res-nightmare
  - res-ir0nstone-notes
challenges:
  - ch-ropemporium-ret2win
  - ch-pwnable-kr-bof
  - ch-nightmare-csaw18-boi
hints: []
writeups: []
review:
  method: 换一道新题从零独立完成偏移计算
  interval: 首次后 1 周
sources:
  - "CTF Wiki 栈介绍/溢出原理 (verified 2026-09-27)"
  - "Nightmare §1-2 (index verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 栈溢出原理与偏移计算

## 利用前提
```c
void vuln() {
    char buf[64];
    read(0, buf, 200);   // 可写字节数 > buf 大小
}
```

## 偏移定位标准流程
```bash
python -c "import pwn; print(pwn.cyclic(200))" | ./vuln   # 崩溃
# gdb 打开看 RSP/RIP 处的 4/8 字节:
pwndbg> cyclic -l 0x6161616a    # → offset = 72
```
- RIP 显示 `aaaa` 系列 → 偏移即该值；RIP 只被半覆盖（如 0x00007faa6161）→ partial 现象（见后续知识点）。

## 覆盖顺序再强调
`buf → (填充) → saved rbp → 返回地址`。构造 `payload = b'A'*offset + p64(target)`。
- 若目标函数需要参数且为 32 位 → 继续在返回地址之上布参数。
- 返回到"函数中部"（跳过 prologue 的 push/mov）在部分题里是必要细节（`ret2win+?`）。

## 坏字符（badchars）清单意识
| 字符 | 谁在截断 |
|------|----------|
| \x00 | strcpy/字符串终结 |
| \x0a | gets/fgets/read 之前的行处理 |
| \x20 | scanf("%s") 空白 |
| \xff 等 | 程序自定义过滤 |

验证法：发送 0x00-0xff 全序列，回看内存缺谁（ROP Emporium `badchars` 关专门训练）。

## 练习
见 challenges 字段三题：ROP Emporium ret2win（标准教材）、pwnable.kr bof（含参数）、Nightmare csaw18_boi。
