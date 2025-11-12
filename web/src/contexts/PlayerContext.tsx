import React, { createContext, useContext, useState, useRef, useCallback } from 'react'
import { storageService } from '../services/storage.service'

interface Track {
  id: string
  title: string
  artist: string
  albumTitle: string
  coverImage: string
  duration: number
  audioUrl: string
}

interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  volume: number
  queue: Track[]
  shuffle: boolean
  repeat: 'off' | 'one' | 'all'
  playbackSpeed: number
  playTrack: (track: Track) => void
  playPause: () => void
  skipNext: () => void
  skipPrevious: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  addToQueue: (track: Track) => void
  clearQueue: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  reorderQueue: (startIndex: number, endIndex: number) => void
  setPlaybackSpeed: (speed: number) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider')
  }
  return context
}

interface PlayerProviderProps {
  children: React.ReactNode
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  const [queue, setQueue] = useState<Track[]>([])
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<'off' | 'one' | 'all'>('off')
  const [playbackSpeed, setPlaybackSpeedState] = useState(1.0)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number>()

  // Initialize audio element
  if (!audioRef.current) {
    audioRef.current = new Audio()
    audioRef.current.volume = volume
    audioRef.current.playbackRate = playbackSpeed
  }

  // Update progress
  const updateProgress = useCallback(() => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const duration = audioRef.current.duration
      if (duration > 0) {
        setProgress((current / duration) * 100)
      }
    }
    animationRef.current = requestAnimationFrame(updateProgress)
  }, [])

  // Play a track
  const playTrack = useCallback((track: Track) => {
    if (audioRef.current) {
      // Set current track immediately for UI feedback
      setCurrentTrack(track)
      setIsPlaying(true)
      
      // Using Deezer 30s previews (reliable and simple)
      console.log('🎵 Playing track:', track.title, '-', track.artist, '(30s preview)')
      
      // Play the track with Deezer preview URL
      audioRef.current.src = track.audioUrl
      audioRef.current.load()
      audioRef.current.play()
        .then(() => {
          setCurrentTrack(track)
          setIsPlaying(true)
          animationRef.current = requestAnimationFrame(updateProgress)
          // Add to recently played
          storageService.addToRecentlyPlayed(track)
        })
        .catch((error) => {
          console.error('Error playing track:', error)
          setIsPlaying(false)
        })
    }
  }, [updateProgress])

  // Play/Pause toggle
  const playPause = useCallback(() => {
    if (!audioRef.current || !currentTrack) return

    if (isPlaying) {
      audioRef.current.pause()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          animationRef.current = requestAnimationFrame(updateProgress)
        })
        .catch((error) => {
          console.error('Error playing:', error)
        })
    }
  }, [isPlaying, currentTrack, updateProgress])

  // Skip to next track
  const skipNext = useCallback(() => {
    if (queue.length === 0) return
    const nextTrack = queue[0]
    setQueue(queue.slice(1))
    playTrack(nextTrack)
  }, [queue, playTrack])

  // Skip to previous track
  const skipPrevious = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0
    } else {
      // In a real app, you'd track history and go back
      if (audioRef.current) {
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  // Seek to specific time
  const seek = useCallback((time: number) => {
    if (audioRef.current && currentTrack) {
      audioRef.current.currentTime = (time / 100) * audioRef.current.duration
      setProgress(time)
    }
  }, [currentTrack])

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolumeState(newVolume)
    }
  }, [])

  // Add track to queue
  const addToQueue = useCallback((track: Track) => {
    setQueue((prev) => [...prev, track])
  }, [])

  // Clear queue
  const clearQueue = useCallback(() => {
    setQueue([])
  }, [])

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => !prev)
  }, [])

  // Toggle repeat (off -> one -> all -> off)
  const toggleRepeat = useCallback(() => {
    setRepeat((prev) => {
      if (prev === 'off') return 'one'
      if (prev === 'one') return 'all'
      return 'off'
    })
  }, [])

  // Reorder queue items
  const reorderQueue = useCallback((startIndex: number, endIndex: number) => {
    setQueue((prev) => {
      const result = Array.from(prev)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    })
  }, [])

  // Set playback speed
  const setPlaybackSpeed = useCallback((speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
      setPlaybackSpeedState(speed)
    }
  }, [])

  // Handle track end
  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      if (queue.length > 0) {
        skipNext()
      } else {
        setIsPlaying(false)
        setProgress(0)
      }
    }

    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('ended', handleEnded)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [queue, skipNext])

  const value: PlayerContextType = {
    currentTrack,
    isPlaying,
    progress,
    volume,
    queue,
    shuffle,
    repeat,
    playbackSpeed,
    playTrack,
    playPause,
    skipNext,
    skipPrevious,
    seek,
    setVolume,
    addToQueue,
    toggleShuffle,
    toggleRepeat,
    clearQueue,
    reorderQueue,
    setPlaybackSpeed,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
