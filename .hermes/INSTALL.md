# Hermes Agent 使用说明

`niantou-tongda-skill` 使用 Hermes 的 skills 目录机制。

## 安装

```bash
npx niantou-tongda-skill install --target hermes --scope user
```

然后运行：

```bash
hermes skills list
hermes chat --toolsets "skills,terminal"
```

## 推荐入口

- `niantou-tongda`
- `tongda-workflows`
