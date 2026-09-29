import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children: kids }) {
            if (href && href.startsWith("/")) return <Link href={href}>{kids}</Link>;
            return <a href={href} target="_blank" rel="noreferrer">{kids}</a>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
