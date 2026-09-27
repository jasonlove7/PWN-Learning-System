# Verification Schema（验证状态约定）

所有正式对象（知识点/资源/挑战/writeup）都必须携带验证信息。本项目的可信度建立在这些字段的**诚实**之上：宁可 `unverified`，不可编造。

## verification_status 取值（对象级）

| 值 | 含义 | 能否进入正式推荐区 |
|----|------|--------------------|
| `verified` | 维护者实际访问/核对过（有日期与方法） | ✅ |
| `partial-verified` | 部分核对（如平台验证、题目详情未读） | ✅ 但必须注明未验证部分 |
| `unverified` | 未验证 | ❌ 只能进 `research/unverified/` |
| `ai-generated` | AI 生成内容（叠加标记，不替代上述状态） | 视底层验证状态 |

## 验证清单（资源类，对应项目原则 §14）

```text
[ ] URL exists        — 实际请求过，非搜索结果
[ ] URL accessible    — 能正常读取内容（JS墙/登录墙如实记录）
[ ] Title matches     — 页面标题与所记录 title 一致
[ ] Author exists     — 作者信息来自页面本身；页面无作者信息 → unknown
[ ] Content matches   — 内容与描述/摘要相符
[ ] Source is real    — 非镜像/非钓鱼
[ ] Resource relevant — 与关联知识点确实匹配
[ ] No fabrication    — 无编造的作者/年份/结论
```

## 验证清单（挑战类，对应项目原则 §20）

```text
[ ] Challenge exists
[ ] Platform exists
[ ] Event exists（赛事题）
[ ] Year correct
[ ] URL correct
[ ] Category correct
[ ] Difficulty reasonable
[ ] Knowledge points match
[ ] Reproducibility considered（平台存活/环境说明）
[ ] Writeup corresponds to exact challenge（外部 writeup 对应关系）
```

## AI 生成内容叠加标记（项目原则 §42-44）

```yaml
source_type: ai_generated
verified: false            # 生成即未验证
# 若之后经过人工/技术核对：
verified: true
verification_method: <方法>   # 必填
# verified: true 时仍永久保留 source_type: ai_generated
```

## 失效复检

- 资源 URL 失效 → 将条目移入 `research/unverified/` 并在 CHANGELOG 记录，**不静默删除**。
- 任何 `verified: true` 条目建议每 6 个月复检一次（维护者工作，见 QUALITY-CHECK.md）。
