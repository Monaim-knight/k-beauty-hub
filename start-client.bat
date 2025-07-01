@echo off
echo Starting K-Beauty Hub in CLIENT MODE...
echo.
echo Client URL: http://localhost:3000?client=true
echo Admin URL: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
set REACT_APP_CLIENT_MODE=true
npm start 