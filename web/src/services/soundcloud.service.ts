/**
 * Alternative: SoundCloud Service
 * Provides full-length audio streams (where available)
 * 
 * SoundCloud is more permissive with streaming than YouTube
 */

const SOUNDCLOUD_CLIENT_ID = 'your_client_id_here' // Get from https://soundcloud.com/you/apps

class SoundCloudService {
  /**
   * Search for tracks on SoundCloud
   */
  async searchTracks(query: string): Promise<any[]> {
    try {
      const response = await fetch(
        `https://api.soundcloud.com/tracks?q=${encodeURIComponent(query)}&client_id=${SOUNDCLOUD_CLIENT_ID}`
      )
      
      if (!response.ok) return []
      
      const tracks = await response.json()
      return tracks.filter((track: any) => track.streamable)
    } catch (error) {
      console.error('SoundCloud search error:', error)
      return []
    }
  }

  /**
   * Get stream URL for a track
   */
  getStreamUrl(trackId: string): string {
    return `https://api.soundcloud.com/tracks/${trackId}/stream?client_id=${SOUNDCLOUD_CLIENT_ID}`
  }
}

export const soundcloudService = new SoundCloudService()
