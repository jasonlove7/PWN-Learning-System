# Schemas（数据结构规范）

本目录定义 PWN Learning System 中所有结构化数据的规范。所有正式数据以 **Markdown + YAML frontmatter** 形式存储（GitHub 原生可读、可被脚本解析、无构建依赖）。

| Schema | 文件 | 用于 |
|--------|------|------|
| Knowledge Point | [knowledge.md](knowledge.md) | `knowledge/**` 每个知识点 |
| Resource | [resource.md](resource.md) | `resources/**` 每条外部资源 |
| Challenge | [challenge.md](challenge.md) | `challenges/**` 每道官方推荐题 |
| Writeup | [writeup.md](writeup.md) | `writeups/**` 外部 writeup / AI 摘要 |
| Notebook Entry | [notebook.md](notebook.md) | `notebook/**` 个人积累条目 |
| Verification | [verification.md](verification.md) | 所有对象的验证状态字段约定 |

## 通用约定

1. **frontmatter 必须可被 YAML 解析器解析**（`scripts/validation/validate_metadata.py` 校验必填字段与取值域）。
2. **未知信息写 `unknown`，禁止猜测**（作者、年份、URL 一律如此）。
3. 所有对象必须包含 `verification_status` 与 `last_verified`（见 [verification.md](verification.md)）。
4. Importance 与 Difficulty 是**两个独立维度**，取值 `1`–`5`（显示为 ⭐ 重复次数），绝不允许混用。
5. 日期一律 `YYYY-MM-DD`。
