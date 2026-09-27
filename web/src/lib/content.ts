import catalogJson from "@/content/catalog.json";
import type { Catalog, Challenge, Knowledge, Resource, Specialization, Writeup } from "./types";

const catalog = catalogJson as Catalog;

const knowledgeById = new Map(catalog.knowledge.map((k) => [k.id, k]));
const challengeById = new Map(catalog.challenges.map((c) => [c.id, c]));
const writeupById = new Map(catalog.writeups.map((w) => [w.id, w]));
const resourceById = new Map(catalog.resources.map((r) => [r.id, r]));

export function getKnowledge(): Knowledge[] {
  return catalog.knowledge;
}
export function getKnowledgeById(id: string): Knowledge | undefined {
  return knowledgeById.get(id);
}
export function getResources(): Resource[] {
  return catalog.resources;
}
export function getResourceById(id: string): Resource | undefined {
  return resourceById.get(id);
}
export function getChallenges(): Challenge[] {
  return catalog.challenges;
}
export function getChallengeById(id: string): Challenge | undefined {
  return challengeById.get(id);
}
export function getChallengesByKnowledge(id: string): Challenge[] {
  return catalog.challenges.filter((c) => c.knowledgePoints.includes(id));
}
export function getWriteups(): Writeup[] {
  return catalog.writeups;
}
export function getWriteupById(id: string): Writeup | undefined {
  return writeupById.get(id);
}
export function getSpecializations(): Specialization[] {
  return catalog.specializations;
}

export function trackLabel(track: string, id: string): string {
  if (id.startsWith("adv-")) return "Advanced PWN";
  if (id.startsWith("core-")) return "PWN Core";
  if (id.startsWith("fnd-")) return "Foundation";
  if (track === "specialization" || id.startsWith("spec-")) return "Specializations";
  return track;
}

export function trackKey(id: string): "foundation" | "core" | "advanced" | "specialization" {
  if (id.startsWith("fnd-")) return "foundation";
  if (id.startsWith("core-")) return "core";
  if (id.startsWith("adv-")) return "advanced";
  return "specialization";
}

export function getStats() {
  return {
    knowledge: catalog.knowledge.length,
    resources: catalog.resources.length,
    challenges: catalog.challenges.length,
    writeups: catalog.writeups.length,
    specializations: catalog.specializations.length,
  };
}

export function stars(n: number): string {
  const v = Math.max(0, Math.min(5, n));
  return "★".repeat(v) + "☆".repeat(5 - v);
}
