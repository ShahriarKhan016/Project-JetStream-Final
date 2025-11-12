/**
 * Playlist Detail Page - Display and manage playlist tracks
 */

import { motion, Reorder } from 'framer-motion'
import { Play, Clock, Trash2, Edit2, Music, ArrowLeft, GripVertical, Share2, Copy } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { storageService, Playlist, Track } from '../services/storage.service'
import { usePlayer } from '../contexts/PlayerContext'
import styles from './PlaylistDetailPage.module.css'

function PlaylistDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { playTrack, addToQueue, clearQueue, currentTrack } = usePlayer()
  
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', description: '', coverImage: '' })
  const [shareTooltip, setShareTooltip] = useState(false)
  const [coverPreview, setCoverPreview] = useState<string>('')

  useEffect(() => {
    loadPlaylist()
  }, [id])

  const loadPlaylist = () => {
    if (!id) return
    const playlists = storageService.getPlaylists()
    const found = playlists.find(p => p.id === id)
    if (found) {
      setPlaylist(found)
      setEditForm({ 
        name: found.name, 
        description: found.description,
        coverImage: found.coverImage || ''
      })
      setCoverPreview(found.coverImage || '')
    }
  }

  const handlePlayAll = () => {
    if (!playlist || playlist.tracks.length === 0) return
    clearQueue()
    playTrack(playlist.tracks[0])
    // Add remaining tracks to queue
    playlist.tracks.slice(1).forEach(track => addToQueue(track))
  }

  const handlePlayTrack = (track: Track, index: number) => {
    clearQueue()
    playTrack(track)
    // Add remaining tracks from this position to queue
    const remainingTracks = playlist!.tracks.slice(index + 1)
    remainingTracks.forEach(t => addToQueue(t))
  }

  const handleRemoveTrack = (trackId: string) => {
    if (!playlist || !id) return
    
    if (window.confirm('Remove this track from the playlist?')) {
      storageService.removeTrackFromPlaylist(id, trackId)
      loadPlaylist()
    }
  }

  const handleSaveEdit = () => {
    if (!playlist || !id) return
    
    // Update playlist in storage
    const playlists = storageService.getPlaylists()
    const updatedPlaylists = playlists.map(p => 
      p.id === id 
        ? { 
            ...p, 
            name: editForm.name, 
            description: editForm.description,
            coverImage: coverPreview 
          }
        : p
    )
    
    localStorage.setItem('jetstream_playlists', JSON.stringify(updatedPlaylists))
    setIsEditModalOpen(false)
    loadPlaylist()
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setCoverPreview(url)
    setEditForm({ ...editForm, coverImage: url })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setCoverPreview(base64)
        setEditForm({ ...editForm, coverImage: base64 })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReorderTracks = (newOrder: Track[]) => {
    if (!playlist || !id) return
    
    // Update playlist tracks order in storage
    const playlists = storageService.getPlaylists()
    const updatedPlaylists = playlists.map(p => 
      p.id === id ? { ...p, tracks: newOrder } : p
    )
    
    localStorage.setItem('jetstream_playlists', JSON.stringify(updatedPlaylists))
    setPlaylist({ ...playlist, tracks: newOrder })
  }

  const handleSharePlaylist = async () => {
    if (!playlist) return
    
    const shareUrl = `${window.location.origin}/playlist/${playlist.id}`
    
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareTooltip(true)
      setTimeout(() => setShareTooltip(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDuplicatePlaylist = () => {
    if (!playlist) return
    
    const newPlaylist: Playlist = {
      id: `playlist_${Date.now()}`,
      name: `${playlist.name} (Copy)`,
      description: playlist.description,
      coverImage: playlist.coverImage,
      tracks: [...playlist.tracks],
      createdAt: Date.now()
    }
    
    const playlists = storageService.getPlaylists()
    playlists.push(newPlaylist)
    localStorage.setItem('jetstream_playlists', JSON.stringify(playlists))
    
    navigate(`/playlist/${newPlaylist.id}`)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTotalDuration = () => {
    if (!playlist) return '0:00'
    const total = playlist.tracks.reduce((sum, track) => sum + track.duration, 0)
    const hours = Math.floor(total / 3600)
    const mins = Math.floor((total % 3600) / 60)
    return hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`
  }

  if (!playlist) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <Music size={64} />
          <h2>Playlist Not Found</h2>
          <button onClick={() => navigate('/library')} className={styles.backButton}>
            Go to Library
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button onClick={() => navigate('/library')} className={styles.backBtn}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div className={styles.headerContent}>
          <div className={styles.coverArt}>
            {playlist.coverImage ? (
              <img src={playlist.coverImage} alt={playlist.name} />
            ) : (
              <div className={styles.placeholderCover}>
                <Music size={64} />
              </div>
            )}
          </div>

          <div className={styles.playlistInfo}>
            <span className={styles.label}>PLAYLIST</span>
            <h1 className={styles.title}>{playlist.name}</h1>
            {playlist.description && (
              <p className={styles.description}>{playlist.description}</p>
            )}
            <div className={styles.meta}>
              <span>{playlist.tracks.length} tracks</span>
              <span>•</span>
              <span>{getTotalDuration()}</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <motion.button
            className={styles.playAllButton}
            onClick={handlePlayAll}
            disabled={playlist.tracks.length === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={20} fill="currentColor" />
            Play All
          </motion.button>

          <button 
            className={styles.editButton}
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit2 size={18} />
            Edit
          </button>

          <div className={styles.shareButtonWrapper}>
            <button 
              className={styles.shareButton}
              onClick={handleSharePlaylist}
              title="Share playlist"
            >
              <Share2 size={18} />
              Share
            </button>
            {shareTooltip && (
              <div className={styles.shareTooltip}>
                Link copied!
              </div>
            )}
          </div>

          <button 
            className={styles.duplicateButton}
            onClick={handleDuplicatePlaylist}
            title="Duplicate playlist"
          >
            <Copy size={18} />
            Duplicate
          </button>
        </div>
      </motion.div>

      {/* Track List */}
      {playlist.tracks.length > 0 ? (
        <motion.div
          className={styles.trackList}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.trackListHeader}>
            <div className={styles.headerCol}></div>
            <div className={styles.headerCol}>#</div>
            <div className={styles.headerCol}>Title</div>
            <div className={styles.headerCol}>Album</div>
            <div className={styles.headerCol}>
              <Clock size={16} />
            </div>
            <div className={styles.headerCol}></div>
          </div>

          <Reorder.Group axis="y" values={playlist.tracks} onReorder={handleReorderTracks}>
            {playlist.tracks.map((track, index) => (
              <Reorder.Item key={track.id} value={track}>
                <motion.div
                  className={`${styles.trackItem} ${currentTrack?.id === track.id ? styles.playing : ''}`}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className={styles.dragHandle}>
                    <GripVertical size={16} />
                  </div>

                  <div className={styles.trackNumber}>
                    {currentTrack?.id === track.id ? (
                      <div className={styles.playingIndicator}>♪</div>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                    <button
                      className={styles.trackPlayButton}
                      onClick={() => handlePlayTrack(track, index)}
                    >
                      <Play size={14} fill="currentColor" />
                    </button>
                  </div>

                  <div className={styles.trackInfo}>
                    <img src={track.coverImage} alt={track.title} />
                    <div>
                      <div className={styles.trackTitle}>{track.title}</div>
                      <div className={styles.trackArtist}>{track.artist}</div>
                    </div>
                  </div>

                  <div className={styles.trackAlbum}>{track.albumTitle}</div>

                  <div className={styles.trackDuration}>
                    {formatDuration(track.duration)}
                  </div>

                  <div className={styles.trackActions}>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveTrack(track.id)}
                      title="Remove from playlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </motion.div>
      ) : (
        <div className={styles.emptyState}>
          <Music size={64} />
          <h3>No tracks in this playlist</h3>
          <p>Start adding tracks to build your collection</p>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <>
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsEditModalOpen(false)}
          />
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className={styles.modalHeader}>
              <h2>Edit Playlist</h2>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Playlist name"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Add a description"
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Cover Image</label>
                <input
                  type="text"
                  value={editForm.coverImage}
                  onChange={handleCoverImageChange}
                  placeholder="Enter image URL"
                />
                <div className={styles.orDivider}>
                  <span>or</span>
                </div>
                <label htmlFor="file-upload" className={styles.fileUploadLabel}>
                  Choose File
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {coverPreview && (
                  <div className={styles.coverPreview}>
                    <img src={coverPreview} alt="Cover preview" />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className={styles.saveButton}
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export default PlaylistDetailPage
