/**
 * LocalStorage Service
 * Manages liked songs, playlists, and recently played tracks
 */

export interface Track {
  id: string
  title: string
  artist: string
  albumTitle: string
  coverImage: string
  duration: number
  audioUrl: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  tracks: Track[]
  coverImage: string
  createdAt: number
}

const STORAGE_KEYS = {
  LIKED_SONGS: 'jetstream_liked_songs',
  PLAYLISTS: 'jetstream_playlists',
  RECENTLY_PLAYED: 'jetstream_recently_played'
}

class StorageService {
  // ============ Liked Songs ============
  
  getLikedSongs(): Track[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LIKED_SONGS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error getting liked songs:', error)
      return []
    }
  }

  likeTrack(track: Track): void {
    try {
      const likedSongs = this.getLikedSongs()
      const exists = likedSongs.find(t => t.id === track.id)
      if (!exists) {
        likedSongs.unshift(track) // Add to beginning
        localStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(likedSongs))
        console.log('✅ Track liked:', track.title)
      }
    } catch (error) {
      console.error('Error liking track:', error)
    }
  }

  unlikeTrack(trackId: string): void {
    try {
      const likedSongs = this.getLikedSongs()
      const filtered = likedSongs.filter(t => t.id !== trackId)
      localStorage.setItem(STORAGE_KEYS.LIKED_SONGS, JSON.stringify(filtered))
      console.log('❌ Track unliked:', trackId)
    } catch (error) {
      console.error('Error unliking track:', error)
    }
  }

  isTrackLiked(trackId: string): boolean {
    const likedSongs = this.getLikedSongs()
    return likedSongs.some(t => t.id === trackId)
  }

  // ============ Playlists ============

  getPlaylists(): Playlist[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PLAYLISTS)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error getting playlists:', error)
      return []
    }
  }

  createPlaylist(name: string, description: string = ''): Playlist {
    try {
      const playlists = this.getPlaylists()
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name,
        description,
        tracks: [],
        coverImage: 'https://via.placeholder.com/300x300?text=' + encodeURIComponent(name),
        createdAt: Date.now()
      }
      playlists.push(newPlaylist)
      localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists))
      console.log('✅ Playlist created:', name)
      return newPlaylist
    } catch (error) {
      console.error('Error creating playlist:', error)
      throw error
    }
  }

  deletePlaylist(playlistId: string): void {
    try {
      const playlists = this.getPlaylists()
      const filtered = playlists.filter(p => p.id !== playlistId)
      localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(filtered))
      console.log('❌ Playlist deleted:', playlistId)
    } catch (error) {
      console.error('Error deleting playlist:', error)
    }
  }

  addTrackToPlaylist(playlistId: string, track: Track): void {
    try {
      const playlists = this.getPlaylists()
      const playlist = playlists.find(p => p.id === playlistId)
      if (playlist) {
        const exists = playlist.tracks.find(t => t.id === track.id)
        if (!exists) {
          playlist.tracks.push(track)
          localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists))
          console.log('✅ Track added to playlist:', track.title, '→', playlist.name)
        }
      }
    } catch (error) {
      console.error('Error adding track to playlist:', error)
    }
  }

  removeTrackFromPlaylist(playlistId: string, trackId: string): void {
    try {
      const playlists = this.getPlaylists()
      const playlist = playlists.find(p => p.id === playlistId)
      if (playlist) {
        playlist.tracks = playlist.tracks.filter(t => t.id !== trackId)
        localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists))
        console.log('❌ Track removed from playlist')
      }
    } catch (error) {
      console.error('Error removing track from playlist:', error)
    }
  }

  // ============ Recently Played ============

  getRecentlyPlayed(): Track[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error getting recently played:', error)
      return []
    }
  }

  addToRecentlyPlayed(track: Track): void {
    try {
      let recentlyPlayed = this.getRecentlyPlayed()
      
      // Remove if already exists
      recentlyPlayed = recentlyPlayed.filter(t => t.id !== track.id)
      
      // Add to beginning
      recentlyPlayed.unshift(track)
      
      // Keep only last 50 tracks
      recentlyPlayed = recentlyPlayed.slice(0, 50)
      
      localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(recentlyPlayed))
    } catch (error) {
      console.error('Error adding to recently played:', error)
    }
  }

  clearRecentlyPlayed(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify([]))
      console.log('✅ Recently played cleared')
    } catch (error) {
      console.error('Error clearing recently played:', error)
    }
  }
}

// Export singleton instance
export const storageService = new StorageService()
