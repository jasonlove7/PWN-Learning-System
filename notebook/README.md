# 个人积累本（Personal Notebook）

这里记**你自己**的题：值得重做的、卡住很久的、想留下自己写法的。

它不是成绩单，没有经验值、等级、排名、打卡或分数。

`solved` 只有两档：未解决 / 已解决。`review_later` 只有 true / false。

## 和正式题库的区别

| | `challenges/` | `notebook/` |
|--|----------------|-------------|
| 谁维护 | 本仓库的推荐题 | 你自己 |
| 加入这里意味着 | 经过验证流程 | 你觉得值得留 |
| 能否公开别人的 flag、私人服务器 | 不能 | 同样不能 |

官方题可以出现在 notebook 里（填 `challenge_id`）。notebook 里的题不会因此变成官方推荐。

## 怎么用

1. 复制 [_template.md](_template.md)，改名，例如 `2026-0001-ret2win.md`。
2. 你自己的 writeup 可以放在同一条旁边，或把正文写进 `my_notes`。
3. 不想公开的内容放进 `notebook/personal/`。该目录已被 `.gitignore` 排除，不要把里面的文件强行加进 git。

公开仓库里的笔记不要写：真实姓名、QQ、微信、手机、学号、学校、私人服务器、密钥、私人 flag、未公开题目文件。

## 字段

模板与 [../schemas/notebook.md](../schemas/notebook.md) 一致。`difficulty` 是题目或平台的难度；`difficulty_for_me` 是你自己的感觉，两者不要合成一个分数。
