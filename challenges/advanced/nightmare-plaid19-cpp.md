---
id: ch-nightmare-plaid19-cpp
name: cpp (PlaidCTF 2019)
platform: PlaidCTF 2019
event: PlaidCTF
year: 2019
category: advanced
difficulty: intermediate
url: https://guyinatuxedo.github.io/29-tcache/plaid19_cpp/index.html
knowledge_points:
  - adv-uaf-double-free
  - adv-tcache
prerequisites:
  - adv-tcache
why_selected: |
  Nightmare 把它放在 GLibc Tcache 模块。页内同时写了 use after free 和 double free，
  并打印 Ubuntu GLIBC 2.27。用来做「UAF / double free 落在 tcache 上」的第一道正式题，
  而不是把 how2heap 示例当成题。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-plaid19-cpp
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。标题 plaidctf 2019 cpp。glibc 字符串为 2.27-3ubuntu1 / stable 2.27。
  原赛事归档 URL 未验证。how2heap 仍是示例仓库，不是本题。
---

# cpp（PlaidCTF 2019）

> 入口：<https://guyinatuxedo.github.io/29-tcache/plaid19_cpp/index.html>（做完再看）

## 任务

在 glibc 2.27 的 tcache 上，利用悬垂指针和重复释放。先确认版本，再决定检查还在不在。

<details><summary>Hint 1（方向）</summary>

页内打印的 libc 是 2.27。对照 `adv-tcache`：这一版已经有 tcache，safe-linking 的示例是从 >= 2.32 起才在 how2heap 里出现。不要把 2.32 的加密写法套到这题上。

</details>

<details><summary>Hint 2（方法）</summary>

找出哪次 free 之后指针还在，以及同一次分配能不能被 free 两次。tcache 是按 size 分链的。

</details>

<details><summary>Hint 3（关键细节）</summary>

先泄漏或确认堆块落在哪条 tcache 链，再改 next。2.27 没有 README 里那条「2.32 之后必须先有 heap leak」的限制，但你仍然要知道块的真实地址才能让下一次 malloc 落到目标。

</details>

## 复盘要点

- 学会：同一道题可以同时是 UAF 和 double free；版本决定 tcache 的检查，而不是技巧名称。
- 去向：[adv-uaf-double-free](../../knowledge/heap/uaf-double-free.md)、[adv-tcache](../../knowledge/heap/tcache.md)。
