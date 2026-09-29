import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..", "..");
const outFile = path.join(here, "..", "src", "content", "catalog.json");

function walk(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".md") && entry.name !== "README.md" && entry.name !== "_template.md") {
      out.push(full);
    }
  }
  return out;
}

type Node = Record<string, unknown> | unknown[] | string | number | boolean | null;

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

function frontmatter(file: string): Record<string, Node> | null {
  const text = fs.readFileSync(file, "utf8");
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) return null;
  const end = text.indexOf("\n---", 3);
  if (end < 0) return null;
  return parseYaml(text.slice(text.indexOf("\n") + 1, end));
}

function bodyText(file: string): string {
  const text = fs.readFileSync(file, "utf8");
  const m = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(text);
  let body = (m ? text.slice(m[0].length) : text).trim();
  body = body.replace(/^#\s+.+\r?\n+/, "").trim();
  return body;
}

function stripHints(md: string): string {
  return md.replace(/<details>[\s\S]*?<\/details>/g, "").replace(/\n{3,}/g, "\n\n").trim();
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

const knowledgeFiles = walk(path.join(repoRoot, "knowledge"));
const challengeFiles = walk(path.join(repoRoot, "challenges"));

const routeByFile = new Map<string, string>();
for (const file of knowledgeFiles) {
  const fm = frontmatter(file);
  const id = fm ? str(fm.id) : "";
  if (id) routeByFile.set(path.relative(repoRoot, file).replaceAll("\\", "/"), `/knowledge/${id}`);
}
for (const file of challengeFiles) {
  const fm = frontmatter(file);
  const id = fm ? str(fm.id) : "";
  if (id) routeByFile.set(path.relative(repoRoot, file).replaceAll("\\", "/"), `/challenges/${id}`);
}

function rewriteLinks(md: string, file: string): string {
  const dir = path.relative(repoRoot, path.dirname(file)).replaceAll("\\", "/");
  return md.replace(/\]\(([^)\s]+?\.md)(#[^)\s]*)?\)/g, (full, p: string) => {
    if (/^[a-z][a-z0-9+.-]*:/i.test(p)) return full;
    const abs = decodeURIComponent(path.posix.normalize(path.posix.join(dir, p)));
    const route = routeByFile.get(abs);
    return route ? `](${route})` : full;
  });
}

const knowledge = knowledgeFiles.map((file) => {
  const fm = frontmatter(file);
  if (!fm) throw new Error(`no frontmatter ${file}`);
  const rel = path.relative(repoRoot, file).replaceAll("\\", "/");
  return {
    id: str(fm.id),
    title: str(fm.title),
    description: str(fm.description),
    importance: num(fm.importance),
    difficulty: num(fm.difficulty),
    track: str(fm.track),
    type: str(fm.type),
    depth: str(fm.depth) || "standard",
    prerequisites: list(fm.prerequisites),
    objectives: list(fm.objectives),
    resources: list(fm.resources),
    challenges: list(fm.challenges),
    writeups: list(fm.writeups),
    practiceStatus: str(fm.practice_status),
    verificationStatus: str(fm.verification_status),
    file: rel,
    body: rewriteLinks(bodyText(file), file),
  };
});

const challenges = challengeFiles.map((file) => {
  const text = fs.readFileSync(file, "utf8");
  const fm = frontmatter(file);
  if (!fm) throw new Error(`no frontmatter ${file}`);
  const hints = [...text.matchAll(/<summary>(.*?)<\/summary>\s*([\s\S]*?)<\/details>/g)].map((m) => ({
    title: m[1].replace(/<[^>]+>/g, "").trim(),
    body: m[2].replace(/<[^>]+>/g, "").trim(),
  }));
  const writeup = (fm.writeup ?? {}) as Record<string, Node>;
  return {
    id: str(fm.id),
    name: str(fm.name),
    platform: str(fm.platform),
    event: str(fm.event),
    year: str(fm.year),
    category: str(fm.category),
    difficulty: str(fm.difficulty),
    url: str(fm.url),
    knowledgePoints: list(fm.knowledge_points),
    prerequisites: list(fm.prerequisites),
    whySelected: str(fm.why_selected),
    verificationStatus: str(fm.verification_status),
    writeups: list(writeup.external),
    file: path.relative(repoRoot, file).replaceAll("\\", "/"),
    hints,
    body: rewriteLinks(stripHints(bodyText(file)), file),
  };
});

const writeups = walk(path.join(repoRoot, "writeups")).map((file) => {
  const fm = frontmatter(file);
  if (!fm) throw new Error(`no frontmatter ${file}`);
  return {
    id: str(fm.id),
    type: str(fm.type),
    title: str(fm.title),
    challenge: str(fm.challenge),
    author: str(fm.author),
    url: str(fm.url),
    summary: str(fm.summary),
    verified: fm.verified === true,
    correspondence: str(fm.correspondence),
    file: path.relative(repoRoot, file).replaceAll("\\", "/"),
  };
});

const resources: Record<string, Node>[] = [];
for (const file of fs.readdirSync(path.join(repoRoot, "resources")).filter((f) => f.endsWith(".md") && f !== "README.md")) {
  const text = fs.readFileSync(path.join(repoRoot, "resources", file), "utf8");
  const re = /```yaml\n([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const parts: string[] = [];
    let cur: string[] = [];
    for (const line of m[1].split(/\r?\n/)) {
      if (line.trim() === "---") {
        if (cur.some((l) => l.trim() && !l.trim().startsWith("#"))) parts.push(cur.join("\n"));
        cur = [];
      } else cur.push(line);
    }
    if (cur.some((l) => l.trim() && !l.trim().startsWith("#"))) parts.push(cur.join("\n"));
    for (const part of parts) {
      const cleaned = part
        .split(/\r?\n/)
        .filter((l) => l.trim() && !l.trim().startsWith("#"))
        .join("\n");
      if (!cleaned.includes("id:") || !cleaned.includes("url:")) continue;
      const fm = parseYaml(cleaned);
      if (!str(fm.url)) continue;
      resources.push({
        id: str(fm.id),
        title: str(fm.title),
        author: str(fm.author),
        url: str(fm.url),
        sourceType: str(fm.source_type),
        language: str(fm.language),
        tier: str(fm.tier),
        verified: fm.verified === true,
        summary: str(fm.summary),
        relatedKnowledge: list(fm.related_knowledge),
        file: `resources/${file}`,
      });
    }
  }
}
const resourceById = new Map<string, (typeof resources)[number]>();
for (const r of resources) if (!resourceById.has(str(r.id)) || str(r.url)) resourceById.set(str(r.id), r);

const specs = [
  ["linux-kernel", "Linux Kernel", "内核文档入口。没有已验证的内核题。"],
  ["windows-kernel", "Windows Kernel", "驱动、IOCTL 与 WinDbg 文档。没有已验证的内核题。"],
  ["arm-aarch64", "ARM / AArch64", "ARM32 有入门材料。AArch64 只有调用约定，利用部分仍在研究。"],
  ["android", "Android", "架构、APK、沙箱、NDK、adb。没有已验证的题。"],
  ["iot", "IoT", "骨架。没有已验证的专项题。"],
  ["browser", "Browser", "研究不足。没有已验证的题。"],
  ["sandbox", "Sandbox", "入口级资料。没有已验证的题。"],
  ["hypervisor", "Hypervisor", "研究不足。没有已验证的题。"],
].map(([slug, title, note]) => ({ slug, title, note }));

const catalog = {
  generatedFrom: "repository markdown",
  knowledge,
  challenges,
  writeups,
  resources: [...resourceById.values()],
  specializations: specs,
};
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(catalog));
console.log(
  `knowledge ${knowledge.length} challenges ${challenges.length} writeups ${writeups.length} resources ${resourceById.size}`,
);
