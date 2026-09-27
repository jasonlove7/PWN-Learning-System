# Linux Kernel PWN 学习路线

> track: specialization ｜ 定位：CTF / Lab / 授权研究
> 依赖：PWN Core 全部 + Advanced A-1（堆心智模型对理解 slab 有直接迁移价值）

## 学习阶梯

```text
1. 内核基础        — 用户态 vs 内核态、syscall 路径、内核内存布局
2. 内核模块(LKM)   — 编写/加载/调试一个 hello 模块；理解 ioctl 攻击面
3. 内核调试        — qemu + gdb(vmlinux)、kgdb、/proc/kallsyms
4. 内核堆          — slab/SLUB 分配器（对照用户态 ptmalloc 学）
5. 内核漏洞原语    — UAF/OOB/竞争(double fetch) 在内核语境
6. 提权路径        — cred 结构、commit_creds、modprobe_path、usermode helper
7. 缓解与绕过      — KASLR/SMEP/SMAP/KPTI/CFI（fg-kaslr 等现代强化）
8. 实战            — kernel CTF 题（CISCN/∗CTF 等内核题）、kernelCTF 公开题
```

## 已验证入口资源

- **xairy/linux-kernel-exploitation**（6.6k★，CC-BY-4.0，双月更新）——论文/技巧/漏洞/练习的权威链接集（ROADMAP-RESEARCH.md S34）
- **CTF Wiki 内核章**（中文；内核基础/环境/防护/Kernel ROP/slab/cross-cache/double fetch）——S1
- **pwn.college**（含系统安全/内核方向 dojo；遵守其不公开题解政策）——S6

## 知识点骨架（spec-linux-kernel-*，见 knowledge/specializations/linux-kernel.md）

内核基础 / LKM 与 ioctl / 内核调试 / slab-SLUB / 内核 UAF 与竞争 / 提权 / KASLR-SMEP-SMAP-KPTI / 现代 kernel 利用。

## 边界与纪律

- 所有练习限定于：自建 qemu 环境、公开 CTF 题、kernelCTF 等授权靶场。
- 本项目不提供、不链接针对真实生产内核的武器化利用。
