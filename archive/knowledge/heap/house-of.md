---
id: adv-house-of
title: house of 系列总览
description: Malloc Maleficarum 以来的技术族谱：spirit/force/lore/einherjar/orange/…
importance: 3
difficulty: 5
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-unsafe-unlink
  - adv-unsorted-bin-attack
why_learn: |
  不必全会，但族谱要熟：看到题能想起"这类布局对应哪个 house"。每个 house 都是一个时代的 alloc 逻辑产物。
objectives:
  - 能区分 House of Spirit（伪造块再 free，见 Oreo）和 House of Force（改 top size，见 Cookbook）
  - 能指出 House of Orange 的 Nightmare 页是讲解：它写的是 2.26 之前，示例为 2.23，且没有赛事题
  - 能拒绝把 how2heap 的 house_of_*.c 当成 CTF 题
resources:
  - res-how2heap
  - res-ctf-wiki-heap-overview
  - res-nightmare
challenges:
  - ch-nightmare-hacklu14-oreo
  - ch-nightmare-bkp16-cookbook
writeups:
  - wu-nightmare-hacklu14-oreo
  - wu-nightmare-bkp16-cookbook
review:
  method: 族谱卡片复习（每个 house 一行）
  interval: 首次后 2 个月
sources:
  - "how2heap house_of_* 各版本示例存在性 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
version_dependent: true
verified_versions:
  - glibc: "latest"
    notes: how2heap README 将 house_of_lore、house_of_einherjar、house_of_spirit 等标成 latest。house_of_force 的 top size 检查版本本轮没有在 changelog 里看到，不写入。
  - glibc: "2.24"
    notes: Nightmare Boston Key Party 2016 Cookbook 页内打印 glibc 2.24，并在泄漏之后使用 House of Force。这是这一道题的库，不是 House of Force 的全部适用区间。
  - glibc: "2.23"
    notes: Nightmare House of Orange 讲解页写该布局用于 2.26 之前的 libc，示例 map 是 2.23。该页是讲解，不是 CTF，没有正式题。
  - glibc: "2.31 - 2.33"
    notes: how2heap README 把 house_of_io.c 标成 2.31 - 2.33。示例不是 CTF 题。
---

# house of 系列总览

> 名字源于 2004 年《Malloc Maleficarum》(blackngel 译介流传)。每个 "house" = 一种"让 allocator 按你的剧本走"的布局。

## 族谱速查（按教学价值选读）

| 技术 | 一句话原理 | 版本语境 |
|------|------------|----------|
| house of spirit | 伪造假 chunk 于已知地址（栈/bss），free 后回收 | 仍广泛适用（tcache 版更简单） |
| house of force | 改 top size 为 -1，用巨大请求把 top 搬到目标 | 2.29 起 top size 检查后死亡 |
| house of einherjar | off-by-null 清 PREV_INUSE → 与伪造 prev 合并 | 概念仍活（NULL 溢出链） |
| house of lore | 伪造 smallbin 双链欺骗分配 | 版本敏感 |
| house of orange | 不 free 也能把 top 送入 unsorted（sysmalloc 触发）→ FSOP 入口 | 经典教学案例 |
| house of rabbit / roman / storm / pig / water / tangerine… | 各时代组合与绕过 | how2heap 按版本可查 |

## 学习方法（重要）
1. **不要背 payload**：理解每个 house 利用的"分配器决策点"。
2. how2heap 对应版本目录下编译运行 + pwndbg 单步看指针变化。
3. CTF Wiki 堆章对应小节做中文对照。

## 版本地雷
- 每代 glibc 都埋掉一批 house 又催生一批（如 2.34 hooks 移除 → house of pig→apple 时代）。
- **先查版本，再选技术**（本仓库 heap-modern 汇总了时间线）。
