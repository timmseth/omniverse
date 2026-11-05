<#
  Builds a debug APK of dmScreen and copies it to the vault.

  Usage:   powershell -ExecutionPolicy Bypass -File build-apk.ps1 [-Sync] [-NoVault]
    -Sync     regenerate the bundled dungeon data from ..\..\_generated\dungeons.json first (needs Python)
    -NoVault  do not copy to the vault; copy into .\releases\ instead (for committing to the repo)

  Needs the Android SDK (platform 35, build-tools) and a JDK 17+ (Android Studio's bundled JBR is fine).
#>
param([switch]$Sync, [switch]$NoVault)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
$project = 'dmScreen'
$vault = 'Z:\Vault_APK_Builds\dmScreen'

if (-not $env:ANDROID_HOME) { $env:ANDROID_HOME = Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
if (-not $env:JAVA_HOME) {
  foreach ($c in @('C:\Program Files\Android\Android Studio\jbr', 'C:\Program Files\Android\Android Studio1\jbr')) {
    if (Test-Path $c) { $env:JAVA_HOME = $c; break }
  }
}
if (-not (Test-Path $env:ANDROID_HOME)) { throw "ANDROID_HOME not found: $($env:ANDROID_HOME). Install the Android SDK or set ANDROID_HOME." }
if (-not $env:JAVA_HOME -or -not (Test-Path $env:JAVA_HOME)) { throw 'JAVA_HOME not found. Install a JDK 17+ or Android Studio.' }
$env:Path = "$($env:JAVA_HOME)\bin;$($env:Path)"

if ($Sync) {
  & python tools\sync_data.py
  if ($LASTEXITCODE -ne 0) { throw 'sync_data.py failed' }
}

$props = @{}
Get-Content version.properties | ForEach-Object { if ($_ -match '^\s*(\w+)\s*=\s*(.+?)\s*$') { $props[$Matches[1]] = $Matches[2] } }
$ver = $props['versionName']; $code = $props['versionCode']

& .\gradlew.bat assembleDebug --no-daemon
if ($LASTEXITCODE -ne 0) { throw "Gradle build failed (exit $LASTEXITCODE)" }

$apk = Get-ChildItem -Path app\build\outputs\apk\debug -Filter *.apk | Select-Object -First 1
if (-not $apk) { throw 'APK not found after build' }

$stamp = Get-Date -Format 'yyyyMMdd-HHmm'
$name = "$project-v$ver-$stamp"
if ($NoVault) { $dest = Join-Path $root 'releases' } else { $dest = $vault }
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$apkOut = Join-Path $dest "$name.apk"
Copy-Item $apk.FullName $apkOut

$notes = Join-Path $dest "$name-build-notes.md"
@"
# $project v$ver (versionCode $code)

Built $(Get-Date -Format 'yyyy-MM-dd HH:mm') from the Omniverse repository (Apps/dmScreen).

Install: copy the APK to the phone and open it (allow installs from this source). It installs over any earlier dmScreen build.
"@ | Set-Content -Path $notes -Encoding UTF8

Write-Host "Delivered: $apkOut"
Write-Host "Delivered: $notes"
