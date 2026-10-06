import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ slug: "_" }];
}

export default function Gone() {
  notFound();
}
