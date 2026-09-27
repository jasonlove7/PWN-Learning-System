# 未验证内容区（UNVERIFIED）

> 本目录存放**线索级**信息：真实存在可能性高，但按本项目验证标准（实际访问原始来源）尚未通过。
> 规则：这里的内容**永远不进入** `resources/`、`challenges/` 正式推荐区（schemas/verification.md）。

## 当前条目

| 文件/条目 | 类型 | 状态 | 说明 |
|-----------|------|------|------|
| saelo《Attacking JavaScript Engines》 | 论文 | ❌ 访问失败 | saelo.io 多次 socket closed；phrack 镜像路径 404。待人工核验后升级 |
| 《程序员的自我修养》购书链接 | 书籍 URL | ❌ 访问失败 | douban 反爬。书籍本身为公认中文经典（已按 verified:false 收录 books.md 并注明） |
| pwnable.tw 题目级清单 | 平台题目 | ⚠️ 登录墙 | 平台已验证；具体题目待注册后人工核验 |
| pwn.college dojo/模块深页 | 平台内容 | ⚠️ JS 渲染 | 平台已验证；模块名未逐一读取 |
| picoCTF picoGym 分类页 | 平台内容 | ⚠️ JS 应用 | play.picoctf.org 无法自动读取 |
| Nightmare 侧栏有链接、但 2026-09-27 未打开正文的深页 | writeup | ⚠️ 未逐页打开 | 正式题仍指向站点根，`notes_on_source` 记下了侧栏 href。不单列 writeup |
| `utc19_shellme` 深页 | writeup | ❌ 猜测 URL 404 | 索引有未链接的名字。`08-bof_dynamic/utc19_shellme` 与 `11-stack_pivoting/utc19_shellme` 均为 404。正式题保留为 listed |
| pwnable.kr `cmd1` `cmd2` `uaf` `unlink` | 题目 | ⚠️ 本次未重读 play.php | 只在知识点 `planned_challenges` 中，status 为 research-needed。不建正式文件 |
| Protostar heap3 | 题目 | ❌ 侧栏未见 | 2026-09-27 Nightmare 侧栏没有 `protostar_heap3`。`planned_challenges`，不建文件 |
| how2heap 单题 | 题目 | — | 仓库已作为 `res-how2heap` 收录。它不是一道 challenge，id `ch-how2heap-lab` 只作 planned 说明 |
| CTF Wiki ARM 栈深链 `.../stackoverflow/arm/stack-intro/` | 结构 | ❌ 404 | 2026-09-27。不把 ARM 栈章节当成已打开 |
| CTF Wiki 内核深链 `.../kernel-mode/environment/` | 结构 | ❌ 404 | 2026-09-27。首页导航有 Kernel Mode 字样，章节页未核对 |
| ir0nstone.github.io 旧域名 | 结构 | ❌ 404 | 已迁移至 GitBook（新址已验证） |
| HeapLAB（Udemy 付费课） | 课程 | ⚠️ 未验证 | ROP Emporium 站内推广；付费内容不在本项目验证范围 |
| 各 B 站 pwn 教学视频 | 视频 | ⚠️ 未验证 | 视频验证成本高，标准待定（ROADMAP-RESEARCH §8） |

## 升级流程

1. 贡献者人工访问线索 → 在 PR 中附证据（截图/引用要点）。
2. 按 schemas/resource.md 填全字段 → 移入 `resources/` 对应分区。
3. 在 VERIFIED-SOURCES.md 登记并在 CHANGELOG 记录。
