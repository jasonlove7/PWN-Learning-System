---
id: adv-unsafe-unlink
title: unsafe unlink
description: 经典 unlink 宏的利用：伪造双链获得"写指针到自身附近"的原语
importance: 4
difficulty: 5
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-heap-overflow
why_learn: |
  2004 年以来的元老技术；"元数据即攻击面"的最佳教材，理解现代检查的来由。
objectives:
  - 能默写 unlink 宏的两个核心指针操作
  - 能构造 FD=P->fd, BK=P->bk 且通过 self-check 的完整布局
  - 能把 unlink 的产物升级为任意写（\*(\*ptr+X) 布局）
resources:
  - res-how2heap
  - res-nightmare
  - res-sploitfun-malloc
challenges:
  - ch-nightmare-hitcon14-stkof
planned_challenges:
  - id: ch-pwnable-kr-unlink
    name: unlink
    platform: pwnable.kr
    status: research-needed
    note: Toddler's Bottle 名单曾在 2026-09-27 的 play.php 核对中出现；本次未能再次读取该页，不建正式条目。
  - id: ch-nightmare-protostar-heap3
    name: heap3
    platform: Protostar
    status: research-needed
    note: 2026-09-27 读取的 Nightmare 侧栏没有 protostar_heap3。不建正式条目。旧索引摘录不可当作该深页已核对。
hints: []
writeups:
  - wu-nightmare-hitcon14-stkof
review:
  method: 手推 self-check 通过时各指针的值
  interval: 首次后 2 个月
sources:
  - "how2heap unsafe_unlink (verified 2026-09-27)"
  - "pwnable.kr unlink 存在性 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
version_dependent: true
verified_versions:
  - glibc: "latest"
    notes: how2heap README 把 unsafe_unlink.c 的版本格写成 latest，示例链到 glibc_2.35/unsafe_unlink.c。glibc_2.23 目录里也有同名文件。这不是「每个历史版本字节级相同」。
  - glibc: "2.26"
    notes: how2heap glibc_ChangeLog.md 在 2.26 记下 unlink 增加了 chunk size 与 next->prev_size 的一致性检查。
---

# unsafe unlink

## unlink 宏（去检查后的本质）
```c
FD = P->fd;  BK = P->bk;
FD->bk = BK;     // *(FD + 0x18) = BK
BK->fd = FD;     // *(BK + 0x10) = FD
```
- 正常用途：从双链摘除 P。攻击用途：P 是伪造的，两个写操作落在你选的地址上。

## 2.3.4 起的 self-check 与标准绕法
```text
检查: P->fd->bk == P && P->bk->fd == P
绕法: 让程序里本来就有 ptr 指向 chunk 处:
  令 P = ptr - 0x18 处的假 chunk（fd = ptr-0x18, bk = ptr-0x10）
  → 检查双双命中 → unlink 后 ptr = ptr - 0x18
```
- 产物：`ptr 被改写为 ptr-0x18` → 之后通过 ptr 改自身附近 → 若 ptr 是结构体里的数据指针，等于拿到"相对写"并逐步升级任意写。

## 适用场景识别
- 菜单堆题里"全局数组存堆指针" + 可溢出到 free 大块头部 → unlink 思路优先浮现。
- protostar_heap3 / pwnable.kr unlink 是两个年代的训练题（一古一今）。
