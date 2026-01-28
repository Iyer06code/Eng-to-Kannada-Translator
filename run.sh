#!/bin/bash
# English to Kannada Translator - Linux/macOS Startup Script

echo ""
echo "==================================="
echo "English to Kannada Translator"
echo "==================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.7 or higher"
    exit 1
fi

echo "Python is installed. Proceeding with setup..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to create virtual environment"
        exit 1
    fi
    echo "Virtual environment created successfully."
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to activate virtual environment"
    exit 1
fi
echo "Virtual environment activated."
echo ""

# Install requirements
echo "Installing dependencies..."
pip install -q -r requirements.txt
if [ $? -ne 0 ]; then
    echo "WARNING: Some dependencies may not have installed correctly"
fi
echo "Dependencies installed."
echo ""

# Run the application
echo ""
echo "==================================="
echo "Starting Flask Application"
echo "==================================="
echo ""
echo "The application will be available at:"
echo "    http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server."
echo ""

python3 app.py

# Deactivate virtual environment on exit
deactivate
