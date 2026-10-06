---
id: ch-nightmare-csaw17-svc
name: svc (CSAW CTF 2017)
platform: CSAW CTF 2017
event: CSAW CTF
year: 2017
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/08-bof_dynamic/csawquals17_svc/index.html
knowledge_points:
  - core-ret2libc
  - core-ret2shellcode
prerequisites:
  - ch-nightmare-csaw19-babyboi
why_selected: Pilot ④：输出/输入受限的变体，考察在非标准 IO 下重建泄漏路径。
verification_status: platform-and-challenge-verified
writeup:
  external:
    - wu-nightmare-csaw17-svc
  ai_summary: ""
reproducibility: medium
notes_on_source: |
  2026-09-27 打开深页。章节 Csaw 2017 Quasl SVC（页内拼写）。栈溢出越过 canary，走向 ret2libc。原赛事归档 URL 未验证。
---

# svc（CSAW CTF 2017）—— Pilot ④

<details><summary>Hint 1</summary>
输入用 scanf("%s")（坏字符含空白）；输出受限——泄漏途径要想"程序自己会打印什么"。
</details>
<details><summary>Hint 2</summary>
缓冲在栈上且 NX 关闭与否要 checksec 确认；两条路线（shellcode / ret2libc）哪条走通由缓解决定。
</details>
<details><summary>Hint 3</summary>
栈地址不可知时用 libc 定位（泄漏）；canary 不在则栈溢出直通返回地址。
</details>
