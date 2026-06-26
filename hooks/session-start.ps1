[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

function ConvertTo-AsciiJsonString {
    param([string]$Value)

    $builder = [System.Text.StringBuilder]::new()
    [void]$builder.Append('"')

    for ($i = 0; $i -lt $Value.Length; $i++) {
        $char = $Value[$i]
        $codePoint = [int][char]$char

        if ($codePoint -eq 34) {
            [void]$builder.Append('\"')
            continue
        }
        if ($codePoint -eq 92) {
            [void]$builder.Append('\\')
            continue
        }
        if ($codePoint -eq 10) {
            [void]$builder.Append('\n')
            continue
        }
        if ($codePoint -eq 13) {
            [void]$builder.Append('\r')
            continue
        }
        if ($codePoint -eq 9) {
            [void]$builder.Append('\t')
            continue
        }
        if ($codePoint -lt 32 -or $codePoint -gt 126) {
            [void]$builder.AppendFormat('\u{0:x4}', $codePoint)
            continue
        }
        [void]$builder.Append($char)
    }

    [void]$builder.Append('"')
    $builder.ToString()
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$pluginRoot = Split-Path -Parent $scriptDir
$skillPath = Join-Path $pluginRoot "skills\niantou-tongda\SKILL.md"

if (-not (Test-Path -LiteralPath $skillPath)) {
    throw "Missing skill file: $skillPath"
}

$content = Get-Content -LiteralPath $skillPath -Raw -Encoding UTF8
$sessionContext = @"
<NIANTOU_TONGDA_SKILL>
已加载 niantou-tongda。请先遵守用户指令、项目约束和宿主平台规则，再在明确适用时把这份方法论作为事实澄明、决断、行动、工程交付、破境与收念的补充框架。

$content

</NIANTOU_TONGDA_SKILL>
"@

$json = ConvertTo-AsciiJsonString -Value $sessionContext

if ($env:CLAUDE_PLUGIN_ROOT) {
    @"
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": $json
  }
}
"@
} else {
    @"
{
  "additional_context": $json
}
"@
}
