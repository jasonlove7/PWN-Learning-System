import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ id: "_" }];
}

export default function Gone() {
  notFound();
}
