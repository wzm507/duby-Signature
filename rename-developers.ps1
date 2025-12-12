# PowerShell script to rename developer images to 1-28

$sourcePath = "e:\工作\迪拜旗舰房产\duby\duby\public\Developers"

# Get all png files and sort them numerically
$files = Get-ChildItem -Path $sourcePath -Filter "*.png" | Sort-Object {[int][regex]::Match($_.Name, '\d+').Value}

# Initialize counter for new names
$counter = 1

# Rename each file
foreach ($file in $files) {
    $newName = "$counter.png"
    $newPath = Join-Path -Path $sourcePath -ChildPath $newName
    
    Write-Host "Renaming $($file.Name) to $newName"
    Rename-Item -Path $file.FullName -NewName $newName
    
    $counter++
    
    # Stop at 28 files
    if ($counter -gt 28) {
        Write-Host "Reached 28 files, stopping."
        break
    }
}

Write-Host "Renaming complete."
