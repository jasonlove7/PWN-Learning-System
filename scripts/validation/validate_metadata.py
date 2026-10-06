#!/usr/bin/env python3
"""Structural metadata check for this repo.

Does not fetch URLs. Does not judge whether a challenge or author is real.
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

KNOWLEDGE_REQUIRED = ["title", "description", "module", "order", "difficulty", "objectives"]
MODULES = [
    "assembly", "elf", "gdb", "stack", "shellcode", "ret2syscall",
    "ret2libc", "rop", "format-string", "got-plt", "mitigations", "heap",
]
CHALLENGE_REQUIRED = [
    "id",
    "name",
    "platform",
    "category",
    "difficulty",
    "url",
    "verification_status",
    "reproducibility",
]
WRITEUP_REQUIRED = [
    "id",
    "type",
    "title",
    "challenge",
    "author",
    "url",
    "verified",
    "verified_date",
]

TRACKS = {"mainline", "specialization"}
KP_TYPES = {"concept", "technique", "tool", "environment", "mitigation", "lab"}
KP_VERIFY = {"verified", "partial-verified", "unverified", "ai-generated"}
CH_CATEGORY = {"foundation", "core", "advanced", "specialization"}
CH_DIFFICULTY = {"beginner", "basic", "intermediate", "advanced"}
CH_VERIFY = {
    "platform-and-challenge-verified",
    "platform-verified-challenge-listed",
    "platform-verified-challenge-unverified",
}
CH_REPRO = {"high", "medium", "low", "unknown"}
WU_TYPES = {"external", "ai_summary"}
TIERS = {"CORE", "RECOMMENDED", "SUPPLEMENTARY", "ADVANCED"}
PLANNED_STATUS = {"planned", "research-needed", "unverified"}


class YError(Exception):
    pass


def strip_inline_comment(rest: str) -> str:
    if rest.startswith(("'", '"')):
        return rest
    if " #" in rest:
        return rest.split(" #", 1)[0].rstrip()
    return rest


def parse_scalar(raw: str):
    s = raw.strip()
    if s == "" or s in {"|", ">"}:
        return ""
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        return s[1:-1]
    if s == "[]":
        return []
    if s == "{}":
        return {}
    if s in {"true", "True", "yes"}:
        return True
    if s in {"false", "False", "no"}:
        return False
    if s in {"null", "~"}:
        return None
    if s.isdigit() or (s.startswith("-") and s[1:].isdigit()):
        return int(s)
    return s


def parse_yaml_subset(text: str) -> dict:
    """Parse the frontmatter subset used in this repo.

    Supports nested maps, lists of scalars, lists of single-level maps,
    and literal block scalars. Not a general YAML parser.
    """
    lines = text.splitlines()
    root: dict = {}
    stack: list[tuple[int, object]] = [(-1, root)]

    i = 0
    while i < len(lines):
        line = lines[i]
        if not line.strip() or line.lstrip().startswith("#"):
            i += 1
            continue
        indent = len(line) - len(line.lstrip(" "))
        if line[:indent] != " " * indent and "\t" in line[: indent + 1]:
            raise YError(f"tab indent at line {i + 1}")
        content = line.strip()
        while stack and indent <= stack[-1][0]:
            stack.pop()
        if not stack:
            raise YError(f"indent underflow at line {i + 1}")
        parent = stack[-1][1]

        if content.startswith("- "):
            if not isinstance(parent, list):
                raise YError(f"list item outside list at line {i + 1}: {content}")
            item = content[2:]
            if ":" in item and not item.startswith(("'", '"')):
                key, _, rest = item.partition(":")
                node = {key.strip(): parse_scalar(rest)}
                parent.append(node)
                stack.append((indent, node))
            else:
                parent.append(parse_scalar(item))
            i += 1
            continue

        if ":" not in content:
            raise YError(f"expected key at line {i + 1}: {content}")
        key, _, rest = content.partition(":")
        key = key.strip()
        rest = rest.strip()
        if not isinstance(parent, dict):
            raise YError(f"key under non-map at line {i + 1}: {key}")
        if rest in {"|", ">", "|-", ">-"}:
            i += 1
            block = []
            while i < len(lines):
                nxt = lines[i]
                if nxt.strip() and (len(nxt) - len(nxt.lstrip(" "))) <= indent:
                    break
                block.append(nxt[indent + 2 :] if nxt.startswith(" " * (indent + 2)) else nxt.strip())
                i += 1
            parent[key] = "\n".join(block).strip()
            continue
        if rest == "":
            # Peek: list, nested map, or empty.
            j = i + 1
            while j < len(lines) and (not lines[j].strip() or lines[j].lstrip().startswith("#")):
                j += 1
            if j >= len(lines):
                parent[key] = None
                i += 1
                continue
            nindent = len(lines[j]) - len(lines[j].lstrip(" "))
            if nindent <= indent:
                parent[key] = None
                i += 1
                continue
            child_line = lines[j].strip()
            if child_line.startswith("- "):
                node = []
            else:
                node = {}
            parent[key] = node
            stack.append((indent, node))
            i += 1
            continue
        parent[key] = parse_scalar(strip_inline_comment(rest))
        i += 1
    return root


def split_frontmatter(text: str, path: Path):
    if not text.startswith("---\n"):
        # Resource files may contain several fenced yaml blocks instead.
        return None
    end = text.find("\n---", 4)
    if end < 0:
        raise YError("unclosed frontmatter")
    return parse_yaml_subset(text[4:end])


def iter_markdown(folder: Path):
    if not folder.exists():
        return
    for path in sorted(folder.rglob("*.md")):
        if path.name in {"README.md", "_template.md"}:
            continue
        yield path


def load_objects(folder: Path, kind: str, errors: list[str]):
    found = []
    for path in iter_markdown(folder):
        text = path.read_text(encoding="utf-8")
        try:
            data = split_frontmatter(text, path)
        except YError as exc:
            errors.append(f"{path.relative_to(ROOT)}: frontmatter: {exc}")
            continue
        if data is None:
            errors.append(f"{path.relative_to(ROOT)}: missing frontmatter")
            continue
        data["__path__"] = str(path.relative_to(ROOT))
        data["__kind__"] = kind
        found.append(data)
    return found


def load_resource_ids(errors: list[str], warnings: list[str]):
    ids = {}
    folder = ROOT / "resources"
    for path in sorted(folder.glob("*.md")):
        if path.name == "README.md":
            continue
        text = path.read_text(encoding="utf-8")
        blocks = []
        start = 0
        while True:
            i = text.find("```yaml", start)
            if i < 0:
                break
            j = text.find("```", i + 7)
            if j < 0:
                errors.append(f"{path.relative_to(ROOT)}: unclosed yaml fence")
                break
            body = text[i + 7 : j].strip()
            # A fence may hold several documents separated by ---
            parts = []
            current = []
            for line in body.splitlines():
                if line.strip() == "---":
                    if any(x.strip() and not x.strip().startswith("#") for x in current):
                        parts.append("\n".join(current))
                    current = []
                else:
                    current.append(line)
            if any(x.strip() and not x.strip().startswith("#") for x in current):
                parts.append("\n".join(current))
            for part in parts:
                if "id:" not in part:
                    continue
                stripped = "\n".join(
                    ln for ln in part.splitlines() if ln.strip() and not ln.strip().startswith("#")
                )
                if not stripped.strip():
                    continue
                try:
                    data = parse_yaml_subset(stripped)
                except YError as exc:
                    errors.append(f"{path.relative_to(ROOT)}: resource block: {exc}")
                    continue
                rid = data.get("id")
                if not rid or str(rid).startswith("#"):
                    continue
                if not isinstance(rid, str):
                    errors.append(f"{path.relative_to(ROOT)}: resource id is not a string")
                    continue
                if rid in ids:
                    prev = ids[rid]
                    # A later block that only repeats the id as a cross-reference
                    # (no url of its own) is not a second resource.
                    if not data.get("url") or not prev.get("url") or data.get("url") == prev.get("url"):
                        warnings.append(f"{rid}: id repeated; keeping the block that has a url")
                        if data.get("url") and not prev.get("url"):
                            ids[rid] = data
                        continue
                    errors.append(f"duplicate resource id {rid}")
                ids[rid] = data
                if "verified" in data and not isinstance(data["verified"], bool):
                    warnings.append(f"{rid}: verified is not a boolean ({data['verified']!r})")
                tier = data.get("tier")
                if tier is not None and tier not in TIERS:
                    errors.append(f"{rid}: unknown tier {tier}")
                scope = data.get("architecture_scope")
                if scope is not None:
                    if not isinstance(scope, list) or not scope:
                        errors.append(f"{rid}: architecture_scope must be a non-empty list")
                    else:
                        for arch in scope:
                            if arch not in {"ARM32", "AArch64", "x86", "x86_64"}:
                                errors.append(f"{rid}: unknown architecture_scope {arch}")
                if data.get("source_type") == "ai_generated" and data.get("verified") is True:
                    if not data.get("verification_method"):
                        errors.append(f"{rid}: ai_generated verified true without verification_method")
            start = j + 3
    return ids


def as_id_list(value, path, field, errors):
    if value is None:
        return []
    if not isinstance(value, list):
        errors.append(f"{path}: {field} is not a list")
        return []
    out = []
    for item in value:
        if isinstance(item, str):
            out.append(item)
        elif isinstance(item, dict) and "id" in item:
            out.append(item["id"])
        else:
            errors.append(f"{path}: {field} has a non-id entry {item!r}")
    return out


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    errors: list[str] = []
    warnings: list[str] = []

    knowledge = load_objects(ROOT / "knowledge", "knowledge", errors)
    labs = ROOT / "labs"

    slugs = {}
    for row in knowledge:
        path = row["__path__"]
        for field in KNOWLEDGE_REQUIRED:
            if field not in row or row[field] in (None, ""):
                errors.append(f"{path}: missing {field}")
        module = row.get("module")
        if module not in MODULES:
            errors.append(f"{path}: unknown module {module!r}")
        order = row.get("order")
        if not isinstance(order, int) or order < 0:
            errors.append(f"{path}: order must be int >= 0, got {order!r}")
        difficulty = row.get("difficulty")
        if not isinstance(difficulty, int) or not 1 <= difficulty <= 5:
            errors.append(f"{path}: difficulty must be int 1-5, got {difficulty!r}")
        objectives = row.get("objectives")
        if not isinstance(objectives, list) or not objectives:
            errors.append(f"{path}: objectives must be a non-empty list")
        prerequisites = row.get("prerequisites")
        if prerequisites is not None and not isinstance(prerequisites, list):
            errors.append(f"{path}: prerequisites is not a list")
        slug = f"{module}/{Path(path).stem}"
        if slug in slugs:
            errors.append(f"duplicate slug {slug} ({path} and {slugs[slug]})")
        slugs[slug] = path
        lab = row.get("lab")
        if isinstance(lab, str) and lab and not (ROOT / lab).is_dir():
            errors.append(f"{path}: lab directory does not exist: {lab}")

    for module in MODULES:
        if f"{module}/index" not in slugs:
            errors.append(f"module {module} has no index.md")

    print(f"articles: {len(knowledge)}")
    print(f"modules: {len(MODULES)}")
    print(f"labs: {sum(1 for p in labs.rglob('*.c')) if labs.exists() else 0}")
    print(f"errors: {len(errors)}")
    for msg in errors:
        print(f"  error: {msg}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
