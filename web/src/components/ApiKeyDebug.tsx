import { useEffect, useState } from 'react'

export const ApiKeyDebug = () => {
  const [status, setStatus] = useState({
    hasKey: false,
    keyPreview: '',
    error: null as string | null
  })

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    
    setStatus({
      hasKey: !!apiKey,
      keyPreview: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found',
      error: !apiKey ? 'API key not loaded from .env file' : null
    })

    console.log('🔑 YouTube API Key Status:', {
      loaded: !!apiKey,
      preview: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not found',
      fullLength: apiKey?.length
    })
  }, [])

  if (!status.hasKey) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        background: 'rgba(255, 0, 0, 0.9)',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999
      }}>
        ⚠️ YouTube API key not detected
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      background: 'rgba(0, 255, 0, 0.9)',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      ✅ YouTube API key loaded: {status.keyPreview}
    </div>
  )
}
