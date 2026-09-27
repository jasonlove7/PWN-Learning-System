---
id: fnd-elf
title: ELF 文件格式
description: sections 与 segments、符号表、重定位、readelf/objdump 视角
importance: 5
difficulty: 3
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-compiling-linking
why_learn: |
  二进制本身就是攻击面地图。不知道 section 布局就找不到 gadget、字符串和可写区。
objectives:
  - 能用 readelf -h/-l/-S/-s 回答：入口、段权限、section 地址、符号地址
  - 能解释 .text/.data/.bss/.rodata/.got/.got.plt/.dynamic/.symtab/.dynsym 各自作用
  - 能定位一个字符串/函数在文件中的位置
resources:
  - res-csapp
  - res-ctf-wiki-elf
challenges: []
hints: []
writeups: []
review:
  method: 对一个动态链接二进制跑全套 readelf 并逐段解释
  interval: 首次后 2 周
sources:
  - "CS:APP ch7 (verified 2026-09-27)"
  - "CTF Wiki Executable(ELF) 章 (导航 verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# ELF 文件格式

## 双视角
- **链接视角（sections）**: .text .rodata .data .bss .got .dynamic .symtab ...
- **加载视角（segments/program headers）**: PT_LOAD(r--/r-x/rw-)、PT_DYNAMIC、PT_INTERP
- `readelf -l` 里能看到 section → segment 的归组。

## 做题高频 section
| section | 作用 | 利用相关性 |
|---------|------|------------|
| .text | 代码 | gadget 来源 |
| .rodata | 常量字符串 | "/bin/sh" 常在此 |
| .data/.bss | 可写数据 | 写入伪造结构的目标 |
| .got/.got.plt | 动态符号解析结果 | 覆写/泄漏靶点 |
| .dynamic | 动态链接信息 | ret2dlresolve 素材 |
| .symtab/.strtab | 完整符号（未 strip） | 未 strip 题直接查函数 |

## 最小命令集
```bash
readelf -h vuln | grep Entry        # 入口
readelf -S vuln                     # section 表
readelf -r vuln                     # 重定位（GOT 条目）
readelf -s vuln | grep system       # 有无符号
objdump -d -M intel vuln | less     # 反汇编
strings -tx vuln | grep /bin/sh     # 字符串+文件偏移
```

## 连接
GOT/PLT 工作机制 → [got-plt-fundamentals](got-plt-fundamentals.md)
