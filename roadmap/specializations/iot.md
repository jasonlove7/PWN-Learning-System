# IoT Security 学习路线

> track: specialization ｜ 依赖：ARM/AArch64 或 MIPS 基础 + Linux 基础

## 学习阶梯

```text
1. 嵌入式 Linux     — 交叉编译、busybox、固件启动流程
2. 架构识别         — ARM/MIPS/PowerPC 辨认（file/readelf）
3. 固件获取与解包   — 官方固件下载、binwalk 识别与提取、文件系统挂载
4. 静态分析         — 服务与二进制定位（httpd/telnetd/upnp 等历史重灾区）
5. 仿真运行         — qemu user/system 模拟、firmware 仿真框架（后续验证）
6. 动态调试         — qemu + gdb、UART 串口接入门
7. 漏洞利用         — 栈溢出/命令注入在嵌入式的形态；无 ASLR/旧 libc 的现实
8. 实战             — IoT CTF 题、公开授权研究案例（CTF Wiki 硬件章）
```

## 已验证入口资源

- **binwalk v3**（ReFirmLabs，14.4k★，MIT；固件识别/提取/熵分析）——S23
- **Azeria Labs ARM 系列**（嵌入式架构基础）——S35
- **CTF Wiki**（相关架构章节）——S1

## 现实提示

真实 IoT 目标环境常见：旧内核、无 ASLR、busybox 精简 shell、watchdog 重启。练习一律使用**公开固件样本、自购设备、授权项目**。
