# 平台支持

本项目核心资产是 `skills/`、`commands/`、`hooks/` 和 `agents/`。

| 平台 | skills | commands | hook | 推荐入口 |
|---|---|---|---|---|
| Claude Code | 支持 bundle | 支持 | SessionStart | `.claude-plugin/` |
| Cursor | 支持 bundle | 支持 | SessionStart | `.cursor-plugin/` |
| Codex | 原生 skills | 视宿主而定 | 不依赖 | `.codex/INSTALL.md` |
| OpenCode | 原生 skills | 原生 commands | 不依赖 | `.opencode/INSTALL.md` |
| OpenClaw | skills root | 视宿主而定 | 视宿主而定 | `.openclaw/INSTALL.md` |
| Hermes | skills root | 由 Hermes 暴露 | 不依赖 | `.hermes/INSTALL.md` |
| nanobot | workspace skills | 视宿主而定 | 不依赖 | `.nanobot/INSTALL.md` |

## CLI

```bash
npx niantou-tongda-skill install --target codex --scope user
npx niantou-tongda-skill install --target opencode --scope user
npx niantou-tongda-skill install --target all --scope user
npx niantou-tongda-skill validate
```

## 手动集成

不支持 CLI 的宿主可以直接读取：

- `skills/niantou-tongda/SKILL.md`
- `skills/tongda-workflows/SKILL.md`
- `skills/engineering-execution/SKILL.md`
- `commands/*.md`
