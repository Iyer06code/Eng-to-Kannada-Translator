from flask import Flask, render_template, request, jsonify
from googletrans import Translator
import pyttsx3
import os
from gtts import gTTS
import io

app = Flask(__name__)
translator = Translator()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/translate', methods=['POST'])
def translate():
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Translate English to Kannada
        translated = translator.translate(text, src='en', dest='kn')
        translated_text = translated.text
        
        return jsonify({
            'original': text,
            'translated': translated_text
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/speak', methods=['POST'])
def speak():
    try:
        data = request.json
        text = data.get('text', '')
        language = data.get('language', 'en')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Use gTTS for text-to-speech
        tts = gTTS(text=text, lang=language, slow=False)
        
        # Save to a BytesIO object
        audio_stream = io.BytesIO()
        tts.write_to_fp(audio_stream)
        audio_stream.seek(0)
        
        # Convert to base64 for sending to frontend
        import base64
        audio_base64 = base64.b64encode(audio_stream.getvalue()).decode('utf-8')
        
        return jsonify({
            'audio': audio_base64,
            'type': 'audio/mpeg'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
