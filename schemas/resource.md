# Resource Schema

用于 `resources/**` 中每条外部资源条目。

```yaml
id: res-ctf-wiki                   # 唯一 ID：res-<slug>
title: CTF Wiki — Pwn 章节
author: CTF Wiki Team              # 未知写 unknown，禁止猜测
source: https://ctf-wiki.org/      # 原始 URL（canonical）
url: https://ctf-wiki.org/
source_type: community-wiki        # 见下方取值
language: zh                       # zh | en | zh-en
tier: CORE                         # CORE | RECOMMENDED | SUPPLEMENTARY | ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 直接访问页面并核对章节结构
license: unknown                   # 尽量记录；查不到写 unknown
summary: |                         # 简短摘要（≤120字，不复制原文）
  ...
why_useful: 覆盖主线全部主题的中文参考
related_knowledge:                 # 关联知识点 id
  - core-stack-overflow
  - adv-heap-overview
maintenance_status: active         # active | stale | archived | unknown
notes: ""                          # 特别提醒（如"请勿公开writeup"）
```

## source_type 取值

`community-wiki` | `book` | `course-platform` | `wargame` | `tool` | `official-docs` | `article` | `video` | `forum` | `repo`

## tier 规则（对应项目原则 §15）

- **CORE**: 进入正式推荐区的最高置信资源；必须 `verified: true` 且与知识点强匹配。
- **RECOMMENDED**: 已验证的高质量补充。
- **SUPPLEMENTARY**: 已验证但有局限（过时/覆盖窄/需甄别），必须带 `notes` 说明局限。
- **ADVANCED**: 面向进阶方向，前置要求高。
- 正式推荐区**禁止** `UNVERIFIED`；未验证资源只能进入 `research/unverified/`。

## 硬性要求

1. `verified: true` 必须附 `verified_date` 与 `verification_method`。
2. 摘要用自己的话概括，**不复制第三方原文**（版权原则）。
3. 带 NC（非商用）许可的资源必须写明（如 RPISEC MBE 讲义）。
4. 外部资源作者身份不明时写 `unknown`，绝不推断。
