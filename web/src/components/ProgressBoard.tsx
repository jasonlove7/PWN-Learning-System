"use client";

import { useEffect, useState } from "react";
import { trackKey } from "@/lib/content";
import type { Knowledge } from "@/lib/types";
import { readStatus } from "@/lib/progress";

const GROUPS = [
  ["foundation", "Foundation"],
  ["core", "PWN Core"],
  ["advanced", "Advanced PWN"],
  ["specialization", "Specializations"],
] as const;

export function ProgressBoard({ items }: { items: Knowledge[] }) {
  const [known, setKnown] = useState<Record<string, string>>({});
  useEffect(() => { setKnown(readStatus()); }, []);
  return (
    <div className="list">
      {GROUPS.map(([key, title]) => {
        const group = items.filter((k) => trackKey(k.id) === key);
        const done = group.filter((k) => known[k.id] === "mastered" || known[k.id] === "familiar").length;
        const pct = group.length ? Math.round((done / group.length) * 100) : 0;
        return (
          <section className="card" key={key}>
            <div className="row"><h3>{title}</h3><span className="meta">{done} / {group.length} 已开始或掌握</span></div>
            <div className="bar" aria-label={`${title} ${pct}%`}><span style={{ width: `${pct}%` }} /></div>
          </section>
        );
      })}
    </div>
  );
}
