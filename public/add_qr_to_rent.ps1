# PowerShell script to add QR code to rent-details pages

foreach ($i in 4..10) {
    $filePath = "e:\工作\迪拜旗舰房产\duby\duby\public\rent-details-$i.html"
    $content = Get-Content $filePath -Raw
    
    # Pattern to find the last key-info-card (Size) before closing </div>
    $pattern = '<div class="key-info-card">\s*<div class="key-info-header">\s*<div class="key-info-icon">📐</div>\s*<div class="key-info-tag">Size</div>\s*</div>\s*<div class="key-info-value">.*?</div>\s*<div class="key-info-label">.*?</div>\s*</div>\s*</div>'
    
    # Replace pattern with the same content plus the QR code card
    $replacement = '$&\n                <div class="key-info-card">\n                    <div class="key-info-header">\n                        <div class="key-info-icon">📱</div>\n                        <div class="key-info-tag">QR Code</div>\n                    </div>\n                    <div class="key-info-value" style="display: flex; justify-content: center; margin-bottom: 1rem;">\n                        <div style="background: white; padding: 1rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">\n                            <img src="/ewm/image.png" alt="QR Code" style="width: 120px; height: 120px; object-fit: contain;">\n                        </div>\n                    </div>\n                    <div class="key-info-label">Scan for more details</div>\n                </div>\n            </div>'
    
    # Perform the replacement
    $updatedContent = $content -replace $pattern, $replacement
    
    # Save the updated content back to the file
    Set-Content -Path $filePath -Value $updatedContent -Encoding UTF8
    
    Write-Host "Added QR code to rent-details-$i.html"
}

Write-Host "All rent-details pages from 4 to 10 have been updated with QR codes!"