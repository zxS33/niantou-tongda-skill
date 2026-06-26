import path from "node:path";
import { access, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const requiredFiles = [
  "README.md",
  "README.en.md",
  "LICENSE",
  "package.json",
  ".claude-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".cursor-plugin/plugin.json",
  ".codex/INSTALL.md",
  ".opencode/INSTALL.md",
  ".openclaw/INSTALL.md",
  ".hermes/INSTALL.md",
  ".nanobot/INSTALL.md",
  "assets/logo_main.svg",
  "assets/niantou-tongda-hero.png",
  "assets/social-card.svg",
  "bin/niantou-tongda-skill.mjs",
  "bin/lib/detect-platform.mjs",
  "bin/lib/install.mjs",
  "bin/lib/validate.mjs",
  "hooks/hooks.json",
  "hooks/session-start",
  "hooks/session-start.ps1",
  "hooks/run-hook.cmd",
  "agents/daoxin-reviewer.md",
  "docs/platforms.md",
  "docs/index.html",
  "skills/niantou-tongda/SKILL.md",
  "skills/xuanlan-mirror/SKILL.md",
  "skills/heart-knot-diagnosis/SKILL.md",
  "skills/control-boundary/SKILL.md",
  "skills/benxin-decision/SKILL.md",
  "skills/wuzhu-action/SKILL.md",
  "skills/pojing-breakthrough/SKILL.md",
  "skills/engineering-execution/SKILL.md",
  "skills/hanli-long-game/SKILL.md",
  "skills/closure-review/SKILL.md",
  "skills/tongda-workflows/SKILL.md",
  "skills/niantou-tongda/theory-map.md",
  "skills/niantou-tongda/original-texts.md",
  "skills/niantou-tongda/engineering-scenarios-reference.md",
  "skills/xuanlan-mirror/original-texts.md",
  "skills/xuanlan-mirror/thought-traps-reference.md",
  "skills/heart-knot-diagnosis/original-texts.md",
  "skills/heart-knot-diagnosis/knot-types-reference.md",
  "skills/control-boundary/original-texts.md",
  "skills/control-boundary/boundary-matrix-reference.md",
  "skills/benxin-decision/original-texts.md",
  "skills/benxin-decision/decision-ledger-reference.md",
  "skills/wuzhu-action/original-texts.md",
  "skills/wuzhu-action/action-patterns-reference.md",
  "skills/pojing-breakthrough/original-texts.md",
  "skills/pojing-breakthrough/probe-patterns-reference.md",
  "skills/engineering-execution/original-texts.md",
  "skills/engineering-execution/execution-playbooks.md",
  "skills/engineering-execution/quality-gates-reference.md",
  "skills/hanli-long-game/original-texts.md",
  "skills/hanli-long-game/long-game-checklist.md",
  "skills/closure-review/original-texts.md",
  "skills/closure-review/review-checklist.md",
  "skills/tongda-workflows/original-texts.md",
];

async function exists(root, relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function walk(root, relativeDir, matcher, files = []) {
  const entries = await readdir(path.join(root, relativeDir), { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      await walk(root, relativePath, matcher, files);
    } else if (matcher(relativePath)) {
      files.push(relativePath);
    }
  }
  return files;
}

function parseFrontmatter(content, relativePath) {
  const lines = content.replace(/^\uFEFF/, "").split(/\r?\n/);
  if (lines[0] !== "---") {
    throw new Error(`Missing frontmatter: ${relativePath}`);
  }
  const end = lines.indexOf("---", 1);
  if (end < 1) {
    throw new Error(`Missing frontmatter terminator: ${relativePath}`);
  }
  const frontmatter = lines.slice(1, end).join("\n");
  if (!/^name:\s*[a-z0-9-]+$/m.test(frontmatter)) {
    throw new Error(`Missing or invalid name in frontmatter: ${relativePath}`);
  }
  if (!/^description:\s*(\||.+)$/m.test(frontmatter)) {
    throw new Error(`Missing description in frontmatter: ${relativePath}`);
  }
  const placeholderPattern = new RegExp(String.raw`\[(?:TO)(?:DO)|(?:TO)(?:DO):`);
  if (placeholderPattern.test(content)) {
    throw new Error(`Template placeholder remains in ${relativePath}`);
  }
}

async function validateMarkdownLinks(root, relativePath, errors) {
  const fullPath = path.join(root, relativePath);
  const content = await readFile(fullPath, "utf8");
  const matches = content.matchAll(/!\[[^\]]*\]\(([^)]+)\)|\[[^\]]+\]\(([^)]+)\)/g);
  for (const match of matches) {
    const rawTarget = (match[1] ?? match[2] ?? "").trim();
    if (!rawTarget || /^[a-z]+:/i.test(rawTarget) || rawTarget.startsWith("#")) {
      continue;
    }
    const [withoutFragment] = rawTarget.split("#");
    const resolved = path.resolve(path.dirname(fullPath), withoutFragment);
    try {
      await access(resolved);
    } catch {
      errors.push(`Broken local markdown link '${rawTarget}' in ${relativePath}`);
    }
  }
}

export async function runValidation({ repoRoot, stdout = process.stdout, stderr = process.stderr } = {}) {
  const root = repoRoot ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
  const errors = [];

  stdout.write("Validating required files...\n");
  for (const file of requiredFiles) {
    if (!(await exists(root, file))) {
      errors.push(`Missing required file: ${file}`);
    }
  }

  stdout.write("Validating frontmatter...\n");
  const skillFiles = await walk(root, "skills", (file) => path.basename(file) === "SKILL.md");
  const agentFiles = await walk(root, "agents", (file) => file.endsWith(".md"));
  const commandFiles = await walk(root, "commands", (file) => file.endsWith(".md"));
  const frontmatterFiles = [...skillFiles, ...agentFiles, ...commandFiles];
  for (const file of frontmatterFiles) {
    try {
      parseFrontmatter(await readFile(path.join(root, file), "utf8"), file);
    } catch (error) {
      errors.push(error.message);
    }
  }

  stdout.write("Validating command coverage...\n");
  const skillNames = skillFiles.map((file) => path.basename(path.dirname(file))).sort();
  const skillNameSet = new Set(skillNames);
  for (const skillName of skillNames) {
    if (!(await exists(root, `commands/${skillName}.md`))) {
      errors.push(`Missing command file: commands/${skillName}.md`);
    }
    if (!(await exists(root, `skills/${skillName}/agents/openai.yaml`))) {
      errors.push(`Missing agents metadata: skills/${skillName}/agents/openai.yaml`);
    }
  }
  for (const commandFile of commandFiles) {
    const commandName = path.basename(commandFile, ".md");
    if (!skillNameSet.has(commandName)) {
      errors.push(`Command has no matching skill: ${commandFile}`);
    }
  }

  stdout.write("Validating markdown links...\n");
  for (const file of ["README.md", "README.en.md", ".codex/INSTALL.md", "docs/example.md", "docs/platforms.md"]) {
    if (await exists(root, file)) {
      await validateMarkdownLinks(root, file, errors);
    }
  }

  if (errors.length > 0) {
    for (const error of errors) {
      stderr.write(`FAIL: ${error}\n`);
    }
    stderr.write(`Validation failed with ${errors.length} error(s).\n`);
    return { ok: false, errors };
  }

  stdout.write("Validation passed.\n");
  return { ok: true, errors: [] };
}
