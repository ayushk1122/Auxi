function Login({ onLogin }) {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Welcome to Auxi
            </h2>
            <p className="text-lg text-gray-600 mb-8">
                Create personalized Spotify playlists using natural language. Just describe
                the mood, style, or reference songs, and let AI do the rest.
            </p>
            <button
                onClick={onLogin}
                className="px-8 py-4 bg-green-500 text-white text-lg font-medium rounded-md hover:bg-green-600 transition-colors"
            >
                Login with Spotify to Get Started
            </button>
        </div>
    )
}

export default Login 