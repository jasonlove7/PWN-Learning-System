# Specializations 路线（8 方向）

> 定位：**非必修**。完成 PWN Core（建议含 Advanced A-1/A-2）后按目标选择。
> 共同纪律：所有内核/系统向方向仅限 **CTF / Lab / 授权安全研究** 场景。

| 方向 | 文件 | 一句话定位 | 已验证入口来源 |
|------|------|------------|----------------|
| Linux Kernel | [linux-kernel.md](linux-kernel.md) | 从用户态跨到内核态的利用 | xairy 合集、CTF Wiki 内核章、pwn.college |
| Windows Kernel | [windows-kernel.md](windows-kernel.md) | Windows 内核机制与攻击面认知 | Windows Internals 7th、CTF Wiki |
| ARM / AArch64 | [arm-aarch64.md](arm-aarch64.md) | 非 x86 架构的迁移利用 | Azeria 系列、ROP Emporium ARM、CTF Wiki |
| Android | [android.md](android.md) | Linux 之上的移动栈（ART/Binder/JNI） | AOSP 官方文档、CTF Wiki |
| IoT | [iot.md](iot.md) | 固件获取→分析→漏洞利用 | binwalk、Azeria、CTF Wiki |
| Browser | [browser.md](browser.md) | JS 引擎内存破坏与沙箱 | V8 官方、CTF Wiki（⚠️研究不足） |
| Sandbox | [sandbox.md](sandbox.md) | seccomp/namespace/容器逃逸 | seccomp(2) man、seccomp-tools、CTF Wiki |
| Hypervisor | [hypervisor.md](hypervisor.md) | 虚拟设备与仿真层攻击面 | QEMU 官方文档、CTF Wiki（⚠️研究不足） |

## 选择建议

- 想打 CTF 国际赛主力位 → Linux Kernel、Sandbox
- 想做终端/嵌入式安全 → ARM、IoT、Android
- 想做系统安全研究 → Windows Kernel、Hypervisor、Browser
- 各方向**互相独立**，但都假设 PWN Core 已达标。

## 研究透明度声明

v0.1 中 Browser 与 Hypervisor 两个方向为**入口级骨架 + 明确的"研究不足"标注**（见 ROADMAP-RESEARCH.md §6）。这是有意的诚实取舍：宁可标记不足，不用低置信内容冒充完整路线。
