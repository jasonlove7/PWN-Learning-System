---
id: adv-uaf-double-free
title: UAF 与 double free
description: "重复占有"类原语：悬垂指针的利用面与重复释放的检查绕过
importance: 5
difficulty: 4
track: mainline
type: technique
depth: standard
prerequisites:
  - adv-heap-bins
why_learn: |
  CTF 堆题出题率最高的漏洞类型；真实 CVE 的主力形态。堆方向第一实战技术。
objectives:
  - 能用 UAF 完成：泄漏（读 fd/bk/函数指针）→ 劫持（改 next/改 print 指针）
  - 能列出 double free 在 tcache/fastbin 的检查与绕过（key 换写/tcache 满）
resources:
  - res-how2heap
  - res-nightmare
challenges: []
planned_challenges:
  - id: ch-pwnable-kr-uaf
    name: uaf
    platform: pwnable.kr
    status: research-needed
    note: Toddler's Bottle 名单曾在 2026-09-27 的 play.php 核对中出现；本次未能再次读取该页，不建正式条目。
# Protostar heap2 已建正式题 ch-nightmare-protostar-heap2，但是堆溢出，挂在 adv-heap-overflow。
# 旧引用把它放在本 UAF 知识点下，2026-09-27 打开深页后已移走。
hints: []
writeups: []
review:
  method: 总结"UAF 三部曲"（dangling→reclaim→hijack）并各举一例
  interval: 首次后 2 周
sources:
  - "how2heap fastbin_dup/tcache_dup (verified 2026-09-27)"
  - "Nightmare §9 UAF 题组 (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# UAF 与 double free

## UAF 三部曲（万变不离其宗）
```text
1. dangling:   free(p) 后指针没清 → 仍可读/写
2. reclaim:    malloc 同 size 让新对象落回同块（类型替换）
3. hijack:     通过旧指针改新对象的字段（next/函数指针/数据指针）
```

## 经典利用面
| 改什么 | 得到什么 |
|--------|----------|
| tcache/fastbin 的 next | 下一块分配到任意地址（tcache poisoning） |
| 结构体里的函数指针 | 直接控制流劫持（C++ 对象/print 回调） |
| 结构体里的数据指针 | 任意读写 |
| chunk 的 fd/bk | 寄生 unlink 等（见 unsafe-unlink） |

## double free 的版本化检查
- tcache (≥2.29)：key 字段检测 → **绕法**：UAF 改 key / tcache 满(7块)溢出到 fastbin / 释放到不同 bin。
- fastbin: "栈顶立即重复释放"检查 → 中间隔一次 free 即绕（fastbin_dup）。
- 2.35+ tcache double-free 检查加强 → 组合技常态。

## 实战
- pwnable.kr `uaf`（UAF 命名题，经典 C++ 场景）
- Nightmare protostar_heap2、csaw19_popping_caps0/1（现代版）
