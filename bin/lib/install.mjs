import os from "node:os";
import path from "node:path";
import { cp, mkdir, readdir, rm, stat, writeFile, readFile } from "node:fs/promises";
import { formatTargetPath, getPlatformById, PACKAGE_NAME } from "./detect-platform.mjs";

const MANIFEST_FILE = ".niantou-tongda-skill-install.json";

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function copyAsset(packageRoot, targetRoot, asset) {
  const source = path.join(packageRoot, asset);
  const destination = path.join(targetRoot, path.basename(asset));
  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { recursive: true, force: true });
}

async function readManifest(targetRoot) {
  const manifestPath = path.join(targetRoot, MANIFEST_FILE);
  if (!(await exists(manifestPath))) {
    return { packageName: PACKAGE_NAME, version: 1, entries: [] };
  }
  return JSON.parse(await readFile(manifestPath, "utf8"));
}

async function writeManifest(targetRoot, entries) {
  const manifest = { packageName: PACKAGE_NAME, version: 1, entries };
  await writeFile(path.join(targetRoot, MANIFEST_FILE), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

async function assertManagedEntry(targetRoot, entryName, manifestEntries) {
  if (!entryName || entryName.includes("/") || entryName.includes("\\") || entryName === "." || entryName === "..") {
    throw new Error(`Refusing invalid install entry: ${entryName}`);
  }
  const destination = path.join(targetRoot, entryName);
  if ((await exists(destination)) && !manifestEntries.has(entryName)) {
    throw new Error(`Refusing to overwrite unmanaged path: ${destination}`);
  }
}

async function copySkillDirs(packageRoot, targetRoot) {
  const sourceRoot = path.join(packageRoot, "skills");
  await mkdir(targetRoot, { recursive: true });
  const manifest = await readManifest(targetRoot);
  const managed = new Set((manifest.entries ?? []).map((entry) => entry.path));
  const entries = [];

  for (const entry of await readdir(sourceRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    await assertManagedEntry(targetRoot, entry.name, managed);
    await rm(path.join(targetRoot, entry.name), { recursive: true, force: true });
    await cp(path.join(sourceRoot, entry.name), path.join(targetRoot, entry.name), { recursive: true, force: true });
    entries.push({ path: entry.name, type: "directory", source: "skills" });
  }

  await writeManifest(targetRoot, entries);
  return entries.map((entry) => `skills/${entry.path}`);
}

async function copyCommandFiles(packageRoot, targetRoot) {
  const sourceRoot = path.join(packageRoot, "commands");
  await mkdir(targetRoot, { recursive: true });
  const manifest = await readManifest(targetRoot);
  const managed = new Set((manifest.entries ?? []).map((entry) => entry.path));
  const entries = [];

  for (const entry of await readdir(sourceRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }
    await assertManagedEntry(targetRoot, entry.name, managed);
    await rm(path.join(targetRoot, entry.name), { force: true });
    await cp(path.join(sourceRoot, entry.name), path.join(targetRoot, entry.name), { force: true });
    entries.push({ path: entry.name, type: "file", source: "commands" });
  }

  await writeManifest(targetRoot, entries);
  return entries.map((entry) => `commands/${entry.path}`);
}

async function removeManagedEntries(targetRoot) {
  const manifest = await readManifest(targetRoot);
  const removed = [];
  for (const entry of manifest.entries ?? []) {
    await rm(path.join(targetRoot, entry.path), { recursive: true, force: true });
    removed.push(entry.path);
  }
  await rm(path.join(targetRoot, MANIFEST_FILE), { force: true });
  return removed;
}

export async function installTarget(platformId, options = {}) {
  const { packageRoot, scope = "user", cwd = process.cwd(), homeDir = os.homedir() } = options;
  const platform = getPlatformById(platformId, { cwd, homeDir });
  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`);
  }

  const targetRoot = formatTargetPath(platform, scope);
  if (!targetRoot) {
    throw new Error(`Platform '${platformId}' has no target for scope '${scope}'`);
  }

  if (platform.installKind === "bundle") {
    await mkdir(targetRoot, { recursive: true });
    for (const asset of platform.assets) {
      await copyAsset(packageRoot, targetRoot, asset);
    }
    return { platform, kind: "copied", targetRoot, assets: platform.assets };
  }

  const assets = await copySkillDirs(packageRoot, targetRoot);
  const targetRoots = [targetRoot];

  if (platform.installKind === "skills-commands") {
    const commandRoot = platform.commandPaths?.[scope];
    assets.push(...await copyCommandFiles(packageRoot, commandRoot));
    targetRoots.push(commandRoot);
  }

  return { platform, kind: "copied", targetRoot, targetRoots, assets };
}

export async function uninstallTarget(platformId, options = {}) {
  const { scope = "user", cwd = process.cwd(), homeDir = os.homedir() } = options;
  const platform = getPlatformById(platformId, { cwd, homeDir });
  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`);
  }
  const targetRoot = formatTargetPath(platform, scope);
  if (platform.installKind === "bundle") {
    await rm(targetRoot, { recursive: true, force: true });
    return { platform, kind: "removed", targetRoot };
  }

  const removed = await removeManagedEntries(targetRoot);
  const targetRoots = [targetRoot];
  if (platform.installKind === "skills-commands") {
    const commandRoot = platform.commandPaths?.[scope];
    removed.push(...await removeManagedEntries(commandRoot));
    targetRoots.push(commandRoot);
  }
  return { platform, kind: "removed", targetRoot, targetRoots, removed };
}
