"use client";

import { useEffect, useState } from "react";

export type Status = "new" | "familiar" | "mastered";
const KEY = "pwn-status-v1";

export function readStatus(): Record<string, Status> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as Record<string, Status>;
  } catch {
    return {};
  }
}

export function writeStatus(id: string, status: Status) {
  const all = readStatus();
  all[id] = status;
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function StatusLabel({ status }: { status?: Status }) {
  if (status === "mastered") return <span className="pill">已掌握</span>;
  if (status === "familiar") return <span className="pill">熟悉</span>;
  return <span className="pill">未学习</span>;
}

export function StatusPicker({ id }: { id: string }) {
  const [status, setStatus] = useState<Status>("new");
  useEffect(() => { setStatus(readStatus()[id] ?? "new"); }, [id]);
  return (
    <div className="row" role="group" aria-label="学习状态">
      {(["new", "familiar", "mastered"] as const).map((s) => (
        <button
          key={s}
          type="button"
          className="pill status-btn"
          data-on={status === s}
          onClick={() => { writeStatus(id, s); setStatus(s); }}
        >
          {s === "new" ? "未学习" : s === "familiar" ? "熟悉" : "已掌握"}
        </button>
      ))}
    </div>
  );
}
