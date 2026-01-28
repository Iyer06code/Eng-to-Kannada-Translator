// API endpoint
const API_URL = '/';

/**
 * Translate English text to Kannada
 */
async function translateText() {
    const englishText = document.getElementById('englishText').value.trim();
    
    if (!englishText) {
        showMessage('Please enter English text to translate', 'error');
        return;
    }
    
    const translateBtn = document.querySelector('.translate-btn');
    translateBtn.disabled = true;
    translateBtn.classList.add('loading');
    
    try {
        const response = await fetch(`${API_URL}translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: englishText
            })
        });
        
        if (!response.ok) {
            throw new Error('Translation failed');
        }
        
        const data = await response.json();
        document.getElementById('kannadaText').value = data.translated;
        updateCharCount('kannada');
        showMessage('Translation successful!', 'success');
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error during translation: ' + error.message, 'error');
    } finally {
        translateBtn.disabled = false;
        translateBtn.classList.remove('loading');
    }
}

/**
 * Speak English text
 */
async function speakEnglish() {
    const text = document.getElementById('englishText').value.trim();
    
    if (!text) {
        showMessage('Please enter text to speak', 'error');
        return;
    }
    
    await speakText(text, 'en');
}

/**
 * Speak Kannada text
 */
async function speakKannada() {
    const text = document.getElementById('kannadaText').value.trim();
    
    if (!text) {
        showMessage('Please translate first before speaking', 'error');
        return;
    }
    
    await speakText(text, 'kn');
}

/**
 * Generic speak function using text-to-speech API
 */
async function speakText(text, language) {
    try {
        showMessage('Generating speech...', 'info');
        
        const response = await fetch(`${API_URL}speak`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                language: language
            })
        });
        
        if (!response.ok) {
            throw new Error('Speech synthesis failed');
        }
        
        const data = await response.json();
        
        // Convert base64 to blob and play
        const binaryString = atob(data.audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: data.type });
        const url = URL.createObjectURL(blob);
        
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = url;
        audioPlayer.play();
        
        showMessage('Playing audio...', 'success');
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error generating speech: ' + error.message, 'error');
    }
}

/**
 * Update character count
 */
function updateCharCount(language) {
    const textId = language === 'english' ? 'englishText' : 'kannadaText';
    const countId = language === 'english' ? 'englishCount' : 'kannadaCount';
    
    const text = document.getElementById(textId).value;
    document.getElementById(countId).textContent = text.length;
    
    if (text.length > 500) {
        document.getElementById(textId).value = text.substring(0, 500);
        document.getElementById(countId).textContent = '500';
    }
}

/**
 * Copy translated text to clipboard
 */
function copyToClipboard() {
    const kannadaText = document.getElementById('kannadaText').value.trim();
    
    if (!kannadaText) {
        showMessage('Nothing to copy', 'error');
        return;
    }
    
    navigator.clipboard.writeText(kannadaText).then(() => {
        showMessage('Translation copied to clipboard!', 'success');
    }).catch(err => {
        showMessage('Failed to copy: ' + err.message, 'error');
    });
}

/**
 * Clear all text
 */
function clearAll() {
    document.getElementById('englishText').value = '';
    document.getElementById('kannadaText').value = '';
    document.getElementById('englishCount').textContent = '0';
    document.getElementById('kannadaCount').textContent = '0';
    showMessage('All fields cleared', 'info');
}

/**
 * Show message to user
 */
function showMessage(message, type) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = `message-box ${type}`;
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        messageBox.className = 'message-box';
    }, 4000);
}

/**
 * Keyboard shortcuts
 */
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        // Ctrl+Enter or Cmd+Enter to translate
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            translateText();
        }
        // Ctrl+Shift+C to copy
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
            copyToClipboard();
        }
    });
});
