@echo off
cd /d "%~dp0"
title NeuroX GitHub Push

echo.
echo  NeuroX - upload to GitHub
echo  https://github.com/chexeso/neurox
echo  Folder: %CD%
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo ERROR: Git not installed. https://git-scm.com/download/win
  pause
  exit /b 1
)

if not exist "package.json" (
  echo ERROR: Put this BAT inside neurox-app folder.
  pause
  exit /b 1
)

echo [0] set git name and email
git config --global user.name "chexeso"
git config --global user.email "spuskarev998@gmail.com"
git config --global core.autocrlf true

echo [1] git init
git init

echo [2] cleanup node_modules from index
git rm -r --cached node_modules 2>nul
git rm -r --cached .next 2>nul

echo [3] git add
git add .

echo [4] git commit
git commit -m "NeuroX store"
if errorlevel 1 (
  echo Commit may already exist - continuing...
)

echo [5] branch main
git branch -M main

echo [6] remote
git remote remove origin 2>nul
git remote add origin https://github.com/chexeso/neurox.git

echo [7] push
echo.
echo Username: chexeso
echo Password: paste TOKEN from GitHub not account password
echo.

git push -u origin main

if errorlevel 1 (
  echo.
  echo PUSH FAILED
  echo 1. GitHub - Settings - Developer settings
  echo 2. Personal access tokens - Tokens classic
  echo 3. Generate - enable repo - copy token
  echo 4. Run BAT again - paste token as password
  echo.
  pause
  exit /b 1
)

echo.
echo SUCCESS
echo https://github.com/chexeso/neurox
echo.
pause
