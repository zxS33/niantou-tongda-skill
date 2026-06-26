[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Fail([string]$Message) {
    Write-Error "FAIL: $Message"
    exit 1
}

function Require-File([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        Fail "missing required file: $Path"
    }
}

function Require-Dir([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path -PathType Container)) {
        Fail "missing required directory: $Path"
    }
}

function Check-Frontmatter([string]$Path) {
    Require-File $Path
    $Content = Get-Content -LiteralPath $Path -Raw -Encoding UTF8
    if (-not $Content.StartsWith("---")) {
        Fail "missing frontmatter: $Path"
    }
    if ($Content -notmatch "(?m)^name:\s*[a-z0-9-]+\s*$") {
        Fail "missing name: $Path"
    }
    if ($Content -notmatch "(?m)^description:\s*(\||.+)$") {
        Fail "missing description: $Path"
    }
}

Write-Host "Checking directories..."
@(
    ".claude-plugin",
    ".codex",
    ".cursor-plugin",
    ".hermes",
    ".nanobot",
    ".openclaw",
    ".opencode",
    "agents",
    "assets",
    "bin",
    "bin/lib",
    "commands",
    "docs",
    "hooks",
    "skills",
    "tests"
) | ForEach-Object { Require-Dir $_ }

Write-Host "Checking package files..."
@(
    "package.json",
    "README.md",
    "README.en.md",
    "LICENSE",
    ".npmignore",
    ".gitignore",
    ".claude-plugin/plugin.json",
    ".claude-plugin/marketplace.json",
    ".cursor-plugin/plugin.json",
    "hooks/hooks.json",
    "hooks/session-start",
    "hooks/session-start.ps1",
    "hooks/run-hook.cmd",
    "bin/niantou-tongda-skill.mjs",
    "bin/lib/detect-platform.mjs",
    "bin/lib/install.mjs",
    "bin/lib/validate.mjs"
) | ForEach-Object { Require-File $_ }

Write-Host "Checking skills and commands..."
$Skills = @(
    "niantou-tongda",
    "xuanlan-mirror",
    "heart-knot-diagnosis",
    "control-boundary",
    "benxin-decision",
    "wuzhu-action",
    "pojing-breakthrough",
    "hanli-long-game",
    "closure-review",
    "tongda-workflows"
)

foreach ($Skill in $Skills) {
    Check-Frontmatter "skills/$Skill/SKILL.md"
    Check-Frontmatter "commands/$Skill.md"
}

Write-Host "Checking references..."
@(
    "skills/niantou-tongda/theory-map.md",
    "skills/niantou-tongda/original-texts.md",
    "skills/niantou-tongda/engineering-scenarios-reference.md",
    "skills/xuanlan-mirror/original-texts.md",
    "skills/heart-knot-diagnosis/original-texts.md",
    "skills/control-boundary/original-texts.md",
    "skills/benxin-decision/original-texts.md",
    "skills/wuzhu-action/original-texts.md",
    "skills/pojing-breakthrough/original-texts.md",
    "skills/hanli-long-game/original-texts.md",
    "skills/closure-review/original-texts.md",
    "skills/tongda-workflows/original-texts.md"
) | ForEach-Object { Require-File $_ }

Write-Host "Running Node validator..."
node .\bin\niantou-tongda-skill.mjs validate

Write-Host "Validation passed."
