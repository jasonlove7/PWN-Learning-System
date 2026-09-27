import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/Shell";
import catalog from "@/content/catalog.json";
import type { Catalog } from "@/lib/types";

export const metadata: Metadata = {
  title: "PWN Learning System",
  description: "从基础到高级，系统学习 PWN。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Shell catalog={catalog as Catalog}>{children}</Shell>
      </body>
    </html>
  );
}
