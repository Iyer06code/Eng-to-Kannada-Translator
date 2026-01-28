# ⚡ QUICK START GUIDE

## 🎯 Get Started in 3 Steps

### Step 1️⃣: Start the Application

**Windows Users:**

```
Double-click → run.bat
```

**Mac/Linux Users:**

```bash
chmod +x run.sh
./run.sh
```

### Step 2️⃣: Wait for Setup (First Time Only)

The script will:

- ✅ Create virtual environment
- ✅ Install dependencies
- ✅ Start Flask server

You'll see:

```
Running on http://0.0.0.0:5000
```

### Step 3️⃣: Open Browser

Go to: **http://localhost:5000**

---

## 🎨 Using the Translator

1. **Type English text** in the left box
2. **Click "Translate ➔"** button
3. **See Kannada translation** in the right box
4. **Click 🔊** to hear pronunciation
5. **Click 📋** to copy translation

---

## 🆘 Having Issues?

### Problem: Nothing happens when clicking run.bat

**Solution:**

- Right-click → Run as Administrator
- Or open Command Prompt and run: `run.bat`

### Problem: "Python not found"

**Solution:**

- Install Python from https://www.python.org
- During installation, check "Add Python to PATH"
- Restart computer

### Problem: "Port 5000 already in use"

**Solution:** Edit `app.py` line 31:

```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Change to 5001
```

Then access: `http://localhost:5001`

### Problem: Translation not working

**Solution:**

- Check internet connection
- Refresh browser (Ctrl+R)
- Try simpler text
- Check test page: `http://localhost:5000/test`

---

## 📚 More Information

- **Full Setup:** Read `SETUP.md`
- **Documentation:** Read `README.md`
- **Project Details:** Read `PROJECT_SUMMARY.md`

---

## 🔄 Stop the Application

Press **Ctrl+C** in the terminal

---

## 💡 Pro Tips

✨ **Keyboard Shortcuts:**

- `Ctrl+Enter` - Translate
- `Ctrl+Shift+C` - Copy translation

✨ **Character Limit:**

- Maximum 500 characters per translation
- Counter shows current length

✨ **Clear All:**

- Click "🗑️ Clear All" to reset fields

---

## 🧪 Test Page

Check if everything is working:
Open: **http://localhost:5000/test**

This will test:

- ✅ Backend connectivity
- ✅ Translation service
- ✅ Text-to-speech

---

## 🎉 That's It!

You're ready to translate English to Kannada!

**Happy translating! 🚀**

---

_For detailed instructions, refer to SETUP.md_
