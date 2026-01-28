# 🛠️ TROUBLESHOOTING GUIDE

## Common Issues & Solutions

---

## 1. Installation Issues

### ❌ "Python is not recognized as an internal or external command"

**Cause:** Python not installed or not in PATH

**Solutions:**

1. **Install Python:**

   - Download from https://www.python.org/downloads/
   - During installation, **CHECK** "Add Python to PATH"
   - Click Install Now

2. **Verify Installation:**

   ```cmd
   python --version
   ```

   Should show: `Python 3.x.x`

3. **Restart Terminal:**

   - Close and reopen Command Prompt/PowerShell
   - Try again

4. **Alternative (macOS/Linux):**
   ```bash
   python3 --version
   ```

---

### ❌ "pip: command not found"

**Cause:** pip not installed or not in PATH

**Solutions:**

```bash
# Windows
python -m pip --version

# macOS/Linux
python3 -m pip --version
```

If pip is missing:

```bash
# Windows
python -m ensurepip --upgrade

# macOS/Linux
python3 -m ensurepip --upgrade
```

---

### ❌ "No module named 'venv'"

**Cause:** venv module not available

**Solutions:**

**Windows:**

```cmd
python -m pip install virtualenv
python -m virtualenv venv
venv\Scripts\activate
```

**macOS/Linux:**

```bash
python3 -m pip install virtualenv
python3 -m virtualenv venv
source venv/bin/activate
```

---

### ❌ "Permission denied: './run.sh'"

**Cause:** Script doesn't have execute permission

**Solution:**

```bash
chmod +x run.sh
./run.sh
```

---

## 2. Dependency Issues

### ❌ "ModuleNotFoundError: No module named 'flask'"

**Cause:** Dependencies not installed

**Solution:**

```bash
pip install -r requirements.txt --upgrade
```

Or install manually:

```bash
pip install Flask==2.3.3
pip install googletrans==4.0.0rc1
pip install gTTS==2.3.2
pip install pyttsx3==2.90
```

---

### ❌ "ERROR: Could not find a version that satisfies the requirement"

**Cause:** Package version conflicts or network issues

**Solutions:**

1. **Update pip first:**

   ```bash
   python -m pip install --upgrade pip
   ```

2. **Install without version constraints:**

   ```bash
   pip install Flask googletrans gTTS pyttsx3
   ```

3. **Check internet connection:**
   ```bash
   pip install flask -v
   ```
   (Shows detailed output)

---

### ❌ "SSL: CERTIFICATE_VERIFY_FAILED"

**Cause:** SSL certificate verification issue

**Solutions:**

**Windows:**

```cmd
python -m pip install --upgrade pip
pip install --trusted-host pypi.python.org -r requirements.txt
```

**macOS:**

```bash
/Applications/Python\ 3.x/Install\ Certificates.command
pip install -r requirements.txt
```

---

## 3. Flask Server Issues

### ❌ "Address already in use"

**Cause:** Port 5000 is already being used

**Solutions:**

1. **Find what's using port 5000:**

   ```bash
   # Windows
   netstat -ano | findstr :5000

   # macOS/Linux
   lsof -i :5000
   ```

2. **Kill the process:**

   ```bash
   # Windows (replace PID with the number from above)
   taskkill /PID <PID> /F

   # macOS/Linux
   kill -9 <PID>
   ```

3. **Use different port:**
   Edit `app.py` line 31:
   ```python
   app.run(debug=True, host='0.0.0.0', port=5001)  # Change to 5001
   ```
   Then access: `http://localhost:5001`

---

### ❌ "RuntimeError: Working outside of request context"

**Cause:** Flask context error

**Solution:**

```bash
# Ensure you're in the correct directory
cd c:\Users\SURABHI IYER\Eng-to-Kannada-Translator

# Make sure virtual environment is activated
venv\Scripts\activate

# Run the app
python app.py
```

---

### ❌ "Failed to establish a new connection"

**Cause:** Internet not available or firewall blocking

**Solutions:**

1. Check internet connection
2. Check firewall settings
3. Disable firewall temporarily to test:
   ```bash
   # Windows - Run as Administrator
   netsh advfirewall set allprofiles state off
   ```

---

## 4. Browser & Connection Issues

### ❌ "Cannot GET /" - Page not found

**Cause:** Flask server not running

**Solutions:**

1. Start Flask server:

   ```bash
   python app.py
   ```

2. Check if running:

   ```bash
   http://localhost:5000
   ```

3. Check terminal for errors

---

### ❌ "Connection refused" / "Cannot connect"

**Cause:** Server not running or wrong port

**Solutions:**

1. Make sure server is running (you should see `Running on http://0.0.0.0:5000`)
2. Try `http://localhost:5000` instead of `http://0.0.0.0:5000`
3. Check if using correct port

---

### ❌ "Mixed content error" (HTTPS/HTTP)

**Cause:** HTTPS page trying to access HTTP content

**Solution:** Use HTTP or configure HTTPS

---

### ❌ "CORS error" - "Access-Control-Allow-Origin"

**Cause:** Cross-Origin Resource Sharing blocked

**Solution:** Already handled in `app.py`, but if issues persist:

```python
from flask_cors import CORS
CORS(app)
```

---

## 5. Translation Issues

### ❌ "Translation returns original text"

**Cause:** Translation failed silently or network issue

**Solutions:**

1. **Check internet connection:**

   ```bash
   ping google.com
   ```

2. **Test translation endpoint:**

   ```bash
   curl -X POST http://localhost:5000/translate \
     -H "Content-Type: application/json" \
     -d '{"text":"hello"}'
   ```

3. **Check browser console for errors (F12)**

4. **Restart Flask server**

---

### ❌ "API returned 429 (Too Many Requests)"

**Cause:** Rate limited by Google Translate

**Solution:**

- Wait a few minutes
- Translate less frequently
- Consider switching to official Google Translate API

---

### ❌ Translation works but output is wrong

**Cause:** Translation quality issues or special characters

**Solutions:**

1. Use simpler English text
2. Avoid slang or abbreviations
3. Check character encoding (should be UTF-8)

---

## 6. Text-to-Speech Issues

### ❌ "No audio output / Silent"

**Cause:** Browser audio muted or permission denied

**Solutions:**

1. **Check browser volume:**

   - Check browser icon for mute/volume
   - Unmute in browser settings

2. **Check system volume:**

   - Ensure computer volume is on

3. **Check browser permissions:**

   - Chrome: Settings → Privacy → Permissions → Microphone/Audio
   - Firefox: About:Preferences → Privacy → Permissions

4. **Try different browser:**

   - Chrome, Firefox, Safari, Edge

5. **Test audio in browser:**
   - Visit a YouTube video
   - Verify audio works

---

### ❌ "gTTS API error" / "ConnectionError"

**Cause:** No internet or gTTS service unavailable

**Solutions:**

1. Check internet connection
2. Try again (temporary service issue)
3. Check if gTTS is working:
   ```python
   from gtts import gTTS
   tts = gTTS("test", lang='en')
   tts.save("test.mp3")
   ```

---

### ❌ "Audio download failed / slow"

**Cause:** Slow internet or large text

**Solutions:**

1. Check internet speed
2. Use shorter text (under 100 characters)
3. Close other bandwidth-heavy apps
4. Restart Flask and browser

---

## 7. Browser-Specific Issues

### Chrome Issues

```
❌ "Not secure" warning
Solution: Use localhost, not 0.0.0.0

❌ Audio not playing
Solution: Check Developer Tools (F12) → Console
```

### Firefox Issues

```
❌ "Too many redirects"
Solution: Clear cache and cookies

❌ CORS errors
Solution: May need to configure CORS in Firefox settings
```

### Safari Issues

```
❌ "Cannot load local resource"
Solution: Use http://localhost:5000, not file://

❌ Text-to-speech not working
Solution: Check Safari privacy settings
```

### Edge Issues

```
❌ "Connection reset"
Solution: Clear browsing data and restart

❌ Audio permission issues
Solution: Check site permissions in Edge settings
```

---

## 8. Performance Issues

### ❌ "Application is slow"

**Solutions:**

1. **Check internet speed:**

   ```bash
   ping -c 5 google.com  # macOS/Linux
   ping google.com -n 5  # Windows
   ```

2. **Reduce text size:**

   - Shorter translations are faster

3. **Close unnecessary apps:**

   - Frees up bandwidth and resources

4. **Disable debug mode:**
   Edit `app.py`:

   ```python
   app.run(debug=False, ...)
   ```

5. **Use faster browser:**
   - Chrome/Edge are generally faster

---

### ❌ "Memory usage is high"

**Cause:** Large text or repeated requests

**Solutions:**

1. Restart Flask server
2. Clear browser cache
3. Limit text to 500 characters

---

## 9. Development & Debugging

### Enable Debug Mode

```python
# In app.py
app.run(debug=True)  # Auto-reload on changes
```

### Check Browser Console

```
Press F12 → Console tab
Look for JavaScript errors
```

### Check Flask Logs

```
Look at terminal where Flask is running
Shows all server errors and requests
```

### Enable Verbose Output

```bash
python app.py --verbose
```

---

## 10. Reset & Clean Install

### Full Clean Install

**Windows:**

```cmd
REM Delete virtual environment
rmdir /s /q venv

REM Delete Python cache
del __pycache__
del *.pyc

REM Start fresh
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**macOS/Linux:**

```bash
# Delete virtual environment
rm -rf venv

# Delete Python cache
find . -type d -name __pycache__ -delete
find . -type f -name "*.pyc" -delete

# Start fresh
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

---

## 11. Getting Help

### Check Logs

1. **Terminal/Console output** - Shows Flask errors
2. **Browser console (F12)** - Shows JavaScript errors
3. **Browser Network tab (F12)** - Shows HTTP requests/responses

### Diagnostic Test

```
http://localhost:5000/test
```

This tests all major components

### Common Error Messages

| Error                    | Meaning                | Solution             |
| ------------------------ | ---------------------- | -------------------- |
| `ConnectionError`        | Can't reach server     | Start Flask          |
| `ModuleNotFoundError`    | Package missing        | Install dependencies |
| `Address already in use` | Port taken             | Use different port   |
| `SSL Certificate Error`  | Network security issue | Update certificates  |
| `Rate limit exceeded`    | Too many requests      | Wait and retry       |
| `CORS error`             | Cross-origin issue     | Check API endpoints  |

---

## 12. Advanced Troubleshooting

### Check Python Path

```bash
python -c "import sys; print(sys.executable)"
```

### Check Installed Packages

```bash
pip list
```

### Reinstall Package

```bash
pip uninstall flask
pip install Flask==2.3.3
```

### Update All Packages

```bash
pip install --upgrade -r requirements.txt
```

### Test Individual Components

**Test Translation:**

```python
from googletrans import Translator
translator = Translator()
result = translator.translate('hello', src_language='en', dest_language='kn')
print(result['text'])
```

**Test TTS:**

```python
from gtts import gTTS
tts = gTTS("hello", lang='en')
tts.save("test.mp3")
```

---

## 📞 Still Having Issues?

1. **Check documentation:**

   - README.md
   - SETUP.md
   - PROJECT_SUMMARY.md
   - ARCHITECTURE.md

2. **Test diagnostics:**

   - http://localhost:5000/test

3. **Search online:**

   - Google the exact error message
   - Check Stack Overflow
   - Check Flask documentation

4. **Review common issues:**
   - Look at sections above that match your problem

---

## ✅ Quick Checklist

- [ ] Python installed and in PATH
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] Internet connection working
- [ ] Port 5000 not in use
- [ ] Flask server running
- [ ] Browser accessing http://localhost:5000
- [ ] Firewall not blocking connections

If all above are checked, your application should work! 🎉

---

**Last updated:** January 2026
**Application:** English to Kannada Translator v1.0
