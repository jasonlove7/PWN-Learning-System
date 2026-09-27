"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { stars, trackLabel } from "@/lib/content";
import type { Knowledge } from "@/lib/types";
import { StatusLabel, readStatus, type Status } from "@/lib/progress";

export function KnowledgeBrowser({ items }: { items: Knowledge[] }) {
  const [q, setQ] = useState("");
  const [track, setTrack] = useState("all");
  const [status, setStatus] = useState<Record<string, Status>>({});
  useEffect(() => { setStatus(readStatus()); }, []);
  const shown = useMemo(() => items.filter((k) => {
    const text = `${k.title} ${k.id} ${k.description}`.toLowerCase();
    if (q && !text.includes(q.toLowerCase())) return false;
    if (track !== "all" && !k.id.startsWith(track)) return false;
    return true;
  }), [items, q, track]);
  return (
    <>
      <div className="filters">
        <input aria-label="搜索知识点" placeholder="搜索" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="分类" value={track} onChange={(e) => setTrack(e.target.value)}>
          <option value="all">全部</option>
          <option value="fnd-">Foundation</option>
          <option value="core-">PWN Core</option>
          <option value="adv-">Advanced PWN</option>
          <option value="spec-">Specializations</option>
        </select>
      </div>
      <div className="list">
        {shown.map((k) => (
          <Link className="card" key={k.id} href={`/knowledge/${k.id}`}>
            <div className="row"><h3>{k.title}</h3><StatusLabel status={status[k.id]} /></div>
            <p className="meta">{trackLabel(k.track, k.id)} · 重要度 <span className="stars">{stars(k.importance)}</span> · 难度 <span className="stars">{stars(k.difficulty)}</span></p>
            <p className="meta">{k.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
