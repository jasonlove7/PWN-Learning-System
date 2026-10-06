import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..", "..");
const outFile = path.join(here, "..", "src", "content", "catalog.json");

type Node = Record<string, unknown> | unknown[] | string | number | boolean | null;

function walk(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function parseScalar(raw: string): Node {
  const s = raw.trim();
  if (s === "" || s === "|" || s === ">") return "";
  if (s === "[]") return [];
  if (s === "{}") return {};
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
  if (s === "true" || s === "True") return true;
  if (s === "false" || s === "False") return false;
  if (s === "null" || s === "~") return null;
  if (/^-?\d+$/.test(s)) return Number(s);
  return s;
}

function stripComment(rest: string): string {
  if (rest.startsWith("'") || rest.startsWith('"')) return rest;
  const i = rest.indexOf(" #");
  return i >= 0 ? rest.slice(0, i).trimEnd() : rest;
}

function parseYaml(text: string): Record<string, Node> {
  const lines = text.split(/\r?\n/);
  const root: Record<string, Node> = {};
  const stack: { indent: number; node: Node }[] = [{ indent: -1, node: root }];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith("#")) {
      i += 1;
      continue;
    }
    const indent = line.length - line.trimStart().length;
    const content = line.trim();
    while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].node;
    if (content.startsWith("- ")) {
      if (!Array.isArray(parent)) throw new Error(`list outside list: ${content}`);
      const item = content.slice(2);
      if (item.includes(":") && !item.startsWith("'") && !item.startsWith('"')) {
        const [key, ...rest] = item.split(":");
        const node: Record<string, Node> = { [key.trim()]: parseScalar(stripComment(rest.join(":"))) };
        parent.push(node);
        stack.push({ indent, node });
      } else parent.push(parseScalar(item));
      i += 1;
      continue;
    }
    if (!content.includes(":") || typeof parent !== "object" || Array.isArray(parent) || parent === null) {
      throw new Error(`bad key: ${content}`);
    }
    const [keyRaw, ...restParts] = content.split(":");
    const key = keyRaw.trim();
    const rest = stripComment(restParts.join(":")).trim();
    const map = parent as Record<string, Node>;
    if (rest === "|" || rest === ">" || rest === "|-" || rest === ">-") {
      i += 1;
      const block: string[] = [];
      while (i < lines.length) {
        const nxt = lines[i];
        if (nxt.trim() && nxt.length - nxt.trimStart().length <= indent) break;
        block.push(nxt.startsWith(" ".repeat(indent + 2)) ? nxt.slice(indent + 2) : nxt.trim());
        i += 1;
      }
      map[key] = block.join("\n").trim();
      continue;
    }
    if (rest === "") {
      let j = i + 1;
      while (j < lines.length && (!lines[j].trim() || lines[j].trimStart().startsWith("#"))) j += 1;
      if (j >= lines.length || lines[j].length - lines[j].trimStart().length <= indent) {
        map[key] = null;
        i += 1;
        continue;
      }
      const child = lines[j].trim().startsWith("- ") ? [] : {};
      map[key] = child;
      stack.push({ indent, node: child });
      i += 1;
      continue;
    }
    map[key] = parseScalar(rest);
    i += 1;
  }
  return root;
}

function splitFrontmatter(file: string): { fm: Record<string, Node>; body: string } {
  const text = fs.readFileSync(file, "utf8");
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) throw new Error(`no frontmatter ${file}`);
  const end = text.indexOf("\n---", 3);
  if (end < 0) throw new Error(`unterminated frontmatter ${file}`);
  const fm = parseYaml(text.slice(text.indexOf("\n") + 1, end));
  const body = text.slice(end + 4).replace(/^\r?\n/, "").replace(/^#\s+.+\r?\n+/, "").trim();
  return { fm, body };
}

function str(v: Node | undefined): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}
function num(v: Node | undefined): number {
  return typeof v === "number" ? v : 0;
}
function list(v: Node | undefined): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string");
}

const MODULES = [
  ["assembly", "汇编"],
  ["elf", "ELF"],
  ["gdb", "GDB"],
  ["stack", "栈溢出"],
  ["shellcode", "Shellcode"],
  ["ret2syscall", "ret2syscall"],
  ["ret2libc", "ret2libc"],
  ["rop", "ROP"],
  ["format-string", "格式化字符串"],
  ["got-plt", "GOT / PLT"],
  ["mitigations", "保护机制"],
  ["heap", "堆"],
] as const;

const files = walk(path.join(repoRoot, "knowledge"));

type Article = {
  slug: string;
  module: string;
  order: number;
  title: string;
  description: string;
  difficulty: number;
  prerequisites: string[];
  objectives: string[];
  lab: string;
  file: string;
  body: string;
};

const articles: Article[] = files.map((file) => {
  const { fm, body } = splitFrontmatter(file);
  const rel = path.relative(repoRoot, file).replaceAll("\\", "/");
  const slug = `${str(fm.module)}/${path.basename(file, ".md")}`;
  return {
    slug,
    module: str(fm.module),
    order: num(fm.order),
    title: str(fm.title),
    description: str(fm.description),
    difficulty: num(fm.difficulty),
    prerequisites: list(fm.prerequisites),
    objectives: list(fm.objectives),
    lab: str(fm.lab),
    file: rel,
    body,
  };
});

const missing = new Set<string>();
for (const [id] of MODULES) {
  if (!articles.some((a) => a.module === id && a.order === 0)) missing.add(id);
}
if (missing.size) throw new Error(`modules without index.md: ${[...missing].join(", ")}`);

const catalog = {
  generatedFrom: "knowledge/",
  modules: MODULES.map(([id, title]) => ({ id, title })),
  articles,
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(catalog));
console.log(`modules ${MODULES.length} articles ${articles.length}`);
