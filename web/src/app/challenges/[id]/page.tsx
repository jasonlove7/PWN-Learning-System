import Link from "next/link";
import { notFound } from "next/navigation";
import { ChallengeActions } from "@/components/ChallengeActions";
import { getChallengeById, getChallenges, getKnowledgeById, getWriteupById } from "@/lib/content";

export function generateStaticParams() {
  return getChallenges().map((c) => ({ id: c.id }));
}

export default async function ChallengeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getChallengeById(id);
  if (!c) notFound();
  const writeups = c.writeups.map((wid) => getWriteupById(wid)).filter((w) => w != null);
  return (
    <article>
      <h1>{c.name}</h1>
      <p className="meta">{c.difficulty} · {c.category} · {c.verificationStatus}</p>
      <p>{[c.event, c.year].filter(Boolean).join(" ") || "非赛事题"} · {c.platform}</p>
      <p><a href={c.url} target="_blank" rel="noreferrer">打开题目</a></p>
      <h2>知识点</h2>
      <ul>{c.knowledgePoints.map((k) => <li key={k}><Link href={`/knowledge/${k}`}>{getKnowledgeById(k)?.title ?? k}</Link></li>)}</ul>
      <h2>为什么选</h2>
      <p>{c.whySelected}</p>
      <ChallengeActions challenge={{ ...c, writeups: writeups.map((w) => w.url) }} />
      <h2>外部 writeup</h2>
      <ul>
        {writeups.map((w) => (
          <li key={w.id}><a href={w.url} target="_blank" rel="noreferrer">{w.title}</a> · {w.author}<p className="meta">{w.summary}</p></li>
        ))}
      </ul>
      {writeups.length === 0 ? <p className="meta">没有已核对的外部 writeup。</p> : null}
    </article>
  );
}
