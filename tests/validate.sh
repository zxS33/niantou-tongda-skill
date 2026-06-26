#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

require_file() {
  local file="$1"
  [ -f "$file" ] || fail "missing required file: $file"
}

require_dir() {
  local dir="$1"
  [ -d "$dir" ] || fail "missing required directory: $dir"
}

check_frontmatter() {
  local file="$1"
  local first_line
  first_line="$(head -n 1 "$file")"
  [ "$first_line" = "---" ] || fail "missing frontmatter: $file"
  grep -Eq '^name:[[:space:]]*[a-z0-9-]+[[:space:]]*$' "$file" || fail "missing name: $file"
  grep -Eq '^description:[[:space:]]*(\||.+)$' "$file" || fail "missing description: $file"
}

printf 'Checking directories...\n'
for dir in \
  .claude-plugin \
  .codex \
  .cursor-plugin \
  .hermes \
  .nanobot \
  .openclaw \
  .opencode \
  agents \
  assets \
  bin \
  bin/lib \
  commands \
  docs \
  hooks \
  skills \
  tests
do
  require_dir "$dir"
done

printf 'Checking package files...\n'
for file in \
  package.json \
  README.md \
  README.en.md \
  LICENSE \
  .npmignore \
  .gitignore \
  .claude-plugin/plugin.json \
  .claude-plugin/marketplace.json \
  .cursor-plugin/plugin.json \
  hooks/hooks.json \
  hooks/session-start \
  hooks/session-start.ps1 \
  hooks/run-hook.cmd \
  bin/niantou-tongda-skill.mjs \
  bin/lib/detect-platform.mjs \
  bin/lib/install.mjs \
  bin/lib/validate.mjs
do
  require_file "$file"
done

printf 'Checking skills...\n'
for skill in \
  niantou-tongda \
  xuanlan-mirror \
  heart-knot-diagnosis \
  control-boundary \
  benxin-decision \
  wuzhu-action \
  pojing-breakthrough \
  hanli-long-game \
  closure-review \
  tongda-workflows
do
  require_file "skills/$skill/SKILL.md"
  check_frontmatter "skills/$skill/SKILL.md"
  require_file "commands/$skill.md"
  check_frontmatter "commands/$skill.md"
done

printf 'Checking references...\n'
for file in \
  skills/niantou-tongda/theory-map.md \
  skills/niantou-tongda/original-texts.md \
  skills/niantou-tongda/engineering-scenarios-reference.md \
  skills/xuanlan-mirror/original-texts.md \
  skills/heart-knot-diagnosis/original-texts.md \
  skills/control-boundary/original-texts.md \
  skills/benxin-decision/original-texts.md \
  skills/wuzhu-action/original-texts.md \
  skills/pojing-breakthrough/original-texts.md \
  skills/hanli-long-game/original-texts.md \
  skills/closure-review/original-texts.md \
  skills/tongda-workflows/original-texts.md
do
  require_file "$file"
done

printf 'Running Node validator...\n'
node ./bin/niantou-tongda-skill.mjs validate

printf 'Validation passed.\n'
