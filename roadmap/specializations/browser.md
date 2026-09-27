# Browser Security 学习路线

> track: specialization ｜ ⚠️ **v0.1 研究不足（诚实标注）**
> 依赖：Advanced 堆（jemalloc 式分配器思维）、C++ 对象模型、PWN Core 全部

## 学习阶梯（骨架）

```text
1. 浏览器架构      — 多进程模型：browser/renderer/GPU 进程边界
2. JS 引擎基础     — 对象/属性表示（hidden class/shape）、值标签(tagged value)
3. JIT 编译        — 解释器→baseline→optimizing 的层级与去优化
4. 内存破坏        — OOB/UAF/类型混淆在引擎对象上的形态
5. 利用原语        — addrof/fakeobj 等经典原语思想
6. 沙箱与逃逸      — renderer 沙箱边界、IPC Mojo、进程级隔离
7. 实战            — 公开 CTF（Chrome/Firefox 题）、公开 CVE 复现研究
```

## 已验证入口资源

- **V8 官方站**（v8.dev：文档+博客，Google）——S33
- **CTF Wiki 浏览器章**（Chrome/V8、Firefox、Safari）——S1

## 研究不足声明（2026-09-27）

- 经典资料 saelo《Attacking JavaScript Engines》等论文 URL 本轮多次访问失败（socket closed），**未验证**，故暂不进入正式推荐（线索记录于 `research/unverified/`）。
- 本方向 v0.1 只建立骨架；系统性课程与题目集待后续研究（ROADMAP-RESEARCH.md §8）。
- 仅限公开 CTF 与授权研究语境。
