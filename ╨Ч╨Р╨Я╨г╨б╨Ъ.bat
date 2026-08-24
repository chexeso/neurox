@echo off
chcp 65001 >nul
cd /d "%~dp0"
title NeuroX

echo.
echo  NeuroX — запуск магазина
echo  ========================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js не найден. Установи с https://nodejs.org
  echo  и запусти этот файл снова.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo  Первый запуск: ставим зависимости...
  call npm install
  if errorlevel 1 (
    echo  Ошибка npm install
    pause
    exit /b 1
  )
  call npx prisma generate
  call npx prisma db push
  call npx tsx prisma/seed.ts
)

echo  Открываю сайт: http://localhost:3000
start "" "http://localhost:3000"

echo  Не закрывай это окно, пока пользуешься сайтом.
echo  Чтобы остановить — нажми Ctrl+C
echo.
call npm run dev
pause
