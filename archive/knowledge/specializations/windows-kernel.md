---
id: spec-windows-kernel
title: Windows Kernel Security（方向骨架）
description: Windows 内核机制认知与驱动攻击面研究入门
importance: 3
difficulty: 5
track: specialization
type: concept
depth: skeleton
prerequisites:
  - fnd-assembly
  - fnd-elf
why_learn: |
  系统安全研究的重要分支；仅限 CTF/Lab/授权研究场景。
objectives:
  - 能把五层分开：驱动开发、WinDbg 调试、Windows Internals 书、缓解机制、内核利用
  - 能说出 WDM 页写明它不再是推荐模型，新驱动先看驱动模型选择，KMDF 接口更简单
  - 能说出 IOCTL 是用户态与驱动（或驱动之间）的通信码，经 IRP 发送
  - 能说出 WinDbg 官方页写它调试用户态和内核态，支持的处理器是 x64 和 ARM64
  - 能拒绝把 Echo KMDF 实验当成 CTF，也能拒绝背没有原文的「某版本默认开启 HVCI」
resources:
  - res-windows-internals
  - res-windows-driver-getting-started
  - res-windows-wdm-intro
  - res-windows-ioctl-intro
  - res-windows-windbg-install
  - res-windows-echo-kmdf-lab
  - res-ctf-wiki
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "Windows Internals 7th 官方页 (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# Windows Kernel（骨架）

> depth: skeleton。没有核对过的 Windows 内核 CTF，不能当成完整模块。
> 只在自己的虚拟机、CTF 或明确授权的实验里练习。这里不写利用步骤。

五层不要并成一页「Windows 内核」：

| 层 | 本轮打开了什么 | 还缺什么 |
|----|----------------|----------|
| 驱动开发 | Get Started with Drivers；Introduction to WDM（页首写 WDM 不再是推荐模型，建议看 KMDF）；Introduction to I/O Control Codes | DriverEntry 专页没打开 |
| 内核调试 | Install WinDbg：可分析转储、调试用户态和内核态、看寄存器和内存；处理器架构写的是 x64 和 ARM64。Echo Kernel Mode 实验：用 WinDbg 调试 KMDF echo 示例，要求 Windows 11 双机和 WDK | 这是调试实验，不是题 |
| Internals | Windows Internals 第 7 版只有微软书目页 | 没有逐章核对，不写「第 X 章讲了什么」 |
| 安全机制 | 无 | 不写 HVCI/CFG/KASLR 的默认版本 |
| Kernel PWN | 无 | 没有题，没有 writeup |

IOCTL 在官方页上的定义：用户态程序和驱动之间，或驱动栈内部，用来通信的控制码，通过 IRP 发送。用户态调用 DeviceIoControl，I/O 管理器创建 IRP_MJ_DEVICE_CONTROL。这解释了「暴露 IOCTL 的驱动为什么在攻击面上」，不是利用方法。

Windows 不是 CPU 架构。WinDbg 安装页写的是 x64 和 ARM64。Echo 实验没有写目标 CPU，不要猜。

下面的名字只是以后可以拆的方向，不是已经存在的知识点。旧骨架里的 `!process`、池溢出、SMEP 默认行为都没有本轮原文，已删掉，避免当成已核对。

Windows Internals 第 7 版仍只是书目（`res-windows-internals`）。CTF Wiki 首页有 Windows Kernel Mode 导航，深页没打开。

