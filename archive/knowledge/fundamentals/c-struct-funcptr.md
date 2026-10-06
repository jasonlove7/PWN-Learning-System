---
id: fnd-c-struct-funcptr
title: struct / 函数指针 / union
description: 结构体内存布局、对齐、函数指针与控制流的关系
importance: 4
difficulty: 3
track: mainline
type: concept
depth: standard
prerequisites:
  - fnd-c-memory
why_learn: |
  堆利用的主角是"结构体+指针"；函数指针是 C 程序中控制流 hijack 的原生目标。
objectives:
  - 能手工计算含对齐的 struct 大小与字段偏移
  - 能解释函数指针调用在指令层的含义（call 寄存器/内存间接寻址）
  - 能用 union 解释类型混淆 (type confusion) 的成因
resources:
  - res-csapp
challenges: []
hints: []
writeups: []
review:
  method: 用两个真实 struct 例题手工算偏移并程序验证
  interval: 首次后 2 周
sources:
  - "CS:APP (verified 2026-09-27)"
verification_status: verified
last_verified: 2026-09-27
---

# struct / 函数指针 / union

## struct 布局
```c
struct S { char a; int b; char c; };   // 不是 6 字节！
// 布局：a(1) + pad(3) + b(4) + c(1) + pad(3) = 12（典型 x86-64）
```
- 对齐规则：每个成员对齐到自身大小；struct 整体对齐到最大成员。
- 验证：`printf("%zu %zu", sizeof(struct S), offsetof(struct S, b));`
- **做题意义**：堆题里"结构体偏移算错一字节，利用全盘报废"。

## 函数指针与控制流
```c
void (*fp)(void) = handler;
fp();    // 汇编层：call [rip+fp] 或 call 寄存器
```
- 函数指针存储在可写内存（如堆对象、GOT）时，就是潜在的劫持目标。
- C++ 虚函数表 = 编译器生成的函数指针数组（浏览器/内核方向的主角）。

## union 与类型混淆
```c
union U { long i; struct { int lo, hi; } p; char bytes[8]; };
```
- union 成员共享存储——同一块内存按不同类型解释。
- 程序逻辑错误地"先按 A 写、后按 B 读"→ 类型混淆漏洞（CTF Wiki 有专章；浏览器方向核心）。

## 连接
- 堆题的 `struct note { char *content; void (*print)(...); }` 是 UAF 劫持的经典舞台 → [uaf-double-free](../heap/uaf-double-free.md)
