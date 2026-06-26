import os from "node:os";
import path from "node:path";

export const PACKAGE_NAME = "niantou-tongda-skill";
export const REPOSITORY = "zxS33/niantou-tongda-skill";

export function getPlatformCatalog({ cwd = process.cwd(), homeDir = os.homedir(), env = process.env } = {}) {
  const codexHome = env.CODEX_HOME || path.join(homeDir, ".codex");
  const opencodeConfig = env.XDG_CONFIG_HOME
    ? path.join(env.XDG_CONFIG_HOME, "opencode")
    : path.join(homeDir, ".config", "opencode");

  return [
    {
      id: "claude-code",
      name: "Claude Code",
      installKind: "bundle",
      assets: ["skills", "commands", "agents", "hooks", ".claude-plugin"],
      paths: {
        user: path.join(homeDir, ".claude", "plugins", PACKAGE_NAME),
        project: path.join(cwd, ".claude", "plugins", PACKAGE_NAME),
      },
    },
    {
      id: "cursor",
      name: "Cursor",
      installKind: "bundle",
      assets: ["skills", "commands", "agents", "hooks", ".cursor-plugin"],
      paths: {
        user: path.join(homeDir, ".cursor", "plugins", PACKAGE_NAME),
        project: path.join(cwd, ".cursor", "plugins", PACKAGE_NAME),
      },
    },
    {
      id: "codex",
      name: "Codex",
      installKind: "skills",
      paths: {
        user: path.join(codexHome, "skills"),
        project: path.join(cwd, ".codex", "skills"),
      },
    },
    {
      id: "opencode",
      name: "OpenCode",
      installKind: "skills-commands",
      paths: {
        user: path.join(opencodeConfig, "skills"),
        project: path.join(cwd, ".opencode", "skills"),
      },
      commandPaths: {
        user: path.join(opencodeConfig, "commands"),
        project: path.join(cwd, ".opencode", "commands"),
      },
    },
    {
      id: "openclaw",
      name: "OpenClaw",
      installKind: "skills",
      paths: {
        user: path.join(homeDir, ".openclaw", "skills", PACKAGE_NAME),
        project: path.join(cwd, "skills", PACKAGE_NAME),
      },
    },
    {
      id: "hermes",
      name: "Hermes Agent",
      installKind: "skills",
      paths: {
        user: path.join(homeDir, ".hermes", "skills", PACKAGE_NAME),
        project: path.join(cwd, ".hermes", "skills", PACKAGE_NAME),
      },
    },
    {
      id: "nanobot",
      name: "nanobot",
      installKind: "skills",
      paths: {
        user: path.join(homeDir, ".nanobot", "workspace", "skills"),
        project: path.join(cwd, ".nanobot", "workspace", "skills"),
      },
    },
  ];
}

export function getPlatformById(platformId, options = {}) {
  return getPlatformCatalog(options).find((platform) => platform.id === platformId) ?? null;
}

export function formatTargetPath(platform, scope = "user") {
  return platform?.paths?.[scope] ?? null;
}

export function normalizeTargets(input, options = {}) {
  const allIds = getPlatformCatalog(options).map((platform) => platform.id);
  const raw = input?.length ? input : [];
  const expanded = [];

  for (const value of raw) {
    for (const item of String(value).split(",")) {
      const normalized = item.trim().toLowerCase();
      if (!normalized) {
        continue;
      }
      if (normalized === "all") {
        return allIds;
      }
      expanded.push(normalized);
    }
  }

  return [...new Set(expanded)];
}
