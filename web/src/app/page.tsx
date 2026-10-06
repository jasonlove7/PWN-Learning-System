import Link from "next/link";
import { articleCount, getModules } from "@/lib/content";

export default function HomePage() {
  const modules = getModules();
  return (
    <>
      <h1>PWN Learning System</h1>
      <p className="lead">从汇编到堆的一条主线。先看现象，再解释为什么。</p>
      <div className="list">
        {modules.map((m, i) => {
          const n = articleCount(m.id);
          return (
            <Link className="card" key={m.id} href={`/knowledge/${m.id}`}>
              <div className="row">
                <h3>{String(i + 1).padStart(2, "0")}　{m.title}</h3>
                <span className="meta">{n > 0 ? `${n} 篇` : "待写"}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
