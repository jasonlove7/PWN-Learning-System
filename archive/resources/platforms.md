# 挑战与课程平台

```yaml
id: res-ropemporium
title: ROP Emporium
author: unknown            # 站点未署名（同时维护 HeapLAB 课程的独立作者）
source: https://ropemporium.com/
url: https://ropemporium.com/
source_type: wargame
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问首页与 ret2win/ret2csu 挑战页，核对 8 关清单与架构支持
license: unknown
summary: 渐进式 ROP 教学挑战（ret2win→split→callme→write4→badchars→fluff→pivot→ret2csu），x86_64/x86/ARMv5/MIPSel 四架构。
why_useful: ROP 主线的最佳实践阶梯，被本项目采纳为 C-2~C-4 阶段标准训练
related_knowledge: [core-rop-basics, core-ret2csu, core-stack-pivot]
maintenance_status: active
notes: 挑战免费；站内推广的 HeapLAB 为付费课程（未验证，不在推荐范围）
---
id: res-pwnable-kr
title: pwnable.kr
author: pwnable.kr 维护团队
source: http://pwnable.kr/play.php
url: http://pwnable.kr/play.php
source_type: wargame
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问 play.php，完整核对四个难度区题目列表（fd/collision/bof/.../uaf 等）
license: unknown
summary: 经典韩系 wargame，四个梯度（Toddler's Bottle→Rookiss→Grotesque→Hacker's Secret 内核题）。
why_useful: Foundation/Core/Advanced 各阶段的经典题源；Toddler's Bottle 是全球最常用的入门题集之一
related_knowledge: [fnd-linux-syscalls, core-stack-overflow, adv-uaf-double-free]
maintenance_status: active
notes: 部分题环境老旧（正是历史技术语境的学习价值）
---
id: res-nightmare
title: Nightmare — Binary Exploitation / RE course (guyinatuxedo)
author: guyinatuxedo
author_url: https://guyinatuxedo.github.io/
source: https://guyinatuxedo.github.io/
url: https://guyinatuxedo.github.io/
source_type: course-platform
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问首页；核对 45 模块完整索引与 90+ 真题（CSAW/HITCON/PlaidCTF 等）
license: unknown            # 源码在 github.com/guyinatuxedo/nightmare，未在页内见许可声明
summary: 基于真实 CTF 真题的二进制利用教学课程，每题带完整讲解 writeup；覆盖栈→ROP→格式串→堆→FILE。
why_useful: 本项目 Challenge Database 的主要真题来源与外部 writeup 入口
related_knowledge: [core-ret2libc, adv-uaf-double-free, adv-io-file]
maintenance_status: unknown
notes: 无内核模块（纯用户态）
---
id: res-pwn-college
title: pwn.college
author: Arizona State University (ASU) 团队
source: https://pwn.college/
url: https://pwn.college/
source_type: course-platform
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问首页核对定位/免费性/dojo 结构与 writeup 政策
license: 非商业使用需署名（讲座/幻灯片；平台核心设施开源）
summary: ASU 大学级免费实践平台（dojo+腰带制），覆盖程序安全到内核。
why_useful: 大学级系统课程 + 在线评测环境
related_knowledge: [core-stack-overflow, spec-linux-kernel]
maintenance_status: active
notes: ⚠️ 平台明示不要公开其题目 writeup（用于大学评分）——本项目遵守：只收录平台级条目
---
id: res-pwnable-tw
title: pwnable.tw
author: pwnable.tw 维护团队
source: https://pwnable.tw/
url: https://pwnable.tw/
source_type: wargame
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问首页确认平台定位（binary exploiting wargame）；题目列表在登录墙后（题目级未验证）
license: unknown
summary: 高难度 binary wargame（start/orw 起步，整体难度高于 pwnable.kr）。
why_useful: Core 后期与 Advanced 阶段的进阶题源
related_knowledge: [core-ret2libc, adv-uaf-double-free]
maintenance_status: unknown
notes: 需注册；题目级验证待人工流程（ROADMAP-RESEARCH §8）
---
id: res-pwnable-xyz
title: pwnable.xyz
author: OpenToAll CTF team
source: https://pwnable.xyz/
url: https://pwnable.xyz/
source_type: wargame
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问首页（2019 上线、团队归属、规则与社区链接）
license: unknown
summary: 面向初学者的现代 wargame，题目带渐进难度变体。
why_useful: pwnable.kr 之外的补充入门题源
related_knowledge: [core-stack-overflow]
maintenance_status: unknown
---
id: res-picoctf
title: picoCTF（过渡至 CyLab Security Academy）
author: Carnegie Mellon University (CyLab)
source: https://picoctf.org/
url: https://picoctf.org/
source_type: wargame
language: en
tier: SUPPLEMENTARY
verified: true
verified_date: 2026-09-27
verification_method: 访问 picoctf.org 核对过渡公告；play.picoctf.org 为 JS 应用无法自动读取
license: unknown
summary: CMU 面向新手的 CTF 教育平台；2026 年正过渡并入 CyLab Security Academy（免费）。
why_useful: 零基础第一个 CTF 的友好入口（binary exploitation 分类）
related_knowledge: [core-stack-overflow]
maintenance_status: active
notes: 平台迁移期，入口以官方公告为准；题目级未验证
---
id: res-how2heap
title: how2heap
author: shellphish
source: https://github.com/shellphish/how2heap
url: https://github.com/shellphish/how2heap
source_type: repo
language: en
tier: CORE
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库核对 glibc 2.23–2.43 版本化组织、技术清单（tcache/house of */safe-linking）、MIT 许可
license: MIT
summary: 按版本组织的堆利用可执行示例集（fastbin/tcache/house of *），与真实 CTF 题互链。
why_useful: 堆方向的实验室标准（也是本仓库版本断代时间线依据）
related_knowledge: [adv-heap-overview, adv-tcache, adv-house-of]
maintenance_status: active
```
