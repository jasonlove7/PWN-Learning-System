import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { getArticle, getArticles, getModule, neighbors } from "@/lib/content";

export function generateStaticParams() {
  return getArticles()
    .filter((a) => a.order > 0)
    .map((a) => ({ module: a.module, slug: a.slug.slice(a.module.length + 1) }));
}

export default async function ArticlePage({ params }: { params: Promise<{ module: string; slug: string }> }) {
  const { module, slug } = await params;
  const article = getArticle(`${module}/${slug}`);
  if (!article || article.order === 0) notFound();
  const mod = getModule(module);
  const { prev, next } = neighbors(article);
  return (
    <article className="prose">
      <p className="meta">
        <Link href="/">主线</Link>
        {" / "}
        <Link href={`/knowledge/${module}`}>{mod?.title ?? module}</Link>
      </p>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      {article.body ? <Markdown>{article.body}</Markdown> : null}
      <h2>学完这一节，你应该能够</h2>
      <ul>
        {article.objectives.map((o) => <li key={o}>{o}</li>)}
      </ul>
      {article.lab ? <p className="meta">实验：{article.lab}</p> : null}
      <p className="meta">
        {prev ? <Link href={`/knowledge/${prev.slug}`}>上一篇：{prev.order === 0 ? "概述" : prev.title}</Link> : <span />}
        {"　"}
        {next ? <Link href={`/knowledge/${next.slug}`}>下一篇：{next.title}</Link> : <span>下一篇尚未写</span>}
      </p>
    </article>
  );
}

export function generateMetadata({ params }: { params: Promise<{ module: string; slug: string }> }) {
  return params.then((p) => ({ title: getArticle(`${p.module}/${p.slug}`)?.title ?? "文章" }));
}
