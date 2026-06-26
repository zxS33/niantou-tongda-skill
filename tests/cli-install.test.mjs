import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { installTarget, uninstallTarget } from "../bin/lib/install.mjs";
import { normalizeTargets } from "../bin/lib/detect-platform.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function withTempHome(fn) {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "niantou-tongda-test-"));
  const homeDir = path.join(tempRoot, "home");
  const cwd = path.join(tempRoot, "project");
  try {
    await fn({ homeDir, cwd });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function readInstalled(context, relativePath) {
  return readFile(path.join(context.homeDir, relativePath), "utf8");
}

test("codex installs skills into Codex skills directory", async () => {
  await withTempHome(async (context) => {
    const result = await installTarget("codex", {
      packageRoot: repoRoot,
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    assert.equal(result.kind, "copied");
    assert.equal(result.targetRoot, path.join(context.homeDir, ".codex", "skills"));
    assert.match(
      await readInstalled(context, path.join(".codex", "skills", "niantou-tongda", "SKILL.md")),
      /name:\s*niantou-tongda/
    );
    assert.match(
      await readInstalled(context, path.join(".codex", "skills", "engineering-execution", "SKILL.md")),
      /name:\s*engineering-execution/
    );
  });
});

test("opencode installs skills and commands", async () => {
  await withTempHome(async (context) => {
    const result = await installTarget("opencode", {
      packageRoot: repoRoot,
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    assert.deepEqual(result.targetRoots, [
      path.join(context.homeDir, ".config", "opencode", "skills"),
      path.join(context.homeDir, ".config", "opencode", "commands"),
    ]);
    assert.match(
      await readInstalled(context, path.join(".config", "opencode", "skills", "pojing-breakthrough", "SKILL.md")),
      /name:\s*pojing-breakthrough/
    );
    assert.match(
      await readInstalled(context, path.join(".config", "opencode", "commands", "tongda-workflows.md")),
      /name:\s*tongda-workflows/
    );
    assert.match(
      await readInstalled(context, path.join(".config", "opencode", "commands", "engineering-execution.md")),
      /name:\s*engineering-execution/
    );
  });
});

test("all targets includes platform ids", () => {
  const targets = normalizeTargets(["all"]);
  assert.ok(targets.includes("codex"));
  assert.ok(targets.includes("opencode"));
  assert.ok(targets.includes("nanobot"));
});

test("uninstall removes managed skill entries", async () => {
  await withTempHome(async (context) => {
    await installTarget("codex", {
      packageRoot: repoRoot,
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    const result = await uninstallTarget("codex", {
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    assert.equal(result.kind, "removed");
    await assert.rejects(
      readInstalled(context, path.join(".codex", "skills", "niantou-tongda", "SKILL.md")),
      { code: "ENOENT" }
    );
  });
});
