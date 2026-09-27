# Sandbox Security 学习路线

> track: specialization ｜ 依赖：PWN Core（syscall/ROP）、Linux 基础

## 学习阶梯

```text
1. 沙箱架构        — 隔离模型：为什么 pwn 题常给一个"只能 open/read/write"的 shell
2. seccomp         — strict/filter(BPF) 模式、过滤规则阅读（seccomp-tools dump）
3. 工具链          — seccomp-tools：dump/disasm/asm/emu/audit
4. 过滤器分析      — 允许了哪些 syscall？orw(open-read-write) 型出口判断
5. 逃逸思路        — 过滤遗漏的 syscall（execveat/dma...）、vDSO、用户态实现的调用
6. namespace/cgroup — mount/pid/net/user namespace；容器隔离边界
7. chroot/container — chroot 逃逸经典；docker 默认能力与危险挂载
8. 实战            — sandbox escape 类 CTF 题（CTF Wiki 沙箱章含 python/shell/seccomp/docker 逃逸）
```

## 已验证入口资源

- **seccomp(2) man page**（man7.org，man-pages 6.19，2026-06 更新）——S30
- **seccomp-tools**（david942j，MIT）——S22
- **CTF Wiki 沙箱逃逸章**（python/shell/seccomp/namespace/chroot/docker）——S1

## 核心认知

沙箱题的本质是**读规则 → 找规则没挡住的出口**。先 `seccomp-tools dump` 再动手是标准流程。
