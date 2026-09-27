import Link from "next/link";
import { getChallenges, getKnowledge, getResources, getSpecializations } from "@/lib/content";

export function generateStaticParams() {
  return getSpecializations().map((s) => ({ slug: s.slug }));
}

export default async function SpecPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spec = getSpecializations().find((s) => s.slug === slug);
  if (!spec) return <p>没有这个方向。</p>;
  const id = `spec-${slug}`;
  const knowledge = getKnowledge().filter((k) => k.id === id || k.id.startsWith(`${id}-`));
  const resources = getResources().filter((r) => r.relatedKnowledge.includes(id));
  const related = slug === "arm-aarch64"
    ? getChallenges().filter((c) => c.id === "ch-ropemporium-ret2win")
    : getChallenges().filter((c) => c.knowledgePoints.includes(id));
  return (
    <>
      <h1>{spec.title}</h1>
      <p className="pill">Skeleton</p>
      <p>{spec.note}</p>
      <h2>知识点 {knowledge.length}</h2>
      <ul>{knowledge.map((k) => <li key={k.id}><Link href={`/knowledge/${k.id}`}>{k.title}</Link></li>)}</ul>
      <h2>资源 {resources.length}</h2>
      <ul>{resources.map((r) => <li key={r.id}><a href={r.url} target="_blank" rel="noreferrer">{r.title}</a></li>)}</ul>
      <h2>题目 {related.length}</h2>
      {related.length === 0 ? <p>暂无已验证 Challenge。</p> : (
        <ul>{related.map((c) => <li key={c.id}><Link href={`/challenges/${c.id}`}>{c.name}</Link>{slug === "arm-aarch64" ? <span className="meta"> · ARMv5，不是 AArch64</span> : null}</li>)}</ul>
      )}
    </>
  );
}
