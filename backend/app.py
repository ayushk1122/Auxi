from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
import requests
from urllib.parse import urlencode

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Spotify API credentials
SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
SPOTIFY_REDIRECT_URI = 'http://localhost:5173/callback'  # Frontend callback URL

# Spotify API endpoints
SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1'

@app.route('/api/login', methods=['GET'])
def login():
    """Initiate Spotify OAuth flow"""
    scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private'
    params = {
        'client_id': SPOTIFY_CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'scope': scope
    }
    auth_url = f"{SPOTIFY_AUTH_URL}?{urlencode(params)}"
    return jsonify({'auth_url': auth_url})

@app.route('/api/callback', methods=['POST'])
def callback():
    """Handle Spotify OAuth callback and token exchange"""
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    # Exchange code for access token
    token_data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET
    }
    
    response = requests.post(SPOTIFY_TOKEN_URL, data=token_data)
    return jsonify(response.json())

@app.route('/api/generate-playlist', methods=['POST'])
def generate_playlist():
    """Generate a playlist based on user prompt"""
    data = request.json
    prompt = data.get('prompt')
    access_token = data.get('access_token')
    
    if not prompt or not access_token:
        return jsonify({'error': 'Missing prompt or access token'}), 400

    try:
        # Use OpenAI to analyze the prompt
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a music expert. Analyze the following prompt and extract the mood, style, and reference songs."},
                {"role": "user", "content": prompt}
            ]
        )
        
        # TODO: Implement playlist generation logic using Spotify API
        # This will include:
        # 1. Getting user's top tracks
        # 2. Getting song recommendations based on audio features
        # 3. Creating and saving the playlist
        
        return jsonify({
            'message': 'Playlist generation endpoint - to be implemented',
            'analysis': response.choices[0].message.content
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 