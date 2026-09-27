"use client";

import { useEffect, useState } from "react";
import type { Challenge } from "@/lib/types";

export type Note = {
  challengeId: string;
  savedAt: string;
  solved: boolean;
  solveDate: string;
  timeSpent: string;
  difficultyForMe: string;
  mistakes: string;
  keyInsights: string;
  importantTechniques: string;
  myNotes: string;
  myWriteup: string;
  reviewLater: boolean;
  thingsToReview: string;
};

const KEY = "pwn-notebook-v1";

export function readNotes(): Record<string, Note> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY) || "{}") as Record<string, Note>; }
  catch { return {}; }
}

function blank(id: string): Note {
  return {
    challengeId: id, savedAt: "", solved: false, solveDate: "", timeSpent: "",
    difficultyForMe: "", mistakes: "", keyInsights: "", importantTechniques: "",
    myNotes: "", myWriteup: "", reviewLater: false, thingsToReview: "",
  };
}

export function ChallengeActions({ challenge }: { challenge: Challenge }) {
  const [open, setOpen] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [note, setNote] = useState<Note>(() => blank(challenge.id));
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const all = readNotes();
    if (all[challenge.id]) setNote(all[challenge.id]);
  }, [challenge.id]);

  function save(next: Note) {
    const all = readNotes();
    next.savedAt = new Date().toISOString().slice(0, 10);
    all[challenge.id] = next;
    localStorage.setItem(KEY, JSON.stringify(all));
    setNote(next);
    setSaved(true);
  }

  return (
    <>
      <h2>提示</h2>
      {challenge.hints.length === 0 ? <p className="meta">这道题文件里没有三级提示。</p> : null}
      {challenge.hints.map((h, i) => (
        <div key={h.title} className="hint">
          {i <= open ? (
            <>
              <strong>{h.title || `Hint ${i + 1}`}</strong>
              <p>{h.body}</p>
              {i === open && i < challenge.hints.length - 1 ? (
                <button type="button" className="pill status-btn" onClick={() => setOpen(i + 1)}>下一条提示</button>
              ) : null}
            </>
          ) : <p className="meta">Hint {i + 1} 未打开</p>}
        </div>
      ))}
      <h2>Writeup</h2>
      <p className="meta">外部链接，不是全文。默认不展开。</p>
      {reveal ? (
        <ul>
          {challenge.writeups.map((id) => <li key={id}>{id}</li>)}
          {challenge.writeups.length === 0 ? <li className="meta">没有已核对的外部 writeup。</li> : null}
        </ul>
      ) : (
        <button type="button" className="pill status-btn" onClick={() => setReveal(true)}>查看 Writeup 链接</button>
      )}
      <h2>积累本</h2>
      <label className="field">我的难度
        <input value={note.difficultyForMe} onChange={(e) => setNote({ ...note, difficultyForMe: e.target.value })} />
      </label>
      <label className="field">耗时
        <input value={note.timeSpent} onChange={(e) => setNote({ ...note, timeSpent: e.target.value })} />
      </label>
      <label className="row">
        <input type="checkbox" checked={note.solved} onChange={(e) => setNote({ ...note, solved: e.target.checked })} /> 已解决
      </label>
      <label className="field">解决日期
        <input value={note.solveDate} onChange={(e) => setNote({ ...note, solveDate: e.target.value })} placeholder="YYYY-MM-DD" />
      </label>
      <label className="field">卡在哪
        <textarea value={note.mistakes} onChange={(e) => setNote({ ...note, mistakes: e.target.value })} />
      </label>
      <label className="field">关键理解
        <textarea value={note.keyInsights} onChange={(e) => setNote({ ...note, keyInsights: e.target.value })} />
      </label>
      <label className="field">技巧
        <textarea value={note.importantTechniques} onChange={(e) => setNote({ ...note, importantTechniques: e.target.value })} />
      </label>
      <label className="field">笔记
        <textarea value={note.myNotes} onChange={(e) => setNote({ ...note, myNotes: e.target.value })} />
      </label>
      <label className="field">我的 writeup
        <textarea value={note.myWriteup} onChange={(e) => setNote({ ...note, myWriteup: e.target.value })} />
      </label>
      <label className="field">以后复习什么
        <textarea value={note.thingsToReview} onChange={(e) => setNote({ ...note, thingsToReview: e.target.value })} />
      </label>
      <label className="row">
        <input type="checkbox" checked={note.reviewLater} onChange={(e) => setNote({ ...note, reviewLater: e.target.checked })} /> 值得重做
      </label>
      <button type="button" className="pill status-btn" data-on="true" onClick={() => save(note)}>保存到这台浏览器</button>
      {saved ? <p className="meta">已保存。只在本地，不上传。</p> : null}
    </>
  );
}
