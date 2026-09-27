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
| Nightmare 各章节深链 URL 模式 | 结构 | ⚠️ 未确认 | 索引已验证；深页 URL 模式未逐一确认（引用一律给根索引） |
| CTF Wiki /pwn/ 落地页 | 结构 | ❌ 404 | 站点按深页组织；从首页导航进入（已验证深页 2 个） |
| ir0nstone.github.io 旧域名 | 结构 | ❌ 404 | 已迁移至 GitBook（新址已验证） |
| HeapLAB（Udemy 付费课） | 课程 | ⚠️ 未验证 | ROP Emporium 站内推广；付费内容不在本项目验证范围 |
| 各 B 站 pwn 教学视频 | 视频 | ⚠️ 未验证 | 视频验证成本高，标准待定（ROADMAP-RESEARCH §8） |

## 升级流程

1. 贡献者人工访问线索 → 在 PR 中附证据（截图/引用要点）。
2. 按 schemas/resource.md 填全字段 → 移入 `resources/` 对应分区。
3. 在 VERIFIED-SOURCES.md 登记并在 CHANGELOG 记录。
