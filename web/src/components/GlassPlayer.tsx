/**
 * Glassmorphic Player Component - Web Version
 * Bottom music player with frosted glass effect
 */

import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Repeat,
  Shuffle,
} from 'lucide-react'
import styles from './GlassPlayer.module.css'

interface Track {
  id: string
  title: string
  artist: string
  image: string
  duration: number
}

interface GlassPlayerProps {
  track: Track | null
  isPlaying: boolean
  currentTime: number
  volume: number
  isLiked: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onSeek: (time: number) => void
  onVolumeChange: (volume: number) => void
  onLike: () => void
}

function GlassPlayer({
  track,
  isPlaying,
  currentTime,
  volume,
  isLiked,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onLike,
}: GlassPlayerProps) {
  if (!track) return null

  const progress = (currentTime / track.duration) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.player}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={track.duration}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            className={styles.progressInput}
          />
        </div>

        <div className={styles.content}>
          {/* Track Info */}
          <div className={styles.trackInfo}>
            <motion.img
              src={track.image}
              alt={track.title}
              className={styles.albumArt}
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div className={styles.trackDetails}>
              <h4 className={styles.trackTitle}>{track.title}</h4>
              <p className={styles.trackArtist}>{track.artist}</p>
            </div>
            <button
              className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
              onClick={onLike}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <button className={styles.secondaryButton}>
              <Shuffle size={18} />
            </button>
            
            <button className={styles.controlButton} onClick={onPrevious}>
              <SkipBack size={20} />
            </button>

            <motion.button
              className={styles.playButton}
              onClick={onPlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </motion.button>

            <button className={styles.controlButton} onClick={onNext}>
              <SkipForward size={20} />
            </button>

            <button className={styles.secondaryButton}>
              <Repeat size={18} />
            </button>
          </div>

          {/* Volume & Time */}
          <div className={styles.extras}>
            <span className={styles.time}>
              {formatTime(currentTime)} / {formatTime(track.duration)}
            </span>
            
            <div className={styles.volumeControl}>
              <Volume2 size={18} />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className={styles.volumeSlider}
              />
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className={styles.glow} />
      </motion.div>
    </AnimatePresence>
  )
}

export default GlassPlayer
