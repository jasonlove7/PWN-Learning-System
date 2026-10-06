---
id: ch-nightmare-hacklu14-oreo
name: oreo (Hack.lu 2014)
platform: Hack.lu 2014
event: Hack.lu
year: 2014
category: advanced
difficulty: intermediate
url: https://guyinatuxedo.github.io/39-house_of_spirit/hacklu14_oreo/index.html
knowledge_points:
  - adv-house-of
prerequisites:
  - adv-heap-bins
why_selected: |
  Nightmare House of Spirit 模块的 Hack.lu 2014 Oreo。页内把技术标成 House of Spirit。
  用来给 house 系列一个具体题，而不是只留总览。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-hacklu14-oreo
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页，标题 Hack.lu 2014 Oreo，技术标签 House of Spirit。
  原赛事归档 URL 未验证。
---

# oreo（Hack.lu 2014）

> 入口：<https://guyinatuxedo.github.io/39-house_of_spirit/hacklu14_oreo/index.html>

## 任务

让分配器认为一块你能控制的内存是合法空闲块，再把它分配回来。

<details><summary>Hint 1（方向）</summary>

House of Spirit 的核心是伪造块，不是改已经在 bin 里的 fd。先找一块地址已知、内容可控的区域。

</details>

<details><summary>Hint 2（方法）</summary>

伪造块要有能过当时检查的 size，并且下一个块的 size 字段也像真的。free 的是这个假块。

</details>

<details><summary>Hint 3（关键细节）</summary>

这是 2014 年的题。不要把 glibc 2.26 之后的 tcache house of spirit 示例原样搬过来。先看本题 libc。

</details>

## 复盘要点

- 学会：house of spirit 骗的是 free，不是 malloc 的查找循环。
- 去向：[adv-house-of](../../knowledge/heap/house-of.md)。
