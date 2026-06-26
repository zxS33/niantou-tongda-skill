#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { getPlatformById, normalizeTargets } from "./lib/detect-platform.mjs";
import { installTarget, uninstallTarget } from "./lib/install.mjs";
import { runValidation } from "./lib/validate.mjs";

const binDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(binDir, "..");
const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"));

function printHelp() {
  console.log(`niantou-tongda-skill v${packageJson.version}

Usage:
  npx niantou-tongda-skill install --target <platform> [--scope user|project]
  npx niantou-tongda-skill uninstall --target <platform> [--scope user|project]
  npx niantou-tongda-skill validate
  npx niantou-tongda-skill --help

Platforms:
  claude-code, cursor, codex, opencode, openclaw, hermes, nanobot, all
`);
}

function parseArgs(argv) {
  const parsed = { command: "install", targets: [], scope: "user" };
  const args = [...argv];
  while (args.length) {
    const token = args.shift();
    if (["install", "uninstall", "validate"].includes(token)) {
      parsed.command = token;
    } else if (token === "--target" || token === "-t") {
      parsed.targets.push(args.shift());
    } else if (token === "--scope") {
      parsed.scope = args.shift() ?? parsed.scope;
    } else if (token === "--project") {
      parsed.scope = "project";
    } else if (token === "--user") {
      parsed.scope = "user";
    } else if (token === "--help" || token === "-h" || token === "help") {
      parsed.command = "help";
    } else if (token === "--version" || token === "-v") {
      parsed.command = "version";
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }
  return parsed;
}

async function runInstall(parsed) {
  const targets = normalizeTargets(parsed.targets, { cwd: process.cwd() });
  if (targets.length === 0) {
    throw new Error("install requires --target <platform>");
  }
  for (const target of targets) {
    const result = await installTarget(target, { packageRoot, scope: parsed.scope, cwd: process.cwd() });
    const targetLabel = result.targetRoots?.join(", ") ?? result.targetRoot;
    console.log(`✓ ${result.platform.name} installed to ${targetLabel}`);
  }
}

async function runUninstall(parsed) {
  const targets = normalizeTargets(parsed.targets, { cwd: process.cwd() });
  if (targets.length === 0) {
    throw new Error("uninstall requires --target <platform>");
  }
  for (const target of targets) {
    if (!getPlatformById(target, { cwd: process.cwd() })) {
      throw new Error(`Unknown platform: ${target}`);
    }
    const result = await uninstallTarget(target, { scope: parsed.scope, cwd: process.cwd() });
    const targetLabel = result.targetRoots?.join(", ") ?? result.targetRoot;
    console.log(`✓ ${result.platform.name} removed from ${targetLabel}`);
  }
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.command === "help") {
    printHelp();
    return;
  }
  if (parsed.command === "version") {
    console.log(packageJson.version);
    return;
  }
  if (parsed.command === "validate") {
    const result = await runValidation({ repoRoot: packageRoot });
    process.exitCode = result.ok ? 0 : 1;
    return;
  }
  if (parsed.command === "install") {
    await runInstall(parsed);
    return;
  }
  if (parsed.command === "uninstall") {
    await runUninstall(parsed);
    return;
  }
}

try {
  await main();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}
