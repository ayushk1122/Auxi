import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Callback({ onAuthSuccess }) {
    const navigate = useNavigate()

    useEffect(() => {
        const handleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search)
            const code = urlParams.get('code')

            if (!code) {
                navigate('/')
                return
            }

            try {
                const response = await axios.post('http://localhost:5000/api/callback', {
                    code
                })

                const { access_token } = response.data
                if (!access_token) {
                    console.error('No access token received:', response.data)
                    navigate('/')
                    return
                }

                console.log('Received access token:', access_token)  // Debug log
                localStorage.setItem('spotify_access_token', access_token)
                onAuthSuccess(access_token)
                navigate('/')
            } catch (error) {
                console.error('Auth error:', error.response?.data || error)
                navigate('/')
            }
        }

        handleCallback()
    }, [navigate, onAuthSuccess])

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Completing Authentication...
                </h2>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            </div>
        </div>
    )
}

export default Callback 