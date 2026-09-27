import { RoadmapList } from "@/components/RoadmapList";
import { getKnowledge } from "@/lib/content";

export default function RoadmapPage() {
  return (
    <>
      <h1>学习路线</h1>
      <p className="lead">Foundation → PWN Core → Advanced PWN → Specializations。重要度和难度分开。状态存在这台浏览器里。</p>
      <RoadmapList items={getKnowledge()} />
    </>
  );
}
