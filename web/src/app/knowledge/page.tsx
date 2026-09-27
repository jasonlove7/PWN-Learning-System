import { KnowledgeBrowser } from "@/components/KnowledgeBrowser";
import { getKnowledge } from "@/lib/content";

export default function KnowledgePage() {
  return (
    <>
      <h1>知识点</h1>
      <p className="lead">来自 knowledge/ 的 frontmatter。状态只保存在本地。</p>
      <KnowledgeBrowser items={getKnowledge()} />
    </>
  );
}
