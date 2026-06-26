# OpenCode 使用说明

`niantou-tongda-skill` 在 OpenCode 中使用原生 `skills/` 与 `commands/` 目录。

## 安装

```bash
npx niantou-tongda-skill install --target opencode --scope user
```

或手动复制：

```bash
mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/opencode/skills"
mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/opencode/commands"
cp -R skills/* "${XDG_CONFIG_HOME:-$HOME/.config}/opencode/skills/"
cp commands/*.md "${XDG_CONFIG_HOME:-$HOME/.config}/opencode/commands/"
```

## 验证

```bash
npx niantou-tongda-skill validate
```
