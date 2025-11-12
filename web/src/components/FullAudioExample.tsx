/**
 * Example: How to use the hybrid music service for full-length audio
 * 
 * This demonstrates the difference between:
 * 1. Old approach (Deezer only - 30s previews)
 * 2. New approach (Deezer + YouTube - full audio)
 */

import { useState } from 'react'
import { musicService } from '../services/music.service'
import { deezerService } from '../services/deezer.service'

export function FullAudioExample() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  // ❌ OLD WAY: Deezer only (30-second preview)
  const playWithPreviewOnly = async (trackId: number) => {
    setLoading(true)
    
    const track = await deezerService.getTrack(trackId)
    if (track) {
      console.log('Audio URL (30s):', track.preview)
      setResult({
        method: 'Deezer Preview',
        duration: '30 seconds',
        audioUrl: track.preview
      })
    }
    
    setLoading(false)
  }

  // ✅ NEW WAY: Hybrid service (full-length audio)
  const playWithFullAudio = async (trackId: number) => {
    setLoading(true)
    
    const track = await musicService.getTrackWithFullAudio(trackId)
    if (track) {
      console.log('Audio URL (full):', track.audioUrl)
      console.log('Has full audio:', track.hasFullAudio)
      
      setResult({
        method: 'YouTube + Deezer',
        duration: track.hasFullAudio ? 'Full length' : '30 seconds (fallback)',
        audioUrl: track.audioUrl,
        hasFullAudio: track.hasFullAudio
      })
    }
    
    setLoading(false)
  }

  // 🎵 Example: Search and play
  const searchAndPlay = async (query: string) => {
    setLoading(true)
    
    // Search for tracks
    const results = await musicService.search(query, 'track', 5)
    
    if (results.length > 0) {
      const firstTrack = results[0]
      
      // Get full audio for the first result
      const trackWithAudio = await musicService.getTrackWithFullAudio(firstTrack.id)
      
      if (trackWithAudio) {
        setResult({
          method: 'Search + Full Audio',
          track: trackWithAudio,
          hasFullAudio: trackWithAudio.hasFullAudio
        })
      }
    }
    
    setLoading(false)
  }

  // 💿 Example: Get album with full audio
  const getAlbumWithFullAudio = async (albumId: number) => {
    setLoading(true)
    
    const albumData = await musicService.getAlbumWithFullAudio(albumId)
    
    if (albumData) {
      const { album, tracksWithAudio } = albumData
      
      const fullAudioCount = tracksWithAudio.filter(t => t.hasFullAudio).length
      
      setResult({
        method: 'Album with Full Audio',
        album: album.title,
        totalTracks: tracksWithAudio.length,
        fullAudioTracks: fullAudioCount,
        tracks: tracksWithAudio
      })
    }
    
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Full Audio Playback Examples</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Test Individual Track</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => playWithPreviewOnly(3135556)}
            disabled={loading}
            style={{ padding: '0.75rem 1.5rem' }}
          >
            ❌ Old Way (30s Preview)
          </button>
          
          <button 
            onClick={() => playWithFullAudio(3135556)}
            disabled={loading}
            style={{ padding: '0.75rem 1.5rem' }}
          >
            ✅ New Way (Full Audio)
          </button>
        </div>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>
          Track ID: 3135556 (Daft Punk - Get Lucky)
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Search and Play</h2>
        <button 
          onClick={() => searchAndPlay('Imagine Dragons Believer')}
          disabled={loading}
          style={{ padding: '0.75rem 1.5rem' }}
        >
          🔍 Search: "Imagine Dragons Believer"
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Get Album with Full Audio</h2>
        <button 
          onClick={() => getAlbumWithFullAudio(302127)}
          disabled={loading}
          style={{ padding: '0.75rem 1.5rem' }}
        >
          💿 Load Album: Discovery (Daft Punk)
        </button>
      </div>

      {loading && (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          background: '#f0f0f0',
          borderRadius: '8px'
        }}>
          Loading...
        </div>
      )}

      {result && !loading && (
        <div style={{ 
          padding: '2rem', 
          background: '#f9f9f9', 
          borderRadius: '8px',
          marginTop: '2rem'
        }}>
          <h3>Result:</h3>
          <pre style={{ 
            background: '#fff', 
            padding: '1rem', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: '#e3f2fd',
        borderRadius: '8px'
      }}>
        <h3>💡 How it works:</h3>
        <ol>
          <li>Uses <strong>Deezer</strong> for metadata (title, artist, album art)</li>
          <li>Searches <strong>YouTube</strong> for full-length audio</li>
          <li>Caches YouTube video IDs to avoid repeated searches</li>
          <li>Falls back to 30s preview if YouTube search fails</li>
        </ol>
        
        <h4>Setup (Optional):</h4>
        <p>For better performance, add YouTube API key to <code>.env</code>:</p>
        <pre style={{ 
          background: '#fff', 
          padding: '0.75rem', 
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          VITE_YOUTUBE_API_KEY=your_api_key_here
        </pre>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Without API key, app uses Invidious (public YouTube frontend) - works but slower.
        </p>
      </div>
    </div>
  )
}
