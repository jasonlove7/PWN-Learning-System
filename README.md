# PWN Learning System

持续建设中的 PWN 学习知识库。它按「先学知识点，再做题，再复盘」组织材料，不是一次性笔记，也不是题解站。

当前内容没有全部完成。Browser、Hypervisor 等方向只有研究不足的骨架。本 README 不报题目或资源的精确条数，避免和仓库脱节；以目录里的文件和 `python scripts/validation/validate_metadata.py` 的输出为准。

## 这个项目做什么

给已经有一点基础、但路线不完整的学习者一条可核对的路径：从 C / Linux / 汇编，到栈、ROP、格式化字符串、堆，再到自选方向。

它不声称是最完整的 PWN 路线，不声称覆盖所有技术，也不声称每一条链接都在今天复检过。已验证的范围写在各条目的 `verified` / `verification_status` 和 [ROADMAP-RESEARCH.md](ROADMAP-RESEARCH.md) 里。

## 面向谁

优先：能读 C、愿意用 Linux 和调试器的学习者。

Foundation 仍然从内存模型、汇编和工具讲起，所以零散基础也可以从那里进入。Specialization 不是必修。

## 学习闭环

```text
Roadmap → Knowledge → Resources → Challenges
  → 独立尝试 → Hints → Writeups
  → 掌握 → Review → Personal Notebook → 重做
```

卡住时按 Hint 1 → 2 → 3。Hint 不给完整 exp。完整步骤只在已核对的外部 writeup，或你自己的 notebook 里。

状态只有三种，记在 [progress/PROGRESS.md](progress/PROGRESS.md)：🔴 未学习 / 🟡 熟悉 / 🟢 已掌握。没有经验值、等级、排行榜或打卡。

## 仓库里有什么

| 目录 | 角色 |
|------|------|
| [roadmap/](roadmap/) | 四层路线：Foundation → PWN Core → Advanced PWN → Specializations |
| [knowledge/](knowledge/) | 一个文件一个知识点 |
| [resources/](resources/) | 已核对（或明确标成未核对）的外部资料 |
| [challenges/](challenges/) | 正式题目。和「计划中」分开，见该目录 README |
| [writeups/](writeups/) | 外部 writeup 的链接和短摘要，不存全文 |
| [notebook/](notebook/) | 个人积累本模板。私人内容放 `notebook/personal/`（不入库） |
| [schemas/](schemas/) | 字段约定 |
| [research/](research/) | 验证台账与未验证线索 |
| [scripts/validation/](scripts/validation/) | 结构校验，不检查 URL 是否仍然在线 |

总图在 [ROADMAP.md](ROADMAP.md)。排序理由在 [ROADMAP-RESEARCH.md](ROADMAP-RESEARCH.md)：五份独立来源交叉核对，并记录了 8 条有冲突时的取舍。

## Roadmap

主线是 Foundation、PWN Core、Advanced PWN。做完 Core 之后再按兴趣选方向：

Linux Kernel、Windows Kernel、ARM / AArch64、Android、IoT、Browser、Sandbox、Hypervisor。

Browser 与 Hypervisor 在 v0.1 只有入口级材料，经典论文或系统课程没有核完，文件里写了「研究不足」。不要把骨架当成已完成的课。

## Knowledge

知识点分 `importance`（对体系有多必要）和 `difficulty`（学起来有多难），两者分开。只有 ret2libc 是完整试点（`depth: full`）。多数主线点是 `standard`。八个方向是 `skeleton`。

## Resources

正式推荐在 `resources/`，按 CORE / RECOMMENDED / SUPPLEMENTARY / ADVANCED 分层。未通过核对的线索在 [research/unverified/](research/unverified/)，不进入推荐。

个别正式区条目自己标了 `verified: false`（例如 LiveOverflow 频道被同意墙挡住、一本中文书的购买页没打开）。它们不是「已验证推荐」。

## Challenges

正式题在 `challenges/`。知识点里出现、但还没有正式文件的题，写在对应知识点的 `planned_challenges`，状态是 `planned` 或 `research-needed`。那不是收录。

pwn.college 只作为平台资源。该平台要求不要公开题解，本仓库不收、不链、不抄它的 writeup。

## Hints

每道正式题用三级折叠提示：方向、方法、关键细节。第三级仍不是完整 exp。

## Writeups

`writeups/external/` 只保留作者、URL、和一句自己的概括。`correspondence: verified` 表示维护者打开过该页，确认讲的是这一题。

本仓库目前没有 AI writeup 文件。如果以后增加，必须同时标 `source_type: ai_generated`，并在正文写明 ⚠️ AI Generated。生成之后默认 `verified: false`，除非另有核对记录。

## Personal Notebook

[notebook/_template.md](notebook/_template.md) 用来记你自己卡住的点、值得重做的题、和你自己的写法。它不是成绩单。加入 notebook 不等于官方推荐。

## Verification

资源与题目的核对规则在 [QUALITY-CHECK.md](QUALITY-CHECK.md) 和 [schemas/verification.md](schemas/verification.md)。

`python scripts/validation/validate_metadata.py` 只检查结构：frontmatter 能否解析、必填字段、ID 是否重复、引用是否指向存在的对象。它不访问网络，不能证明 URL 真实。

## AI 生成内容

允许作为最后手段，但必须一眼能认出来：

- 正文标注 ⚠️ AI Generated
- `source_type: ai_generated`
- `verified: false`（若事后核对，可改为 true，并写 `verification_method`；AI 标记仍保留）

禁止把 AI 文本写成某篇真实博客、某个真实仓库或某位真实作者的作品。

## 当前状态

已有：研究记录、schema、四层路线、知识点文件、资源分区、一批正式题、少量已打开深页的外部 writeup 元数据、进度模板、结构校验脚本。

部分完成：堆与高级题只补了本轮实际打开过页面的那些；不少 Nightmare 题仍只有站点索引级记录，深页链接写在 `notes_on_source`，没有升格。

未完成：`reviews/` 目录、多数知识点的配套题、Browser / Hypervisor 的系统材料、远程仓库与 CI。

研究中：pwnable.tw / pwnable.xyz 的题目级清单（登录墙）、pwnable.kr 上尚未单独建文件的 cmd1 / cmd2 / uaf / unlink、Nightmare 侧栏里没有链接的 `utc19_shellme`。

## 如何贡献

见 [CONTRIBUTING.md](CONTRIBUTING.md)。新增资源或题目必须给出你打开过的原始 URL。不要编造来源，不要把 AI 草稿标成社区文章。

## 版权与署名

第三方文章、writeup、课程、图片只链接和归因，不整篇复制。书籍只记录书目信息，不提供、不链接盗版 PDF。

RPISEC MBE 讲义是 CC BY-NC，引用时保持非商用限制。各条目的 `license` 以原页面为准；查不到就写 `unknown`。

## License

本仓库自身的组织文字与 schema 以仓库根目录的 LICENSE 文件为准。若根目录还没有 LICENSE，则许可尚未选定，不要假定为某种开源许可证。第三方内容的版权属于原作者。

## 以后

按 [ROADMAP-RESEARCH.md](ROADMAP-RESEARCH.md) 第 8 节：补 Browser / Hypervisor 的可核对资料、把登录墙后的题目做人工核对、再增加题，而不是先把目录填满。
