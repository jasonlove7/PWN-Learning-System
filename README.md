# PWN Learning System

长期维护的 PWN 学习库，版本 v1.0（2026-09-27）。按「先看路线，再读知识点，再做题，再复盘」组织。不是一次性笔记，也不是题解站。

当前没有做完。八个专项方向大多是骨架。浏览器和虚拟化明确写了研究不足。本页不报会过期的精确条数；以 `python scripts/validation/validate_metadata.py` 的输出为准。

## 这个项目做什么

给已经能读 C、也愿意用 Linux 和调试器的人一条可以核对的路径：Foundation → PWN Core → Advanced PWN，然后按兴趣进入专项。

它不声称是最完整的路线，不声称覆盖所有技术，也不声称每一条链接今天都重新打开过。核对范围写在各条目的 `verified` / `verification_status`，以及 [ROADMAP-RESEARCH.md](ROADMAP-RESEARCH.md)。

## 面向谁

优先给已经有一些基础、想把 PWN 学完整的人。Foundation 仍从内存、汇编和工具讲起，所以也可以从那里进入。专项不是必修。

## 学习闭环

```text
Roadmap → Knowledge → Resources → Practice
  → Hints → Writeup → Mastery → Review
  → Personal Notebook → Reattempt
```

卡住时按 Hint 1 → 2 → 3。Hint 不给完整 exp。完整步骤只在已核对的外部 writeup，或你自己的 notebook 里。

状态只有三种，记在 [progress/PROGRESS.md](progress/PROGRESS.md)：🔴 未学习 / 🟡 熟悉 / 🟢 已掌握。没有经验值、等级、排行榜或打卡。

## 仓库里有什么

| 目录 | 角色 |
|------|------|
| [roadmap/](roadmap/) | Foundation → PWN Core → Advanced PWN → Specializations |
| [knowledge/](knowledge/) | 一个文件一个知识点。`importance` 和 `difficulty` 分开 |
| [resources/](resources/) | 外部资料。未核对的线索在 [research/unverified/](research/unverified/) |
| [challenges/](challenges/) | 正式题。计划中的题不在这里 |
| [writeups/](writeups/) | 外部 writeup 的链接和短摘要，不存全文 |
| [notebook/](notebook/) | 个人积累本。私人内容放 `notebook/personal/`，已被忽略 |
| [schemas/](schemas/) | 字段约定 |
| [scripts/validation/](scripts/validation/) | 结构校验。不访问网络，不能证明 URL 仍在线 |

总图在 [ROADMAP.md](ROADMAP.md)。为什么这样排，在 [ROADMAP-RESEARCH.md](ROADMAP-RESEARCH.md)。

## Roadmap

主线：Foundation、PWN Core、Advanced PWN。

专项（不是必修）：Linux Kernel、Windows Kernel、ARM / AArch64、Android、IoT、Browser、Sandbox、Hypervisor。

`importance` 是这个点在整条路线里有多必要。`difficulty` 是学会它有多难。两者都是 1–5，不要合成一个分数。

## Knowledge / Resources / Challenges / Hints / Writeups

知识点文件在 `knowledge/`。正式推荐资源在 `resources/`，按 CORE / RECOMMENDED / SUPPLEMENTARY / ADVANCED。`verified: false` 的条目（例如打不开的购买页、被同意墙挡住的频道）不是已验证推荐。

正式题在 `challenges/`。还没建文件的题写在知识点的 `planned_challenges`，那不是收录。

pwn.college 只作为平台。该站要求不要公开题解，本仓库不收、不链、不抄。

每道正式题有三级提示：方向、方法、关键细节。第三级仍不是完整 exp。

`writeups/external/` 只保留作者、URL 和一句自己的话。`correspondence: verified` 表示打开过该页，确认讲的是这一题。

本仓库没有 AI 生成的题目或 writeup。以后如果有，必须在正文写 ⚠️ AI Generated，并设 `source_type: ai_generated`，默认 `verified: false`。不得伪装成某篇真实文章或某个真实作者。

## Personal Notebook

[notebook/_template.md](notebook/_template.md) 记你自己的卡点、耗时、值得重做的题、和你自己的写法。

官方题库是本仓库推荐的题。Notebook 是你的收藏，加入它不等于官方推荐。可以记库外的题。没有分数。

## Verification

规则在 [QUALITY-CHECK.md](QUALITY-CHECK.md)。脚本只查结构：frontmatter、必填字段、重复 id、引用是否指向存在的对象。

## 当前状态（v1.0）

这是可以打开使用的第一版，不是终点。数字以 `python scripts/validation/validate_metadata.py` 为准，下面只写类别，避免和文件脱节。

| 块 | 状态 | 你能做什么 |
|----|------|------------|
| Foundation | Partial | 15 个知识点。少量 pwnable.kr 入门题 |
| PWN Core | Partial，主线里最完整 | 栈、ROP、ret2libc、格式化字符串、SROP 等有讲解、题和三级 Hint。多数 Nightmare 深页已经打开并挂了外部 writeup。ret2libc 是唯一 `depth: full` 的试点 |
| Advanced Heap | Partial | 12 个堆知识点。溢出、tcache、UAF、fastbin、unsorted、unlink、house、IO_FILE 有打开过的题。overview、bins、largebin、modern 没有正式题 |
| Linux Kernel | Skeleton | 官方文档：分配、kmalloc、kgdb、几条启动参数。没有内核题 |
| Windows Kernel | Skeleton | 官方文档：驱动入门、WDM、IOCTL、WinDbg、Echo 调试实验。没有内核题。Echo 不是 CTF |
| ARM32 | Skeleton | Azeria Part 1（32 位）和 ROP Emporium 的 ARMv5 包 |
| AArch64 | Research Needed | 只有 AAPCS64 调用约定。没有利用教程，没有 AArch64 题 |
| Android | Skeleton | 架构、APK、ART、沙箱、SELinux、NDK、adb、logcat。没有题 |
| IoT / Browser / Sandbox / Hypervisor | Skeleton 或 Research Needed | 有入口资源或明确写了研究不足。没有专项题 |

没有 `reviews/` 目录。复习写在各知识点的 `review` 字段和 [progress/PROGRESS.md](progress/PROGRESS.md)。

pwnable.kr 的 cmd1、cmd2、uaf、unlink 以及 Nightmare 的 `utc19_shellme` 深页，仍是计划或未找到，不是正式收录。CTF² 首页打得开，题目在登录之后，本仓库没有从那里收录题。

## 怎么用

1. 从 [ROADMAP.md](ROADMAP.md) 选一个知识点。
2. 先看它的 `objectives` 和前置。
3. 读 `resources` 里的原始链接，不读搜索摘要。
4. 做 `challenges` 里的题。先自己试，再按 Hint 1 → 2 → 3。
5. 确认之后再打开 `writeups/external/` 里的链接。那里只有作者、URL 和一两句说明，没有全文。
6. 在 [progress/PROGRESS.md](progress/PROGRESS.md) 把状态改成 🔴 / 🟡 / 🟢。
7. 想留下的题，复制 [notebook/_template.md](notebook/_template.md)。这是你的本子，不是官方题库。

## 如何贡献 / 报告错误

见 [CONTRIBUTING.md](CONTRIBUTING.md)。仓库里有 Issue 模板：错误、坏链接、题目纠错、资源建议、题目建议、路线建议。

新增内容必须带你打开过的原始 URL。不要编造来源。

## 版权与联系

本项目用于 PWN / CTF 学习和知识整理。

仓库自己的组织文字、schema 和校验脚本：根目录还没有 LICENSE，许可尚未选定，不要当成某种开源许可证。

第三方文章、writeup、课程、图片、书籍仍归原作者或权利人。本仓库只放链接、作者（页面上有才写）和自己的短摘要，不放全文，不放盗版 PDF。

若你认为某条引用有版权问题，请发邮件到 2983450391@qq.com，写明：

- 本仓库里的文件路径或资源 id
- 原始链接
- 问题是什么

维护者会核对，并在必要时补署名、改引用、换链接或删掉该条。本仓库不声称「用于学习就不涉及版权」，也不声称「对引用不负责」。

带 NC 的材料（例如 RPISEC MBE 讲义）在条目里写了限制，引用时保持。

## 以后（v1.0 不做）

下面是后续版本的事，这一版没有实现：

- 给还没有题的堆知识点找真实题
- 在你已登录的前提下核对 CTF² 单题页
- Linux / Windows 内核、AArch64、Android 的练习题
- IoT、Browser、Sandbox、Hypervisor 的系统材料
- 选定 LICENSE
- 前端、进度界面
- 登录和 `access_level`（计划是：Foundation 与 PWN Core 公开；Advanced 与 Specializations 需申请。数据里还没有这个字段）

不要为了看起来完整去填这些缺口。

