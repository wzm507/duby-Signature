$files = @(
    "public\template-temp.html",
    "public\temp-full-template.html",
    "public\off-plan-template.html",
    "public\off-plan-details-9.html",
    "public\off-plan-details-8.html",
    "public\off-plan-details-4.html",
    "public\off-plan-details-3.html",
    "public\off-plan-details-2.html",
    "public\off-plan-details-12.html",
    "public\off-plan-details-1.html",
    "public\full-template.html",
    "public\full-template-merge.html",
    "public\complete-template.html"
)

foreach ($file in $files) {
    $filePath = Join-Path "e:\工作\迪拜旗舰房产\duby\duby" $file
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        $newContent = $content -replace "image-copy (\d+)\.png", "image-copy-$1.png"
        Set-Content $filePath -Value $newContent -NoNewline -Encoding UTF8
        Write-Host "Fixed: $file"
    }
}