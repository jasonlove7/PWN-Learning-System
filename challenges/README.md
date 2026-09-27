# Challenge Database（官方推荐挑战库）

> 本库只收录**经过验证流程**的题目（schemas/challenge.md）。与个人积累本（notebook/）完全分离：**加入 notebook ≠ 官方推荐**。

## 分区与规模（v0.1 诚实计数）

| 分区 | 数量 | 来源构成 |
|------|------|----------|
| [foundation/](foundation/) | 6 | pwnable.kr Toddler's Bottle |
| [core/](core/) | 22 | ROP Emporium ×8、Nightmare 真题 ×12、pwnable.kr ×2 |
| [advanced/](advanced/) | 10 | Nightmare 堆题 ×7、pwnable.kr ×2、how2heap 实验 ×1 |
| [specializations/](specializations/) | 0（诚实：待专项验证） | — |

**总计 38 道已收录条目**（其中 38/38 平台级验证；题目级验证状态见各条目 frontmatter）。

## 验证状态说明（重要）

- `platform-and-challenge-verified`：题目页/清单直接核对（ROP Emporium 全部、pwnable.kr 全部）。
- `platform-verified-challenge-listed`：题目在已验证的官方清单/索引中可见（Nightmare 系：其首页索引逐题列出；pwnable.kr play 页逐题可见）。
- Nightmare 系题目的**题目本体**在各原赛事（CSAW/HITCON 等），本库以 Nightmare（已验证）为学习入口——原题 URL 未逐个验证，条目内如实标注。

## 使用纪律（学习循环）

```text
1. 独立尝试（≥30 分钟） → 2. Hint 1 → 再试（≥20 分钟） → 3. Hint 2 → 4. Hint 3 → 5. 外部 writeup → 6. 复盘进 notebook
```

- pwn.college 题目**不收录**（平台政策：不公开题解）。
- 每题的 `knowledge_points` 字段对应 knowledge/ 目录，先学后做。
