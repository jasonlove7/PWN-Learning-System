"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readNotes, type Note } from "@/components/ChallengeActions";
import { getChallengeById } from "@/lib/content";

export function NotebookList() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => { setNotes(Object.values(readNotes())); }, []);
  if (notes.length === 0) return <p className="meta">还没有保存。在题目页填写后，会出现在这里。数据只在这台浏览器。</p>;
  return (
    <div className="list">
      {notes.map((n) => {
        const c = getChallengeById(n.challengeId);
        return (
          <Link className="card" key={n.challengeId} href={`/challenges/${n.challengeId}`}>
            <div className="row">
              <h3>{c?.name ?? n.challengeId}</h3>
              <span className="pill">{n.solved ? "已解决" : "未解决"}</span>
              {n.reviewLater ? <span className="pill">值得重做</span> : null}
            </div>
            <p className="meta">{n.difficultyForMe} {n.timeSpent}</p>
            <p className="meta">{n.keyInsights}</p>
          </Link>
        );
      })}
    </div>
  );
}
