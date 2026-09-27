---
id: ch-nightmare-tuctf17-vulnchat2
name: vulnchat2 (TUCTF 2017)
platform: TUCTF 2017
event: TUCTF
year: 2017
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/15-partial_overwrite/tuctf17_vulnchat2/index.html
knowledge_points:
  - core-partial-overwrite
prerequisites:
  - core-ret2libc
why_selected: |
  Nightmare partial overwrite 模块的 TUCTF 2017 vulnchat2：只改保存返回地址的最低字节。
  用来练「同页内低字节足够」而不是整段泄漏。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-tuctf17-vulnchat2
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页，标题 Tuctf 2017 vuln chat 2。
  旧 id ch-nightmare-tu17-vulnchat2 与站点 slug（tuctf17）不一致，已废弃。
  原赛事归档 URL 未验证。
---

# vulnchat2（TUCTF 2017）

> 入口：<https://guyinatuxedo.github.io/15-partial_overwrite/tuctf17_vulnchat2/index.html>

## 任务

溢出窗口只够动返回地址的最低一字节。目标函数和原返回点在同一页内。

<details><summary>Hint 1（方向）</summary>

你够不到完整地址。同一页里，哪个已有函数离「正确返回」只差最低字节？

</details>

<details><summary>Hint 2（方法）</summary>

反汇编量出原返回地址和目标函数的低字节差。只覆盖那一个字节，高位留给 ASLR。

</details>

<details><summary>Hint 3（关键细节）</summary>

最低字节要避开会截断输入的字符。覆盖长度算到返回地址的第一个字节，不要多写。

</details>

## 复盘要点

- 学会：什么时候 partial overwrite 是必然成功，而不是撞概率。
- 去向：[core-partial-overwrite](../../knowledge/rop/partial-overwrite.md)。
