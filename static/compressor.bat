@echo off
rem author
echo Compressor JS and CSS?
pause
cd %~dp0
call compressor\compressor.bat js
call compressor\compressor.bat css

echo.
echo Compressor Success
pause
echo on