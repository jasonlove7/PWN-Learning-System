# ARM / AArch64 学习路线

> track: specialization ｜ 依赖：PWN Core（利用方法论可迁移）

## 学习阶梯

```text
1. ARM 架构基础     — RISC 与 x86 对照、ARM/Thumb 模式、条件执行
2. 寄存器与栈       — r0-r7/r13(sp)/r14(lr)/r15(pc)；AArch64 x0-x30
3. 指令集           — ldr/str 多寄存器、ldm/stm、跳转与链接
4. 调用约定         — r0-r3(x0-x7) 传参；返回地址在 lr 而非栈上！
5. ELF on ARM       — 与 x86 ELF 的差异（interpret/属性节）
6. 调试             — qemu-arm + gdb-multiarch；pwndbg/gef 支持 ARM
7. ROP on ARM       — gadget 形态差异（pc 在寄存器）、ret2csu 变体
8. 实战             — ROP Emporium ARMv5 关卡、ARM CTF 题
```

## 已核对与未核对（2026-09-27）

- **ARM32：** Azeria Part 1 写明教程重点是 32 位，示例在 ARMv6。ROP Emporium 的 ret2win 页提供 `ret2win_armv5.zip`（见 `ch-ropemporium-ret2win`）。这两处是本方向目前唯一核对过的练习入口。
- **AArch64：** 上面的阶梯后半把 AArch64 寄存器和 PAC 写在同一张表里，是迁移提示，不是已核对的课程。本轮没有打开一份系统的 AArch64 利用教程，所以不新建 `spec-aarch64-*` 知识点，也不收新资源。
- **CTF Wiki 的 ARM 栈页：** 尝试打开 `.../stackoverflow/arm/stack-intro/` 得到 404。不要把那条深链当成已验证资料。

## 已验证入口资源

- **Azeria Labs《Writing ARM Assembly》7 部系列**（英文，含后续 ARM exploit 开发系列）——S35
- **ROP Emporium**（每关提供 ARMv5 版本，ret2win 起点即有）——S8
- **CTF Wiki**（栈溢出 arm/mips/risc-v 变体章节）——S1

## 与 x86 学习的关键差异（迁移要点）

- 返回地址在 `lr`（link register），溢出覆盖的常是栈上保存的 lr
- 无 x86 式 `ret` 万能 gadget，pivot/gadget 形态不同
- Thumb 模式（地址奇偶性）是 ARM 特有细节
- 现实场景多为 ARM64（AArch64）：寄存器 x 系列、SP 独立、PAC（指针验证）等新缓解
