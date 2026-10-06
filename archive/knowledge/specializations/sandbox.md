---
id: spec-sandbox
title: Sandbox Security（方向骨架）
description: seccomp/namespace/容器隔离与逃逸
importance: 4
difficulty: 4
track: specialization
type: concept
depth: skeleton
prerequisites:
  - core-ret2syscall
  - fnd-linux-syscalls
why_learn: |
  现代赛题高频配菜（pwn+seccomp）；云原生安全的底座。
objectives:
  - 完成 roadmap/specializations/sandbox.md 的 8 级阶梯
resources:
  - res-man7-seccomp
  - res-seccomp-tools
  - res-ctf-wiki
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "seccomp(2) man page (verified 2026-09-27)"
  - "seccomp-tools (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# Sandbox Security（骨架）

## 知识点骨架

```text
spec-sandbox-model     隔离模型与"pwn 题送 seccomp shell"的出题语境
spec-sandbox-seccomp   strict/filter(BPF)、SECCOMP_RET_* 行为
spec-sandbox-tools     seccomp-tools dump/disasm/emu/audit 工作流
spec-sandbox-analysis  读过滤器→判断 orw/execveat/绕过面
spec-sandbox-escape    过滤遗漏 syscall、vDSO、用户态实现路径
spec-sandbox-ns        mount/pid/net/user namespace、capabilities
spec-sandbox-container chroot 逃逸/挂载与能力配置错误
spec-sandbox-ctf       沙箱逃逸题训练（CTF Wiki: python/shell/seccomp/docker 章）
```

## 已验证入口
- seccomp(2) man 页（权威：strict/filter/RET 行为/坑）
- seccomp-tools（dump→disasm 标准流）
- CTF Wiki 沙箱逃逸章（python/shell/seccomp/namespace/chroot/docker）

## 核心心法
沙箱题 = **读规则**（dump）→ **找没挡住的出口**（orw? execveat? 用户态调用?）。
