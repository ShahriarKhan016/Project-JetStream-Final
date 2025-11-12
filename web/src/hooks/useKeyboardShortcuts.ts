/**
 * Keyboard Shortcuts Hook
 * Global keyboard shortcuts for player control
 */

import { useEffect } from 'react'
import { usePlayer } from '../contexts/PlayerContext'

export const useKeyboardShortcuts = () => {
  const {
    playPause,
    skipNext,
    skipPrevious,
    seek,
    setVolume,
    volume,
    toggleShuffle,
    toggleRepeat,
    currentTrack,
  } = usePlayer()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = event.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return
      }

      // Prevent default for specific keys
      const preventDefaultKeys = ['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
      if (preventDefaultKeys.includes(event.code)) {
        event.preventDefault()
      }

      switch (event.code) {
        case 'Space':
          // Play/Pause
          playPause()
          break

        case 'ArrowLeft':
          // Seek backward 5 seconds (or 10 with Shift)
          if (currentTrack) {
            const seekAmount = event.shiftKey ? 10 : 5
            // Calculate percentage to seek back
            const currentProgress = (currentTrack.duration * seekAmount) / currentTrack.duration
            seek(Math.max(0, currentProgress * 100))
          }
          break

        case 'ArrowRight':
          // Seek forward 5 seconds (or 10 with Shift)
          if (currentTrack) {
            const seekAmount = event.shiftKey ? 10 : 5
            const currentProgress = (seekAmount / currentTrack.duration)
            seek(Math.min(100, currentProgress * 100))
          }
          break

        case 'ArrowUp':
          // Volume up
          setVolume(Math.min(1, volume + 0.1))
          break

        case 'ArrowDown':
          // Volume down
          setVolume(Math.max(0, volume - 0.1))
          break

        case 'KeyN':
          // Next track
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            skipNext()
          }
          break

        case 'KeyP':
          // Previous track
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            skipPrevious()
          }
          break

        case 'KeyS':
          // Toggle shuffle
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            toggleShuffle()
          }
          break

        case 'KeyR':
          // Toggle repeat
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            toggleRepeat()
          }
          break

        case 'KeyM':
          // Mute/unmute
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            setVolume(volume === 0 ? 0.7 : 0)
          }
          break

        case 'Digit0':
        case 'Digit1':
        case 'Digit2':
        case 'Digit3':
        case 'Digit4':
        case 'Digit5':
        case 'Digit6':
        case 'Digit7':
        case 'Digit8':
        case 'Digit9':
          // Seek to percentage (0-9 -> 0%-90%)
          if (currentTrack) {
            const digit = parseInt(event.code.replace('Digit', ''))
            seek(digit * 10)
          }
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [
    playPause,
    skipNext,
    skipPrevious,
    seek,
    setVolume,
    volume,
    toggleShuffle,
    toggleRepeat,
    currentTrack,
  ])
}

export const keyboardShortcuts = [
  { key: 'Space', description: 'Play / Pause' },
  { key: '←', description: 'Seek backward 5s' },
  { key: '→', description: 'Seek forward 5s' },
  { key: 'Shift + ←', description: 'Seek backward 10s' },
  { key: 'Shift + →', description: 'Seek forward 10s' },
  { key: '↑', description: 'Volume up' },
  { key: '↓', description: 'Volume down' },
  { key: 'Ctrl/Cmd + N', description: 'Next track' },
  { key: 'Ctrl/Cmd + P', description: 'Previous track' },
  { key: 'Ctrl/Cmd + S', description: 'Toggle shuffle' },
  { key: 'Ctrl/Cmd + R', description: 'Toggle repeat' },
  { key: 'Ctrl/Cmd + M', description: 'Mute / Unmute' },
  { key: '0-9', description: 'Seek to 0%-90%' },
  { key: '?', description: 'Show keyboard shortcuts' },
]
