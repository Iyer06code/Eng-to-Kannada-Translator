# Setup Guide - English to Kannada Translator

## Quick Start

### Windows

1. Double-click `run.bat`
2. Wait for dependencies to install
3. Open browser to `http://localhost:5000`

### Linux/macOS

1. Run `chmod +x run.sh`
2. Run `./run.sh`
3. Open browser to `http://localhost:5000`

---

## Detailed Installation

### System Requirements

- **OS:** Windows, macOS, or Linux
- **Python:** 3.7 or higher
- **RAM:** 512 MB minimum
- **Disk Space:** 200 MB
- **Internet:** Required for translation and TTS

### Step 1: Install Python

**Windows:**

- Download from https://www.python.org/downloads/
- Run installer and check "Add Python to PATH"
- Verify: `python --version`

**macOS:**

```bash
brew install python3
python3 --version
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get update
sudo apt-get install python3 python3-pip
python3 --version
```

### Step 2: Navigate to Project Directory

**Windows (Command Prompt):**

```cmd
cd "c:\Users\SURABHI IYER\Eng-to-Kannada-Translator"
```

**macOS/Linux (Terminal):**

```bash
cd ~/Eng-to-Kannada-Translator
# or
cd /path/to/Eng-to-Kannada-Translator
```

### Step 3: Create Virtual Environment

**Windows:**

```cmd
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Run the Application

```bash
python app.py
```

Output should show:

```
WARNING in app.run_simple (...)
Running on http://0.0.0.0:5000
```

### Step 6: Access the Application

Open your web browser and navigate to:

```
http://localhost:5000
```

---

## Troubleshooting

### Issue: "Python is not recognized"

**Solution:**

- Reinstall Python and ensure "Add Python to PATH" is checked
- Restart Command Prompt/Terminal after installation
- Use `python3` instead of `python` on macOS/Linux

### Issue: "No module named 'flask'"

**Solution:**

```bash
pip install --upgrade -r requirements.txt
```

### Issue: Port 5000 already in use

**Solution:** Edit `app.py` and change line:

```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use 5001
```

Then access at `http://localhost:5001`

### Issue: Permission Denied (Linux/macOS)

**Solution:**

```bash
chmod +x run.sh
./run.sh
```

### Issue: Translation not working

**Solutions:**

- Check internet connection
- Verify firewall is not blocking connections
- Try the application with simpler text
- Check browser console for errors (F12)

### Issue: Text-to-Speech not producing audio

**Solutions:**

- Check if browser has audio permissions
- Verify system volume is not muted
- Try a different browser
- Clear browser cache

### Issue: Virtual environment activation fails

**Solution:** Try manual activation:

**Windows (PowerShell):**

```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**

```cmd
venv\Scripts\activate.bat
```

---

## Project Structure After Setup

```
Eng-to-Kannada-Translator/
├── venv/                       # Virtual environment (created after setup)
├── templates/
│   └── index.html             # Main HTML file
├── static/
│   ├── style.css              # Styling
│   └── script.js              # Frontend logic
├── app.py                      # Flask backend
├── config.py                   # Configuration
├── requirements.txt            # Dependencies
├── run.bat                     # Windows startup script
├── run.sh                      # Linux/macOS startup script
├── SETUP.md                    # This file
└── README.md                   # Project documentation
```

---

## Verifying Installation

Run these commands to verify everything is installed correctly:

```bash
# Check Python
python --version

# Check pip
pip --version

# List installed packages
pip list
```

You should see packages like:

- Flask
- googletrans
- gTTS
- pyttsx3

---

## Development vs Production

### Development Mode (Current Setup)

- `debug=True` - Auto-reloads on code changes
- Detailed error messages
- Slower performance
- Only accessible locally

### Production Mode

To run in production, modify `app.py`:

```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

Or use a production server:

```bash
pip install gunicorn
gunicorn app:app --bind 0.0.0.0:5000
```

---

## Uninstalling

### Remove Virtual Environment

**Windows:**

```cmd
rmdir /s venv
```

**macOS/Linux:**

```bash
rm -rf venv
```

### Remove Project

Delete the entire `Eng-to-Kannada-Translator` folder

---

## Next Steps

1. **Start the application** using `run.bat` or `run.sh`
2. **Open browser** to `http://localhost:5000`
3. **Enter English text** and click "Translate ➔"
4. **Listen to pronunciation** using the 🔊 buttons
5. **Copy translations** using the copy button

---

## Support & Debugging

### Enable Debug Mode

Open `app.py` and ensure:

```python
app.run(debug=True, ...)
```

### View Browser Console

Press `F12` in your browser to open Developer Tools

### Check Flask Logs

Look at the terminal where Flask is running for error messages

### Clear Cache

- **Chrome:** Ctrl+Shift+Delete
- **Firefox:** Ctrl+Shift+Delete
- **Safari:** Cmd+Option+E

---

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Google Translate API](https://github.com/ssut/py-googletrans)
- [gTTS Documentation](https://gtts.readthedocs.io/)
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html)

---

**Installation complete! Enjoy translating! 🎉**
