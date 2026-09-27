# Advanced PWN 阶段路线（堆与高级利用）

> 定位：从"能做中等题"到"能做现代赛题的主力分水岭"。
> 顺序依据：冲突决策 #2（结构先行 + tcache 前置）与 #6（hook 劫持的版本语境），见 ROADMAP-RESEARCH.md §4。

## 阶段 A-1：堆的心智模型（2 周）

```text
adv-heap-overview → adv-heap-bins → adv-tcache
```
- 先建立 allocator 视角：程序 ↔ malloc/free ↔ arena/heap ↔ brk/mmap ↔ 内核。
- bins 体系一次学全（fastbin/small/large/unsorted/tcache 的组织与区别），避免"学一个技术补一个结构"。
- tcache 现代默认路径 + safe-linking 指针保护（glibc ≥2.32）——现代题的第一现场。
- 实践：how2heap 仓库按版本运行 `glibc_2.35/` 下的基础示例（tcache_poisoning 等）。

## 阶段 A-2：堆漏洞原语（2-3 周）

```text
adv-heap-overflow → adv-uaf-double-free
```
- 堆溢出 / off-by-null 是"破坏元数据"的入口；UAF/double free 是"重复占有"的入口。
- 实践：Nightmare §8-9（protostar_heap0/1/2、csaw19_popping_caps0/1、0ctf18_babyheap 系列）。

## 阶段 A-3：经典攻击面（3-4 周）

```text
adv-fastbin-attack → adv-unsorted-bin-attack → adv-largebin-attack → adv-unsafe-unlink
```
- 每个技术都标注 glibc 可用版本区间（依据 how2heap 的版本化组织）。
- unsafe unlink 与 unsorted bin attack 是理解"元数据即攻击面"的最好教材。

## 阶段 A-4：现代组合与高级出口（3-4 周+）

```text
adv-house-of → adv-heap-modern → adv-io-file
```
- house of 系列：按需选学（orange/einherjar/force/lore…），理解"构造假结构骗 allocator"的共性。
- 现代组合拳：tcache 投毒 + safe-linking 绕过 + 版本差异（hook 已死的替代出口：IO_FILE / exit 流程 / TLS 等）。
- IO_FILE/FSOP：glibc ≥2.34 时代的重要出口（large house / house of apple 家族语境）。

## 自测清单（Advanced 毕业标准）

- [ ] 能在纸上画出 malloc(0x18) 在 fastbin/tcache 命中与未命中时的完整路径
- [ ] 能解释 safe-linking 的保护原理与已知绕过条件
- [ ] 给一个 UAF 题，能列出 ≥2 种升级路径（tcache 投毒 / fastbin dup / unsorted 泄漏）
- [ ] 知道 `__malloc_hook` 为什么在 glibc ≥2.34 不可用，以及替代思路
- [ ] 能描述 FSOP 的基本思想（控制 FILE 结构 → 控制虚表/流程）

## 前瞻（进入 Specialization 前）

- 复盘 core-mitigations + adv-heap-modern：现代缓解（full RELRO/CET/seccomp 常见于内核与沙箱方向）在各 Specialization 的分布。
- ret2dlresolve（CTF Wiki 高级 ROP 章）作为选读收尾。
