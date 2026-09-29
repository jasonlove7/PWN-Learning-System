import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { StatusPicker } from "@/lib/progress";
import { getChallengeById, getKnowledge, getKnowledgeById, getResourceById, getWriteupById, stars, trackLabel } from "@/lib/content";

export function generateStaticParams() {
  return getKnowledge().map((k) => ({ id: k.id }));
}

export default async function KnowledgeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const k = getKnowledgeById(id);
  if (!k) notFound();
  return (
    <article className="prose">
      <p className="meta">{trackLabel(k.track, k.id)} / {k.id}</p>
      <h1>{k.title}</h1>
      <p>重要度 <span className="stars">{stars(k.importance)}</span>　难度 <span className="stars">{stars(k.difficulty)}</span></p>
      {k.depth === "skeleton" ? <p className="pill">Skeleton</p> : null}
      {k.practiceStatus ? <p className="pill">暂无已验证 Challenge</p> : null}
      <StatusPicker id={k.id} />
      <h2>概述</h2>
      <p>{k.description}</p>
      {k.body ? <Markdown>{k.body}</Markdown> : null}
      <h2>前置</h2>
      <ul>{k.prerequisites.map((p) => <li key={p}><Link href={`/knowledge/${p}`}>{getKnowledgeById(p)?.title ?? p}</Link></li>)}</ul>
      {k.prerequisites.length === 0 ? <p className="meta">无。</p> : null}
      <h2>学完应能</h2>
      <ul>{k.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
      <h2>资源</h2>
      <ul>
        {k.resources.map((rid) => {
          const r = getResourceById(rid);
          return <li key={rid}>{r ? <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a> : rid} {r ? <span className="meta">{r.verified ? "Verified" : "Unverified"}</span> : null}</li>;
        })}
      </ul>
      <h2>题目</h2>
      <ul>
        {k.challenges.map((cid) => {
          const c = getChallengeById(cid);
          return <li key={cid}>{c ? <Link href={`/challenges/${c.id}`}>{c.name}</Link> : cid}</li>;
        })}
      </ul>
      {k.challenges.length === 0 ? <p className="meta">暂无已验证 Challenge。</p> : null}
      <h2>Writeup</h2>
      <ul>
        {k.writeups.map((wid) => {
          const w = getWriteupById(wid);
          return <li key={wid}>{w ? <a href={w.url} target="_blank" rel="noreferrer">{w.title}</a> : wid}</li>;
        })}
      </ul>
      <p className="meta">源文件：{k.file}</p>
    </article>
  );
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then((p) => ({ title: getKnowledgeById(p.id)?.title ?? "知识点" }));
}
