@echo off
setlocal
cd /d "%~dp0"
echo.
echo  NexaController local demo
echo  Opening http://localhost:8080
echo  Keep this window open while using the demo.
echo.
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8080
  py -m http.server 8080
  goto :end
)
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:8080
  python -m http.server 8080
  goto :end
)
echo Python 3 was not found.
echo Install Python 3 from https://www.python.org/downloads/windows/
echo Then run this file again.
pause
:end
endlocal
