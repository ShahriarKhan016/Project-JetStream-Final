/**
 * Deezer API Service
 * Fetches music data from Deezer's public API
 * Note: Deezer API doesn't require authentication for public data
 * CORS proxy may be needed for browser requests
 * 
 * Now with API response caching for better performance!
 */

import { apiCacheService } from './apiCache.service'

// Using CORS proxy to avoid browser CORS restrictions
// Try corsproxy.io - it's faster and more reliable
const CORS_PROXY = 'https://corsproxy.io/?'
const DEEZER_API_BASE = 'https://api.deezer.com'

interface DeezerTrack {
  id: number
  title: string
  duration: number
  preview: string
  artist: {
    id: number
    name: string
    picture_medium: string
  }
  album: {
    id: number
    title: string
    cover_medium: string
  }
}

interface DeezerAlbum {
  id: number
  title: string
  cover_medium: string
  release_date: string
  genres: { data: Array<{ name: string }> }
  artist: {
    id: number
    name: string
  }
  tracks: { data: DeezerTrack[] }
}

interface DeezerArtist {
  id: number
  name: string
  picture_medium: string
  picture_xl: string
  nb_fan: number
}

class DeezerService {
  private getUrl(endpoint: string): string {
    // Use CORS proxy to bypass browser CORS restrictions
    const deezerUrl = `${DEEZER_API_BASE}${endpoint}`
    return `${CORS_PROXY}${encodeURIComponent(deezerUrl)}`
  }

  /**
   * Search for tracks, albums, or artists
   * Cached for 30 minutes to reduce API calls
   */
  async search(query: string, type: 'track' | 'album' | 'artist' = 'track', limit: number = 20) {
    const cacheKey = `search_${type}_${query}_${limit}`
    
    // Try cache first
    const cached = apiCacheService.get<any[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(this.getUrl(`/search/${type}?q=${encodeURIComponent(query)}&limit=${limit}`))
      if (!response.ok) throw new Error('Search failed')
      const data = await response.json()
      const results = data.data || []
      
      // Cache results
      apiCacheService.set(cacheKey, results)
      
      return results
    } catch (error) {
      console.error(`Deezer search error:`, error)
      return []
    }
  }

  /**
   * Get track by ID
   * Cached for 1 hour (tracks don't change often)
   */
  async getTrack(trackId: number): Promise<DeezerTrack | null> {
    const cacheKey = `track_${trackId}`
    
    // Try cache first
    const cached = apiCacheService.get<DeezerTrack>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(this.getUrl(`/track/${trackId}`))
      if (!response.ok) throw new Error('Track not found')
      const track = await response.json()
      
      // Cache for 1 hour
      apiCacheService.set(cacheKey, track, 60 * 60 * 1000)
      
      return track
    } catch (error) {
      console.error(`Deezer track error:`, error)
      return null
    }
  }

  /**
   * Get album by ID with tracks
   * Cached for 1 hour
   */
  async getAlbum(albumId: number): Promise<DeezerAlbum | null> {
    const cacheKey = `album_${albumId}`
    
    // Try cache first
    const cached = apiCacheService.get<DeezerAlbum>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(this.getUrl(`/album/${albumId}`))
      if (!response.ok) throw new Error('Album not found')
      const album = await response.json()
      
      // Cache for 1 hour
      apiCacheService.set(cacheKey, album, 60 * 60 * 1000)
      
      return album
    } catch (error) {
      console.error(`Deezer album error:`, error)
      return null
    }
  }

  /**
   * Get artist by ID
   * Cached for 1 hour
   */
  async getArtist(artistId: number): Promise<DeezerArtist | null> {
    const cacheKey = `artist_${artistId}`
    
    // Try cache first
    const cached = apiCacheService.get<DeezerArtist>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(this.getUrl(`/artist/${artistId}`))
      if (!response.ok) throw new Error('Artist not found')
      const artist = await response.json()
      
      // Cache for 1 hour
      apiCacheService.set(cacheKey, artist, 60 * 60 * 1000)
      
      return artist
    } catch (error) {
      console.error(`Deezer artist error:`, error)
      return null
    }
  }

  /**
   * Get artist's top tracks
   * Cached for 30 minutes
   */
  async getArtistTopTracks(artistId: number, limit: number = 10) {
    const cacheKey = `artist_top_${artistId}_${limit}`
    
    // Try cache first
    const cached = apiCacheService.get<any[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(this.getUrl(`/artist/${artistId}/top?limit=${limit}`))
      if (!response.ok) throw new Error('Top tracks not found')
      const data = await response.json()
      const tracks = data.data || []
      
      // Cache for 30 minutes
      apiCacheService.set(cacheKey, tracks)
      
      return tracks
    } catch (error) {
      console.error(`Deezer artist top tracks error:`, error)
      return []
    }
  }

  /**
   * Get artist's albums
   * Cached for 30 minutes
   */
  async getArtistAlbums(artistId: number, limit: number = 20) {
    const cacheKey = `artist_albums_${artistId}_${limit}`
    
    // Try cache first
    const cached = apiCacheService.get<any[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(this.getUrl(`/artist/${artistId}/albums?limit=${limit}`))
      if (!response.ok) throw new Error('Albums not found')
      const data = await response.json()
      const albums = data.data || []
      
      // Cache for 30 minutes
      apiCacheService.set(cacheKey, albums)
      
      return albums
    } catch (error) {
      console.error(`Deezer artist albums error:`, error)
      return []
    }
  }

  /**
   * Get related artists
   * Cached for 30 minutes
   */
  async getRelatedArtists(artistId: number) {
    const cacheKey = `related_artists_${artistId}`
    
    // Try cache first
    const cached = apiCacheService.get<any[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(this.getUrl(`/artist/${artistId}/related?limit=10`))
      if (!response.ok) throw new Error('Related artists not found')
      const data = await response.json()
      const artists = data.data || []
      
      // Cache for 30 minutes
      apiCacheService.set(cacheKey, artists)
      
      return artists
    } catch (error) {
      console.error(`Deezer related artists error:`, error)
      return []
    }
  }

  /**
   * Get chart (top tracks, albums, artists)
   * Cached for 1 hour (charts update slowly)
   */
  async getChart(type: 'tracks' | 'albums' | 'artists', limit: number = 20) {
    const cacheKey = `chart_${type}_${limit}`
    
    // Try cache first
    const cached = apiCacheService.get<any[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(this.getUrl(`/chart/0/${type}?limit=${limit}`))
      if (!response.ok) throw new Error('Chart not found')
      const data = await response.json()
      const chartData = data.data || []
      
      // Cache for 1 hour (charts don't change often)
      apiCacheService.set(cacheKey, chartData, 60 * 60 * 1000)
      
      return chartData
    } catch (error) {
      console.error(`Deezer chart error:`, error)
      return []
    }
  }

  /**
   * Get genre playlists
   */
  async getGenre(genreId: number) {
    try {
      const response = await fetch(this.getUrl(`/genre/${genreId}`))
      if (!response.ok) throw new Error('Genre not found')
      return await response.json()
    } catch (error) {
      console.error(`Deezer genre error:`, error)
      return null
    }
  }

  /**
   * Get all genres
   */
  async getGenres() {
    try {
      const response = await fetch(this.getUrl('/genre'))
      if (!response.ok) throw new Error('Genres not found')
      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error(`Deezer genres error:`, error)
      return []
    }
  }

  /**
   * Transform Deezer track to app Track format
   */
  transformTrack(deezerTrack: DeezerTrack) {
    return {
      id: deezerTrack.id.toString(),
      title: deezerTrack.title,
      artist: deezerTrack.artist.name,
      albumTitle: deezerTrack.album.title,
      coverImage: deezerTrack.album.cover_medium,
      duration: deezerTrack.duration,
      audioUrl: deezerTrack.preview // 30-second preview
    }
  }
}

// Export singleton instance
export const deezerService = new DeezerService()
