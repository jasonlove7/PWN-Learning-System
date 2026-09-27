import { ResourceBrowser } from "@/components/ResourceBrowser";
import { getResources } from "@/lib/content";

export default function ResourcesPage() {
  return (
    <>
      <h1>资源</h1>
      <p className="lead">链接到原始页面。未验证的条目保持 Unverified，不会被改成已验证。</p>
      <ResourceBrowser items={getResources()} />
    </>
  );
}
