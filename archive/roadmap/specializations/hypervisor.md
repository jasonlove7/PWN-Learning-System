# Hypervisor / Virtualization Security 学习路线

> track: specialization ｜ ⚠️ **v0.1 研究不足（诚实标注）**
> 依赖：Advanced（堆/结构体伪造能力）、系统架构理解

## 学习阶梯（骨架）

```text
1. 虚拟化模型      — Type-1/Type-2、trap-and-emulate、EPT/NPT 硬件辅助
2. 攻击面地图      — VM exit 入口、设备仿真代码（qemu 设备模型）
3. QEMU 架构       — 主循环/TB 缓存/QMP/设备总线模型（对照官方文档）
4. 虚拟设备漏洞    — mmio/pmio handler 的 OOB/UAF 模式（公开 CVE 学习）
5. 逃逸路径        — guest→host 内存破坏→host 代码执行的经典链
6. 实战            — 虚拟化类 CTF 题（hxp/Google CTF 等赛事历史题）、授权研究
```

## 已验证入口资源

- **QEMU 官方文档**（qemu.org/docs/master，v11.1；系统仿真/设备仿真/QMP）——S32
- **CTF Wiki 虚拟化章**（QEMU/VirtualBox/VMware/Parallels）——S1

## 研究不足声明（2026-09-27）

- 本方向 v0.1 仅有官方文档级入口来源；系统性教学资源（书籍/课程/题集）未验证，不冒充完整路线。
- 后续研究计划：kCTF 基础设施、公开 QEMU 逃逸 writeup 的验证与收录（ROADMAP-RESEARCH.md §8）。
- 仅限 CTF / 自建环境 / 授权研究。
