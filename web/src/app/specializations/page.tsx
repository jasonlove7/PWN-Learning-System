import Link from "next/link";
import { getChallenges, getKnowledge, getResources, getSpecializations } from "@/lib/content";

export default function SpecIndex() {
  const specs = getSpecializations();
  return (
    <>
      <h1>专项方向</h1>
      <p className="lead">不是必修。没有题就写没有题。</p>
      <div className="grid">
        {specs.map((s) => {
          const id = `spec-${s.slug}`;
          const k = getKnowledge().filter((x) => x.id === id).length;
          const r = getResources().filter((x) => x.relatedKnowledge.includes(id)).length;
          const c = s.slug === "arm-aarch64" ? 1 : getChallenges().filter((x) => x.knowledgePoints.includes(id)).length;
          return (
            <Link className="card" key={s.slug} href={`/specializations/${s.slug}`}>
              <h3>{s.title}</h3>
              <p className="meta">Skeleton</p>
              <p className="meta">知识点 {k} · 资源 {r} · 题目 {c}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
