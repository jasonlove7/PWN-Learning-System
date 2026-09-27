# Quality Check

结构能否解析，用脚本。内容是否真实，靠本文件。脚本不会替你打开网页。

```bash
python scripts/validation/validate_metadata.py
```

## 关系规则

Challenge → Knowledge（`knowledge_points`）是主要关系。一道正式题至少指向一个存在的知识点。

Knowledge → Challenge（`challenges`）是辅助索引。不要求每道正式题都被某个知识点反指；能对上就写上。

还没有正式文件的题，只能出现在 `planned_challenges`，并带 `status: planned` 或 `research-needed`。不得放进 `challenges:`，否则校验失败。

Writeup 的 `challenge` 必须指向正式题。正式题的 `writeup.external` 必须指向 `writeups/` 里的文件。空列表写成 `[]`，不要留一个不存在的 id。

## Resource verification

进入 `resources/` 之前，维护者要自己打开原始页面，并记下：

| 项 | 要求 |
|----|------|
| 原始来源 | 作者站点或官方仓库，不用来路不明的镜像当唯一依据 |
| URL | 实际打开过。搜索摘要不算 |
| 作者 | 来自页面本身。没有就写 `unknown` |
| 发布时间 | 页面上有才写。没有就空着或 `unknown` |
| license | 页面上有才写。没有就 `unknown` |
| verified | `true` 或 `false` |
| verified_date | `true` 时必填，`YYYY-MM-DD` |
| verification_method | `true` 时必填，写你做了什么，不写「已检查」这种空话 |

`verified: false` 的条目如果留在 `resources/`，必须在 `notes` 里说明为什么没放进 `research/unverified/`。默认仍然是：没核对完就不要进推荐区。

## Challenge verification

正式题文件要能回答：

- 这道题是否存在（你打开的是哪一页）
- platform 是什么
- event / year：赛事题才填。页面没写年份就留空，不猜测
- category 与目录名一致：`foundation` / `core` / `advanced` / `specialization`
- difficulty 用 `beginner` / `basic` / `intermediate` / `advanced`，这是题的难度，不是知识点的 1–5
- URL 指向你打开的那一页。列表页就明确是列表页
- knowledge points 用的是 `knowledge/` 里真实存在的 id
- writeup correspondence：只有打开过、并且确认就是这道题，才建 `writeups/external/` 条目并标 `correspondence: verified`

`platform-verified-challenge-listed` 表示索引里见过名字，没有打开深页。不要把这种题说成「已核对 writeup」。

## AI content

AI 生成的正文必须同时满足：

- 文中能看到 `⚠️ AI Generated`（或同义的「AI Generated」标记）
- `source_type: ai_generated`
- 默认 `verified: false`

若有人对照原页面或实际运行核对过，可以把 `verified` 改为 `true`，但必须写 `verification_method`，并且保留 AI 标记。校验脚本会拒绝「AI 且 verified true 却没有方法」的条目。

用 AI 起草一道题时，题必须在真实环境里跑通，利用链要有人看过，然后才能标成已核对。没跑过的题不得进入 `challenges/`。

不要把 AI 摘要写成某个真实作者的文章。

## Copyright

不把第三方文章、writeup、课程、幻灯片整篇抄进仓库。只保留链接、作者、和自己的短摘要。

不上传 PDF，不链接盗版。书籍写书目和正版来源。

带 NC（非商用）的材料，例如 RPISEC MBE，在条目里写明限制。

## Privacy

不得提交：

- API key、token、password、private key、cookie
- `.env` 及同类文件（已在 `.gitignore`）
- 真实私人服务器地址
- 私人 CTF flag
- 未公开的题目文件
- 他人的姓名、联系方式、学号、学校

`notebook/personal/` 被忽略。不要用 `git add -f` 把里面的文件加进来。

## 复检

`verified: true` 的 URL 建议每 6 个月看一次。失效时把条目挪到 `research/unverified/` 并在 CHANGELOG 记一笔，不要悄悄删掉。
