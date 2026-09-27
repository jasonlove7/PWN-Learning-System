# ROADMAP-RESEARCH

> 本文档记录 PWN Learning System 路线图的研究过程、来源、交叉验证结果、发现的冲突以及最终决策。
> 它是路线图的"证据链"：路线不是凭空生成的，每一条主线顺序决策都可以在本文档中找到依据。

- **研究日期**: 2026-09-27
- **研究方法**: 对候选来源逐一进行实际访问（HTTP fetch + 渲染阅读），记录可验证的事实；无法访问或无法确认的内容一律标记 `unverified`，不进入正式推荐区。
- **研究工具限制说明**: 部分站点（JS 渲染型 SPA、带 Cookie 同意墙的站点、反爬站点）无法被自动化工具完整读取。这类来源只记录"平台存在性已验证 / 内容未验证"的诚实状态，见 §6。
- **本研究的边界**: 本轮研究覆盖主线（Foundation / PWN Core / Advanced Heap）与 8 个 Specialization 的**入口级**来源。Specialization 内部的深阶资源（具体 CVE writeup、具体课程章节）标注为"待扩展研究"，不冒充已完成。

---

## 1. 来源清单（Sources）

图例: ✅ = 已实际访问验证（2026-09-27） | ⚠️ = 部分验证（存在性确认，内容未读取） | ❌ = 验证失败（记录于 `research/unverified/`）

### 1.1 中文核心来源

| # | 来源 | URL | 类型 | 验证 | 关键发现 |
|---|------|-----|------|------|----------|
| S1 | CTF Wiki（Pwn 章节） | https://ctf-wiki.org/ | 社区 Wiki（中文） | ✅ | 中文社区标准参考。Pwn 章节结构：Linux 用户态（栈溢出→ROP 三级→格式化字符串→堆 Ptmalloc2→IO_FILE）→ Linux 内核态 → Windows → 沙箱逃逸 → 虚拟化 → 浏览器 → 硬件。注意：`/pwn/` 落地页本身 404，需从首页导航进入（已验证深页：栈介绍、堆概述）。 |
| S2 | 《CTF竞赛权威指南(Pwn篇)》杨超 著（firmianay/CTF-All-In-One） | https://github.com/firmianay/CTF-All-In-One | 出版书籍配套仓库（中文） | ✅ | 系统化中文 Pwn 书籍（电子工业出版社），腾讯 Keen Lab 吴石审校。仓库 4.5k stars，CC-BY-SA-4.0。Reverse/Web 卷仍在编写中（诚实记录：项目部分停滞）。 |
| S3 | 看雪安全社区 | https://bbs.kanxue.com/ | 论坛（中文） | ✅ | 2000 年至今运营，约 95 万会员；板块覆盖逆向、二进制漏洞、CTF(Pwn)、移动安全。活跃。 |
| S4 | 先知社区（阿里云） | https://xz.aliyun.com/ | 技术文章社区（中文） | ✅ | 阿里云安全社区，活跃，持续产出漏洞分析类文章；与阿里 CTF 关联。 |
| S5 | 吾爱破解 | https://www.52pojie.cn/ | 论坛（中文） | ✅ | 约 145 万会员，超活跃；侧重 Windows 逆向/脱壳，Pwn 覆盖较弱。定位为逆向方向补充。 |

### 1.2 英文系统课程与课程型平台

| # | 来源 | URL | 类型 | 验证 | 关键发现 |
|---|------|-----|------|------|----------|
| S6 | pwn.college | https://pwn.college/ | 大学课程平台（ASU） | ✅ | 亚利桑那州立大学团队维护，免费，道场(Dojo)制+腰带等级。官方声明**请勿公开 writeup**（用于大学评分）→ 本项目遵守：只收录平台与模块条目，不收录/不复制其题目 writeup。 |
| S7 | Nightmare (guyinatuxedo) | https://guyinatuxedo.github.io/ | 教学型 writeup 合集 | ✅ | "基于真实 CTF 题目的二进制漏洞利用课程"，45 个编号模块、90+ 道真题（CSAW/DEFCON/HITCON/TAMU/PlaidCTF 等），每题带讲解 writeup。完整目录已验证（见 §2）。内核模块：无（纯用户态）。 |
| S8 | ROP Emporium | https://ropemporium.com/ | 渐进式 ROP 挑战平台 | ✅ | 8 关：ret2win → split → callme → write4 → badchars → fluff → pivot → ret2csu。x86_64/x86/ARMv5/MIPSel。免费。深页已验证（ret2win、ret2csu）。 |
| S9 | RPISEC MBE | https://github.com/RPISEC/MBE | 大学课程归档（RPI, 2015） | ✅ | 讲义 CC BY-NC 4.0（**非商用**，引用时注意）、代码 BSD-2。目标环境 Ubuntu 14.04 32-bit，作者自述"随时间推移环境会过时"。定位：历史经典/补充，非核心推荐。 |
| S10 | ir0nstone's Cybersecurity Notes | https://ir0nstone.gitbook.io/notes | 个人学习笔记 | ✅ | 作者 Andrej Ljubic (ir0nstone)。栈漏洞利用为主线（ret2win、ROP、格式化字符串）+ 入门堆。旧域名 ir0nstone.github.io 已 404（诚实记录）。 |

### 1.3 挑战平台（Wargame）

| # | 来源 | URL | 验证 | 关键发现 |
|---|------|-----|------|----------|
| S11 | pwnable.kr | http://pwnable.kr/play.php | ✅ | 完整题目列表已验证。Toddler's Bottle: fd, collision, bof, flag, passcode, random, input, leg, mistake, shellshock, blukat, horcruxes, coin1, blackjack, lotto, cmd1, cmd2, memcpy, asm, unlink, uaf；Rookiss: codeworld, crypto1, cmd3, lonely_driver, rootkit, simple_login, wtf, rock, owl, polyglot, la_dolce_vita, rootkit…；Grotesque；Hacker's Secret（内核题）。 |
| S12 | pwnable.tw | https://pwnable.tw/ | ✅ | 平台验证（"wargame site for hackers to test and expand their binary exploiting skills"）。具体题目列表在登录墙后，**题目级未验证**。 |
| S13 | pwnable.xyz | https://pwnable.xyz/ | ✅ | OpenToAll 战队维护，2019 上线，面向初学者；题目列表页需进一步访问（平台级验证）。 |
| S14 | picoCTF / CyLab Security Academy | https://picoctf.org/ | ✅ | **2026 重要状态**：picoCTF 正过渡为 CMU CyLab Security Academy 免费平台；2026-05-08 前的账号可迁移。作为初学者资源保留，标注过渡状态。 |

### 1.4 工具（Tools）

| # | 来源 | URL | 验证 | 关键发现 |
|---|------|-----|------|----------|
| S15 | pwntools | https://github.com/Gallopsled/pwntools · https://docs.pwntools.com/ | ✅ | 13.7k stars，MIT，活跃维护。文档覆盖 tubes/ELF/ROP/shellcraft/gdb/fmtstr/libcdb。 |
| S16 | pwndbg | https://github.com/pwndbg/pwndbg | ✅ | 11k stars，MIT，GDB+LLDB 插件，活跃。 |
| S17 | GEF | https://github.com/hugsy/gef | ✅ | 8.4k stars，MIT，支持 x86/64/ARM/MIPS/PPC/SPARC。 |
| S18 | GDB | https://www.sourceware.org/gdb/ | ✅ | GNU 官方，最新 18.1（2026-09-25）。 |
| S19 | ROPgadget | https://github.com/JonathanSalwan/ROPgadget | ✅ | 4.5k stars，BSD，基于 Capstone，多架构。 |
| S20 | one_gadget | https://github.com/david942j/one_gadget | ✅ | 2.4k stars，MIT，多架构支持，活跃。 |
| S21 | libc-database | https://github.com/niklasb/libc-database | ✅ | 1.9k stars，MIT，libc.rip 网页版。 |
| S22 | seccomp-tools | https://github.com/david942j/seccomp-tools | ✅ | 1.1k stars，MIT，dump/disasm/asm/emu/audit。 |
| S23 | binwalk | https://github.com/ReFirmLabs/binwalk | ✅ | 14.4k stars，MIT，v3 已用 Rust 重写（IoT 方向）。 |
| S24 | Compiler Explorer | https://godbolt.org/ | ✅ | 免费在线编译→汇编对照（学 C/汇编用）。 |

### 1.5 知识型参考（文档/书籍/文章）

| # | 来源 | URL | 验证 | 关键发现 |
|---|------|-----|------|----------|
| S25 | sploitfun《Understanding glibc malloc》 | https://sploitfun.wordpress.com/2015/02/10/understanding-glibc-malloc/ | ✅ | 2015 经典堆内部机制文章（chunk/bin/arena），系列后续含 unlink、Malloc Maleficarum 利用。**基于 glibc 2.23 时代**，需配合现代来源。 |
| S26 | how2heap | https://github.com/shellphish/how2heap | ✅ | shellphish 维护，MIT，覆盖 glibc 2.23→2.43 的可运行 C 示例（fastbin/tcache/house of */safe-linking 等），与真实 CTF 题目互链，活跃。**现代堆利用事实标准**。 |
| S27 | CS:APP (CMU) | https://csapp.cs.cmu.edu/ | ✅ | Bryant & O'Hallaron（CMU）官方页，含 Web Asides。《深入理解计算机系统》中文版广泛可得。 |
| S28 | Hacking: The Art of Exploitation, 2nd ed | https://nostarch.com/hacking.htm | ✅ | Jon Erickson，No Starch Press，2008。覆盖 C/汇编码、栈溢出、格式化字符串、shellcode、堆。年代较早但教学性强。 |
| S29 | Windows Internals 7th ed | https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals | ✅ | Yosifovich/Ionescu/Russinovich/Solomon，Microsoft Press 官方页（含目录）。 |
| S30 | seccomp(2) man page | https://man7.org/linux/man-pages/man2/seccomp.2.html | ✅ | man-pages 6.19（2026-06-05），Michael Kerrisk 维护。 |
| S31 | AOSP 架构文档 | https://source.android.com/docs/core/architecture | ✅ | Google 官方：软件栈分层（App/Framework/ART/HAL/原生库/内核），Binder 有独立章节。 |
| S32 | QEMU 官方文档 | https://www.qemu.org/docs/master/ | ✅ | v11.1.50，GPL-2.0。设备仿真/QMP/系统仿真。 |
| S33 | V8 官方站 | https://v8.dev/ | ✅ | Google 开源 JS 引擎官方站（文档+博客），BSD/CC-BY-3.0。 |
| S34 | xairy/linux-kernel-exploitation | https://github.com/xairy/linux-kernel-exploitation | ✅ | Andrey Konovalov 维护，6.6k stars，CC-BY-4.0，**双月更新**（2026 年条目在列）。内核方向最佳链接集。 |
| S35 | Azeria Labs ARM 系列 | https://azeria-labs.com/writing-arm-assembly-part-1/ | ✅ | 7 部分 ARM 汇编系列（ARMv6/RPi1 环境讲解），配套 ARM exploit 开发系列。 |
| S36 | Naetw/CTF-pwn-tips | https://github.com/Naetw/CTF-pwn-tips | ✅ | 1.8k stars。**作者自述"部分内容过时且不再维护"**（含 `__malloc_hook`/`__free_hook` 劫持——glibc 2.34 已移除这些 hook）。收录为 SUPPLEMENTARY 并带过时警告。 |
| S37 | Phrack | http://www.phrack.org/ | ✅ | 可访问。经典 e-zine。 |
| S38 | LiveOverflow (YouTube) | https://www.youtube.com/@LiveOverflow | ⚠️ | 频道 handle 解析成功但被 Cookie 同意墙拦截，无法自动读取内容。存在性高置信，内容未验证。 |

---

## 2. 关键来源的目录结构证据

### 2.1 Nightmare（S7）完整模块目录（2026-09-27 验证）

```
0.  Introduction          — assembly/reversing/ghidra/gdb-gef/pwntools
1.  Buffer Overflow of Variables   — csaw18_boi, tokyo_westerns17_just_do_it, tamu19_pwn1
2.  Buffer Overflow Call Function  — csaw18_getit, tu17_vulnchat, csaw16_warmup
3.  Shellcode             — tamu19_pwn3, csaw17_pilot, tu18_shelleasy
4.  ROP Statically Compiled — dcquals19_speedrun1, bkp16_simplecalc, dcquals16_feedme
5.  ROP Dynamically Compiled — csaw17_svc, fb19_overfloat, hs19_storytime,
                               csaw19_babyboi, utc19_shellme   ← ret2libc 主线区
6.  Format Strings        — backdoor17_bbpwn, tw16_greeting, pico_echo, watevr19_betstar
7.  Array Indexing        — csaw18_doubletrouble, swampctf19_dreamheaps
8.  Basic Heap Overflow   — protostar_heap0/1/2, csaw18_doubletrouble...
9.  Heap UAF              — protostar_heap3, csaw17_auir, dcquals19_babyheap,
                            plaid19_cpp, 0ctf18_babyheap, csaw19_popping_caps0/1...
10. Heap Overflow         — unsorted bin attack, large bin attack, unsafe unlink
11. Heap Grooming         — hacklu14_oreo, bkp16_cookbook
12. Tcache                — hitcon_magicheap, zctf16_note
13. Unsorted Bin Attack / Tcache Stashing Unlink Attack
14. House of Series       — spirit, lore, orange, force...
15. Fast Bin Attack       — 0ctf16_zer0storage
16. Integer Overflow      — tw17_32bithandy, csaw17_greggs_leaderboard
17. File Exploitation     — swampctf19_badfile
18. Grab Bag / AEG / References
以及 ROP 专题子模块：10.) Partial Overwrite（hacklu15_stackstuff, tu17_vulnchat2, tamu19_pwn2）
                     11.) Stack Pivoting（inctf17_stupiddrop, utc19_shellingfolder...）
                     12.) SROP（backdoorctf_funsignals, csaw19_smallboi, swamp19_syscaller）
                     13.) Ret2Csu（ utc19_shellme? swamp19_syscaller? — 见站点）
                     14.) Ret2System（asis17_marymorton, hxp18_poorcanary, tu_guestbook）
```

> 注：以上为 Nightmare 站点索引原文的忠实摘录（编号为站点自身结构）。个别子模块与题目的精确对应以站点为准（`url: https://guyinatuxedo.github.io/`）。

### 2.2 ROP Emporium（S8）渐进阶梯（2026-09-27 验证）

```
ret2win → split → callme → write4 → badchars → fluff → pivot → ret2csu
```

这构成一条**已被平台设计验证的 ROP 学习梯度**，直接采纳为本项目 ROP 主线的实践阶梯。

### 2.3 CTF Wiki（S1）Pwn 章节结构（2026-09-27 验证）

```
Linux 平台
├── 用户态
│   ├── 环境
│   ├── 漏洞利用
│   │   ├── 栈溢出（x86: 栈介绍/溢出原理/基础ROP/中级ROP(ret2libc,csu,SROP...)/高级ROP(ret2dlresolve...)）
│   │   ├── 格式化字符串
│   │   └── 堆利用（Ptmalloc2: 概述/数据结构/实现机制/tcache/堆溢出/Off-By-One/
│   │              chunk extend/Unlink/UAF/Fastbin/Unsorted/Large/Tcache 攻击/
│   │              House of Einherjar/Force/Lore/Orange/Rabbit/Roman/Pig；musl-mallocng）
│   ├── IO_FILE 利用、整型溢出、类型混淆、未初始化内存、条件竞争
│   └── 防御（Canary）与总结
└── 内核态（基础/环境搭建/利用思路/防护(KPTI/KASLR...)/Kernel ROP/slab/cross-cache/Double Fetch/userfaultfd）
其他: Windows(用户/内核)、macOS、沙箱逃逸(python/shell/seccomp/namespace/chroot/docker)、
      虚拟化(QEMU/VirtualBox/VMware)、浏览器(Chrome/V8...)、硬件
```

---

## 3. 主线顺序的交叉验证（Cross-Check）

对五个独立来源的教学顺序对比如下（这是路线排序的核心证据）：

| 学习阶段 | CTF Wiki (S1) | Nightmare (S7) | ROP Emporium (S8) | pwn.college (S6) | ir0nstone (S10) | 共识 |
|----------|---------------|----------------|--------------------|------------------|-----------------|------|
| 前置：汇编/工具/ELF | Assembly/ELF 独立章节 | 0. Introduction | — | 课程前置模块 | 有前置章节 | ✅ 五源一致 |
| 栈溢出基础 | 栈溢出→基础ROP | 1-2. 溢出变量/调用函数 | ret2win | Program Security 前段 | Stack→ret2win | ✅ 五源一致 |
| shellcode 与 NX | ret2shellcode | 3. Shellcode | — | shellcode 模块 | Shellcode/NX | ✅ |
| ROP 渐进 | 基础/中级 ROP | 4-5. 静态/动态 ROP | split→callme→write4→badchars | ROP 模块 | ROP | ✅ |
| 泄漏与 ret2libc | 中级 ROP: ret2libc | 5. Dynamically Compiled | (callme 引入参数传递) | libc 相关模块 | ROP 后半 | ✅ |
| ret2csu / pivot | 中级 ROP | 10-14 专题区 | pivot→ret2csu | — | — | ✅（部分来源） |
| SROP | 中级 ROP | 12. SROP | — | — | — | ✅（两源） |
| 格式化字符串 | ROP 之后独立章 | 6. Format Strings（ROP 后、堆前） | — | — | FSB 章节 | ✅（三源明确定位：ROP 后、堆前） |
| 堆基础→UAF→攻击面 | 堆利用章 | 8-15 堆系列 | — | Program Security II | 入门堆 | ✅ |
| IO_FILE/高级 | IO_FILE 章 | 17. File Exploitation | — | — | — | ✅（两源） |

**结论**: 五个独立来源在教学主干上高度一致：`基础 → 栈溢出 → ROP 渐进(含泄漏/ret2libc) → 格式化字符串 → 堆 → 高级`。这条主干直接采纳为 PWN Core 主线。

---

## 4. 发现的冲突与决策（Conflicts & Final Decisions）

### 冲突 1：缓解机制（NX/Canary/PIE/RELRO）的教学位置
- **CTF Wiki**: "防御（Canary）"独立成节放在利用之后收尾。
- **Nightmare / ir0nstone**: 在遇到障碍时即时引入（讲 shellcode 前讲 NX；讲 ret2libc 前讲 ASLR/PIE）。
- **决策**: 采用**交织式**（Nightmare 风格）+ 一个**总览知识点**（C-02）作为 consolidating reference。理由：缓解机制是利用技术的"反命题"，脱离具体利用讲缓解缺乏锚点；但零散讲解也需要一个统一参照系。
- 影响知识点: C-02 设计为"总览+参照表"，正文按需交叉引用。

### 冲突 2：堆利用的教学切入点（经典 vs 现代）
- **经典路线**（Protostar/Naetw/早期 how2heap）: 从 glibc 2.23 的 unlink/fastbin 讲起。
- **现代路线**（how2heap 现版/CTF Wiki）: 先讲 ptmalloc 数据结构与 tcache（现代 glibc 默认路径），再讲历史技术。
- **决策**: **结构先行 + tcache 前置**。先建立 chunk/bin/arena 心智模型（A-01/A-02），tcache 作为现代默认机制紧跟（A-03），经典技术（fastbin attack/unlink/house of *）在其后按"攻击面"推进（A-06~A-10），并显式标注各技术可用的 glibc 版本区间（依据 S26 how2heap 的版本化组织方式）。
- 理由: 学习目标是打现代题；历史技术仍有教学价值（出现在存量题目与教学平台中），但必须带版本语境。

### 冲突 3：格式化字符串的位置
- **CTF Wiki**: 放在全部栈溢出/ROP（含高级）之后。
- **Nightmare**: 放在基础 ROP 之后、堆之前（在其索引中早于部分 ROP 专题）。
- **决策**: 放在 ROP 主干（含 ret2libc）之后、堆之前。理由：FSB 利用需要"泄漏/任意写"的心智模型，而该模型在 ret2libc 阶段建立；且 FSB 的 `%n` 写原语在堆阶段（改 hook/指针）继续复用。

### 冲突 4：SROP 与 ret2csu 的先后
- **Nightmare ROP 专题顺序**: Partial Overwrite → Stack Pivoting → SROP → Ret2Csu → Ret2System。
- **ROP Emporium**: pivot → ret2csu（无 SROP 关卡）。
- **决策**: partial overwrite → stack pivot → ret2csu → SROP → ret2system。理由：采纳 Nightmare 的完整梯度，但将 ret2csu 提到 SROP 前（ROP Emporium 证明 pivot→csu 是自然衔接；SROP 的 sigreturn 帧构造更抽象，放在抽象度更高的位置）。**此处两来源顺序本就有分歧，本项目做了显式选择并记录。**

### 冲突 5：ret2dlresolve 的定位
- **CTF Wiki**: 列为高级 ROP。
- **Nightmare**: 归入后段 Ret2Libc 扩展区。
- **决策**: 主线收录但重要性 ⭐⭐⭐（非核心），放在 Advanced 阶段（需先深刻理解 GOT/PLT/RELRO）。无 RELRO/Partial RELRO 场景才有意义——现代题占比下降。

### 冲突 6：hook 劫持技术（`__malloc_hook`/`__free_hook`）
- **Naetw/CTF-pwn-tips**（1.8k stars）: 将 hook 劫持列为常用技巧。
- **how2heap / glibc 现状**: glibc 2.34 起移除 malloc hooks（2021）。
- **决策**: hook 劫持保留为知识点（A-11 的历史部分），**显式标注 glibc ≥2.34 不可用**；Naetw 仓库降级为 SUPPLEMENTARY 且带过时警告。此冲突是"社区热度 ≠ 技术现状"的典型案例，也是本项目区分 importance/difficulty 与维护状态的动因之一。

### 冲突 7：中文优先 vs 英文优先
- 用户需求: 优先中文资源。
- 现实: 系统课程（pwn.college）、现代堆技术事实标准（how2heap）、渐进挑战平台（ROP Emporium）均为英文。
- **决策**: 中文资源（CTF Wiki、CTF-All-In-One）作为 CORE 理论参考；英文平台作为 CORE 实践场地；每个英文 CORE 资源配中文导读（本项目原创中文 summary）。**不为"中文"牺牲质量**（与项目原则一致）。

### 冲突 8：pwn.college 的 writeup 政策
- 平台官方: 明确请求不公开 writeup（用于大学评分）。
- 学习循环设计: 本项目需要 hints/writeups 体系。
- **决策**: 收录 pwn.college 为 CORE 平台资源 + 模块级条目；**不收录、不链接、不复制任何 pwn.college 题解**；提示学习者在私人笔记中记录自己的解法（notebook/ 支持）。这是版权/学术诚信层面的主动决策。

---

## 5. 最终路线（Final Route）与理由

```
Foundation（不改名：入门依赖，非可跳过）
  C 内存模型/不安全函数 → 汇编/调用约定 → Linux 进程与内存 →
  GDB(pwndbg/gef) → ELF/链接/GOT/PLT → 二进制工具链 → pwntools
        ↓
PWN Core（主线核心）
  栈溢出原理 → 缓解机制总览 → ret2win → ret2shellcode/NX →
  基础 ROP → ret2syscall → 泄漏与 libc → ret2libc → partial overwrite →
  stack pivot → ret2csu → SROP → 格式化字符串(原理/进阶)
        ↓
Advanced PWN（主线进阶）
  堆基础(chunk/arena/bins) → tcache 与 safe-linking → 堆溢出/off-by-null →
  UAF/double free → fastbin attack → unsorted bin attack/largebin →
  unsafe unlink → house of 系列 → 现代组合拳(版本差异) → IO_FILE/FSOP
        ↓
Specializations（自选方向，非必修）
  Linux Kernel · Windows Kernel · ARM/AArch64 · Android · IoT ·
  Browser · Sandbox · Hypervisor
```

**Mainline / Specialization 划分理由**:
- Mainline = 三个独立以上来源构成教学共识、且互相构成前置依赖的内容（§3 交叉验证）。
- Specialization = 方向性内容，价值高但彼此独立，学习者按目标选择；均在 §7 记录入口级已验证来源。

---

## 6. Specialization 方向的来源验证现状（诚实边界）

| 方向 | 已验证入口来源 | 研究深度 | 状态 |
|------|----------------|----------|------|
| Linux Kernel | S34 (xairy, 双月更新), S1 (CTF Wiki 内核章), S6 (pwn.college) | 入口级 | ✅ 可建立学习路线骨架 |
| Windows Kernel | S29 (Windows Internals 7th), S1 (CTF Wiki Windows 章) | 入口级 | ✅ 骨架；定位限定 CTF/Lab/授权研究 |
| ARM/AArch64 | S35 (Azeria 7 部系列), S8 (ROP Emporium ARMv5), S1 | 入口级 | ✅ 骨架 |
| Android | S31 (AOSP 官方), S1 | 入口级 | ✅ 骨架；进阶资源待研究 |
| IoT | S23 (binwalk v3), S35 (ARM), S1 | 入口级 | ✅ 骨架；进阶资源待研究 |
| Browser | S33 (V8 官方), S1 (浏览器章) | 薄弱 | ⚠️ saelo 论文等经典资料访问失败（见 unverified），标注研究不足 |
| Sandbox | S30 (seccomp man), S22 (seccomp-tools), S1 (沙箱逃逸章) | 入口级 | ✅ 骨架 |
| Hypervisor | S32 (QEMU 官方文档), S1 (虚拟化章) | 薄弱 | ⚠️ 入口级仅官方文档；系统性教学资源待研究，明确标注 |

---

## 7. 排除主题及理由（Excluded Topics）

| 主题 | 排除理由 |
|------|----------|
| Windows 用户态漏洞利用（ROPAC/CFG 绕过等） | v0.1 研究深度不足；Specialization 先覆盖 Windows Kernel 基础；后续版本扩展 |
| musl/other-libc 堆利用 | CTF Wiki 有章节（musl-mallocng），但本轮未做独立验证；列入 Advanced 待扩展清单 |
| WASM pwn / .NET pwn / Lua pwn | 出题频率有限且来源验证不足；列入 Future |
| macOS/iOS pwn | 生态封闭、公开系统课程少；CTF Wiki 有章节但本轮未验证；Future |
| 硬件侧信道 / CPU 安全 | 与 PWN 主线（内存破坏）方法论差异大，超出范围 |
| 自动化利用生成（AEG）/符号执行系统化 | Nightmare 有 Grab Bag/AEG 章节作为补充阅读；不进入主线 |
| Windows 逆向/脱壳（吾爱破解主线内容） | 属逆向而非 PWN；作为 Foundation 逆向需求的补充社区收录 |

---

## 8. 后续研究计划

1. Browser/Hypervisor 方向补充研究（saelo.io、kCTF、hxp CTF 资源等）并逐步验证。
2. pwnable.tw / pwnable.xyz 题目级验证（需注册账号，人工验证流程）。
3. Specialization 各方向的中阶资源（课程/实验环境/题目集）批量验证。
4. libc-database / one_gadget 等工具的版本兼容矩阵维护。
5. 中文视频课程（B 站等）的筛选与验证标准制定（视频资源验证成本高，需谨慎收录）。

---

## 10. Phase 3-A 缺口审计（2026-09-27）

> 本轮不新增知识点文件、不新增题目。只核对「仓库里已经有什么」和「哪些外部结构今天还能打开」。
> 搜索没有被当作验证。打不开的 URL 记在下面，不进入 `resources/`。

### 10.1 今天重新打开过的页面

| 来源 | URL | 看到的事实 |
|------|-----|------------|
| how2heap | https://github.com/shellphish/how2heap | 仓库仍在。目录名从 `glibc_2.23` 到 `glibc_2.43`，另有 `obsolete/glibc_2.27`。README 分区含 Educational Heap Exploitation、Get Started、Applicable CTF Challenges、Hardening。MIT。星数页面显示 8.9k（与 2026-09-27 早先台账里的旧印象不必对齐，以页面为准）。 |
| Linux Kernel Exploitation | https://github.com/xairy/linux-kernel-exploitation | 自述是链接集，不是课程。标题区有 Trainings、Contents、Books、Techniques、Vulnerabilities；目录还列了 Finding Bugs、Defensive、Exploits、Tools、Practice、Misc。CC-BY-4.0。更新说明指向 @andreyknvl，并写 Updated bimonthly。 |
| kernel.org 内存分配 | https://docs.kernel.org/core-api/memory-allocation.html | 文档版本 7.3.0-rc4。标题 Memory Allocation Guide。这是分配器选择与 GFP，不是利用教程。适合作为内核内存的官方入口，尚未收入 `resources/`。 |
| Windows 驱动入门 | https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/ | Microsoft Learn 官方页，标题 Get Started with Drivers on Windows。要求读者已会 C 与函数指针。这是驱动文档入口，不是漏洞教程。尚未收入 `resources/`。 |
| Azeria ARM Part 1 | https://azeria-labs.com/writing-arm-assembly-part-1/ | 页面写明重点是 ARM 32-bit，示例在 ARMv6（Raspberry Pi 1）。系列后续是数据类型与寄存器、指令、内存访问、条件与分支、栈与函数。正文没有把 AArch64 与 AArch32 分开讲。 |
| CTF Wiki 堆概述 | https://ctf-wiki.org/pwn/linux/user-mode/heap/ptmalloc2/heap-overview/ | 仍可打开。侧栏 Ptmalloc2 下有：堆概述、堆相关数据结构、深入理解堆的实现、tcache、Unlink、Use After Free、Fastbin Attack、Tcache attack、House of Orange、House of Lore。 |
| CTF Wiki 首页 | https://ctf-wiki.org/ | 导航里 Linux 与 Windows 下都有 Kernel Mode 字样。 |

### 10.2 今天打不开、因此不能当新依据

| URL | 结果 |
|-----|------|
| https://ctf-wiki.org/pwn/linux/user-mode/stackoverflow/arm/stack-intro/ | 404 |
| https://ctf-wiki.org/pwn/linux/kernel-mode/environment/ | 404 |
| https://ctf-wiki.org/pwn/linux/kernel-mode/environment/kernel-environment/ | 404 |

内核章和 ARM 栈章的**具体深链**本轮没有打开。路线文件里「CTF Wiki 有内核章 / ARM 章」只保留为导航级，不能写成某一页已核对。

### 10.3 与现有路线的关系（不改主线顺序）

仓库主线已经是：Foundation → 栈 / ROP / ret2libc → 格式化字符串 → 堆（结构、tcache、原语、经典攻击、house / 现代 / IO_FILE）。这和今天仍能打开的 CTF Wiki 堆侧栏、how2heap 的按版本目录一致，所以 Phase 3 不重排这条顺序。

缺口不在「缺一整条新主线」，而在：

1. **堆的练习几乎没落地。** 12 个堆知识点里，只有 `adv-heap-overflow`（heap2）和 `adv-unsorted-bin-attack`（magicheap、zerostorage）有正式题。`adv-heap-overview`、`adv-heap-bins`、`adv-tcache`、`adv-uaf-double-free`、`adv-fastbin-attack`、`adv-largebin-attack`、`adv-unsafe-unlink`、`adv-house-of`、`adv-heap-modern` 没有正式题。how2heap 是示例仓库，继续不把它伪装成一道 challenge。
2. **版本没有写进字段。** 路线正文提到 glibc 2.32 safe-linking、2.34 去掉 malloc hook，但 schema 没有 `version_dependent`。在加这个字段之前，不把不同版本的行为写进同一个「总是成立」的句子。
3. **Core 主题大多已有文件，缺的是少数边界，不是整章。** 已有：ELF、汇编、调用约定、栈、syscall、GDB、pwntools、checksec 所在的 mitigations、ret2win / shellcode / ROP / ret2syscall / ret2libc / ret2csu / SROP / pivot / partial overwrite、GOT/PLT、格式化字符串（一个文件覆盖原理和 `%n`）。研究文档把 ret2dlresolve 放在 Advanced 选读，**没有对应知识点文件**。没有单独的 canary-leak / PIE-leak 知识点；它们散落在 mitigations 和具体题里。本轮不拆文件，避免和 `core-leak-basics` 重复。
4. **八个方向仍是一个骨架文件加一张阶梯。** 没有 `spec-*` 的分步知识点，也没有专项题。ARM 阶梯把 ARM32 与 AArch64 写在同一张表里；Azeria Part 1 明确只教 32 位。下一步应把阶梯拆成「ARM32（有 Azeria + ROP Emporium ARMv5）」和「AArch64（本轮没有打开系统教程，不能假装已有）」。
5. **Linux Kernel / Windows Kernel 的官方入口今天能打开，但还不是资源条目。** xairy 是链接集；kernel.org 是分配文档；Microsoft Learn 是驱动入门。三者都适合作为「先读什么」，都不替代实验手册。不在本轮把它们的目录抄成知识点。

### 10.4 本轮明确不做

- 不新增 challenge。Nightmare 上仍有约 12 道题只是索引级，深页没打开。
- 不把 pwn.college 的题目或 writeup 写进来。
- 不把 Android、IoT、Browser、Sandbox、Hypervisor 扩成课。Browser / Hypervisor 仍是研究不足。
- 不采用搜索摘要里的仓库、论文或 CVE 编号。

### 10.5 下一批（Phase 3-B）只做这些

1. 给堆知识点补 `version_dependent` 与版本说明（只写 how2heap 目录和现有正文里已经核对过的断代：2.26 tcache、2.32 safe-linking、2.34 移除 hook）。不新编版本行为。
2. 把 kernel.org Memory Allocation Guide 与 Microsoft Learn Drivers Getting Started 收成资源，如果字段能按 schema 填全。xairy 已有 `res-xairy-kernel`，只在核对后更新「它是链接集」这句，不改星数传说。
3. 把 ARM 阶梯上「32 位已核对 / 64 位未核对」写进 `roadmap/specializations/arm-aarch64.md`，不新建 AArch64 知识点文件。
4. 堆的下一道正式题必须先打开 Nightmare 或 how2heap 的具体页，再决定是 tcache 还是 UAF。本轮没有这样的页，所以不加题。

*本节只记录 2026-09-27 这次会话里实际打开或确认 404 的 URL。*

---

## 11. Phase 3-B（2026-09-27）

### 11.1 堆的版本：写进字段的，和故意不写的

打开了 how2heap 的 `README.md` 与 `glibc_ChangeLog.md`（raw），并用 GitHub API 列出了版本目录。目录实有 `glibc_2.23`、`2.24`、`2.27`、`2.31`–`2.43`，另有 `obsolete/`。**没有 `glibc_2.26` 目录。** changelog 却写：2.26 引入 tcache（per-thread cache），Ubuntu 构建从 2.27 起启用；同一节还写了 unlink 的 size 与 prev_size 检查。

README 版本格（原文，不是推出来的）：

| 示例 | README 版本格 |
|------|----------------|
| tcache_poisoning.c | > 2.25，并注明 2.32 及之后需要 heap leak |
| decrypt_safe_linking.c / safe_link_double_protect.c | >= 2.32 |
| large_bin_attack.c | < 2.42 |
| fastbin_dup.c | < 2.43 |
| fastbin_reverse_into_tcache.c | 2.26 - 2.42 |
| unsafe_unlink.c | latest |
| house_of_io.c | 2.31 - 2.33 |
| overlapping_chunks.c（unsorted size） | < 2.29 |
| house_of_botcake.c | > 2.25 |

`glibc_2.32/` 有 `decrypt_safe_linking.c`，`glibc_2.31/` 的文件名列表里没有。`glibc_2.34/` 的文件名列表里没有 `house_of_io.c`，也没有带 `malloc_hook` / `free_hook` 的文件名。README 全文没有 `malloc_hook` 或 `free_hook`。changelog 停在 2.27。

因此：**2.29 的 tcache key、2.34 移除 hook，本轮不写入 `verified_versions`。** 旧知识点正文里的这些句子已改成「未在本轮文本中核对」。sourceware.org 的发布说明页被拦截，没有打开，不能补这条。

how2heap 仍只作为 `res-how2heap`。不进入 `challenges/`。

### 11.2 新题（都打开了 Nightmare 深页）

| 题 | 页上的事实 | 挂到 |
|----|------------|------|
| PlaidCTF 2019 cpp | 标题 plaidctf 2019 cpp；UAF 与 double free；打印 Ubuntu GLIBC 2.27 | adv-uaf-double-free、adv-tcache |
| HITCON 2014 stkof | 标题 Hitcon 2014 stkof；unsafe unlink | adv-unsafe-unlink |
| 0CTF 2017 babyheap | 章节 0ctf babyheap；菜单文字 Baby Heap in 2017；堆溢出后走到 fastbin | adv-fastbin-attack、adv-heap-overflow |
| Hack.lu 2014 Oreo | 标题 Hack.lu 2014 Oreo；标签 House of Spirit | adv-house-of |

拒绝收录：

- Nightmare `tcache_explanation`：页内写 “This isn't a ctf challenge.”
- `uaf_explanation`：讲解页，没有赛事名。
- how2heap 的每个 `.c`：示例，不是题。
- CSAW 2019 popping caps：打开过 popping caps 0，但它是 tcache 元数据题，且本阶段已有 4 道，不再加。
- ZCTF 2016 note2、CSAW 2017 auir：打开过，同理停在 4 道上限内，没有建文件。
- how2heap README 指向的 acez.re stkof 外链：没有打开，不收为第二条 writeup。

### 11.3 ARM32 / AArch64

Azeria Part 1 与 ROP Emporium `ret2win_armv5.zip` 只支持 ARM32 / ARMv5。本轮打开 AAPCS64（`aapcs64.rst`），标题写明 AArch64，章节含寄存器、栈、参数传递，收为 `res-aapcs64`。没有 AArch64 利用教程，没有 AArch64 题，没有新知识点文件。

abi-aa 索引上能看到 PAuth ABI（`pauthabielf64.rst`）的链接，正文没打开，不建资源。索引上没有单独的 BTI 文档链接。PAC/BTI 保持在入门之后，状态是 Research Needed。

### 11.4 路线

堆的教学顺序不改。补的是版本字段和实践题，不是新的一层。ARM 路线从「一张混合阶梯」改成 ARM32 与 AArch64 两节。

*本节 URL 均在 2026-09-27 打开，或如 sourceware 发布页那样明确失败。*

---

## 12. Phase 3-C（2026-09-27）

本阶段不新增题目。把已经收录、但深页之前只写在 `notes_on_source` 里的 11 道 Nightmare 题打开，升为 `platform-and-challenge-verified`，并各建一条 external writeup。

打开过、确认是讲解而不是题、因此不收录：

| URL | 页上的话 |
|-----|----------|
| `32-largebin_attack/largebin_explanation0/index.html` | 标题 Large Bin Attack Explannation pt 0。讲解，不是 CTF。演示 `libc-2.23.so`。 |
| `32-largebin_attack/largebin_explanation1/index.html` | pt 1，同样不是题。也写了 `libc-2.23.so`，并提到 how2heap 的 glibc_2.26 路径。 |

`adv-largebin-attack` 因此仍然是 `practice_status: no_verified_challenge`。版本字段补了一条 2.23 演示，没有编造题目。

`utc19_shellme` 仍没有可用深页，保持 listed。

---

## 13. Phase 3-D（2026-09-27）

只加了一道打开过深页的题。

| 题 | 页上的事实 | 处理 |
|----|------------|------|
| Boston Key Party 2016 Cookbook | 章节名即此。House of Force。页内打印 glibc 2.24。有讲解。 | 正式题 `ch-nightmare-bkp16-cookbook`，挂 `adv-house-of` |
| House of Orange explanation | 页内是讲解，没有赛事名。写明用于 2.26 之前，示例 map 为 2.23。 | 不建题。版本句写入 `adv-house-of` 的 verified_versions |
| largebin pt 0 / pt 1 | 上一阶段已确认是讲解 | 仍无正式题 |
| lore / einherjar | 侧栏只有讲解，没有赛事链接 | 不建题 |

how2heap 的 `house_of_*.c` 继续不进 `challenges/`。

BKP 2016 的 simple calc 是栈题，cookbook 是堆题，id 不同。

---

## 14. Phase 3-E（2026-09-27）

没有新增 AArch64 题目，没有新增知识点文件。

再次打开了已经收录的 AAPCS64 原文（`aapcs64.rst`），把下面几句写进路线和骨架正文，因为它们直接决定「x86-64 的栈溢出不能原样搬过来」：

- 通用寄存器 r0–r30；SP 是栈指针。
- r0–r7 传参并返回结果。
- r29 = FP，r30 = LR。
- `BL` 把下一条指令地址写入 LR。
- 正常返回回到 LR 中的地址，文中提到 `RET`。
- 经 SP 访问内存时，以及在公开接口上，`SP mod 16 = 0`。
- 帧记录是栈上两个 64 位值；平台可以不强制每个函数都建帧。

developer.arm.com 上猜的两篇寄存器/调用约定页：第一次 301 到 support.arm.com，拿到的 HTML 只有 “Documentation – Arm Developer”，没有寄存器正文。后来带浏览器 UA 得到 403。不收为资源。

ROP Emporium ret2win 的下载名只有 x86_64、x86、ARMv5、MIPS。没有 AArch64，没有 ARM64。

`res-aapcs64` 增加 `architecture_scope: [AArch64]`。没有给 Azeria 或 ROP Emporium 填这个字段，因为旧资源块没有这项，而它们的架构已经写在 notes 和路线里。

PAC：`pauthabielf64.rst` 仍只是索引链接，正文没打开。BTI 仍没有单独文档链接。不建知识点。

---

## 15. Phase 3-F（2026-09-27）

没有新增内核题目，没有把骨架拆成多个知识点。

打开的内核文档（版本号都是页面上的 7.3.0-rc4）：

| URL | 结果 |
|-----|------|
| docs.kernel.org/core-api/mm-api.html | 标题 Memory Management APIs。节名 The Slab Cache。kmalloc：小于页大小的对象的常规分配方式。有 kfree。没有 SLUB 标题 |
| docs.kernel.org/process/debugging/kgdb.html | 标题 Using kgdb, kdb and the kernel debugger internals。kgdb 是给 gdb 的源码级内核调试器。参数名含 kgdboc、kgdbwait、nokaslr |
| docs.kernel.org/admin-guide/kernel-parameters.html | nokaslr：CONFIG_RANDOMIZE_BASE 下关闭内核和模块基址 ASLR。pti= [X86-64]：用户与内核页表隔离。nopti [X86-64] 等价于 pti=off。nosmep [PPC64s]、nosmap [PPC]：关掉 SMEP/SMAP。没有「自某版本默认开启」 |
| docs.kernel.org/admin-guide/hw-vuln/index.html | 硬件漏洞索引。正文没有 KASLR、SMEP、SMAP、KPTI |
| docs.kernel.org/dev-tools/gdb-kernel-debugging.html | 404 |

不把 xairy 的链接集拆成题目。不收 pwn.college 的题。

---

## 16. Phase 3-G（2026-09-27）

没有新增 Windows 内核题，没有拆知识点，没有写利用。

打开的 Microsoft Learn 页：

| URL | 结果 |
|-----|------|
| .../kernel/introduction-to-wdm | 标题 Introduction to WDM。页首：WDM 不再是推荐模型；新驱动看 Choosing a driver model；建议考虑 KMDF。WDM 是为了跨 Windows 源码兼容 |
| .../gettingstarted/choosing-a-driver-model | 标题 Choose a Driver Model。按功能驱动、过滤驱动、软件驱动等选择，文中出现 KMDF、UMDF、WDM。没有收成单独资源，避免和 WDM 页重复堆「模型名单」 |
| .../kernel/introduction-to-i-o-control-codes | IOCTL 用于用户态与驱动通信，或驱动之间通信，通过 IRP。用户态 DeviceIoControl → IRP_MJ_DEVICE_CONTROL |
| .../drivers/debugger/ | 标题 Install WinDbg。WinDbg 分析转储、调试用户态和内核态、检查寄存器和内存。处理器：x64 和 ARM64。内核入门链接指向 Echo 实验 |
| .../debugger/debug-universal-drivers---step-by-step-lab--echo-kernel-mode- | 标题 Debug Windows Drivers Step-By-Step Lab (Echo Kernel Mode)。用 WinDbg 调试 KMDF echo 示例。要求 Windows 11 双机、WDK。不是 CTF |
| .../debugger/getting-started-with-windbg-kernel-mode | 404 |
| .../debugger/setting-up-kernel-mode-debugging-in-windbg--kernel-mode- | 404 |

Windows Internals 第 7 版仍只有书目页，不写章节内容。

---

## 9. 验证方法复现


- 逐 URL 实际访问（自动化 fetch + 渲染读取），记录 HTTP 状态与页面要点。
- 搜索引擎仅用于**发现**候选来源，不作为最终依据（搜索引擎摘要不计入验证）。
- 无法读取的页面记录于 `research/unverified/`，不进入正式推荐。
- 所有 `verified: true` 的条目均在 2026-09-27 由本项目维护者实际访问过对应 URL。

*本研究记录由项目维护者与 AI 协作完成；AI 参与了信息整理，但所有 ✅ 状态对应实际发生的网络访问。研究方法本身的局限性（自动化工具无法读取 JS/登录墙内容）已在各条目如实标注。*
