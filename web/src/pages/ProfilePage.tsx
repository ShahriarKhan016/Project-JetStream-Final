/**
 * Profile Page - User Profile & Stats with Real localStorage Data
 */

import { motion, AnimatePresence } from 'framer-motion'
import { User, Music, Heart, ListMusic, TrendingUp, Award, Calendar, Edit2, X, Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { storageService, Track } from '../services/storage.service'
import styles from './ProfilePage.module.css'

interface ArtistStats {
  name: string
  plays: number
  image: string
}

function ProfilePage() {
  const [likedSongs, setLikedSongs] = useState<Track[]>([])
  const [playlists, setPlaylists] = useState<any[]>([])
  const [topArtists, setTopArtists] = useState<ArtistStats[]>([])
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  // User profile from localStorage
  const [userProfile, setUserProfile] = useState({
    name: localStorage.getItem('jetstream_user_name') || 'Music Lover',
    username: localStorage.getItem('jetstream_user_username') || '@musicfan',
    avatar: localStorage.getItem('jetstream_user_avatar') || 'https://i.pravatar.cc/300?img=12',
    bio: localStorage.getItem('jetstream_user_bio') || 'Exploring new sounds every day 🎵',
  })
  
  const [editForm, setEditForm] = useState(userProfile)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const liked = storageService.getLikedSongs()
    const playlistsData = storageService.getPlaylists()
    const recent = storageService.getRecentlyPlayed()
    
    setLikedSongs(liked)
    setPlaylists(playlistsData)
    
    // Calculate top artists from recently played
    calculateTopArtists(recent)
  }

  const calculateTopArtists = (tracks: Track[]) => {
    const artistMap = new Map<string, { plays: number; image: string }>()
    
    tracks.forEach(track => {
      const artistName = track.artist
      const existing = artistMap.get(artistName)
      
      if (existing) {
        existing.plays++
      } else {
        artistMap.set(artistName, {
          plays: 1,
          image: track.coverImage
        })
      }
    })
    
    // Convert to array and sort by plays
    const topArtistsArray: ArtistStats[] = Array.from(artistMap.entries())
      .map(([name, data]) => ({
        name,
        plays: data.plays,
        image: data.image
      }))
      .sort((a, b) => b.plays - a.plays)
      .slice(0, 5)
    
    setTopArtists(topArtistsArray)
  }

  const handleSaveProfile = () => {
    localStorage.setItem('jetstream_user_name', editForm.name)
    localStorage.setItem('jetstream_user_username', editForm.username)
    localStorage.setItem('jetstream_user_avatar', editForm.avatar)
    localStorage.setItem('jetstream_user_bio', editForm.bio)
    
    setUserProfile(editForm)
    setIsEditModalOpen(false)
  }

  const getRecentActivity = (): Array<{ action: string; item: string; time: string }> => {
    const activities: Array<{ action: string; item: string; time: string }> = []
    
    // Get last 3 liked songs
    const recentLikes = likedSongs.slice(-3).reverse()
    recentLikes.forEach(track => {
      activities.push({
        action: 'Liked',
        item: track.title,
        time: 'Recently'
      })
    })
    
    // Get last 2 created playlists
    const recentPlaylists = playlists.slice(-2).reverse()
    recentPlaylists.forEach(playlist => {
      activities.push({
        action: 'Created',
        item: playlist.name,
        time: 'Recently'
      })
    })
    
    return activities.slice(0, 5)
  }

  const mockGenres = ['Pop', 'Electronic', 'R&B', 'Indie', 'Rock', 'Hip-Hop']
  const recentActivity = getRecentActivity()

  return (
    <div className={styles.container}>
      {/* Profile Header */}
      <motion.section 
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.headerContent}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <img src={userProfile.avatar} alt={userProfile.name} />
            </div>
            <button 
              className={styles.editButton}
              onClick={() => {
                setEditForm(userProfile)
                setIsEditModalOpen(true)
              }}
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          </div>
          
          <div className={styles.userInfo}>
            <h1 className={styles.name}>{userProfile.name}</h1>
            <p className={styles.username}>{userProfile.username}</p>
            <p className={styles.bio}>{userProfile.bio}</p>
            
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <Music className={styles.statIcon} />
                <div>
                  <div className={styles.statValue}>{likedSongs.length}</div>
                  <div className={styles.statLabel}>Liked Songs</div>
                </div>
              </div>
              <div className={styles.stat}>
                <ListMusic className={styles.statIcon} />
                <div>
                  <div className={styles.statValue}>{playlists.length}</div>
                  <div className={styles.statLabel}>Playlists</div>
                </div>
              </div>
              <div className={styles.stat}>
                <User className={styles.statIcon} />
                <div>
                  <div className={styles.statValue}>{topArtists.length}</div>
                  <div className={styles.statLabel}>Top Artists</div>
                </div>
              </div>
              <div className={styles.stat}>
                <Heart className={styles.statIcon} />
                <div>
                  <div className={styles.statValue}>{recentActivity.length}</div>
                  <div className={styles.statLabel}>Activities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Top Artists */}
        <motion.section 
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className={styles.cardTitle}>
            <TrendingUp size={20} />
            Top Artists
          </h2>
          {topArtists.length > 0 ? (
            <div className={styles.artistList}>
              {topArtists.map((artist, index) => (
                <motion.div
                  key={artist.name}
                  className={styles.artistItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className={styles.artistRank}>{index + 1}</div>
                  <img src={artist.image} alt={artist.name} className={styles.artistImage} />
                  <div className={styles.artistInfo}>
                    <div className={styles.artistName}>{artist.name}</div>
                    <div className={styles.artistPlays}>{artist.plays} plays</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Start listening to see your top artists</p>
            </div>
          )}
        </motion.section>

        {/* Top Genres */}
        <motion.section 
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.cardTitle}>
            <Award size={20} />
            Favorite Genres
          </h2>
          <div className={styles.genreGrid}>
            {mockGenres.slice(0, 4).map((genre, index) => (
              <motion.div
                key={genre}
                className={styles.genreChip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {genre}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Activity */}
        <motion.section 
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.cardTitle}>
            <Calendar size={20} />
            Recent Activity
          </h2>
          {recentActivity.length > 0 ? (
            <div className={styles.activityList}>
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className={styles.activityItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div className={styles.activityDot} />
                  <div className={styles.activityInfo}>
                    <span className={styles.activityAction}>{activity.action}</span>
                    {' '}
                    <span className={styles.activityItem}>{activity.item}</span>
                  </div>
                  <div className={styles.activityTime}>{activity.time}</div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No recent activity yet</p>
            </div>
          )}
        </motion.section>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <>
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
            />
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={styles.modalHeader}>
                <h2>Edit Profile</h2>
                <button 
                  className={styles.modalClose}
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Username</label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    placeholder="@username"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Avatar URL</label>
                  <input
                    type="text"
                    value={editForm.avatar}
                    onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                    rows={3}
                  />
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
                  onClick={handleSaveProfile}
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfilePage
