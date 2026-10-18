# ============================================================
#  git-sync.ps1 — ارفع التعديلات الجديدة إلى GitHub بنقرة واحدة
#  الاستخدام:  اضغط يميناً على الملف ← Run with PowerShell
#  أو من الترمنال:  powershell -File git-sync.ps1
# ============================================================

# إيجاد git (لو مثبّت في مكان غير متوقع)
$git = (Get-Command git -ErrorAction SilentlyContinue).Source
if (-not $git) { $git = "C:\Program Files\Git\cmd\git.exe" }
if (-not (Test-Path $git)) {
  Write-Host "لم يُعثر على Git. ثبّته أولاً: winget install --id Git.Git -e" -ForegroundColor Red
  exit 1
}

Set-Location $PSScriptRoot

# مزامنة مع المستودع البعيد أولاً
& $git pull --rebase origin main 2>&1 | Out-Null

# تجميع كل التعديلات
& $git add -A
$pending = & $git status --short
if (-not $pending) {
  Write-Host "✔ لا توجد تعديلات جديدة — المستودع محدّث بالفعل." -ForegroundColor Green
  exit 0
}

Write-Host "التعديلات المعدّة للرفع:" -ForegroundColor Cyan
Write-Host $pending

# رسالة الالتزام (اكتب ضغط Enter لرسالة تلقائية)
$msg = Read-Host "وصف التعديل (Enter لرسالة افتراضية)"
if (-not $msg) { $msg = "update: " + (Get-Date -Format 'yyyy-MM-dd HH:mm') }

& $git commit -m $msg
& $git push origin main

Write-Host ""
Write-Host "✔ تم الرفع إلى GitHub بنجاح: https://github.com/hamzahamouza366-ai/sawtify" -ForegroundColor Green
