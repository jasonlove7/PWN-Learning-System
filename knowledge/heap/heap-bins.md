---
id: adv-heap-bins
title: bins 体系——fastbin / small / large / unsorted
description: 空闲块的组织方式、大小边界、LIFO/FIFO 行为与 coalesce 规则
importance: 5
difficulty: 4
track: mainline
type: concept
depth: standard
prerequisites:
  - adv-heap-overview
why_learn: |
  每个堆攻击技术都寄生在一条 bin 的管理逻辑漏洞上。bin 是堆的"地图图例"。
objectives:
  - 能填出各 bin 的大小范围与组织方式速查表
  - 能追踪一次 free 后 chunk 在 bins 间的完整旅程（含合并）
  - 能解释 unsorted bin 的"中转站"角色
resources:
  - res-ctf-wiki-heap-overview
  - res-sploitfun-malloc
  - res-how2heap
challenges: []
hints: []
writeups: []
review:
  method: 口述一次 malloc(0x400) 的完整分配路径（含 unsorted 遍历/smallbin 切割/top）
  interval: 首次后 2 周
sources:
  - "CTF Wiki ptmalloc2 数据结构/实现机制章节存在性 (verified 2026-09-27)"
  - "sploitfun bins 细节 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
version_dependent: true
verified_versions: []
practice_status: no_verified_challenge
---

# bins 体系

## 速查表（64 位 glibc，熟记）
| bin | 大小 | 组织 | 关键行为 |
|-----|------|------|----------|
| tcache | ≤0x408（64位 7 桶/每大小…实际每 bin 7 块） | 每线程单链 LIFO | malloc/free 第一站；无合并 |
| fastbin | ≤0x80（默认 global_max_fast） | 单链 LIFO | 无合并；size 检查（2.23+ 取消 fd 指向检查历史） |
| unsorted | 全部 | 双链 | free 大块先进这；malloc 遍历分类 |
| smallbin | <0x400 | 每 size 一条双链 FIFO | 与相邻合并（clear prev_inuse 后入 unsorted） |
| largebin | ≥0x400 | 按 size 区间+链内排序，fd_nextsize | 切割分配；攻击面最复杂 |
| top | — | 堆顶 | 不够时向系统要 |

## 一次 free 的旅程（无 tcache 场景回放）
```text
free(p):
  p ≤ fastbin 上限 → 直接入 fastbin（不动 prev_size/PREV_INUSE）
  否则 → 尝试与前后空闲 chunk 合并（unlink 邻居）→ 入 unsorted bin
malloc(n):
  tcache 命中 → 出
  fastbin 命中 → 出（顺手把同 size 兄弟装满 tcache）
  small/large 精确命中 → 出
  否则遍历 unsorted：合 size 则用，否则分类入 small/large
  最后 top 切割 / sysmalloc
```

## 学习建议
用 pwndbg `bins`/`fastbins` 命令在实验里亲眼看每一步（how2heap 各示例即为此设计）。
