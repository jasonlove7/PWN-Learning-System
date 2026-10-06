---
id: ch-nightmare-swamp19-badfile
name: badfile (SwampCTF 2019)
platform: SwampCTF 2019
event: SwampCTF
year: 2019
category: advanced
difficulty: intermediate
url: https://guyinatuxedo.github.io/37-fs_exploitation/swamp19_badfile/index.html
knowledge_points:
  - adv-io-file
prerequisites:
  - adv-heap-modern
why_selected: |
  Nightmare FILE 模块里可直接打开的入门 FILE 题：释放后的堆块被复用成 FILE，
  后续输入能改写这条流。用来把「任意写」接到 glibc stdio，而不是再讲一遍栈。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-swamp19-badfile
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开 Nightmare 深页核对标题与 FILE 复用描述。
  原赛事归档 URL 未验证。旧 id ch-nightmare-swampctf19-badfile 已废弃，以本 id 为准。
---

# badfile（SwampCTF 2019）

> 入口：<https://guyinatuxedo.github.io/37-fs_exploitation/swamp19_badfile/index.html>（做题后再看）

## 任务

把堆上被释放的缓冲区和一条 `FILE` 流对上。本题练的是出口，不是再找一个溢出点。

<details><summary>Hint 1（方向）</summary>

程序里哪次 `free` 之后，同一块内存又被当成文件流使用？先确认「谁占了这块」，再想写什么。

</details>

<details><summary>Hint 2（方法）</summary>

对照 `adv-io-file`：关注 vtable / 虚表指针能把后续的读或写带到哪里。先画结构，再决定覆盖哪些字段。

</details>

<details><summary>Hint 3（关键细节）</summary>

触发点是程序自己的文件操作，不是你再造一次溢出。覆盖之后让程序走到那次读/写，观察控制流是否离开原二进制。

</details>

## 复盘要点

- 学会：释放块被复用成 `FILE` 时，哪些字段是「数据」，哪些字段是「控制」。
- 去向：[adv-io-file](../../knowledge/advanced/io-file.md)。
