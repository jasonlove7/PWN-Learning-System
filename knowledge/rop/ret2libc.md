---
id: core-ret2libc
title: ret2libc（Pilot 完整模块）
description: 泄漏 libc 基址后返回 system()/one_gadget 完成 RCE 的核心利用范式
importance: 5
difficulty: 4
track: mainline
type: technique
depth: full
prerequisites:
  - core-stack-overflow
  - core-rop-basics
  - core-leak-basics
  - core-libc-basics
why_learn: |
  动态链接 + ASLR 时代的万能范式：先泄漏、后计算、再打击。CTF 中频次最高、教学价值最大的单一技术。
  本模块是项目的 Pilot：knowledge + resources + challenges + 渐进 hints + writeups 指引 + 复习方案的完整闭环示例。
objectives:
  - 能对"NX 开、动态链接、有输出函数"的标准题独立完成全流程
  - 能解释每个环节的失败模式（对齐/短读/版本错/libc 符号缺失）
  - 能举出 ret2libc 的三种出口变体：system("/bin/sh")、one_gadget、syscall 组合
resources:
  - res-ctf-wiki-stack-intro
  - res-nightmare
  - res-ctf-all-in-one
  - res-libc-database
  - res-one-gadget
challenges:
  - ch-nightmare-csaw19-babyboi
  - ch-nightmare-utc19-shellme
  - ch-nightmare-fb19-overfloat
  - ch-nightmare-csaw17-svc
  - ch-nightmare-hs19-storytime
hints:
  - 挑战文件内渐进提供（Hint1→2→3），禁止跳级
writeups:
  - wu-nightmare-index          # 外部 writeup 入口（guyinatuxedo 的本题讲解）
  - wu-ai-babyboi-summary       # AI 摘要示例（已标注）
review:
  method: |
    1 周后无提示重做 csaw19_babyboi；
    1 个月后换 fb19_overfloat（浮点输入变体）检验迁移能力；
    默写两段式 payload 结构与四个易错点。
  interval: 1 周 / 1 个月 / 进入堆方向前
sources:
  - "CTF Wiki 中级ROP ret2libc 章节存在性 (verified 2026-09-27, ctf-wiki.org 导航)"
  - "Nightmare §5 ROP Dynamically Compiled 五题清单 (verified 2026-09-27)"
  - "《CTF竞赛权威指南(Pwn篇)》ret2libc 章 (verified 2026-09-27, 仓库与书籍信息)"
verification_status: verified
last_verified: 2026-09-27
---

# ret2libc —— Pilot 完整模块

> 本文件是所有知识点的**模板级实现**：知识本体 → 资源 → 挑战 → 渐进提示 → writeup 指引 → 复习方案，全链路齐备。

## 1. 知识本体

### 1.1 问题设定
```text
缓解: NX 开（不能注入执行）/ 动态链接（libc 里有一切）/ ASLR 开（地址未知）
程序: 有溢出 + 有可用的输出函数（puts/printf/write）
```

### 1.2 核心思想
**不注入代码，而是复用 libc 里的代码**：libc 永远在内存里（动态链接保证），里面有 `system`、`"/bin/sh"` 字符串、syscall 指令。唯一的问题是**它在哪**（ASLR）→ 所以先泄漏。

### 1.3 完整利用流程（两段式）
```text
第一段（泄漏）
  溢出 → ROP: puts(puts@got) → 回到 main（重开第二轮）
  → 得到 puts 的真实 libc 地址

中间（计算）
  libc_base = leak - libc_sym(puts)        ← 需要"远程 libc 版本"先确定！
  system = libc_base + libc_sym(system)
  binsh  = libc_base + libc_sym("/bin/sh")

第二段（打击）
  溢出 → ROP: system("/bin/sh")
  或 one_gadget（注意约束）
```

### 1.4 三种出口变体
| 出口 | 链形 | 使用时机 |
|------|------|----------|
| system("/bin/sh") | pop rdi; binsh; system | 标准；注意栈对齐 |
| one_gadget | 单地址 | 写原语受限时（fmt/堆）；约束要试 |
| execve syscall 链 | ret2syscall 的 libc 版 | system 不可用/orw 沙箱 |

### 1.5 失败模式清单（做题时逐条对照）
- [ ] **短读**：recvline 拿不满 8 字节 → `ljust(8, b'\x00')`
- [ ] **版本错**：末 12bit 反查没做 / 附件 libc 没用 → 打印出的地址"差一点"就是这种
- [ ] **栈对齐**：system 内 movaps 崩 → 垫 `ret`
- [ ] **返回点选错**：第二段没地方再溢出 → 返回 vuln/main 而不是 exit
- [ ] **符号缺失**：strip 过的 libc → 用 pwntools ELF 仍可按动态符号取
- [ ] **缓冲区交互**：sendline 的 \n 混进下一轮 recv → 用 sendafter 精确同步

## 2. 资源（全部已验证，详见 resources/）

| 资源 | 用途 |
|------|------|
| CTF Wiki 中级 ROP | 中文原理讲解（对照本文件交叉验证） |
| Nightmare §5 | 本模块全部 5 道题的逐题 writeup（英文） |
| 《CTF竞赛权威指南(Pwn篇)》 | 中文系统化书籍版讲解 |
| libc-database / libc.rip | 版本锁定 |
| one_gadget | 出口变体 |

## 3. 挑战（难度递进，全部在 challenges/core/ 有完整条目+渐进 hint）

| 顺序 | 题 | 变体特征 |
|------|-----|----------|
| 1 | csaw19_babyboi | 标准题：puts 泄漏 + 回 main + system |
| 2 | utc19_shellme | 极简缓冲，考验对齐与返回点 |
| 3 | hs19_storytime | 大缓冲（read 满读） |
| 4 | csaw17_svc | 输出函数受限变体 |
| 5 | fb19_overfloat | 浮点输入解析（输入编码变体，综合检验） |

## 4. 渐进提示使用纪律

- 每个挑战文件内有 Hint1(方向)→Hint2(方法)→Hint3(细节)。
- **规则：独立尝试 ≥30 分钟才开 Hint1；Hint1 后再尝试 ≥20 分钟才开 Hint2。**
- 看完 Hint 写出的 exp 也必须能独立解释每一行为什么存在。

## 5. Writeup 指引

1. 先自己做 → 卡死 → 渐进 hint → 仍卡 → 外部 writeup（Nightmare 对应页面，索引已验证：https://guyinatuxedo.github.io/ ，§5 ROP Dynamically Compiled）。
2. AI 摘要（`writeups/ai-summaries/csaw19-babyboi.summary.md`）标注了 `ai_generated`，核对过技术事实但**永久保留 AI 标识**。
3. 复盘产物写入 `notebook/rop/my-writeup.md`（模板见 schemas/notebook.md）。

## 6. 复习方案

| 时间 | 动作 | 通过标准 |
|------|------|----------|
| +1 周 | 无提示重做 babyboi | exp 一次跑通，能讲清 4 个易错点 |
| +1 个月 | 做 overfloat（变体迁移） | 独立完成，hint ≤1 |
| 进入堆方向前 | 默写两段式结构 | 白纸写出完整 payload 布局 |

## 7. 与相邻知识点的关系

- 上游：[leak-basics](leak-basics.md)（为什么能泄漏）、[libc-basics](libc-basics.md)（版本怎么定）
- 平行：[partial-overwrite](partial-overwrite.md)（泄漏不可用时的替代）、[ret2csu](ret2csu.md)（gadget 缺 rdx 时）
- 下游：[fmt-string](../format-string/fmt-string.md)（更强的泄漏+写原语）、堆方向（现代题主战场）
