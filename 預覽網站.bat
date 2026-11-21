@echo off
rem Preview the Jessicaka website locally. Close this window (or press Ctrl+C) to stop.
rem Phone preview: phone and this PC must be on the SAME home Wi-Fi. Do not use on public Wi-Fi.
cd /d "%~dp0"

if not exist "node_modules" (
  echo First run: installing packages, please wait...
  call npm install
  if errorlevel 1 (
    echo.
    echo Install failed. Please check your internet connection.
    pause
    exit /b 1
  )
)

set "LANIP="
for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi*','Ethernet*' -ErrorAction SilentlyContinue).IPAddress"`) do set "LANIP=%%I"

echo.
echo ==================================================
echo  On this PC : http://localhost:4321  (opens automatically)
if defined LANIP (
  echo  On phone   : http://%LANIP%:4321  (same Wi-Fi only)
) else (
  echo  On phone   : could not detect the PC address
)
echo ==================================================
echo  If Windows asks about the firewall, choose PRIVATE network and Allow.
echo  Keep this window open while previewing. Close it to stop.
echo.
call npm run dev -- --host --open
echo.
echo Preview stopped.
pause
