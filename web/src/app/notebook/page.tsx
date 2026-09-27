import { NotebookList } from "@/components/NotebookList";

export default function NotebookPage() {
  return (
    <>
      <h1>积累本</h1>
      <p className="lead">你自己的收藏和复盘。不是官方题库，没有分数。</p>
      <NotebookList />
    </>
  );
}
