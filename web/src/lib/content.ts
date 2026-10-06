import catalogJson from "@/content/catalog.json";
import type { Article, Catalog, Module } from "./types";

const catalog = catalogJson as Catalog;

const bySlug = new Map(catalog.articles.map((a) => [a.slug, a]));

export function getModules(): Module[] {
  return catalog.modules;
}

export function getModule(id: string): Module | undefined {
  return catalog.modules.find((m) => m.id === id);
}

export function getArticles(): Article[] {
  return catalog.articles;
}

export function getArticle(slug: string): Article | undefined {
  return bySlug.get(slug);
}

export function moduleArticles(moduleId: string): Article[] {
  return catalog.articles
    .filter((a) => a.module === moduleId)
    .sort((a, b) => a.order - b.order);
}

export function moduleIndex(moduleId: string): Article | undefined {
  return moduleArticles(moduleId).find((a) => a.order === 0);
}

export function neighbors(article: Article): { prev?: Article; next?: Article } {
  const list = moduleArticles(article.module);
  const i = list.findIndex((a) => a.slug === article.slug);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined };
}

export function articleCount(moduleId: string): number {
  return catalog.articles.filter((a) => a.module === moduleId && a.order > 0).length;
}
