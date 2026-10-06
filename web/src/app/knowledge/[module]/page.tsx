import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule, getModules, moduleArticles } from "@/lib/content";

export function generateStaticParams() {
  return getModules().map((m) => ({ module: m.id }));
}

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const mod = getModule(module);
  if (!mod) notFound();
  const articles = moduleArticles(module);
  return (
    <>
      <p className="meta"><Link href="/">主线</Link></p>
      <h1>{mod.title}</h1>
      <div className="list">
        {articles.map((a) => (
          <Link className="card" key={a.slug} href={`/knowledge/${a.slug}`}>
            <div className="row">
              <h3>{a.order === 0 ? "概述" : `${String(a.order).padStart(2, "0")}　${a.title}`}</h3>
            </div>
            <p className="meta">{a.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export function generateMetadata({ params }: { params: Promise<{ module: string }> }) {
  return params.then((p) => ({ title: getModule(p.module)?.title ?? "模块" }));
}
