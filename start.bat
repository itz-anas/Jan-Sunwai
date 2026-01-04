@echo off
REM Citizen Connect - Start Both Frontend and Backend

echo Starting Citizen Connect...
echo.

REM Start Backend in a new window
echo Starting Backend Server on port 3000...
start cmd /k "cd citizen-connect-backend && npm start"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start Frontend in a new window
echo Starting Frontend Server on port 5173...
start cmd /k "npm run dev"

echo.
echo Both servers are starting in new windows:
echo - Backend: http://localhost:3000
echo - Frontend: http://localhost:5173
echo.
pause
