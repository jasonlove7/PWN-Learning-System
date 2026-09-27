---
id: spec-iot
title: IoT Security（方向骨架）
description: 固件分析到嵌入式漏洞利用
importance: 3
difficulty: 4
track: specialization
type: concept
depth: skeleton
prerequisites:
  - spec-arm-aarch64
why_learn: |
  真实世界漏洞存量大户；技术栈 = 逆向 + 多架构利用 + 环境仿真。
objectives:
  - 完成 roadmap/specializations/iot.md 的 8 级阶梯
resources:
  - res-binwalk
  - res-azeria-arm
  - res-ctf-wiki
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "binwalk v3 (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# IoT Security（骨架）

## 知识点骨架

```text
spec-iot-embedded     交叉编译/busybox/固件启动流程
spec-iot-arch         ARM/MIPS 辨认（file/readelf）
spec-iot-firmware     固件获取/binwalk 解包/文件系统挂载
spec-iot-analysis     服务定位（httpd/upnp/telnetd 历史重灾区）
spec-iot-emulation    qemu user/system 仿真、全系统仿真框架（待验证）
spec-iot-debug        qemu+gdb、UART 接入门
spec-iot-exploit      无 ASLR/旧 libc 环境的栈溢出/命令注入
spec-iot-ctf          IoT 类 CTF 与公开授权研究案例
```

## 已验证入口
- binwalk v3（Rust 重写版，ReFirmLabs）
- Azeria ARM 系列（多架构基础）
- CTF Wiki（架构章节）

## 纪律
公开固件样本、自购设备、授权项目。真实 IoT 环境常无 ASLR——但"能打"不等于"可以打"。
