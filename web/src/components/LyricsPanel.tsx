import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Music2, Loader2, AlertCircle } from 'lucide-react'
import { usePlayer } from '../contexts/PlayerContext'
import { lyricsService } from '../services/lyrics.service'
import styles from './LyricsPanel.module.css'

interface LyricsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const LyricsPanel: React.FC<LyricsPanelProps> = ({ isOpen, onClose }) => {
  const { currentTrack } = usePlayer()
  const [lyrics, setLyrics] = useState<string | null>(null)
  const [copyright, setCopyright] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !currentTrack) {
      return
    }

    const fetchLyrics = async () => {
      setLoading(true)
      setError(null)
      setLyrics(null)
      setCopyright('')

      try {
        // Fetch original lyrics only (no translation/romanization)
        const result = await lyricsService.getTranslatedLyrics(
          currentTrack.title,
          currentTrack.artist
        )

        if (!result) {
          throw new Error('Lyrics not found')
        }

        // Just show the original lyrics
        setLyrics(result.originalLyrics)
        setCopyright(result.copyright)

      } catch (err) {
        console.error('Error fetching lyrics:', err)
        setError('Lyrics not available for this track. Try another song!')
      } finally {
        setLoading(false)
      }
    }

    fetchLyrics()
  }, [currentTrack, isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={styles.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <Music2 size={24} />
                <div>
                  <h2>Lyrics</h2>
                  {currentTrack && (
                    <p className={styles.trackInfo}>
                      {currentTrack.title} - {currentTrack.artist}
                    </p>
                  )}

                </div>
              </div>
              <button className={styles.closeButton} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              {loading && (
                <div className={styles.loadingState}>
                  <Loader2 className={styles.spinner} size={48} />
                  <p>Loading lyrics...</p>
                </div>
              )}

              {error && !lyrics && (
                <div className={styles.errorState}>
                  <AlertCircle size={48} />
                  <p>{error}</p>
                  <small>Try playing a different track</small>
                  <button 
                    onClick={async () => {
                      console.log('🧪 Testing with: Coldplay - Yellow');
                      setLoading(true);
                      setError(null);
                      try {
                        const testResult = await lyricsService.getTranslatedLyrics('Yellow', 'Coldplay');
                        if (testResult) {
                          setLyrics(testResult.originalLyrics);
                          setCopyright(testResult.copyright);
                          console.log('✅ Test successful!');
                        } else {
                          setError('Test failed - API might be down');
                        }
                      } catch (err) {
                        console.error('Test error:', err);
                        setError('Test error - check console');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    style={{
                      marginTop: '16px',
                      padding: '8px 16px',
                      background: '#00d9ff',
                      color: '#0a0e27',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Test with "Coldplay - Yellow"
                  </button>
                </div>
              )}

              {lyrics && (
                <motion.div
                  className={styles.lyricsText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {lyrics.split('\n').map((line, index) => (
                    <p
                      key={index}
                      className={
                        line.startsWith('[') && line.endsWith(']')
                          ? styles.lyricSection
                          : line.trim() === ''
                          ? styles.emptyLine
                          : styles.lyricLine
                      }
                    >
                      {line || '\u00A0'}
                    </p>
                  ))}
                  
                  {/* Copyright and attribution */}
                  {copyright && (
                    <div className={styles.attribution}>
                      <small>{copyright}</small>
                      <small>{lyricsService.getAttribution()}</small>
                    </div>
                  )}
                </motion.div>
              )}

              {!currentTrack && !loading && (
                <div className={styles.emptyState}>
                  <Music2 size={64} strokeWidth={1} />
                  <p>No track playing</p>
                  <small>Play a song to see its lyrics</small>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
