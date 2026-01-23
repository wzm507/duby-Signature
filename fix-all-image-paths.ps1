$ErrorActionPreference = "Stop"

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$publicPath = Join-Path $scriptPath "public"
$srcPath = Join-Path $scriptPath "src"

Write-Host "Starting image path fix for all files..." -ForegroundColor Green

$files = @()
$files += Get-ChildItem -Path $publicPath -Filter "*.html" -Recurse
$files += Get-ChildItem -Path $srcPath -Filter "*.js" -Recurse

$totalReplacements = 0
$filesProcessed = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileReplacements = 0

    # Fix JavaScript template strings that generate image paths with spaces
    # Pattern: image copy${i === 1 ? '' : ` ${i}`}.png
    if ($content -match 'image copy\$\{i === 1') {
        $content = $content -replace 'image copy\$\{i === 1 \?\x27\x27 : ` `\$\{i\}`\`}\.png', 'image-copy`${i === 1 ? '' : `-${i}`}`.png'
        $fileReplacements++
    }

    # Fix hardcoded image paths with spaces
    $replacements = @(
        @{ From = 'image copy.png'; To = 'image-copy.png' },
        @{ From = 'image copy 2.png'; To = 'image-copy-2.png' },
        @{ From = 'image copy 3.png'; To = 'image-copy-3.png' },
        @{ From = 'image copy 4.png'; To = 'image-copy-4.png' },
        @{ From = 'image copy 5.png'; To = 'image-copy-5.png' },
        @{ From = 'image copy 6.png'; To = 'image-copy-6.png' },
        @{ From = 'image copy 7.png'; To = 'image-copy-7.png' },
        @{ From = 'image copy 8.png'; To = 'image-copy-8.png' },
        @{ From = 'image copy 9.png'; To = 'image-copy-9.png' },
        @{ From = 'image copy 10.png'; To = 'image-copy-10.png' },
        @{ From = 'image copy 11.png'; To = 'image-copy-11.png' },
        @{ From = 'image copy 12.png'; To = 'image-copy-12.png' },
        @{ From = 'image copy 13.png'; To = 'image-copy-13.png' },
        @{ From = 'image copy 14.png'; To = 'image-copy-14.png' },
        @{ From = 'image copy 15.png'; To = 'image-copy-15.png' },
        @{ From = 'image copy 16.png'; To = 'image-copy-16.png' },
        @{ From = 'image copy 17.png'; To = 'image-copy-17.png' },
        @{ From = 'image copy 18.png'; To = 'image-copy-18.png' },
        @{ From = 'image copy 19.png'; To = 'image-copy-19.png' },
        @{ From = 'image copy 20.png'; To = 'image-copy-20.png' }
    )

    foreach ($replacement in $replacements) {
        if ($content -match [regex]::Escape($replacement.From)) {
            $content = $content -replace [regex]::Escape($replacement.From), $replacement.To
            $fileReplacements++
        }
    }

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $relativePath = $file.FullName.Substring($scriptPath.Length + 1)
        Write-Host "Updated: $relativePath ($fileReplacements replacements)" -ForegroundColor Cyan
        $totalReplacements += $fileReplacements
        $filesProcessed++
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Green
Write-Host "Files processed: $filesProcessed" -ForegroundColor White
Write-Host "Total replacements: $totalReplacements" -ForegroundColor White
Write-Host "Done!" -ForegroundColor Green
