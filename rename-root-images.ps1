$imagesNewPath = ".\images_new"

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

Write-Host "Done renaming files"