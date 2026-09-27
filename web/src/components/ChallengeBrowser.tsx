"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Challenge } from "@/lib/types";

export function ChallengeBrowser({ items }: { items: Challenge[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const shown = useMemo(() => items.filter((c) => {
    if (q && !`${c.name} ${c.event} ${c.platform} ${c.knowledgePoints.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (category !== "all" && c.category !== category) return false;
    if (difficulty !== "all" && c.difficulty !== difficulty) return false;
    return true;
  }), [items, q, category, difficulty]);
  return (
    <>
      <div className="filters">
        <input aria-label="搜索题目" placeholder="搜索" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="分类" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">全部分类</option>
          <option value="foundation">foundation</option>
          <option value="core">core</option>
          <option value="advanced">advanced</option>
        </select>
        <select aria-label="难度" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="all">全部难度</option>
          {["beginner", "basic", "intermediate", "advanced"].map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      <div className="list">
        {shown.map((c) => (
          <Link className="card" key={c.id} href={`/challenges/${c.id}`}>
            <div className="row"><h3>{c.name}</h3><span className="pill">{c.difficulty}</span></div>
            <p className="meta">{[c.event, c.year].filter(Boolean).join(" ") || c.platform}</p>
            <p className="meta">{c.knowledgePoints.join(" · ")}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
