# Contributing

先读 [README.md](README.md) 和 [QUALITY-CHECK.md](QUALITY-CHECK.md)。这个仓库宁缺毋滥。

## 所有改动

- 不编造文章、仓库、比赛、题目、作者或 URL。
- 搜索结果只能用来发现线索。收录前要打开原始页面。
- AI 草稿必须标 `source_type: ai_generated` 和 `verified: false`，正文里写明是 AI 生成。不要伪装成社区资料。
- 不整篇复制第三方内容。
- 不提交密钥、私人 flag、未公开题目、个人联系方式。
- 改完运行 `python scripts/validation/validate_metadata.py`。有 error 不要提交。

## 知识点

一个文件一个知识点，字段见 [schemas/knowledge.md](schemas/knowledge.md)。

`importance` 和 `difficulty` 分开，都是 1–5。不要为了「完整」新建一个和现有点重复的主题。已有的点可以改正文错误，不要整文件换成另一套说法。

没有对应题的知识点保持原样。题放在 `planned_challenges`，不要删知识点。

## 资源

字段见 [schemas/resource.md](schemas/resource.md)。PR 里写清：你打开的 URL、页面标题是否一致、作者从哪一行看到。

修坏链：把失效 URL 和你核对的日期写进说明。如果暂时找不到替代页，把条目标成未验证或移到 `research/unverified/`，不要换成一个没打开过的新链接。

## Challenge

字段见 [schemas/challenge.md](schemas/challenge.md)。

新增题的 PR 要包含：平台页或赛事页的 URL、你如何确认就是这道题、它对应哪个已有知识点。对不上知识点就不要为它新造一个知识点。

Hint 三级：方向、方法、关键细节。不贴完整 exp。

## Writeup

只加元数据。见 [schemas/writeup.md](schemas/writeup.md)。

`correspondence: verified` 仅当你打开页面并确认题名、赛事一致。否则不要建这条。

## 翻译

翻译不改变 id。在条目上补语言字段或另建译文文件时，链回原文 id。不要翻译出原文里没有的事实。

## Roadmap 建议

改路线前先看 [ROADMAP-RESEARCH.md](ROADMAP-RESEARCH.md)。新的排序要说明依据来自哪些已核对来源。单凭模型记忆的建议标成建议，不直接改主线。

## PR

说明改了哪些 id、核对了哪些 URL、脚本是否通过。不要在一个 PR 里混进几十道新题。
