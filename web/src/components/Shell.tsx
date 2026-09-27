"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Catalog } from "@/lib/types";

const NAV = [
  { href: "/", label: "首页", group: "" },
  { href: "/roadmap", label: "学习路线", group: "学习" },
  { href: "/knowledge", label: "知识点", group: "学习" },
  { href: "/resources", label: "资源", group: "学习" },
  { href: "/challenges", label: "题库", group: "学习" },
  { href: "/progress", label: "我的进度", group: "我的" },
  { href: "/notebook", label: "积累本", group: "我的" },
  { href: "/specializations", label: "专项方向", group: "探索" },
  { href: "/about", label: "关于项目", group: "项目" },
];

export function Shell({ catalog, children }: { catalog: Catalog; children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const [cursor, setCursor] = useState(0);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const rows: { href: string; title: string; group: string }[] = [];
    for (const k of catalog.knowledge) {
      if (`${k.title} ${k.id}`.toLowerCase().includes(q)) rows.push({ href: `/knowledge/${k.id}`, title: k.title, group: "Knowledge" });
    }
    for (const c of catalog.challenges) {
      if (`${c.name} ${c.id} ${c.event}`.toLowerCase().includes(q)) rows.push({ href: `/challenges/${c.id}`, title: c.name, group: "Challenges" });
    }
    for (const r of catalog.resources) {
      if (`${r.title} ${r.id}`.toLowerCase().includes(q)) rows.push({ href: r.url, title: r.title, group: "Resources" });
    }
    for (const s of catalog.specializations) {
      if (s.title.toLowerCase().includes(q)) rows.push({ href: `/specializations/${s.slug}`, title: s.title, group: "Specializations" });
    }
    return rows.slice(0, 20);
  }, [catalog, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOn(true);
      } else if (e.key === "Escape") setSearchOn(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { setCursor(0); }, [query]);

  function onSearchKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((n) => Math.min(hits.length - 1, n + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setCursor((n) => Math.max(0, n - 1)); }
    if (e.key === "Enter" && hits[cursor]) {
      const hit = hits[cursor];
      setSearchOn(false);
      if (hit.href.startsWith("http")) window.open(hit.href, "_blank", "noopener,noreferrer");
      else window.location.href = hit.href;
    }
  }

  let last = "";
  return (
    <div className="app">
      <aside className="sidebar" data-open={open} aria-label="主导航">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>PWN Learning System</Link>
        <nav className="nav">
          {NAV.map((item) => {
            const head = item.group !== last ? item.group : "";
            last = item.group;
            const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
            return (
              <span key={item.href}>
                {head ? <div className="nav-label">{head}</div> : null}
                <Link href={item.href} data-active={active} onClick={() => setOpen(false)}>{item.label}</Link>
              </span>
            );
          })}
        </nav>
        <div className="side-foot">
          <a href="https://github.com/jasonlove7/PWN-Learning-System">GitHub</a>
          <div>v1.0</div>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="menu-btn" type="button" aria-label="打开导航" onClick={() => setOpen((v) => !v)}>菜单</button>
          <button className="search-btn" type="button" onClick={() => setSearchOn(true)}>搜索知识点、题目、资源…　Ctrl K</button>
          <a href="https://github.com/jasonlove7/PWN-Learning-System">GitHub</a>
        </header>
        <div className="content">{children}</div>
      </div>
      {searchOn ? (
        <div className="modal-back" onClick={() => setSearchOn(false)}>
          <div className="modal" role="dialog" aria-label="搜索" onClick={(e) => e.stopPropagation()}>
            <input autoFocus placeholder="搜索" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onSearchKey} />
            {hits.map((hit, i) => (
              hit.href.startsWith("http") ? (
                <a key={hit.href + hit.title} className="hit" data-on={i === cursor} href={hit.href} target="_blank" rel="noreferrer">
                  <span className="meta">{hit.group}</span><div>{hit.title}</div>
                </a>
              ) : (
                <Link key={hit.href} className="hit" data-on={i === cursor} href={hit.href} onClick={() => setSearchOn(false)}>
                  <span className="meta">{hit.group}</span><div>{hit.title}</div>
                </Link>
              )
            ))}
            {query && hits.length === 0 ? <p className="meta" style={{ padding: 14 }}>没有匹配。</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
