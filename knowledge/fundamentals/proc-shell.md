---
id: fnd-proc-shell
title: /proc 与 shell 基础
description: /proc 文件系统与 Unix shell 的最小工作集
importance: 3
difficulty: 2
track: mainline
type: tool
depth: standard
prerequisites:
  - fnd-linux-syscalls
why_learn: |
  拿到 shell 之后不会用等于没拿到；/proc 是无文件系统场景（orw 题）读 flag 的常用路径。
objectives:
  - 能用 sh 基本命令完成探索（ls/cat/重定向/; && ||）
  - 知道 /proc/self/ 下 maps|cmdline|fd|environ 各自的利用价值
resources: []
challenges:
  - ch-pwnable-kr-cmd1
  - ch-pwnable-kr-cmd2
hints: []
writeups: []
review:
  method: 在受限制 shell 场景练习绕过（pwnable.kr cmd1/cmd2）
  interval: 首次后 1 个月
sources:
  - "pwnable.kr cmd1/cmd2 存在性 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# /proc 与 shell 基础

## orw 题的 /proc 套路
- 拿不到 shell（seccomp 只放行 orw）时：`open("/proc/self/...")` 或直接 open flag 路径。
- `/proc/self/maps`——远程环境下唯一可靠的内存布局来源（泄漏后自证 libc 版本）。
- `/proc/self/fd/N`——继承来的 fd 复用。

## shell 最小工作集
```sh
ls -la; cat flag*; id; echo $0
cat < flag | tee out        # 重定向组合
sh -c "cmd"                  # 引号与元字符（cmd1/cmd2 的考点即过滤绕过）
```

## 受限 shell 绕过意识
- 过滤 `flag` 字样 → 通配符/变量拼接/八进制路径。
- 这类能力直接在 pwnable.kr `cmd1`、`cmd2` 中训练。
