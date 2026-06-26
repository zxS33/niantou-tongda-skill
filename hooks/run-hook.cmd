:; SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
:; HOOK_NAME="${1:-}"
:; if [ -z "$HOOK_NAME" ]; then echo "Error: No hook name provided" >&2; exit 1; fi
:; shift
:; HOOK_PATH="$SCRIPT_DIR/$HOOK_NAME"
:; if [ ! -e "$HOOK_PATH" ]; then echo "Error: hook not found: $HOOK_PATH" >&2; exit 1; fi
:; if [ -x "$HOOK_PATH" ]; then exec "$HOOK_PATH" "$@"; fi
:; if command -v bash >/dev/null 2>&1; then exec bash "$HOOK_PATH" "$@"; fi
:; exec sh "$HOOK_PATH" "$@"
:; exit 1

@echo off
setlocal

set "SCRIPT_DIR=%~dp0"
set "HOOK_NAME=%~1"

if "%HOOK_NAME%"=="" (
    echo Error: No hook name provided
    exit /b 1
)

if exist "%SCRIPT_DIR%%HOOK_NAME%.ps1" (
    where powershell >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%%HOOK_NAME%.ps1" %2 %3 %4 %5 %6 %7 %8 %9
        exit /b %ERRORLEVEL%
    )
)

where bash >nul 2>&1
if %ERRORLEVEL% equ 0 (
    bash "%SCRIPT_DIR%%HOOK_NAME%" %*
    exit /b %ERRORLEVEL%
)

where sh >nul 2>&1
if %ERRORLEVEL% equ 0 (
    sh "%SCRIPT_DIR%%HOOK_NAME%" %*
    exit /b %ERRORLEVEL%
)

echo Error: No PowerShell, bash, or sh runtime found for hook "%HOOK_NAME%".
exit /b 1
