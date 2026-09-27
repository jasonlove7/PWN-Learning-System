# Notebook Entry Schema（个人积累本）

用于 `notebook/**`。**个人积累本与官方 Challenge Database 完全分离**（项目原则 §23-24）：

- `challenges/` = 本项目官方推荐题（经过验证流程）
- `notebook/` = 学习者个人收藏/错题/复盘（**加入 notebook ≠ 官方推荐**）

```yaml
id: nb-2026-0001                   # 个人编号，建议 nb-<年>-<序号>
challenge_id: ch-ropemporium-callme   # 可为空（官方库外的题）；二者可同时存在

name: callme
platform: ROP Emporium
event: ""
year: ""
category: core
difficulty: intermediate           # 平台标注难度
url: https://ropemporium.com/challenge/callme.html

source_verified: true              # 收藏时是否核对了平台/题目存在

knowledge_points:
  - core-rop-basics
  - core-calling-convention-x64

added_date: 2026-09-27
reason_saved: 第一次真正理解 64 位下多参数函数的 ROP 调用约定

solved: false                      # 未解决 | 已解决（二值，无复杂评分）
solve_date: ""
time_spent: ""                     # 自由格式，如 "3h"

difficulty_for_me: ""              # 主观难度（自由文本）

mistakes: |                        # 卡在哪、犯过什么错
key_insights: |                    # 突破点/关键理解
important_techniques: |            # 值得沉淀的技巧
my_notes: |                        # 自由笔记

my_writeup: my-writeup.md          # 相对路径；未写则留空

review_later: true                 # 🔖 值得重做
things_to_review:                  # 重做时应回顾什么
  - pwntools ROP 对象的 args 传法
```

## my-writeup.md 模板

```markdown
# <题名>

## Knowledge          — 用到的知识点
## My Approach        — 我的完整思路
## Where I Got Stuck  — 卡壳点
## Breakthrough       — 突破瞬间
## Key Knowledge      — 沉淀的关键知识
## Important Techniques — 重要技巧
## Future Recognition Pattern — 以后见到什么特征应想起这题
## What I Should Review — 我该复习什么
```

## 隐私红线（项目原则 §49）

notebook 是公开仓库的一部分。**禁止**记录：真实姓名、QQ/微信、手机号、学号、学校、私有服务器地址、任何密钥/Token/密码、私有 CTF flag、未公开题目文件。想私有使用 → Fork 后将个人内容放入已被 `.gitignore` 排除的 `notebook/personal/`。
