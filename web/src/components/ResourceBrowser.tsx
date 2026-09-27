"use client";

import { useMemo, useState } from "react";
import type { Resource } from "@/lib/types";

export function ResourceBrowser({ items }: { items: Resource[] }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState("all");
  const shown = useMemo(() => items.filter((r) => {
    if (q && !`${r.title} ${r.author} ${r.id}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (kind !== "all" && r.sourceType !== kind) return false;
    return true;
  }), [items, q, kind]);
  const kinds = [...new Set(items.map((r) => r.sourceType))].sort();
  return (
    <>
      <div className="filters">
        <input aria-label="搜索资源" placeholder="搜索" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="类型" value={kind} onChange={(e) => setKind(e.target.value)}>
          <option value="all">全部类型</option>
          {kinds.map((k) => <option key={k}>{k}</option>)}
        </select>
      </div>
      <div className="list">
        {shown.map((r) => (
          <a className="card" key={r.id} href={r.url} target="_blank" rel="noreferrer">
            <div className="row">
              <h3>{r.title}</h3>
              <span className="pill">{r.verified ? "Verified" : "Unverified"}</span>
              <span className="pill">{r.tier}</span>
            </div>
            <p className="meta">{r.author || "unknown"} · {r.language} · {r.sourceType}</p>
            <p className="meta">{r.summary}</p>
          </a>
        ))}
      </div>
    </>
  );
}
