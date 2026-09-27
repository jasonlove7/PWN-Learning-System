# Changelog

只记录仓库里已经发生的事。版本号在许可和发布方式确定之前不编。

## 2026-09-27

依据当天的 git 历史（`main`，作者 jasonlove7）：

- `f90e415` — 初始来源核对，写入 `ROADMAP-RESEARCH.md`
- `5a9af32` — knowledge / resource / challenge / writeup / notebook / verification 的 schema
- `6a70707` — 四层路线、依赖图、进度模板
- `39cdfa2` — Foundation 知识点（15）
- `6239f1e` — PWN Core 知识点，以及 ret2libc 试点
- `1be84bf` — Advanced 堆知识点与 8 个 Specialization 骨架
- `c57f3fe` — 带来源的资源库，未验证线索放在 `research/unverified/`
- `c27fba8` — 首批 challenge 文件（当时 README 写了 38 道；磁盘上 foundation 6 + core 23，没有 advanced 目录）

同日的结构整理（本条目对应其后的提交，而不是上面 8 个提交本身）：

- 增加根 `README.md`、`QUALITY-CHECK.md`、`CONTRIBUTING.md`、`CHANGELOG.md`
- 增加 `notebook/` 模板、`scripts/validation/validate_metadata.py`
- 增加 `.github` 的 Issue 与 PR 模板
- 修正 challenge README 与磁盘不一致的计数
- 去掉不存在的 `core-got-plt-leak`、`wu-nightmare-index`、`wu-ai-babyboi-summary`
- 对本轮实际打开过的 Nightmare 深页，补了少量正式题和外部 writeup 元数据
- 尚未建文件的题改记在 `planned_challenges`，不冒充已收录

未做：没有添加 git remote，没有 push，没有选定 LICENSE。
