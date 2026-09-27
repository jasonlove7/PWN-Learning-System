# Specialization 方向入口资源

```yaml
id: res-xairy-kernel
title: linux-kernel-exploitation（链接合集）
author: Andrey Konovalov (xairy)
source: https://github.com/xairy/linux-kernel-exploitation
url: https://github.com/xairy/linux-kernel-exploitation
source_type: repo
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 2026-09-27 再次打开 README。页面自述为链接集（不是课程）。可见分区含 Trainings、Contents、Books、Techniques、Vulnerabilities，目录还列 Finding Bugs、Defensive、Exploits、Tools、Practice、Misc。许可 CC-BY-4.0。更新说明指向 @andreyknvl，并写 Updated bimonthly。早先记录的 star 数本次不沿用。
license: CC-BY-4.0
summary: 内核安全与利用的链接集：书籍、技巧、漏洞资料、工具和练习入口。不是一门按章节讲完的课。
why_useful: Linux Kernel 方向的总入口
related_knowledge: [spec-linux-kernel]
maintenance_status: active
---
id: res-kernel-memory-allocation
title: Memory Allocation Guide（Linux kernel docs）
author: Linux kernel documentation project
source: https://docs.kernel.org/core-api/memory-allocation.html
url: https://docs.kernel.org/core-api/memory-allocation.html
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。文档版本显示 7.3.0-rc4。标题 Memory Allocation Guide。在 Core API 下，讲的是分配器选择与 GFP，不是漏洞利用。
license: unknown
summary: 内核里怎么申请内存的官方说明。用来建立「用户态 malloc 底下还有另一套分配器」的概念，不能代替利用教程。
why_useful: spec-linux-kernel 阶梯第 1 级（内核内存）的官方入口
related_knowledge: [spec-linux-kernel]
maintenance_status: active
notes: 页面没有单独摘出 SPDX，license 写 unknown。版本号会随文档站移动。
---
id: res-windows-driver-getting-started
title: Get Started with Drivers on Windows
author: Microsoft
source: https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/
url: https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开 Microsoft Learn 该页。标题 Get Started with Drivers on Windows。正文要求读者已会 C 和函数指针。这是驱动入门，不是内核漏洞教程。
license: unknown
summary: Windows 驱动文档的入口：驱动是什么、有哪些类型、从哪里开始写。配合 Windows Internals 看架构，不替代实验手册。
why_useful: spec-windows-kernel 阶梯里「驱动与 IRP」之前的官方入口
related_knowledge: [spec-windows-kernel]
maintenance_status: active
notes: 页面未摘出单独 license 名称。不要把这篇当成漏洞研究材料。
---
id: res-man7-seccomp
title: seccomp(2) manual page
author: man-pages 项目（Michael Kerrisk 维护）
source: https://man7.org/linux/man-pages/man2/seccomp.2.html
url: https://man7.org/linux/man-pages/man2/seccomp.2.html
source_type: official-docs
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问页面（man-pages 6.19，2026-06-05）
license: man-pages 项目许可（GPL 兼容分发惯例，页脚有声明）
summary: seccomp 权威文档：strict/filter 模式、RET 行为、坑（allowlist 优于 denylist 等）。
why_useful: Sandbox 方向的规范依据
related_knowledge: [spec-sandbox]
maintenance_status: active
---
id: res-aosp-architecture
title: AOSP Architecture overview
author: Google（Android Open Source Project 文档）
source: https://source.android.com/docs/core/architecture
url: https://source.android.com/docs/core/architecture
source_type: official-docs
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问页面（分层模型、Binder 导航专章确认）
license: CC-BY（AOSP 文档惯例，以站点声明为准）
summary: Android 软件栈官方分层文档（App/Framework/ART/HAL/内核）。
why_useful: Android 方向地基
related_knowledge: [spec-android]
maintenance_status: active
---
id: res-qemu-docs
title: QEMU official documentation
author: The QEMU Project Developers
source: https://www.qemu.org/docs/master/
url: https://www.qemu.org/docs/master/
source_type: official-docs
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问文档站（v11.1.50、系统仿真/设备仿真/QMP 目录）
license: GPL-2.0（文档随项目）
summary: QEMU 官方文档：系统仿真/设备仿真/QMP/客户机硬件规范。
why_useful: Hypervisor 方向的地基本文档
related_knowledge: [spec-hypervisor]
maintenance_status: active
---
id: res-v8-dev
title: V8 official site
author: Google（V8 团队）
source: https://v8.dev/
url: https://v8.dev/
source_type: official-docs
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问站点（定位、docs/blog 结构）
license: 代码 BSD；内容 CC-BY-3.0（站点标注）
summary: V8 引擎官方站（文档+引擎 internals 博客）。
why_useful: Browser 方向已验证入口
related_knowledge: [spec-browser]
maintenance_status: active
---
id: res-aapcs64
title: Procedure Call Standard for the Arm 64-bit Architecture (AArch64)
author: Arm
source: https://github.com/ARM-software/abi-aa/blob/main/aapcs64/aapcs64.rst
url: https://github.com/ARM-software/abi-aa/blob/main/aapcs64/aapcs64.rst
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开 ARM-software/abi-aa 中的 aapcs64.rst。标题写明 AArch64。可见章节含 Machine Registers、General-purpose Registers、The Stack、Parameter passing。这是调用约定，不是利用教程。
license: 仓库内许可文件本轮未逐份打开，写 unknown
summary: AArch64 的官方过程调用标准：64 位寄存器、栈、参数如何传递。不能拿来代替 ARM32 的 Azeria 教程，也没有 ROP 内容。
why_useful: 把 AArch64 调用约定和 ARM32 分开的第一份官方文本
related_knowledge: [spec-arm-aarch64]
maintenance_status: active
notes: PAC 在同一索引里有单独文档 pauthabielf64.rst，本轮只确认链接存在，没有打开正文，故不另建资源。BTI 在该索引页没有单独文档链接。
---
id: res-azeria-arm
title: Azeria Labs — Writing ARM Assembly (Part 1~7)
author: Azeria Labs
source: https://azeria-labs.com/writing-arm-assembly-part-1/
url: https://azeria-labs.com/writing-arm-assembly-part-1/
source_type: article
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 见 books.md 同源条目（同一验证访问）
license: unknown
summary: ARM 汇编系列（对照 IoT/Android 方向的多架构基础）。
why_useful: ARM/IoT/Android 三方向共用入门
related_knowledge: [spec-arm-aarch64, spec-iot, spec-android]
maintenance_status: active
---
id: res-kanxue
id_note: 见 chinese.md
---
id: res-binwalk
id_note: 见 tools.md
---
id: res-windows-internals
id_note: 见 books.md
```

> Specialization 的中文入口统一复用 res-ctf-wiki（其内核/Windows/沙箱/虚拟化/浏览器章节均已在首页导航验证存在）。
