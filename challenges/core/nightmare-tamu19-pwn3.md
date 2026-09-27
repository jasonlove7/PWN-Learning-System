---
id: ch-nightmare-tamu19-pwn3
name: pwn3 (TAMU CTF 2019)
platform: TAMU CTF 2019
event: TAMU CTF
year: 2019
category: core
difficulty: basic
url: https://guyinatuxedo.github.io/06-bof_shellcode/tamu19_pwn3/index.html
knowledge_points:
  - core-ret2shellcode
prerequisites:
  - core-ret2win
why_selected: |
  Nightmare shellcode 模块的 TAMU CTF 2019 pwn3：gets 无界写入，程序打印栈地址，
  返回地址指向注入的 shellcode。用来完成「NX 关时直接跳代码」这一课。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-tamu19-pwn3
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页，标题 Tamu 2019 Pwn 3。原赛事归档 URL 未验证。
---

# pwn3（TAMU CTF 2019）

> 入口：<https://guyinatuxedo.github.io/06-bof_shellcode/tamu19_pwn3/index.html>

## 任务

栈可执行，程序还会把你的缓冲区地址印出来。溢出之后跳到自己的 shellcode。

<details><summary>Hint 1（方向）</summary>

先确认 NX 是关的。程序打印的那个地址，是不是你输入所在的栈？

</details>

<details><summary>Hint 2（方法）</summary>

用 pwntools shellcraft 生成位置无关的 shellcode，前面垫到返回地址，返回地址填打印出来的栈地址（加上你的 nop/偏移）。

</details>

<details><summary>Hint 3（关键细节）</summary>

`gets` 会在坏字符上截断。shellcode 里不要有 `\x00`、`\x0a`。打印地址是泄漏值，按小端写回返回地址。

</details>

## 复盘要点

- 学会：有栈地址泄漏时，ret2shellcode 不需要猜栈。
- 去向：[core-ret2shellcode](../../knowledge/stack/ret2shellcode.md)。
