---
id: ch-nightmare-protostar-heap2
name: heap2 (Protostar)
platform: Protostar
event: ""
year: ""
category: advanced
difficulty: basic
url: https://guyinatuxedo.github.io/24-heap_overflow/protostar_heap2/reamdme.html
knowledge_points:
  - adv-heap-overflow
prerequisites:
  - adv-heap-bins
why_selected: |
  Nightmare 基础堆模块里可打开的 Protostar heap2：服务路径把输入拷进堆且不检查长度，
  能改掉登录判断读的那个字段。用来建立「堆元数据/邻接对象可被溢出碰到」的第一印象。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-protostar-heap2
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开 Nightmare 深页。URL 文件名是站点自己的拼写 reamdme.html，不是笔误。
  页内漏洞类是堆溢出（改登录检查读的字段），不是 UAF。知识点仍挂在 adv-uaf-double-free，
  因为现有堆分类里没有更早的「邻接对象覆盖」条目；这是索引归类，不是把本题说成 UAF。
  Protostar 原站 URL 未验证。旧研究笔记里的 protostar heap3 不在当前 Nightmare 侧栏，未收录。
  知识点是 adv-heap-overflow：页内是无长度检查的堆拷贝，不是 UAF。
---

# heap2（Protostar · via Nightmare）

> 入口：<https://guyinatuxedo.github.io/24-heap_overflow/protostar_heap2/reamdme.html>

## 任务

无长度检查的堆拷贝，目标是改变登录逻辑所读的相邻字段。

<details><summary>Hint 1（方向）</summary>

先找到「拷贝发生在堆上」和「判断发生在另一个堆对象上」。两者是不是相邻？

</details>

<details><summary>Hint 2（方法）</summary>

用调试器看目标字段相对缓冲区的距离，而不是猜一个魔法长度。

</details>

<details><summary>Hint 3（关键细节）</summary>

覆盖到判断字段即可，不必碰返回地址。长度 = 缓冲区到该字段的距离。

</details>

## 复盘要点

- 学会：堆上相邻对象的覆盖距离怎么量。
- 去向：[adv-heap-overflow](../../knowledge/heap/heap-overflow.md)。
