Add-Type -AssemblyName System.Drawing
$imgPath = 'C:/Users/901672/.gemini/antigravity/brain/ca26409e-57fa-4ce1-a8b1-dc8ee82e5fad/.user_uploaded/media_1794145095275_594578b3.jpg'
$img = New-Object System.Drawing.Bitmap($imgPath)

Write-Output "Image size: $($img.Width) x $($img.Height)"

# Check topbar: Asa Marsal brand lockup
for ($x = 0; $x -lt 100; $x += 5) {
    $p = $img.GetPixel($x, 40)
    Write-Output "Topbar Y=40 X=$x : R=$($p.R) G=$($p.G) B=$($p.B)"
}

# Check "Hi, I'm" or "Asa Marsal" heading text: check X=0 to 50 at Y=230 to 300
Write-Output "`nChecking hero heading at X=0..30:"
for ($y = 200; $y -lt 340; $y += 20) {
    $line = "Y=$y : "
    for ($x = 0; $x -le 25; $x += 5) {
        $p = $img.GetPixel($x, $y)
        $line += "$($x)=($($p.R),$($p.G),$($p.B)) "
    }
    Write-Output $line
}

$img.Dispose()

