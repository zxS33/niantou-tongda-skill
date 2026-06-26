# Codex 安装说明

`niantou-tongda-skill` 在 Codex 中直接使用 `skills/` 目录，不依赖插件壳。

## 安装

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
cp -R skills/* "${CODEX_HOME:-$HOME/.codex}/skills/"
```

然后重启 Codex 或开启新会话。

## 使用

- 入口 skill：`niantou-tongda`
- 单项方法：`xuanlan-mirror`、`heart-knot-diagnosis`、`control-boundary`、`benxin-decision`、`wuzhu-action`、`pojing-breakthrough`、`hanli-long-game`、`closure-review`
- 组合流程：`tongda-workflows`

## 验证

在项目根目录运行：

```bash
npm test
```
