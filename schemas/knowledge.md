# Knowledge Point Schema

用于 `knowledge/**` 下每个知识点文件（一个文件 = 一个知识点）。

```yaml
id: core-ret2libc                 # 唯一 ID：<track>-<slug>
title: ret2libc                    # 显示名
description: 泄漏 libc 基址后返回 system() 完成 RCE 的核心利用方式

importance: 5                      # 1-5：对整个 PWN 学习体系的重要性
difficulty: 4                      # 1-5：学习/掌握该知识点本身的难度

track: mainline                    # mainline | specialization
type: technique                    # concept | technique | tool | environment | mitigation | lab

prerequisites:                     # 依赖的其他知识点 id
  - core-stack-overflow
  - core-rop-basics
  - core-got-plt-leak

why_learn: |                       # 为什么学（面向学习者的动机）
  ...

objectives:                        # 学完后应能做到什么（可检验）
  - ...

resources:                         # 资源条目（引用 resources/ 中的 id）
  - res-ctf-wiki-rop
challenges:                        # 对应挑战（引用 challenges/ 中的 id）
  - ch-ropemporium-callme
hints: []                          # 由挑战侧提供；知识点侧只留指引
writeups: []                       # 同上

review:                            # 复习建议
  method: 重做关联挑战 + 默写利用前提清单
  interval: 首次后 1 周 / 1 个月

sources:                           # 本知识点内容依据（研究溯源）
  - "CTF Wiki 中级 ROP (verified 2026-09-27)"

verification_status: verified      # 见 schemas/verification.md
last_verified: 2026-09-27
```

## 字段规则

- `id` 全局唯一，前缀约定：`fnd-`（foundation）、`core-`、`adv-`、`spec-`（specialization）。
- `importance` 判断的是**体系价值**（不学它是否影响后续学习/实战），`difficulty` 判断的是**掌握成本**。二者独立：例如 `ret2syscall` importance 4 / difficulty 3，`ret2dlresolve` importance 3 / difficulty 5。
- `objectives` 必须是可观察的行为（"能独立写出…"、"能解释…"），不是内容清单。
- `sources` 记录该知识点正文的技术依据；与 `resources`（推荐给学习者的材料）职责不同。
- Specialization 的骨架知识点允许 `depth: skeleton` 标注（frontmatter 可加 `depth: full | standard | skeleton`），并在正文显著标注研究不足处。
