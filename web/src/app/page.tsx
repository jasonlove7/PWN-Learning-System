import Link from "next/link";
import { getKnowledge, getStats, trackKey } from "@/lib/content";

const LANES = [
  { href: "/roadmap#foundation", title: "Foundation", text: "C、Linux、汇编、调试、ELF" },
  { href: "/roadmap#core", title: "PWN Core", text: "栈、ROP、格式化字符串、动态链接" },
  { href: "/roadmap#advanced", title: "Advanced PWN", text: "glibc 堆与现代利用" },
  { href: "/roadmap#specializations", title: "Specializations", text: "内核、Android、ARM、浏览器等" },
];

export default function HomePage() {
  const stats = getStats();
  const counts = { foundation: 0, core: 0, advanced: 0, specialization: 0 };
  for (const k of getKnowledge()) counts[trackKey(k.id)] += 1;
  const tiles = [
    ["Knowledge", stats.knowledge],
    ["Resources", stats.resources],
    ["Challenges", stats.challenges],
    ["Writeups", stats.writeups],
  ] as const;
  return (
    <>
      <h1>PWN Learning System</h1>
      <p className="lead">从基础到高级，系统学习 PWN。</p>
      <div className="grid">
        {tiles.map(([label, n]) => (
          <div className="card" key={label}><div className="meta">{label}</div><h3>{n}</h3></div>
        ))}
      </div>
      <h2>学习路线</h2>
      <div className="grid">
        {LANES.map((lane) => (
          <Link className="card" key={lane.href} href={lane.href}>
            <h3>{lane.title}</h3>
            <p className="meta">{lane.text}</p>
            <p className="meta">{counts[lane.href.includes("foundation") ? "foundation" : lane.href.includes("core") ? "core" : lane.href.includes("advanced") ? "advanced" : "specialization"]} 个知识点</p>
          </Link>
        ))}
      </div>
    </>
  );
}
