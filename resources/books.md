# 书籍

> 原则：只记录书名/作者/出版社/官方页/适合阶段，**不上传、不链接盗版 PDF**。

```yaml
id: res-csapp
title: 'Computer Systems: A Programmer''s Perspective (3rd ed.) / 中文版《深入理解计算机系统》'
author: Randal E. Bryant, David R. O''Hallaron（CMU）
source: https://csapp.cs.cmu.edu/
url: https://csapp.cs.cmu.edu/
source_type: book
language: en（中文版由机械工业出版社出版）
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问 CMU 官方页（作者、Web Asides、课程材料）
license: 版权图书（官方页提供部分免费材料）
summary: 程序员视角的系统全景：数据表示/机器级程序/链接/虚拟内存——Foundation 的书级支柱。
why_useful: F-A~F-C 全阶段配读
related_knowledge: [fnd-c-memory, fnd-assembly, fnd-got-plt-fundamentals]
maintenance_status: active
---
id: res-hacking-arte
title: 'Hacking: The Art of Exploitation (2nd ed.)'
author: Jon Erickson
source: https://nostarch.com/hacking.htm
url: https://nostarch.com/hacking.htm
source_type: book
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问 No Starch 官方页（2008、ISBN、章节结构、配套 LiveCD）
license: 版权图书
summary: 从 C/汇编码到溢出/格式串/shellcode 的黑客视角经典（No Starch Press）。
why_useful: 漏洞视角的编程入门
related_knowledge: [fnd-c-memory, core-fmt-string]
maintenance_status: active
notes: 出版年较早（2008），缓解语境为旧时代——概念教学价值为主
---
id: res-book-linkers-loaders-cn
title: 《程序员的自我修养——链接、装载与库》
author: 俞甲子、石凡、潘爱民
source: unknown
url: unknown
source_type: book
language: zh
tier: RECOMMENDED
verified: false         # ⚠️ 书籍本身为公认中文经典；本轮 douban 等页面访问失败，URL 未验证
verified_date: 2026-09-27
verification_method: 待补（出版社/电商官方页人工核验）
license: 版权图书（电子工业出版社）
summary: 链接/装载/运行库的中文系统讲解——GOT/PLT 与动态链接的深度补充。
why_useful: fnd-got-plt-fundamentals 的进阶配读
related_knowledge: [fnd-got-plt-fundamentals, fnd-compiling-linking]
maintenance_status: active
notes: 请通过正规渠道购买/图书馆借阅；欢迎贡献者补充已验证的出版社官方链接
---
id: res-windows-internals
title: 'Windows Internals 7th edition (Part 1 & 2)'
author: Pavel Yosifovich, Alex Ionescu, Mark Russinovich, David Solomon（Part2 另有 Andrea Allievi）
source: https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals
url: https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals
source_type: book
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 访问 Microsoft Learn 官方页（作者、目录、购买链接、版本沿革）
license: 版权图书（Microsoft Press）
summary: Windows 内核机制权威（架构/进程线程/内存/IO/安全）——Windows Kernel 方向地基。
why_useful: spec-windows-kernel 的主参考
related_knowledge: [spec-windows-kernel]
maintenance_status: active
---
id: res-ctf-all-in-one
# 见 chinese.md（中文书籍条目）
---
id: res-arm-internals-azeria
title: 'Arm Assembly Internals & Reverse Engineering'（站点在售书信息）+ 免费 ARM 汇编系列
author: Azeria Labs（Maria Markstedter 署名体系）   # 以站点署名为准
source: https://azeria-labs.com/writing-arm-assembly-part-1/
url: https://azeria-labs.com/writing-arm-assembly-part-1/
source_type: article
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问 Part1 页（7 部系列结构、ARM exploit 系列预告、在售书信息）
license: unknown
summary: ARM 汇编 7 部免费系列（数据/寄存器→指令→内存→条件执行→栈与函数）。
why_useful: ARM 方向免费入门标准
related_knowledge: [spec-arm-aarch64]
maintenance_status: active
notes: 作者身份以站点署名为准（本条目不做作者推断）
```
