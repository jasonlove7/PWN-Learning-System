# PWN Core 阶段路线（主线核心）

> 定位：整个体系最重要的主线。完成后应能独立解决中等难度 CTF pwn 题。
> 顺序依据：五来源交叉验证 + 冲突决策 #3/#4（见 ROADMAP-RESEARCH.md §3/§4）。

## 阶段 C-1：第一次控制流劫持（1-2 周）

```text
core-stack-overflow → core-mitigations → core-ret2win
```
- 学习里程碑：第一次用 cyclic + gdb 算偏移，把返回地址覆盖到目标函数。
- 实践阶梯：ROP Emporium `ret2win`；pwnable.kr `bof`；Nightmare §1-2（csaw18_boi / csaw16_warmup）。
- 缓解机制在此时引入总览（交织式教学，冲突决策 #1）：理解 NX/Canary/PIE/RELRO/ASLR 各挡什么。

## 阶段 C-2：shellcode 与 ROP 渐进（2-3 周）

```text
core-ret2shellcode → core-rop-basics → core-ret2syscall
```
- ret2shellcode 直面 NX 的存在意义（无 NX 时可注入执行；有 NX 则引出 ROP）。
- 基础 ROP：找 gadget、串 gadget、`pop rdi; ret` 传参。
- ret2syscall：ROP 返回到 syscall 指令直接发起 execve（静态链接题的常见出口）。
- 实践阶梯：ROP Emporium `split → callme → write4 → badchars`；Nightmare §3-4（csaw17_pilot、bkp16_simplecalc）。

## 阶段 C-3：泄漏、libc 与 ret2libc（2-3 周）★核心中的核心

```text
core-leak-basics → core-libc-basics → core-ret2libc
```
- 为什么：动态链接时代 ASLR + 远程环境使"泄漏基址 → 计算偏移 → 二段攻击"成为最普遍的利用范式。
- **ret2libc 是本项目的 Pilot 完整模块**（knowledge/rop/ret2libc.md 含全部组件：知识/资源/挑战/渐进 Hint/writeup 指引/复习方案）。
- 实践阶梯：ROP Emporium `fluff → pivot`；Nightmare §5（csaw17_svc、csaw19_babyboi、utc19_shellme、fb19_overfloat）。

## 阶段 C-4：ROP 专题深化（2-3 周）

```text
core-partial-overwrite → core-stack-pivot → core-ret2csu → core-srop
```
- partial overwrite：PIE/ASLR 下的低成本绕过思路。
- stack pivot：溢出空间不足时把栈搬到可控区。
- ret2csu：没有 `pop rdx` 时的万能寄存器装载器。
- SROP：用 sigreturn 一次布置全部寄存器。
- 实践阶梯：ROP Emporium `pivot → ret2csu`；Nightmare ROP 专题（hacklu15_stackstuff、inctf17_stupiddrop、csaw19_smallboi、asis17_marymorton）。

## 阶段 C-5：格式化字符串（2 周）

```text
core-fmt-string（原理 → 泄漏 → 任意写 → 结合利用）
```
- 放在 ROP 后、堆前（冲突决策 #3）：需要"泄漏/写原语"心智模型，且 %n 写原语在堆阶段继续复用。
- 实践阶梯：pwnable.kr `passcode`（GOT 覆盖思想的近亲）；Nightmare §6（backdoor17_bbpwn、tw16_greeting、pico_echo）。

## 阶段 C-6（衔接 Advanced）：GOT/PLT 攻防复盘

- 回到 fnd-got-plt-fundamentals，从**攻击者视角**重读：GOT 覆写、ret2dlresolve 预告（Advanced）、RELRO 强弱差异的实战含义。

## 自测清单（进入 Advanced 的门槛）

- [ ] 给一个动态链接题，能独立完成：泄漏 → 识别 libc → ret2libc 全流程
- [ ] 能解释 partial RELRO 与 full RELRO 下 GOT 攻击面差异
- [ ] 溢出只有 8 字节时知道考虑 partial overwrite 或 stack pivot
- [ ] 看到 `printf(buf)` 能列出至少 3 种利用路径（泄漏/任意写/崩溃定位）
- [ ] ROP Emporium 8 关全部独立通过（或带 ≤2 次 hint）
