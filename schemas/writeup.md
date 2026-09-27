# Writeup Schema

用于 `writeups/**`。**三类 writeup 绝对不允许混淆**：

## 1. External Writeup（第三方作者）

```yaml
id: wu-nightmare-babyboi
type: external
challenge: ch-csaw19-babyboi       # 对应 challenge id
author: guyinatuxedo               # 第三方作者（未知写 unknown）
author_url: https://guyinatuxedo.github.io/
url: https://guyinatuxedo.github.io/   # 原始 writeup URL
correspondence: verified           # verified | unverified —— 是否核对过"该writeup确属该题"
verified: true
verified_date: 2026-09-27
summary: |                         # 自己的话概述其思路（不复制原文）
  ...
```

## 2. AI Summary（AI 对第三方 writeup 的总结）

```yaml
id: wu-ai-babyboi-summary
type: ai_summary
source_type: ai_generated          # 永久保留 AI 标识
challenge: ch-csaw19-babyboi
based_on:                          # 它总结了谁
  - wu-nightmare-babyboi
verified: true | false             # 验证 = 有维护者对照原始 writeup 核对过技术事实
verification_method: 人工对照原 writeup 核对利用链各步骤
ai_disclosure: 本文件由 AI 生成并经人工核对；引用时请注明原始 writeup
```

## 3. My Writeup（学习者本人）

- 存放于 `notebook/**/my-writeup.md`，**不属于本目录**。
- 使用 notebook 模板结构（见 [notebook.md](notebook.md)）。

## 硬性规则

1. `type: external` 必须验证作者、URL、题目对应关系三者；对应关系未核对只能标 `correspondence: unverified` 且不得进入正式推荐链路。
2. `type: ai_summary` 即使 `verified: true` 也**永久保留 AI 标识**（项目原则 §42）。
3. 本目录不存放第三方 writeup 全文，只存：元数据 + 链接 + 自述摘要。
