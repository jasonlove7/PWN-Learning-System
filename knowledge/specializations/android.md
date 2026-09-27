---
id: spec-android
title: Android Security（方向骨架）
description: Linux 之上的移动软件栈安全
importance: 3
difficulty: 5
track: specialization
type: concept
depth: skeleton
prerequisites:
  - spec-arm-aarch64
why_learn: |
  移动安全研究/企业安全岗的系统性方向；native 层方法论与 PWN Core 同源。
objectives:
  - 能按已打开的页把六层分开：架构、APK、ART、沙箱、SELinux、NDK/JNI、adb
  - 能说出沙箱页的原话范围：每个应用自己的 UID 和进程，由内核隔离
  - 能说出 SELinux 页只证实了一句版本：Android 5.x 及更高为 enforcing
  - 能拒绝把 Android 写成 CPU 架构，也能拒绝把没有原题页的 CTF 收进来
resources:
  - res-aosp-architecture
  - res-android-app-fundamentals
  - res-android-art
  - res-android-app-sandbox
  - res-android-selinux
  - res-android-ndk
  - res-android-adb
  - res-android-logcat
  - res-ctf-wiki
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "AOSP 架构文档 (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# Android（骨架）

> depth: skeleton。没有核对过的 Android CTF，不能当成完整模块。
> 只在模拟器、自己的测试 APK、公开 CTF 或授权环境里练习。这里不写利用步骤。

Android 是平台，不是 CPU。本方向不把 ARM32 或 AArch64 写进「Android 通常是某种架构」。

## 已经打开的页，按层分开

| 层 | 页 | 只取页面上的一句 |
|----|----|------------------|
| 架构 | Architecture overview | 层包括应用、框架、系统服务、ART、HAL、原生库与守护进程、内核。侧栏有 Binder 链接，正文没有 Binder 定义 |
| APK | Application fundamentals | APK 是带 .apk 后缀的归档，设备用它安装应用。有 The manifest file |
| 运行时 | Android runtime and Dalvik | ART 是托管运行时，并引入 AOT 编译 |
| 沙箱 | Application Sandbox | 每个应用自己的用户 ID 和进程，内核用来隔离应用和系统 |
| SELinux | Security-Enhanced Linux in Android | 对所有进程做强制访问控制，包括 root。Android 5.x 及更高全部是 enforcing |
| Native | Get started with the NDK | NDK 让你用 C/C++，通过 JNI 从 Java 调用。页上没有 CPU 架构 |
| 调试 | adb；logcat | adb 与设备通信。logcat 转储系统消息，包括应用的 Log |

CTF Wiki 首页有导航，Android 深页本轮没打开，不把「Android 章」写成已核对。

## 和传统 PWN 的关系

NDK 页只说明：Java 可以经 JNI 调用原生代码。原生库是 ELF 时，PWN Core 里的内存破坏方法才可能用得上。那是连接，不是把栈溢出或堆利用搬进这一页。

Binder 的 HIDL 页（Use binder IPC）打开过，讲的是驱动改动和 vndbinder，没有定义 Binder。不把它写成「Binder 是什么」的教材。

## 还没有

- JADX、apktool 的官方页（本轮没打开，不收）
- 任何 Android CTF 原题
- 利用步骤、sandbox escape、内核利用

旧骨架里的 Frida、seapp、四大组件细节没有本轮原文，不保留成已核对事实。

