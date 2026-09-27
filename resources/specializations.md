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
verification_method: 访问仓库（6.6k stars、CC-BY-4.0、"双月更新"、2026 年条目在列）
license: CC-BY-4.0
summary: 内核利用资源权威索引：书籍/论文/技巧/漏洞(writeup)/工具/练习场。
why_useful: Linux Kernel 方向的总入口
related_knowledge: [spec-linux-kernel]
maintenance_status: active
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
