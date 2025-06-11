import React, { useState } from 'react'
import axios from 'axios'

const PlaylistGenerator = ({ accessToken }) => {
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [recommendations, setRecommendations] = useState([])
    const [playlistUrl, setPlaylistUrl] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setRecommendations([])
        setPlaylistUrl(null)

        try {
            const response = await axios.post(
                'http://localhost:5000/api/generate-playlist',
                {
                    prompt,
                    access_token: accessToken
                }
            )

            if (response.data.recommendations) {
                setRecommendations(response.data.recommendations)
            }
            if (response.data.playlist_url) {
                setPlaylistUrl(response.data.playlist_url)
            }
        } catch (err) {
            console.error('Error:', err)
            setError(err.response?.data?.error || 'Failed to generate playlist')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Generate Your Playlist
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="prompt"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Describe your playlist
                    </label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows={4}
                        placeholder="e.g., A playlist for a summer beach party with upbeat songs"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !accessToken}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading || !accessToken
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        }`}
                >
                    {loading ? 'Generating...' : 'Generate Playlist'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {recommendations.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Songs</h3>
                    <ul className="space-y-2">
                        {recommendations.map((song, index) => (
                            <li
                                key={index}
                                className="p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
                            >
                                {song}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {playlistUrl && (
                <div className="mt-6">
                    <a
                        href={playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        View Playlist on Spotify
                    </a>
                </div>
            )}
        </div>
    )
}

export default PlaylistGenerator 