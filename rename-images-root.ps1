$imagesNewPath = "e:\工作\迪拜旗舰房产\duby\duby\images_new"

if (Test-Path $imagesNewPath) {
    Get-ChildItem -Path $imagesNewPath -Recurse -File | ForEach-Object {
        $oldName = $_.Name
        if ($oldName -match '^image copy (\d+)\.png$') {
            $newName = "image-copy-$($matches[1]).png"
            if ($oldName -ne $newName) {
                $newPath = Join-Path $_.DirectoryName $newName
                Rename-Item $_.FullName -NewName $newName
                Write-Host "Renamed: $oldName -> $newName"
            }
        }
    }
} else {
    Write-Host "images_new directory not found"
}