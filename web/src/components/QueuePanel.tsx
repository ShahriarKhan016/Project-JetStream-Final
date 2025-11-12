/**
 * Queue Panel - Slide drawer showing upcoming tracks
 * Supports drag-and-drop reordering
 */

import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { X, Music, Trash2, Play, GripVertical } from 'lucide-react'
import { usePlayer } from '../contexts/PlayerContext'
import styles from './QueuePanel.module.css'

interface QueuePanelProps {
  isOpen: boolean
  onClose: () => void
}

function QueuePanel({ isOpen, onClose }: QueuePanelProps) {
  const { queue, currentTrack, playTrack, clearQueue, reorderQueue } = usePlayer()

  const handleReorder = (newQueue: any[]) => {
    // Calculate the indices difference
    newQueue.forEach((track, newIndex) => {
      const oldIndex = queue.findIndex(t => t.id === track.id)
      if (oldIndex !== -1 && oldIndex !== newIndex) {
        reorderQueue(oldIndex, newIndex)
      }
    })
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleClearQueue = () => {
    if (window.confirm('Clear all tracks from queue?')) {
      clearQueue()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Music size={20} />
                <h2>Queue</h2>
                <span className={styles.count}>
                  {queue.length} {queue.length === 1 ? 'track' : 'tracks'}
                </span>
              </div>
              <div className={styles.headerActions}>
                {queue.length > 0 && (
                  <button
                    className={styles.clearButton}
                    onClick={handleClearQueue}
                    title="Clear queue"
                  >
                    <Trash2 size={18} />
                    Clear
                  </button>
                )}
                <button
                  className={styles.closeButton}
                  onClick={onClose}
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Now Playing */}
            {currentTrack && (
              <div className={styles.nowPlaying}>
                <div className={styles.nowPlayingLabel}>Now Playing</div>
                <div className={styles.nowPlayingTrack}>
                  <img src={currentTrack.coverImage} alt={currentTrack.title} />
                  <div className={styles.nowPlayingInfo}>
                    <div className={styles.nowPlayingTitle}>{currentTrack.title}</div>
                    <div className={styles.nowPlayingArtist}>{currentTrack.artist}</div>
                  </div>
                  <div className={styles.playingIndicator}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Queue List */}
            <div className={styles.queueList}>
              {queue.length === 0 ? (
                <div className={styles.emptyState}>
                  <Music size={48} />
                  <p>No tracks in queue</p>
                  <span>Add tracks to see them here</span>
                </div>
              ) : (
                <>
                  <div className={styles.upNextLabel}>Up Next • Drag to reorder</div>
                  <Reorder.Group
                    axis="y"
                    values={queue}
                    onReorder={handleReorder}
                    style={{ listStyle: 'none', padding: 0, margin: 0 }}
                  >
                    {queue.map((track, index) => (
                      <Reorder.Item
                        key={`${track.id}-${index}`}
                        value={track}
                        className={styles.queueItem}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        whileDrag={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                      >
                        <div className={styles.dragHandle}>
                          <GripVertical size={16} />
                        </div>
                        <div className={styles.queueNumber}>{index + 1}</div>
                        <img
                          src={track.coverImage}
                          alt={track.title}
                          className={styles.queueImage}
                        />
                        <div className={styles.queueInfo}>
                          <div className={styles.queueTitle}>{track.title}</div>
                          <div className={styles.queueArtist}>{track.artist}</div>
                        </div>
                        <div className={styles.queueDuration}>
                          {formatDuration(track.duration)}
                        </div>
                        <button
                          className={styles.playNowButton}
                          onClick={() => playTrack(track)}
                          title="Play now"
                        >
                          <Play size={14} fill="currentColor" />
                        </button>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default QueuePanel
