# Architecture & Flow Diagram

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    WEB BROWSER (Client)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  HTML Interface (index.html)                          │  │
│  │  ┌──────────────────┐    ┌──────────────────┐         │  │
│  │  │  English Box     │    │  Kannada Box     │         │  │
│  │  │  [Text Input]    │    │  [Text Display]  │         │  │
│  │  └──────────────────┘    └──────────────────┘         │  │
│  │         ▲                        △                      │  │
│  │         │                        │                      │  │
│  │  [Translate Button] ─────────────┤                      │  │
│  │  [Speak Buttons]     Audio Output│                      │  │
│  └───────────────────────────────────────────────────────┘  │
│          │                         △ │                      │
│          │ AJAX Requests           │ │ Responses           │
└──────────┼─────────────────────────┼─┼────────────────────┘
           │                         │ │
           ▼                         │ │
┌──────────────────────────────────────┴─────────────────────┐
│            Flask Server (Backend)                           │
│  ┌────────────────────────────────────────────────────┐    │
│  │  app.py - Main Application                         │    │
│  │                                                    │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │ Route: GET /                                 │ │    │
│  │  │ Returns: index.html (Translator Interface)   │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  │                                                    │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │ Route: POST /translate                       │ │    │
│  │  │ Input: {"text": "English text"}              │ │    │
│  │  │ Process: googletrans translation             │ │    │
│  │  │ Output: {"translated": "ಕನ್ನಡ"}            │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  │                                                    │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │ Route: POST /speak                           │ │    │
│  │  │ Input: {"text": "Text", "lang": "en"}        │ │    │
│  │  │ Process: gTTS audio generation               │ │    │
│  │  │ Output: {"audio": "base64", "type": "mp3"}   │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  │                                                    │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │ Route: GET /test                             │ │    │
│  │  │ Returns: test.html (Diagnostic Page)         │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────┘    │
│                      │           │                         │
│                      ▼           ▼                         │
│          ┌────────────────────────────────┐               │
│          │  External APIs / Libraries      │               │
│          ├────────────────────────────────┤               │
│          │ • googletrans (Google Trans.)   │               │
│          │ • gTTS (Text-to-Speech)        │               │
│          │ • pyttsx3 (Optional TTS)       │               │
│          └────────────────────────────────┘               │
└────────────────────────────────────────────────────────────┘
           │                              △
           │ Requests                     │ Responses
           ▼                              │
    ┌──────────────────┐        ┌────────────────────┐
    │   Internet       │────────│  Translation Data  │
    │   Connection     │        │  Audio Streams     │
    │   Required!      │        └────────────────────┘
    └──────────────────┘
```

---

## 📊 Data Flow

### Translation Flow

```
User Input (English)
        │
        ▼
JavaScript (script.js)
        │
        ▼
POST /translate
        │
        ▼
Flask Backend (app.py)
        │
        ▼
googletrans Library
        │
        ▼
Google Translate API
        │
        ▼
Kannada Translation
        │
        ▼
JSON Response
        │
        ▼
JavaScript Update DOM
        │
        ▼
Display in Kannada Box
```

### Text-to-Speech Flow

```
User Clicks 🔊 Button
        │
        ▼
JavaScript Captures Text
        │
        ▼
POST /speak
        │
        ▼
Flask Backend (app.py)
        │
        ▼
gTTS Library
        │
        ▼
Google TTS API
        │
        ▼
Audio Generation (MP3)
        │
        ▼
Base64 Encoding
        │
        ▼
JSON Response
        │
        ▼
JavaScript Decodes
        │
        ▼
Creates Audio Element
        │
        ▼
Browser Plays Audio
```

---

## 🗂️ File Organization

```
Eng-to-Kannada-Translator/
│
├── Backend Files
│   ├── app.py ........................ Flask application (main logic)
│   ├── config.py ..................... Configuration settings
│   └── requirements.txt .............. Python dependencies
│
├── Frontend Files
│   └── templates/
│       ├── index.html ............... Main translator UI
│       └── test.html ................ Diagnostic page
│
├── Static Assets
│   └── static/
│       ├── style.css ................ Styling & layout
│       └── script.js ................ Frontend logic
│
├── Startup Scripts
│   ├── run.bat ...................... Windows launcher
│   └── run.sh ....................... macOS/Linux launcher
│
└── Documentation
    ├── README.md .................... Full documentation
    ├── SETUP.md ..................... Installation guide
    ├── PROJECT_SUMMARY.md ........... Project overview
    ├── QUICKSTART.md ................ Quick start guide
    └── .gitignore ................... Git configuration
```

---

## 🔄 Request/Response Examples

### Example 1: Translation Request

```
REQUEST:
POST /translate HTTP/1.1
Content-Type: application/json

{
  "text": "Hello, how are you today?"
}

RESPONSE:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "original": "Hello, how are you today?",
  "translated": "ನಮಸ್ಕಾರ, ನೀವು ಇಂದು ಹೇಗಿದ್ದೀರಿ?"
}
```

### Example 2: Text-to-Speech Request

```
REQUEST:
POST /speak HTTP/1.1
Content-Type: application/json

{
  "text": "ನಮಸ್ಕಾರ",
  "language": "kn"
}

RESPONSE:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "audio": "//NExAAiWRU...[truncated base64]...==",
  "type": "audio/mpeg"
}
```

---

## 🔌 Dependencies Chain

```
app.py
├── Flask
│   └── Werkzeug
├── googletrans
│   └── requests
├── gTTS
│   ├── requests
│   └── beautifulsoup4
└── pyttsx3
    └── pywin32 (Windows only)

script.js
└── Vanilla JavaScript (No external deps)

style.css
└── Pure CSS3 (No preprocessing needed)
```

---

## ⚡ Performance Flow

```
User Action
    │
    ▼
Browser validates input
    │
    ├─ Yes ──► Send AJAX request
    │              │
    │              ▼
    │          Flask processes
    │              │
    │              ├─ Cache check (if implemented)
    │              │
    │              ├─ API call
    │              │
    │              ▼
    │          Return JSON
    │              │
    │              ▼
    │          JavaScript updates DOM
    │              │
    │              ▼
    │          User sees result
    │
    └─ No ───► Show error message
```

---

## 🔐 Security Flow

```
User Input
    │
    ▼
Input Validation (JavaScript)
    │
    ├─ Check length (max 500)
    ├─ Check not empty
    ├─ Escape special characters
    │
    ▼
POST Request
    │
    ├─ HTTPS (optional in production)
    ├─ CORS headers
    │
    ▼
Flask Processing
    │
    ├─ Validate input again
    ├─ Rate limiting (optional)
    ├─ Error handling
    │
    ▼
Safe Response
    │
    └─► Browser displays
```

---

## 📈 Scalability Considerations

Current Architecture:

- Single-process Flask server
- In-memory processing
- No caching
- No database

For Production:

```
                    Load Balancer
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    Flask App 1     Flask App 2      Flask App N
        │                │                │
        └────────────────┼────────────────┘
                         │
                    Cache Layer (Redis)
                         │
                    Database (Optional)
```

---

## 🚀 Deployment Options

```
Development
└── localhost:5000
    └── python app.py

Production (Gunicorn)
└── 0.0.0.0:5000
    └── gunicorn app:app

Docker
└── Container
    └── gunicorn app:app

Cloud
├── Heroku
├── AWS
├── Google Cloud
└── DigitalOcean
```

---

This diagram provides a visual understanding of how the application is structured and how data flows through the system.
