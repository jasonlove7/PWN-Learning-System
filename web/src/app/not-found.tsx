import Link from "next/link";

export default function NotFound() {
  return (
    <div className="prose">
      <h1>页面不存在</h1>
      <p className="meta">没有找到对应的知识点、题目或页面。ID 或 slug 可能拼写有误。</p>
      <p>
        <Link href="/">返回首页</Link> · <Link href="/knowledge">知识点列表</Link> · <Link href="/challenges">题库列表</Link>
      </p>
    </div>
  );
}
