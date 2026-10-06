---
id: wu-nightmare-swamp19-syscaller
type: external
title: Nightmare — SwampCTF 2019 syscaller
challenge: ch-nightmare-swamp19-syscaller
author: guyinatuxedo
author_url: https://guyinatuxedo.github.io/
url: https://guyinatuxedo.github.io/16-srop/swamp19_syscaller/index.html
source_type: course-writeup
correspondence: verified
verified: true
verified_date: 2026-09-27
verification_method: 打开该深页，标题为 Swamp ctf 2019 syscaller
summary: |
  用 pop 后接 syscall 的 gadget 触发 sigreturn，再改内存页权限以便后续代码执行。
  具体步骤以原页为准。
---
