# Auxi - AI-Powered Spotify Playlist Generator

Auxi is an intelligent playlist generator that creates personalized Spotify playlists based on natural language prompts. Using OpenAI's GPT API and Spotify's Web API, Auxi understands your musical preferences and creates playlists that match your desired mood and style.

## Features

- Natural language playlist generation
- Spotify OAuth integration
- AI-powered mood and intent analysis
- Personalized song recommendations
- Automatic playlist creation and saving

## Tech Stack

- Frontend: React + Vite
- Backend: Flask (Python)
- APIs: OpenAI GPT, Spotify Web API
- Authentication: Spotify OAuth

## Setup

1. Clone the repository
2. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in your API keys and secrets

3. Install dependencies:
   ```bash
   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt

   # Frontend
   cd frontend
   npm install
   ```

4. Run the development servers:
   ```bash
   # Backend
   cd backend
   flask run

   # Frontend
   cd frontend
   npm run dev
   ```

## Environment Variables

### Backend (.env)
- `OPENAI_API_KEY`: Your OpenAI API key
- `SPOTIFY_CLIENT_ID`: Spotify API client ID
- `SPOTIFY_CLIENT_SECRET`: Spotify API client secret
- `FLASK_SECRET_KEY`: Flask secret key for session management

### Frontend (.env)
- `VITE_SPOTIFY_CLIENT_ID`: Spotify API client ID
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000)

## License

MIT 