# Windows Kernel Security 学习路线

> track: specialization ｜ 定位：**严格限定 CTF / Lab / 授权安全研究**
> 依赖：Foundation 全部（尤其汇编/内存模型）；建议先完成 PWN Core 建立利用心智模型

## 五层，不要并在一起（2026-09-27）

阶梯下面仍是计划。核对过的只有：

| 层 | 打开的页 | 不是什么 |
|----|----------|----------|
| 驱动开发 | Get Started with Drivers；Introduction to WDM（WDM 不再是推荐模型，建议 KMDF）；Introduction to I/O Control Codes | 不是利用 |
| 内核调试 | Install WinDbg（用户态和内核态；处理器写的是 x64 和 ARM64）；Echo Kernel Mode 实验（WinDbg 调试 KMDF echo，Windows 11 双机） | Echo 不是 CTF |
| Internals | Windows Internals 第 7 版书目页 | 没有逐章核对 |
| 安全机制 | 无 | 不写默认开启的版本 |
| Kernel PWN | 无 | 没有题 |

猜过的 `getting-started-with-windbg-kernel-mode` 和 `setting-up-kernel-mode-debugging-in-windbg--kernel-mode-` 是 404。内核调试步骤以 Echo 实验为准。

## 学习阶梯（计划，不是完成状态）

```text
1. Windows 架构     — 用户态/内核态、ntoskrnl、hal、系统调用路径(sysenter/syscall)
2. 核心对象         — 进程/线程/EPROCESS/KPCR、句柄与对象管理器
3. 内存系统         — 虚拟地址空间、页表、VAD、pool 内存（对照内核堆）
4. PE 格式          — 与 ELF 对照学习；导入表/重定位/SEH
5. 驱动与 IRP       — WDM/WDF 驱动模型、IRP/IOCTL 攻击面
6. 内核调试         — WinDbg（双机/虚拟机内核调试）、常用扩展命令
7. 缓解机制         — SMEP/CFG/KCFG/KASLR(x64)/HVCI/VBS/PatchGuard
8. 漏洞研究入门     — 驱动漏洞模式（池溢出/UAF/竞争）、公开 CVE 复现于实验环境
```

## 已验证入口资源

- **Windows Internals 7th ed**（Microsoft Press 官方页已验证）——S29
- **Get Started with Drivers on Windows**（Microsoft Learn，驱动入门，不是漏洞教程）——2026-09-27 打开，见 `res-windows-driver-getting-started`
- **CTF Wiki**：首页导航有 Windows 下的 Kernel Mode。具体深页本轮未打开。

## 知识点骨架（spec-windows-kernel-*）

架构与执行体 / 进程线程对象 / 虚拟内存与 pool / PE / 驱动与 IRP / WinDbg 内核调试 / 内核缓解 / 驱动漏洞研究入门。

## 边界与纪律（强制）

- **仅限 CTF、自建实验虚拟机、授权研究场景。**
- 本项目不引导对真实生产系统的未授权攻击；相关内容只做防御与研究视角的知识整理。
