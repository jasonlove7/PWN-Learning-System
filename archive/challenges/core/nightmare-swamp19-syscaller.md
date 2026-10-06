---
id: ch-nightmare-swamp19-syscaller
name: syscaller (SwampCTF 2019)
platform: SwampCTF 2019
event: SwampCTF
year: 2019
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/16-srop/swamp19_syscaller/index.html
knowledge_points:
  - core-srop
prerequisites:
  - core-ret2syscall
why_selected: |
  Nightmare SROP 模块的 SwampCTF 2019 syscaller：用 pop + syscall 触发 sigreturn，
  再改内存权限让后续代码能执行。用来看 SROP 不只是 execve 一种帧。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-swamp19-syscaller
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页，标题 Swamp ctf 2019 syscaller。原赛事归档 URL 未验证。
---

# syscaller（SwampCTF 2019）

> 入口：<https://guyinatuxedo.github.io/16-srop/swamp19_syscaller/index.html>

## 任务

栈上没有足够 gadget 去逐个布寄存器。一次 sigreturn 让内核帮你恢复整帧。

<details><summary>Hint 1（方向）</summary>

二进制里有没有「把一个数弹进 rax，然后 syscall」？`rt_sigreturn` 的系统调用号是多少？

</details>

<details><summary>Hint 2（方法）</summary>

用 pwntools 的 SigreturnFrame 填你真正要的 syscall（本题路径是改页权限，不是直接 execve）。帧在栈上的位置就是溢出之后。

</details>

<details><summary>Hint 3（关键细节）</summary>

第一帧负责把目标页改成可执行；返回后控制流要落在你已经放好的代码上。帧的 rip 与 rsp 要一起算。

</details>

## 复盘要点

- 学会：SROP 帧可以服务 mprotect/mmap，而不只是 `execve`。
- 去向：[core-srop](../../knowledge/rop/srop.md)。
