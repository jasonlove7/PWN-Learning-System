---
id: adv-heap-modern
title: 现代堆利用组合拳与版本差异
description: glibc 版本时间线、tcache 投毒标准流、hook 后时代的出口迁移
importance: 4
difficulty: 5
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-tcache
  - adv-uaf-double-free
  - adv-unsorted-bin-attack
why_learn: |
  "单点技术"到"现代题解法"的整合层：版本判断 → 原语组合 → 出口选择。
objectives:
  - 能按题面 libc 版本立刻划定可用技术集合
  - 能完成标准现代链：UAF/double-free → tcache poisoning(safe-linking) → 任意写 → 出口
  - 能说出 hook 移除后三类主流出口（IO_FILE/exit 链/TLS 类）
resources:
  - res-how2heap
  - res-ctf-wiki-heap-overview
challenges: []
planned_challenges:
  - id: ch-how2heap-lab
    name: how2heap lab
    platform: how2heap
    status: planned
    note: 资源 id 是 res-how2heap。仓库是按 glibc 版本组织的示例集，不是一道可收录的 challenge。
hints: []
writeups: []
review:
  method: 复述版本时间线 + 每个"断代事件"的替代技术
  interval: 持续更新认知
sources:
  - "how2heap 2.23-2.43 版本化组织 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# 现代堆利用组合拳

## 版本断代时间线（核心记忆结构）
```text
2.23  —— 无 tcache；fastbin/unlink/unsorted 全盛；hook 劫持时代
2.26  tcache 引入        → tcache poisoning 上位
2.29  tcache key 检查    → naive double-free 死
2.32  safe-linking       → 堆泄漏成为前置必需
2.34  hooks 移除          → 出口迁移 IO_FILE/exit 链
2.35+ tcache 检查细化     → 组合技常态（stash/unlink 变体复兴）
```

## 现代标准链（模板）
```text
入口原语: UAF / off-by-null / double-free / 堆溢出
   ↓
信息层:   heap 泄漏（tcache 结构/unsorted fd 密文反推）+ libc 泄漏（unsorted fd）
   ↓
控制层:   tcache poisoning (safe-linking 手算) 或 fastbin 变体 → 任意地址分配
   ↓
出口层:   按版本选择（见下表）
```

## 出口层选单（hook 后时代）
| 出口 | 版本 | 思路 |
|------|------|------|
| \_\_malloc/\_\_free_hook | ≤2.33 | 单点写 one_gadget（历史题） |
| IO_FILE / FSOP | 全版本活跃 | 控制 \_IO_list_all 或 stdout 结构 → 触发 flush 链 |
| exit/\_\_run_exit_handlers | 活跃 | 改 exit 时调用的函数指针 |
| TLS/dtor_list 等 | 版本敏感 | 研究前沿区（CTF Wiki/how2heap 跟进） |

## 学习纪律
- 每学一个"新技巧"，先问三个问题：哪个版本引入？哪个版本封掉？封掉后的替代是什么？
- 组合训练：how2heap 同一目录下横比 2.27/2.31/2.35 的同名示例。
