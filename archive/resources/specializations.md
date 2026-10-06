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
notes: 页面没有单独摘出 SPDX，license 写 unknown。版本号会随文档站移动。architecture 未在该页限定为 x86_64。
---
id: res-kernel-mm-api
title: Memory Management APIs（The Slab Cache）
author: Linux kernel documentation project
source: https://docs.kernel.org/core-api/mm-api.html
url: https://docs.kernel.org/core-api/mm-api.html
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。文档版本 7.3.0-rc4。标题 Memory Management APIs。有 The Slab Cache 一节。kmalloc 的一句说明是：小于页大小的对象，通常用 kmalloc。同节能看到 kmalloc 与 kfree。没有单独的 SLUB 标题。
license: unknown
summary: 内核内存管理 API 索引。用来确认 kmalloc 是小对象的常规分配方式，以及文档把这块叫做 Slab Cache。不是 SLUB 内部结构，也不是利用教程。
why_useful: 把「内核堆」从用户态 malloc 分开的官方一句
related_knowledge: [spec-linux-kernel]
maintenance_status: active
notes: 文档版本 7.3.0-rc4 会变。没有写 SLUB 与 SLAB 的区别，不要补。
---
id: res-kernel-kgdb
title: Using kgdb, kdb and the kernel debugger internals
author: Linux kernel documentation project
source: https://docs.kernel.org/process/debugging/kgdb.html
url: https://docs.kernel.org/process/debugging/kgdb.html
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。文档版本 7.3.0-rc4。标题如上。kgdb 被写成用 gdb 做内核源码级调试。可见启动参数名包括 kgdboc、kgdbwait、nokaslr。
license: unknown
summary: 官方的 kgdb/kdb 说明：第二台机器上的 gdb、如何让内核停住。nokaslr 出现在启动参数列表里，但本页没有定义 KASLR。
why_useful: 内核调试入口。QEMU 怎么串起来，这一页没有写。
related_knowledge: [spec-linux-kernel]
maintenance_status: active
notes: 猜过的 gdb-kernel-debugging.html 是 404，不要用那条 URL。
---
id: res-kernel-parameters
title: The kernel’s command-line parameters
author: Linux kernel documentation project
source: https://docs.kernel.org/admin-guide/kernel-parameters.html
url: https://docs.kernel.org/admin-guide/kernel-parameters.html
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页并检索参数名。nokaslr 写明在 CONFIG_RANDOMIZE_BASE 打开时，关掉内核和模块基址的 ASLR。nosmep/nosmap 的架构标记是 PPC/PPC64s，不是 x86。pti= 标记为 X86-64，说明用户与内核页表隔离，关掉会去掉加固。nopti 在 X86-64 上等价于 pti=off。
license: unknown
summary: 内核命令行参数表。只摘了本轮读到的 nokaslr、nosmep、nosmap、pti、nopti。没有从这页推出「某版本默认开启」。
why_useful: 缓解机制只写参数表里有的那几句
related_knowledge: [spec-linux-kernel]
maintenance_status: active
notes: hw-vuln 索引页没有 KASLR/SMEP/SMAP/KPTI 这四个词，不要把那一页当成这四项的定义。
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
id: res-windows-wdm-intro
title: Introduction to WDM
author: Microsoft
source: https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-wdm
url: https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-wdm
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开 Microsoft Learn 该页。标题 Introduction to WDM。页首写明 WDM 不再是推荐模型，新驱动应先看 Choosing a driver model，并建议考虑 KMDF。正文定义 WDM 为跨 Windows 的源码兼容驱动模型，遵循其规则的内核态驱动称为 WDM drivers。
license: unknown
summary: 驱动模型入门，不是漏洞页。WDM 是旧模型；微软在这篇里把 KMDF 写成更简单的接口。
why_useful: 把「写驱动」和「内核利用」分开的第一页
related_knowledge: [spec-windows-kernel]
maintenance_status: active
notes: 不要把 WDM 写成当前唯一或推荐模型。
---
id: res-windows-ioctl-intro
title: Introduction to I/O Control Codes
author: Microsoft
source: https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-i-o-control-codes
url: https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/introduction-to-i-o-control-codes
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。标题 Introduction to I/O Control Codes。IOCTL 用于用户态程序与驱动通信，或驱动栈内部通信，通过 IRP 发送。用户态用 DeviceIoControl，I/O 管理器创建 IRP_MJ_DEVICE_CONTROL。
license: unknown
summary: IOCTL 是用户态和驱动之间的一种通信码，走 IRP。这是攻击面从哪来的官方定义，不是利用步骤。
why_useful: 驱动通信入口。不代替漏洞教程
related_knowledge: [spec-windows-kernel]
maintenance_status: active
---
id: res-windows-windbg-install
title: Install WinDbg
author: Microsoft
source: https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/
url: https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。标题 Install WinDbg。WinDbg 被写成可以分析崩溃转储、调试实时的用户态和内核态代码，并检查 CPU 寄存器和内存。支持的处理器架构写的是 x64 和 ARM64。内核调试入门指向 Echo Kernel-Mode 实验。
license: unknown
summary: WinDbg 的安装页，同时定义了它能调试用户态和内核态。架构是 x64 与 ARM64，不是「Windows」。
why_useful: 内核调试工具入口
related_knowledge: [spec-windows-kernel]
maintenance_status: active
notes: 猜过的 getting-started-with-windbg-kernel-mode 与 setting-up-kernel-mode-debugging 两条 URL 是 404。
---
id: res-windows-echo-kmdf-lab
title: Debug Windows Drivers Step-By-Step Lab (Echo Kernel Mode)
author: Microsoft
source: https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/debug-universal-drivers---step-by-step-lab--echo-kernel-mode-
url: https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/debug-universal-drivers---step-by-step-lab--echo-kernel-mode-
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。标题 Debug Windows Drivers Step-By-Step Lab (Echo Kernel Mode)。描述写明用 WinDbg 调试 echo 内核态示例驱动。实验要求两台 Windows 11 机器、WDK，并下载构建 KMDF echo 驱动。这是调试实验，不是有漏洞的 CTF。
license: unknown
summary: 官方实验：用 WinDbg 调试微软的 KMDF Echo 示例驱动。用来学内核调试流程，不收录为 challenge。
why_useful: 有步骤的内核调试练习，仍然不是 Kernel PWN 题
related_knowledge: [spec-windows-kernel]
maintenance_status: active
notes: 实验写明主机和目标都是 Windows 11。不要把它标成 x86 或 AArch64，页面没有写目标 CPU。
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
summary: Android 软件栈官方分层文档。页上写出的层包括应用、框架、系统服务、ART、HAL、原生守护进程与库、内核。侧栏有 Binder IPC 链接，正文没有 Binder 的定义句。
why_useful: Android 方向的架构入口。不是利用教程，也不是 CPU 架构说明
related_knowledge: [spec-android]
maintenance_status: active
notes: 2026-09-27 再次打开。不要把侧栏链接写成「Binder 专章已核对」。
---
id: res-android-app-sandbox
title: Application Sandbox
author: Android Open Source Project
source: https://source.android.com/docs/security/app-sandbox
url: https://source.android.com/docs/security/app-sandbox
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开 AOSP 该页。标题 Application Sandbox。正文写每个应用有自己的用户 ID 和进程，以便内核对应用之间、以及应用与系统之间做隔离。
license: unknown
summary: 官方的应用沙箱说明：一应用一 UID、一进程，隔离由内核来做。没有写某个 Android 版本的默认开关。
why_useful: 安全模型和 Linux UID 的连接点
related_knowledge: [spec-android]
maintenance_status: active
---
id: res-android-selinux
title: Security-Enhanced Linux in Android
author: Android Open Source Project
source: https://source.android.com/docs/security/features/selinux
url: https://source.android.com/docs/security/features/selinux
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开 AOSP 该页。标题 Security-Enhanced Linux in Android。SELinux 对所有进程做强制访问控制，包括 root。页内写 Android 5.x 及更高版本全部处于 enforcing mode。
license: unknown
summary: Android 上的 SELinux 是强制访问控制。enforcing 这句话带了版本：5.x 及更高。没有写策略怎么绕。
why_useful: 沙箱之上的另一层强制边界
related_knowledge: [spec-android]
maintenance_status: active
notes: 版本句只限于页面上的「5.x and higher / enforcing」。不要外推更细的版本。
---
id: res-android-adb
title: Android Debug Bridge (adb)
author: Android Developers
source: https://developer.android.com/tools/adb
url: https://developer.android.com/tools/adb
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开 developer.android.com 该页。标题 Android Debug Bridge (adb)。adb 被写成与设备通信的命令行工具。
license: unknown
summary: 官方 adb 说明：从电脑和设备或模拟器通信。用来调试和安装，不是攻击工具教程。
why_useful: 调试入口
related_knowledge: [spec-android]
maintenance_status: active
---
id: res-android-logcat
title: Logcat command-line tool
author: Android Developers
source: https://developer.android.com/tools/logcat
url: https://developer.android.com/tools/logcat
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。标题 Logcat command-line tool。logcat 转储系统消息，包括应用用 Log 类打出的消息。
license: unknown
summary: 看设备日志的官方命令行工具。
why_useful: 和 adb 分开的调试工具
related_knowledge: [spec-android]
maintenance_status: active
---
id: res-android-app-fundamentals
title: Application fundamentals
author: Android Developers
source: https://developer.android.com/guide/components/fundamentals
url: https://developer.android.com/guide/components/fundamentals
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。标题 Application fundamentals。APK 被写成带 .apk 后缀的归档，装着运行时需要的内容，设备用它来安装应用。可见标题 The manifest file。
license: unknown
summary: 应用基础：APK 是安装用的归档。清单文件有单独标题。没有把 DEX 结构讲完。
why_useful: APK 的官方定义，不是逆向教程
related_knowledge: [spec-android]
maintenance_status: active
---
id: res-android-ndk
title: Get started with the NDK
author: Android Developers
source: https://developer.android.com/ndk/guides
url: https://developer.android.com/ndk/guides
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开该页。标题 Get started with the NDK。NDK 是一套工具，让你在 Android 上用 C 和 C++，并通过 JNI 从 Java 调用这些原生代码。
license: unknown
summary: NDK 与 JNI 的官方入口。它把 Java 和原生 ELF 连起来，但不是内存破坏教程。
why_useful: Android Native 和传统 PWN 的分界说明
related_knowledge: [spec-android]
maintenance_status: active
notes: 不写「Android 手机通常是 ARM64」。本页没有 CPU 架构。
---
id: res-android-art
title: Android runtime and Dalvik
author: Android Open Source Project
source: https://source.android.com/docs/core/runtime
url: https://source.android.com/docs/core/runtime
source_type: official-docs
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 打开 AOSP 该页。标题 Android runtime and Dalvik。ART 是应用和部分系统服务的托管运行时。页内写 ART 引入 ahead-of-time (AOT) 编译。
license: unknown
summary: ART 的官方说明，并提到 AOT。不是 DEX 字节码手册。
why_useful: 把「应用代码怎么跑」和 native .so 分开
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
notes: 仓库内许可文件本轮未逐份打开，写 unknown。architecture_scope 只有 AArch64。不要把它当成 ARM32 调用约定，也不要把它当成利用教程。
architecture_scope:
  - AArch64
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
