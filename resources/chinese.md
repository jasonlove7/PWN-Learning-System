# 中文核心资源

```yaml
id: res-ctf-wiki
title: CTF Wiki（Pwn 章节）
author: CTF Wiki Team（ctf-wiki 组织）
source: https://ctf-wiki.org/
url: https://ctf-wiki.org/
source_type: community-wiki
language: zh
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问首页核对完整导航；深页验证 stack-intro 与 heap-overview 两页；注意 /pwn/ 落地页 404（需从导航进入）
license: unknown            # 仓库 ctf-wiki/ctf-wiki 的许可未在本轮核对
summary: 中文社区标准 CTF 知识库；Pwn 章覆盖用户态（栈/ROP/格式串/堆/IO_FILE）→内核→Windows→沙箱→虚拟化→浏览器。
why_useful: 主线全阶段的中文对照权威
related_knowledge: [core-stack-overflow, adv-heap-overview, spec-linux-kernel]
maintenance_status: active
notes: 建议从首页导航进入具体章节；引用具体页时用已验证深链
---
id: res-ctf-wiki-stack-intro
title: CTF Wiki — 栈介绍
author: CTF Wiki Team
source: https://ctf-wiki.org/pwn/linux/user-mode/stackoverflow/x86/stack-intro/
url: https://ctf-wiki.org/pwn/linux/user-mode/stackoverflow/x86/stack-intro/
source_type: community-wiki
language: zh
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问该深页并核对内容（x86/x64 参数差异、栈方向）
license: unknown
summary: 栈溢出学习前的中文栈结构速览（含 x86/x64 调用差异）。
why_useful: Foundation F-A/F-B 阶段的直接读物
related_knowledge: [core-stack-overflow]
maintenance_status: active
---
id: res-ctf-wiki-heap-overview
title: CTF Wiki — 堆概述
author: CTF Wiki Team
source: https://ctf-wiki.org/pwn/linux/user-mode/heap/ptmalloc2/heap-overview/
url: https://ctf-wiki.org/pwn/linux/user-mode/heap/ptmalloc2/heap-overview/
source_type: community-wiki
language: zh
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问该深页并核对内容（brk/mmap/arena/malloc-free 语义）
license: unknown
summary: glibc 堆入门中文详解（heap 概念→brk/mmap→多线程 arena）。
why_useful: Advanced A-1 阶段读物
related_knowledge: [adv-heap-overview]
maintenance_status: active
---
id: res-ctf-wiki-elf
title: CTF Wiki — Executable(ELF) 章
author: CTF Wiki Team
source: https://ctf-wiki.org/
url: https://ctf-wiki.org/
source_type: community-wiki
language: zh
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 首页导航确认章节存在（"可执行文件 ELF"顶级章节）；深页未逐个验证
license: unknown
summary: ELF 结构中文讲解（sections/segments/符号/重定位）。
why_useful: fnd-elf 的中文对照
related_knowledge: [fnd-elf]
maintenance_status: active
notes: 从首页导航"可执行文件"进入
---
id: res-ctf-all-in-one
title: 《CTF竞赛权威指南(Pwn篇)》及配套仓库 CTF-All-In-One
author: 杨超（著）；吴石（腾讯 Keen Lab，审校）
source: https://github.com/firmianay/CTF-All-In-One
url: https://github.com/firmianay/CTF-All-In-One
source_type: book
language: zh
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库核对书籍信息（12 章结构/作者/审校/CC-BY-SA-4.0/GitBook 版）
license: CC-BY-SA-4.0（仓库内容）
summary: 系统化中文 Pwn 书籍（电子工业出版社）配套仓库，含样章与幻灯片。
why_useful: 主线系统学习的中文书籍支柱
related_knowledge: [core-ret2libc, adv-heap-overview]
maintenance_status: stale
notes: Reverse/Web 卷未完成（仓库自述）；Pwn 卷为完整出版书
---
id: res-kanxue
title: 看雪安全社区
author: 看雪（Pediy）运营团队
source: https://bbs.kanxue.com/
url: https://bbs.kanxue.com/
source_type: forum
language: zh
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问论坛首页（2000 年至今、板块结构、活跃度）
license: 各帖版权归作者
summary: 老牌中文安全论坛（逆向/二进制漏洞/CTF 板块）。
why_useful: 中文深度文章与讨论的持续来源
related_knowledge: []
maintenance_status: active
---
id: res-xianzhi
title: 先知社区（阿里云）
author: 阿里云安全
source: https://xz.aliyun.com/
url: https://xz.aliyun.com/
source_type: forum
language: zh
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问首页（热门文章、活动、活跃度）
license: 各帖版权归作者
summary: 阿里云安全技术社区，漏洞分析类中文文章集中地。
why_useful: 中文 writeup/研究文章来源
related_knowledge: []
maintenance_status: active
---
id: res-52pojie
title: 吾爱破解
author: 吾爱破解社区
source: https://www.52pojie.cn/
url: https://www.52pojie.cn/
source_type: forum
language: zh
tier: SUPPLEMENTARY
verified: true
verified_date: 2026-09-27
verification_method: 访问首页（约 145 万会员、板块结构）
license: 各帖版权归作者
summary: 超活跃中文逆向/脱壳论坛。
why_useful: Windows 逆向方向（Foundation 的逆向补充需求）
related_knowledge: [fnd-binary-tools]
maintenance_status: active
notes: 侧重 Windows 逆向/破解，Pwn 覆盖弱；注意甄别资源区内容合规性
```
