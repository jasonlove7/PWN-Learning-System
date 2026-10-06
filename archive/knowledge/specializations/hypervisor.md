---
id: spec-hypervisor
title: Hypervisor / Virtualization Security（方向骨架）
description: 虚拟设备仿真层攻击面与 guest→host 路径
importance: 3
difficulty: 5
track: specialization
type: concept
depth: skeleton
prerequisites:
  - adv-heap-modern
why_learn: |
  云与桌面的底层边界；v0.1 研究深度不足，本骨架标注诚实边界。
objectives:
  - 完成 roadmap/specializations/hypervisor.md 的骨架阶梯
resources:
  - res-qemu-docs
  - res-ctf-wiki
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "QEMU 官方文档 v11.x (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# Hypervisor / Virtualization Security（骨架）

> ⚠️ **v0.1 研究不足**：仅官方文档级入口；系统性课程/题集未验证，不冒充完整路线。

## 知识点骨架

```text
spec-hyp-model        Type-1/2、trap-and-emulate、EPT/NPT
spec-hyp-surface      VM exit 入口、设备仿真代码（QEMU 设备模型）
spec-hyp-qemu         主循环/TB 缓存/QMP/设备总线（对照官方文档）
spec-hyp-devbugs      mmio/pmio handler 的 OOB/UAF 模式（公开 CVE 学习）
spec-hyp-escape       guest→host 内存破坏→host 执行的经典链
spec-hyp-ctf          虚拟化 CTF 题（hxp/Google CTF 历史题，待验证）
```

## 已验证入口
- QEMU 官方文档（系统仿真/设备仿真/QMP/客户机规范）
- CTF Wiki 虚拟化章（QEMU/VBox/VMware/Parallels）

## v0.2 研究计划
kCTF 基础设施与公开 QEMU 逃逸 writeup 的验证收录；题型清单建立。

## 纪律
自建 hypervisor 环境 / 公开 CTF / 授权研究。
