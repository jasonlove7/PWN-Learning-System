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
version_dependent: true
verified_versions:
  - glibc: "2.26"
    notes: 同 adv-tcache。tcache 引入写在 how2heap glibc_ChangeLog.md。
  - glibc: ">= 2.32"
    notes: 同 adv-tcache。safe-linking 示例的 README 版本格是 >= 2.32。
  - glibc: "< 2.42"
    notes: how2heap README 把 large_bin_attack.c 标成 < 2.42，并链了一条 patch。
  - glibc: "2.26 - 2.42"
    notes: how2heap README 把 fastbin_reverse_into_tcache.c 标成 2.26 - 2.42。
practice_status: no_verified_challenge
---

# 现代堆利用组合拳

## 版本（只写 how2heap 页面上的格子）

```text
2.26   tcache 引入（glibc_ChangeLog.md；Ubuntu 构建自 2.27 启用）
>2.25  tcache_poisoning / tcache_house_of_spirit / house_of_botcake 的 README 版本格
>=2.32 decrypt_safe_linking、safe_link_double_protect 的 README 版本格
       tcache_poisoning 注明 2.32 及之后需要 heap leak
<2.42  large_bin_attack 的 README 版本格
2.26-2.42  fastbin_reverse_into_tcache 的 README 版本格
```

2.29 的 tcache key、2.34 移除 `__malloc_hook` / `__free_hook`，这次打开的 how2heap changelog（只写到 2.27）和 README（没有 hook 字样）都没有写。下面的出口表里如果出现这些说法，视为旧笔记，不是本轮核对结果。不要把「现代 glibc 仍能用 hook」或「所有版本都能用某条旧原语」当成事实。

## 现代标准链（模板，版本见上表）
```text
入口原语: UAF / off-by-null / double-free / 堆溢出
   ↓
信息层:   heap 泄漏（tcache 结构/unsorted fd 密文反推）+ libc 泄漏（unsorted fd）
   ↓
控制层:   tcache poisoning (safe-linking 手算) 或 fastbin 变体 → 任意地址分配
   ↓
出口层:   按版本选择（见下表）
```

## 出口层（未在本轮 how2heap 文本里核对 hook 移除点）

旧笔记把 `__malloc_hook` / `__free_hook` 写成 ≤2.33 可用、2.34 移除。本轮 README 与 changelog 没有这句话，所以这里不重复成已核对事实。IO_FILE 仍见 `adv-io-file` 与 how2heap 的 `house_of_io.c`（README 版本格 2.31–2.33，文件在 `glibc_2.31/` 与 `glibc_2.32/`，不在 `glibc_2.34/` 的文件名列表里）。

## 学习纪律
- 每学一个"新技巧"，先问三个问题：哪个版本引入？哪个版本封掉？封掉后的替代是什么？
- 组合训练：how2heap 同一目录下横比 2.27/2.31/2.35 的同名示例。
