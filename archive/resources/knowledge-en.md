# 英文知识参考

```yaml
id: res-nightmare
# 见 platforms.md（res-nightmare 同一条目，跨区引用）
---
id: res-ir0nstone-notes
title: ir0nstone's Cybersecurity Notes
author: Andrej Ljubic (ir0nstone)
author_url: https://ir0nstone.gitbook.io/notes
source: https://ir0nstone.gitbook.io/notes
url: https://ir0nstone.gitbook.io/notes
source_type: article
language: en
tier: RECOMMENDED
verified: true
verified_date: 2026-09-27
verification_method: 访问 GitBook 首页（作者署名、二进制利用主线+入门堆定位）
license: unknown
summary: 个人二进制利用笔记：栈（ret2win/shellcode/ROP/格式串）为主线，附入门堆与逆向杂记。
why_useful: 另一套独立叙述视角（交叉验证用）
related_knowledge: [core-ret2win, core-rop-basics]
maintenance_status: unknown
notes: 旧域名 ir0nstone.github.io 已失效（404），以 GitBook 为准
---
id: res-sploitfun-malloc
title: Understanding glibc malloc
author: sploitfun
source: https://sploitfun.wordpress.com/2015/02/10/understanding-glibc-malloc/
url: https://sploitfun.wordpress.com/2015/02/10/understanding-glibc-malloc/
source_type: article
language: en
tier: SUPPLEMENTARY
verified: true
verified_date: 2026-09-27
verification_method: 访问文章（2015-02-10、arena/chunk/bin 细节核对）
license: unknown
summary: 经典 glibc malloc 内部机制图解（chunk/bin/arena/线程）。
why_useful: 堆结构直觉建立的最好图解之一
related_knowledge: [adv-heap-overview, adv-heap-bins]
maintenance_status: stale
notes: 基于 glibc 2.23 时代——无 tcache/safe-linking；必须配 how2heap 现代版食用
---
id: res-rpisec-mbe
title: RPISEC Modern Binary Exploitation (MBE)
author: RPISEC（Rensselaer Polytechnic Institute 学生安全俱乐部）
source: https://github.com/RPISEC/MBE
url: https://github.com/RPISEC/MBE
source_type: course-platform
language: en
tier: SUPPLEMENTARY
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（2015 春季课程、讲义+Lab+VM 下载、许可信息）
license: 代码 BSD-2；讲义 CC BY-NC 4.0（非商用）
summary: 2015 年大学课程归档：RE/内存破坏/ROP/堆/内核/ARM 全覆盖（讲义+Lab）。
why_useful: 历史 Lab 仍是好练习；课程组织可借鉴
related_knowledge: [core-rop-basics, adv-uaf-double-free]
maintenance_status: archived
notes: 讲义 CC BY-NC（引用注意非商用）；环境 Ubuntu14.04 需其 VM
---
id: res-naetw-pwn-tips
title: CTF-pwn-tips
author: Naetw
source: https://github.com/Naetw/CTF-pwn-tips
url: https://github.com/Naetw/CTF-pwn-tips
source_type: repo
language: en
tier: SUPPLEMENTARY
verified: true
verified_date: 2026-09-27
verification_method: 访问仓库（1.8k stars、作者自述不再维护）
license: unknown
summary: CTF pwn 常用技巧清单（溢出函数表、hook 劫持、environ 泄漏等）。
why_useful: 技巧速查的历史价值
related_knowledge: [core-leak-basics]
maintenance_status: stale
notes: ⚠️ 作者明示部分内容过时且不再更新（__malloc_hook 等已随 glibc 2.34 失效）
---
id: res-phrack
title: Phrack Magazine
author: Phrack 编辑团队（各期作者署名于文章）
source: http://www.phrack.org/
url: http://www.phrack.org/
source_type: article
language: en
tier: ADVANCED
verified: true
verified_date: 2026-09-27
verification_method: 访问站点（可访问、电子杂志定位）
license: 各篇文章自行声明
summary: 历史 e-zine：unlink 时代至现代的多篇奠基性利用文章。
why_useful: 技术源头的深度阅读
related_knowledge: [adv-unsafe-unlink]
maintenance_status: unknown
---
id: res-liveoverflow
title: LiveOverflow (YouTube 频道)
author: LiveOverflow
source: https://www.youtube.com/@LiveOverflow
url: https://www.youtube.com/@LiveOverflow
source_type: video
language: en
tier: RECOMMENDED
verified: false          # ⚠️ 部分验证：频道 handle 解析成功但 Cookie 同意墙阻止内容读取
verified_date: 2026-09-27
verification_method: handle 解析至 YouTube 同意页（存在性确认；内容未自动读取）
license: unknown
summary: 二进制利用/CTF 视频教程频道（知名度高，社区广泛引用）。
why_useful: 视频学习偏好的补充
related_knowledge: [core-stack-overflow]
maintenance_status: unknown
notes: 因验证方法受限标记 false；社区常识级资源，欢迎贡献者人工复核后改 true
```
