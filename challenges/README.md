# Challenge Database

本目录只放**已经有文件、并且写了验证层级**的题。个人收藏在 [../notebook/](../notebook/)，两边不要混。

数量以目录中的 `*.md` 为准（不含本 README）。不要相信旧文档里的「38 道」或「advanced 10 道」——那是文件还没落地时写的。运行：

```bash
python scripts/validation/validate_metadata.py
```

脚本会打印当前正式题数量。它不访问网络。

## 分区

| 目录 | 内容 |
|------|------|
| [foundation/](foundation/) | pwnable.kr Toddler's Bottle 中已建文件的题 |
| [core/](core/) | ROP Emporium，以及 Nightmare 上栈 / ROP / 格式化字符串题 |
| [advanced/](advanced/) | 本轮打开过 Nightmare 深页的堆与 FILE 题 |

没有 `specializations/`。方向题还没到可以建文件的程度。

## 两种状态，不要混

### 正式收录

这里的每个文件。`verification_status` 见下表。

### 计划中 / 仅被引用

知识点 frontmatter 里的 `planned_challenges`。状态是 `planned` 或 `research-needed`。

这些名字**不是**正式题。没有对应文件，就不能出现在上面的分区里，也不能在 README 里计为已收录。

当前计划项（没有正式文件）：

| id | 原因 |
|----|------|
| `ch-pwnable-kr-cmd1` / `cmd2` | 平台名单曾在 2026-09-27 见到；本次没能再次读出 play.php，不建文件 |
| `ch-pwnable-kr-uaf` / `unlink` | 同上 |
| `ch-nightmare-protostar-heap3` | 2026-09-27 的 Nightmare 侧栏没有 heap3 |
| `ch-how2heap-lab` | how2heap 是示例仓库（`res-how2heap`），不是一道题 |

`utc19_shellme` 有正式文件，但深页没找到（猜测 URL 返回 404），所以 URL 停在站点根，状态保持 listed。

## verification_status

| 值 | 含义 |
|----|------|
| `platform-and-challenge-verified` | 打开过该题页面（ROP Emporium 的关卡页，或 Nightmare 的深页） |
| `platform-verified-challenge-listed` | 平台或官方索引里能看到这道题；深页正文本轮没打开。Nightmare 题的 `notes_on_source` 里可能有一条侧栏深链，那只是线索 |
| `platform-verified-challenge-unverified` | 只确认了平台。这种状态不应留在本目录 |

pwnable.kr 各题的 `url` 目前是 `http://pwnable.kr/play.php`（题目列表页），不是单题 URL。

Nightmare 题的原赛事归档（CSAW、HITCON 等）本轮没有逐个打开。学习入口是 Nightmare。条目里写了这一点。

## 使用

```text
独立尝试 → Hint 1 → 再试 → Hint 2 → Hint 3 → 外部 writeup → 记入 notebook
```

pwn.college 的题不收录。
