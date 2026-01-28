"""
Configuration settings for the English to Kannada Translator application.
"""

import os

# Flask Configuration
DEBUG = True
HOST = '0.0.0.0'
PORT = 5000

# Application Settings
MAX_CHARS = 500
LANGUAGES = {
    'english': 'en',
    'kannada': 'kn'
}

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_FOLDER = os.path.join(BASE_DIR, 'templates')
STATIC_FOLDER = os.path.join(BASE_DIR, 'static')
