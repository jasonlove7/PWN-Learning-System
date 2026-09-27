---
id: ch-pwnable-kr-passcode
name: passcode
platform: pwnable.kr
event: ""
year: ""
category: foundation
difficulty: basic
url: http://pwnable.kr/play.php
knowledge_points:
  - fnd-got-plt-fundamentals
prerequisites:
  - fnd-elf
why_selected: |
  GOT 覆写的"Hello World"：scanf("%d", 未初始化指针) 直接写任意地址。
  是理解 GOT 劫持思想（为 core 阶段格式串改 GOT 做铺垫）的最短路径。
verification_status: platform-and-challenge-verified
writeup:
  external: []
  ai_summary: ""
reproducibility: high
---

# passcode（pwnable.kr · Toddler's Bottle）

<details><summary>Hint 1</summary>
scanf 的目标指针来自未初始化的局部变量——你能控制它指向哪吗？（GOT！）
</details>
<details><summary>Hint 2</summary>
第一次输入（welcome 的 gets）能写到的内存 与 login 里 passcode1 的 scanf 目标：找到重叠区。
</details>
<details><summary>Hint 3</summary>
把 fflush/printf 的 GOT 条目地址写进 passcode1 的输入，让 scanf 把 system 类地址写进 GOT（具体目标与值自己从反汇编确定——这就是本题的乐趣）。
</details>

## 复盘要点
- 学会：GOT 条目定位（readelf -r）、scanf 语义、PLT/GOT 劫持的第一次亲身体验。
- 去向：[fnd-got-plt-fundamentals](../../knowledge/fundamentals/got-plt-fundamentals.md) → [core-fmt-string](../../knowledge/format-string/fmt-string.md)。
