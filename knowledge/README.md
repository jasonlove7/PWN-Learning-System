# 知识库（Knowledge Base）

每个知识点 = 一个文件，带结构化 frontmatter（schema 见 [schemas/knowledge.md](../schemas/knowledge.md)）。

## 目录

| 区域 | 内容 | 文件数 |
|------|------|--------|
| [fundamentals/](fundamentals/) | Foundation：C / Linux / 汇编 / 调试 / ELF / 工具 | 15 |
| [stack/](stack/) | 栈溢出 / 缓解机制 / ret2win / ret2shellcode | 4 |
| [rop/](rop/) | ROP 渐进链：基础→ret2syscall→泄漏→ret2libc→专题 | 10 |
| [format-string/](format-string/) | 格式化字符串 | 1 |
| [heap/](heap/) | 堆：结构→tcache→原语→攻击面→现代组合 | 11 |
| [advanced/](advanced/) | IO_FILE / FSOP | 1 |
| [specializations/](specializations/) | 8 方向骨架知识点 | 8 |

## 状态约定

- `depth: full` —— 完整模块（含资源/挑战/复习闭环），如 [rop/ret2libc.md](rop/ret2libc.md)（Pilot）
- `depth: standard` —— 标准知识点
- `depth: skeleton` —— 骨架（specialization 方向），诚实标注待扩展

## 阅读方式

1. 按 [ROADMAP.md](../ROADMAP.md) 顺序进入。
2. 每个知识点先读 `objectives`（学完要能做什么），再读正文。
3. 学完立即做 `challenges` 字段指向的题（独立尝试 → 渐进 hint → writeup）。
