# Android Security 学习路线

> track: specialization ｜ 依赖：ARM/AArch64 方向（native 利用）+ Linux 基础

## 学习阶梯

```text
1. Android 架构     — App/Framework/系统服务/ART/HAL/内核 分层（AOSP 官方）
2. APK 与组件       — 四大组件、manifest、打包结构
3. ART 与 JNI       — dalvik 字节码、native 库、JNI 边界
4. native 层        — linker、属性、so 加载；ARM64 内存破坏利用（迁移 PWN Core 方法论）
5. Binder IPC       — binder 驱动、parcel、服务攻击面认知
6. 沙箱与权限       — UID 隔离、seapp、SELinux
7. 调试             — adb、logcat、IDA/gdb 调试 so、frida（hook）
8. 实战             — Android CTF（入 CTF Wiki Android 章）与公开研究
```

## 已验证入口资源

- **AOSP 官方架构文档**（source.android.com；分层模型 + Binder 独立章节）——S31
- **CTF Wiki Android 章**——S1
- （进阶书籍/课程待研究验证——诚实标注：v0.1 未验证到高置信的系统性 Android Pwn 课程，列入后续研究计划）

## 边界

- 仅限公开 CTF、自己的设备/模拟器、授权研究。
- 不得用于对他人设备/应用的未授权测试。
