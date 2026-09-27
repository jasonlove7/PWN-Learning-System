---
id: spec-browser
title: Browser Security（方向骨架）
description: JS 引擎内存破坏与渲染器沙箱
importance: 3
difficulty: 5
track: specialization
type: concept
depth: skeleton
prerequisites:
  - adv-heap-modern
why_learn: |
  高价值研究前沿；但 v0.1 研究深度不足，本骨架标注诚实边界。
objectives:
  - 完成 roadmap/specializations/browser.md 的骨架阶梯
resources:
  - res-v8-dev
  - res-ctf-wiki
challenges: []
hints: []
writeups: []
review:
  method: 按阶梯自评
  interval: 每级一评
sources:
  - "v8.dev (verified 2026-09-27)"
verification_status: partial-verified
last_verified: 2026-09-27
---

# Browser Security（骨架）

> ⚠️ **v0.1 研究不足**：经典系统性资料（如 saelo 论文）本轮访问验证失败，未进入正式推荐；见 research/unverified/。

## 知识点骨架

```text
spec-browser-arch      多进程模型（browser/renderer/GPU）、进程边界
spec-browser-js        对象/属性表示（hidden class、tagged value）
spec-browser-jit       分层编译（Ignition/TurboFan 级联）与去优化
spec-browser-bugs      OOB/UAF/类型混淆在引擎对象上的形态
spec-browser-primitive addrof/fakeobj 等经典原语思想
spec-browser-sandbox   renderer 沙箱、Mojo IPC、站点隔离
spec-browser-ctf       公开浏览器 CTF 题与 CVE 复现研究
```

## 已验证入口
- v8.dev（官方文档+博客）
- CTF Wiki 浏览器章（Chrome/V8、Firefox、Safari）

## v0.2 研究计划
saelo 论文等经典 URL 补验 → chrome pwn 题目集（Google CTF 历史题）验证 → 扩为 standard 深度。
