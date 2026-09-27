import { ProgressBoard } from "@/components/ProgressBoard";
import { getKnowledge } from "@/lib/content";

export default function ProgressPage() {
  return (
    <>
      <h1>我的进度</h1>
      <p className="lead">只统计你在这台浏览器里标过的知识点。没有等级、经验值或排名。</p>
      <ProgressBoard items={getKnowledge()} />
    </>
  );
}
