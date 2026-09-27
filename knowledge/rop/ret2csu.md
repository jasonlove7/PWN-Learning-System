---
id: core-ret2csu
title: ret2csu
description: 用 __libc_csu_init 中的 gadget 批量装载 rdi/rsi/rdx 三参数
importance: 4
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - core-rop-basics
  - core-stack-pivot
why_learn: |
  没有现成 pop rdx 时的参数装载器；理解"gadget 不一定长成 pop rdx;ret"的思维跃迁。
objectives:
  - 能写出 csu 尾部调用链（两段式：装载段+调用段）
  - 能解释 rbx/rbp 计数与 [r12+rdx*8] 调用约定
  - 知道现代编译器已弱化 __libc_csu_init 时的替代思路
resources:
  - res-ropemporium
  - res-ctf-wiki-stack-intro
challenges:
  - ch-ropemporium-ret2csu
hints: []
writeups: []
review:
  method: 手画两段链的栈布局图
  interval: 首次后 1 个月
sources:
  - "ROP Emporium ret2csu (verified 2026-09-27，含 BlackHat 论文引用与 gcc 版本警告)"
verification_status: verified
last_verified: 2026-09-27
---

# ret2csu

## 背景
- 64 位调用第 1/2/3 参 = rdi/rsi/rdx；`pop rdx; ret` 极稀缺。
- 老版 gcc 下 `__libc_csu_init`（每个动态可执行文件都有）尾部有一组万能 gadget。

## 两段式链（经典形态）
```text
装载段（csu 尾部 pop 序列）:
  pop rbx ; pop rbp ; pop r12 ; pop r13 ; pop r14 ; pop r15 ; ret
  → 布置 rbx=0, rbp=1, r12=func_ptr_addr, r13=arg1(edi), r14=arg2(rsi), r15=arg3(rdx)
调用段:
  mov rdx, r15 ; mov rsi, r14 ; mov edi, r13d ; call [r12+rbx*8]
  → rbx+1==rbp 使循环退出，随后继续 ret
```

## 注意（来自 ROP Emporium 官方警告）
- 新版 gcc/clang 已改写 __libc_csu_init → 该 gadget 可能不存在或寄存器映射不同（2026 实况：新题中渐少见，历史题仍常见）。
- 替代思路：ropper 创意组合（`mov rdx, rbp ; pop rbp` 类）、SROP 一次性布全部寄存器。

## 实战
ROP Emporium `ret2csu`（站点明示：先尝试 ropper 创意找 gadget，再上 csu）。
