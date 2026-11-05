@echo off
rem Double-click to build. Output and errors are logged to build-log.txt.
rem Add -Sync to refresh the bundled dungeons first; add -NoVault to write into .\releases instead.
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build-apk.ps1" %* > build-log.txt 2>&1
type build-log.txt
echo.
pause
