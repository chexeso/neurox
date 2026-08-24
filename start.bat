@echo off
chcp 65001 >nul
cd /d "%~dp0"
title NeuroX

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js not found. Install from https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules\" (
  call npm install
  call npx prisma generate
  call npx prisma db push
  call npx tsx prisma/seed.ts
)

start "" "http://localhost:3000"
call npm run dev
pause
