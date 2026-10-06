"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "主线" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="app">
      <aside className="sidebar" data-open={open} aria-label="主导航">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>PWN Learning System</Link>
        <nav className="nav">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} data-active={path === item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="side-foot">
          <a href="https://github.com/jasonlove7/PWN-Learning-System">GitHub</a>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="menu-btn" type="button" aria-label="打开导航" onClick={() => setOpen((v) => !v)}>菜单</button>
          <span />
          <a href="https://github.com/jasonlove7/PWN-Learning-System">GitHub</a>
        </header>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
