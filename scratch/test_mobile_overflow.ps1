$proc = Start-Process -FilePath "cmd.exe" -ArgumentList "/c pnpm start -p 3333" -PassThru -NoNewWindow
Start-Sleep -Seconds 5

try {
    $edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    & $edge --headless --disable-gpu --window-size=390,844 --screenshot="scratch/mobile_390.png" "http://localhost:3333"
    Write-Host "Screenshot taken!"
} finally {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
}
