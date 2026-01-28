@echo off
REM English to Kannada Translator - Windows Startup Script

echo.
echo ===================================
echo English to Kannada Translator
echo ===================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.7 or higher from https://www.python.org
    pause
    exit /b 1
)

echo Python is installed. Proceeding with setup...
echo.

REM Check if virtual environment exists
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
    echo Virtual environment created successfully.
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)
echo Virtual environment activated.
echo.

REM Install requirements
echo Installing dependencies...
pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo WARNING: Some dependencies may not have installed correctly
)
echo Dependencies installed.
echo.

REM Run the application
echo.
echo ===================================
echo Starting Flask Application
echo ===================================
echo.
echo The application will be available at:
echo    http://localhost:5000
echo.
echo Press Ctrl+C to stop the server.
echo.

python app.py

REM Deactivate virtual environment on exit
deactivate

pause
