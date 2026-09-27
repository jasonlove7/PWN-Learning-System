# Challenge Schema

用于 `challenges/**` 下每道官方推荐题目（一个文件 = 一道题）。

```yaml
id: ch-pwnable-kr-fd               # 唯一 ID：ch-<platform>-<name>
name: fd
platform: pwnable.kr
event: ""                          # 非赛事题留空；赛事题写赛事名
year: ""                           # 赛事题年份；未知写 unknown
category: foundation               # foundation | core | advanced | specialization
difficulty: beginner               # beginner | basic | intermediate | advanced
url: http://pwnable.kr/play.php    # 题目入口（canonical）
knowledge_points:                  # 对应知识点 id
  - fnd-file-descriptor
prerequisites: []                  # 前置知识点 id
why_selected: |                    # 选择理由（教学价值导向）
  ...
verification_status: platform-and-challenge-verified   # 见取值
writeup:                           # writeup 指针
  external: []                     # 已验证的第三方 writeup（引用 writeups/ 条目 id）
  ai_summary: ""                   # 指向 writeups/ 下 AI 摘要文件（如有）
reproducibility: high              # high | medium | low | unknown（平台存活/环境可复现）
solution_free_note: ""             # 平台政策说明（如 pwn.college 禁公开题解）
```

## verification_status 取值

| 值 | 含义 |
|----|------|
| `platform-and-challenge-verified` | 平台与该题目页面均实际访问确认 |
| `platform-verified-challenge-listed` | 平台已验证，题目在已验证的官方列表中可见（详情页未逐个访问） |
| `platform-verified-challenge-unverified` | 仅平台验证；题目级未确认（不进入正式推荐，需补验） |

## 选择优先级（对应项目原则 §19）

`教学价值 > 知识点匹配 > 难度递进 > 可复现性 > 社区认可 > 数量`

## Hints 规则（对应项目原则 §21）

每道核心推荐题的正文包含渐进提示，使用 GitHub 折叠块：

```
<details><summary>Hint 1（方向性）</summary>…</details>
<details><summary>Hint 2（方法性）</summary>…</details>
<details><summary>Hint 3（关键细节）</summary>…</details>
```

- Hint 1 只给方向（"关注哪个输入路径"），**绝不直接给 payload**。
- Hint 2 给方法（工具/思路）。
- Hint 3 才允许给关键细节（偏移量级、函数名等），仍不提供完整 exp。
- 完整解法只存在于已验证的外部 writeup 或学习者自己的 notebook。
