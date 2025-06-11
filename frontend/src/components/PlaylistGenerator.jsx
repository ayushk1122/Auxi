import { useState } from 'react'
import axios from 'axios'

function PlaylistGenerator({ accessToken }) {
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await axios.post(
                'http://localhost:5000/api/generate-playlist',
                {
                    prompt,
                    access_token: accessToken
                }
            )

            setSuccess('Playlist generated successfully!')
            setPrompt('')
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to generate playlist')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Generate Your Playlist
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="prompt"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Describe your playlist
                    </label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Make me a playlist like Blinding Lights but slower and sadder"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows="4"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-6 py-3 text-white font-medium rounded-md ${isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                >
                    {isLoading ? 'Generating...' : 'Generate Playlist'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {success && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                    {success}
                </div>
            )}
        </div>
    )
}

export default PlaylistGenerator 