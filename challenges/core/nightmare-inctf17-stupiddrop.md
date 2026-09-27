---
id: ch-nightmare-inctf17-stupiddrop
name: stupiddrop (InCTF 2017)
platform: InCTF 2017
event: InCTF
year: 2017
category: core
difficulty: intermediate
url: https://guyinatuxedo.github.io/
knowledge_points:
  - core-srop
  - core-stack-pivot
prerequisites:
  - core-stack-pivot
why_selected: Nightmare 11/12 专题代表：pivot + SROP 的组合拳。
verification_status: platform-verified-challenge-listed
writeup:
  external:
    - wu-nightmare-index
  ai_summary: ""
reproducibility: medium
notes_on_source: Nightmare "11.) Stack Pivoting"/"12.) SROP" 收录并配 writeup
---

# stupiddrop（InCTF 2017）

<details><summary>Hint 1</summary>缓冲极小 + 有 syscall 指令 → SROP 气质；帧放哪 → pivot 气质。两个气质都要有。</details>
<details><summary>Hint 2</summary>SigreturnFrame 构造 execve；触发链 pop rax,15 → syscall。</details>
<details><summary>Hint 3</summary>新栈选址避开会破坏帧的写入区。</details>
