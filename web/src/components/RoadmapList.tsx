"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { stars, trackKey } from "@/lib/content";
import type { Knowledge } from "@/lib/types";
import { StatusLabel, readStatus, type Status } from "@/lib/progress";

const ORDER = ["foundation", "core", "advanced", "specialization"] as const;
const TITLE = { foundation: "Foundation", core: "PWN Core", advanced: "Advanced PWN", specialization: "Specializations" };

export function RoadmapList({ items }: { items: Knowledge[] }) {
  const [status, setStatus] = useState<Record<string, Status>>({});
  useEffect(() => { setStatus(readStatus()); }, []);
  return (
    <>
      {ORDER.map((key) => (
        <section key={key} id={key}>
          <h2>{TITLE[key]}</h2>
          <div className="list">
            {items.filter((k) => trackKey(k.id) === key).map((k) => (
              <Link className="card" key={k.id} href={`/knowledge/${k.id}`}>
                <div className="row">
                  <h3>{k.title}</h3>
                  <StatusLabel status={status[k.id]} />
                  {k.depth === "skeleton" ? <span className="pill">Skeleton</span> : null}
                </div>
                <p className="meta">重要度 <span className="stars">{stars(k.importance)}</span>　难度 <span className="stars">{stars(k.difficulty)}</span></p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
