# 元数据校验

```bash
python scripts/validation/validate_metadata.py
```

不需要第三方库。用标准库解析本仓库用到的 YAML 子集。

## 它检查什么

- `knowledge/`、`challenges/`（不含 README 与模板）的 frontmatter 能否解析
- 这些文件的必填字段是否在
- `id` 在各自类型内是否重复
- `knowledge_points`、`prerequisites`、`resources`、`challenges`、`writeups`、writeup 的 `challenge` 是否指向已存在的 id
- `planned_challenges` 不得使用已经存在的正式 challenge id
- `difficulty` / `importance` / `verification_status` / `tier` 等是否落在约定取值里
- 任何 `source_type: ai_generated` 必须 `verified: false`，除非同时写了 `verification_method`

## 它不检查什么

- URL 能否打开
- 题目、作者、年份是否真实
- 正文技术是否正确

这些靠人工，规则在 [../../QUALITY-CHECK.md](../../QUALITY-CHECK.md)。

退出码：有 error 为 1，否则为 0。warning 不导致失败。
