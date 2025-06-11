import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'

// Components
import Login from './components/Login'
import PlaylistGenerator from './components/PlaylistGenerator'
import Callback from './components/Callback'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState(null)

    useEffect(() => {
        // Check if user is already authenticated
        const token = localStorage.getItem('spotify_access_token')
        if (token) {
            setAccessToken(token)
            setIsAuthenticated(true)
        }
    }, [])

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/login')
            window.location.href = response.data.auth_url
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('spotify_access_token')
        setAccessToken(null)
        setIsAuthenticated(false)
    }

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-800">Auxi</h1>
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Login with Spotify
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                <main className="max-w-7xl mx-auto px-4 py-8">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuthenticated ? (
                                    <PlaylistGenerator accessToken={accessToken} />
                                ) : (
                                    <Login onLogin={handleLogin} />
                                )
                            }
                        />
                        <Route
                            path="/callback"
                            element={
                                <Callback
                                    onAuthSuccess={(token) => {
                                        setAccessToken(token)
                                        setIsAuthenticated(true)
                                    }}
                                />
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App 