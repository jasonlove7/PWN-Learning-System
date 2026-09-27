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
  - 完成 roadmap/specializations/android.md 的 8 级阶梯
resources:
  - res-aosp-architecture
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

# Android Security（骨架）

## 知识点骨架

```text
spec-android-arch      分层：App/Framework/系统服务/ART/HAL/内核
spec-android-apk       APK 结构、manifest、四大组件
spec-android-art       ART 运行时、dex、JIT/AOT
spec-android-jni       JNI 边界、native 库加载（system.loadLibrary）
spec-android-native    linker/属性/so；ARM64 漏洞利用（迁移 PWN Core）
spec-android-binder    Binder IPC/parcel/服务攻击面认知
spec-android-sandbox   UID 隔离/seapp/SELinux/权限模型
spec-android-debug     adb/logcat/IDA+gdb 调试 so/frida hook
```

## 已验证入口
- AOSP 官方架构文档（分层模型 + Binder 专章）
- CTF Wiki Android 章

## 研究边界（诚实）
系统性 Android Pwn 课程/题集在 v0.1 未验证到高置信来源——列入后续研究，不冒充。

## 纪律
仅限公开 CTF、自有设备/模拟器、授权研究。
