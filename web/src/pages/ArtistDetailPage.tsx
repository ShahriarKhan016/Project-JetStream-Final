import { motion } from 'framer-motion'
import { Play, UserCheck, Share2, MoreHorizontal, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { deezerService } from '../services/deezer.service'
import { usePlayer } from '../contexts/PlayerContext'
import AddToPlaylistModal from '../components/AddToPlaylistModal'
import styles from './ArtistDetailPage.module.css'

interface Artist {
  id: string
  name: string
  coverImage: string
  followers: string
  verified: boolean
}

function ArtistDetailPage() {
  const { id } = useParams()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [topTracks, setTopTracks] = useState<any[]>([])
  const [discography, setDiscography] = useState<any[]>([])
  const [similarArtists, setSimilarArtists] = useState<any[]>([])
  const [following, setFollowing] = useState(false)
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<any>(null)
  const { playTrack } = usePlayer()

  const handleAddToPlaylist = (track: any, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTrack({
      id: track.id.toString(),
      title: track.title,
      artist: track.artist.name,
      albumTitle: track.album.title,
      coverImage: track.album.cover_medium,
      duration: track.duration,
      audioUrl: track.preview
    })
    setIsAddToPlaylistOpen(true)
  }

  useEffect(() => {
    const fetchArtistData = async () => {
      if (!id) return

      try {
        const [artistData, tracks, albums, related] = await Promise.all([
          deezerService.getArtist(parseInt(id)),
          deezerService.getArtistTopTracks(parseInt(id), 5),
          deezerService.getArtistAlbums(parseInt(id), 6),
          deezerService.getRelatedArtists(parseInt(id))
        ])

        if (artistData) {
          const formattedArtist: Artist = {
            id: artistData.id.toString(),
            name: artistData.name,
            coverImage: artistData.picture_xl || artistData.picture_medium,
            followers: `${(artistData.nb_fan / 1000000).toFixed(1)}M`,
            verified: artistData.nb_fan > 100000
          }
          setArtist(formattedArtist)
        }

        setTopTracks(tracks)
        setDiscography(albums)
        setSimilarArtists(related.slice(0, 4))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching artist:', error)
        setLoading(false)
      }
    }

    fetchArtistData()
  }, [id])

  const handlePlayTrack = (track: any) => {
    playTrack({
      id: track.id.toString(),
      title: track.title,
      artist: track.artist.name,
      albumTitle: track.album.title,
      coverImage: track.album.cover_medium,
      duration: track.duration,
      audioUrl: track.preview
    })
  }

  const handlePlayAll = () => {
    if (topTracks.length > 0) {
      // Play first top track
      handlePlayTrack(topTracks[0])
      
      // In future, add rest to queue
      // const allTracks = topTracks.map(track => ({
      //   id: track.id.toString(),
      //   title: track.title,
      //   artist: track.artist.name,
      //   albumTitle: track.album.title,
      //   coverImage: track.album.cover_medium,
      //   duration: track.duration,
      //   audioUrl: track.preview
      // }))
      // addToQueue(allTracks.slice(1))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading || !artist) {
    return (
      <div className={styles.container}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 style={{ color: '#fff', padding: '2rem' }}>Loading artist...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <motion.div className={styles.header} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className={styles.headerBackground} style={{ backgroundImage: `url(${artist.coverImage})` }} />
        <div className={styles.headerContent}>
          {artist.verified && (
            <motion.div className={styles.verified} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <UserCheck size={20} />
              <span>Verified Artist</span>
            </motion.div>
          )}
          <motion.h1 className={styles.artistName} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {artist.name}
          </motion.h1>
          <motion.div className={styles.followers} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {artist.followers} fans
          </motion.div>
        </div>
      </motion.div>

      <motion.div className={styles.controls} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <button className={styles.playButton} onClick={handlePlayAll}>
          <Play size={28} fill="currentColor" />
        </button>
        <button className={`${styles.followButton} ${following ? styles.following : ''}`} onClick={() => setFollowing(!following)}>
          {following ? 'Following' : 'Follow'}
        </button>
        <button className={styles.iconButton}>
          <Share2 size={24} />
        </button>
        <button className={styles.iconButton}>
          <MoreHorizontal size={24} />
        </button>
      </motion.div>

      <motion.section className={styles.topTracksSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h2>Popular</h2>
        <div className={styles.trackList}>
          {topTracks.map((track: any, index: number) => (
            <motion.div
              key={track.id}
              className={styles.trackRow}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              onHoverStart={() => setHoveredTrack(track.id.toString())}
              onHoverEnd={() => setHoveredTrack(null)}
              onClick={() => handlePlayTrack(track)}
            >
              <div className={styles.trackNumber}>
                {hoveredTrack === track.id.toString() ? (
                  <Play size={16} fill="currentColor" className={styles.playIcon} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className={styles.trackInfo}>
                <div className={styles.trackTitle}>{track.title}</div>
                <Link to={`/album/${track.album.id}`} className={styles.trackAlbum}>{track.album.title}</Link>
              </div>
              <div className={styles.trackPlays}>{(track.rank / 1000).toFixed(0)}K plays</div>
              <div className={styles.trackDuration}>{formatTime(track.duration)}</div>
              <button
                className={styles.addToPlaylistButton}
                onClick={(e) => handleAddToPlaylist(track, e)}
                title="Add to playlist"
              >
                <Plus size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className={styles.bioSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <h2>About</h2>
        <div className={styles.bioContent}>
          <div className={styles.bioImage}>
            <img src={artist.coverImage} alt={artist.name} />
          </div>
          <div className={styles.bioText}>
            <p>{artist.name} is one of the most popular artists on Deezer with millions of fans worldwide. Explore their top tracks, albums, and discover similar artists you might like.</p>
            <div className={styles.bioStats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>{artist.followers}</div>
                <div className={styles.statLabel}>Fans</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className={styles.discographySection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <div className={styles.sectionHeader}>
          <h2>Discography</h2>
          <Link to={`/artist/${id}/discography`} className={styles.seeAll}>See all</Link>
        </div>
        <div className={styles.discographyGrid}>
          {discography.map((album: any) => (
            <Link key={album.id} to={`/album/${album.id}`} className={styles.albumCard}>
              <div className={styles.albumImage}>
                <img src={album.cover_medium} alt={album.title} />
                <div className={styles.albumPlay}>
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
              <div className={styles.albumTitle}>{album.title}</div>
              <div className={styles.albumYear}>{new Date(album.release_date).getFullYear()}</div>
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section className={styles.similarSection} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
        <h2>Fans also like</h2>
        <div className={styles.similarGrid}>
          {similarArtists.map((similarArtist: any) => (
            <Link key={similarArtist.id} to={`/artist/${similarArtist.id}`} className={styles.artistCard}>
              <div className={styles.artistImage}>
                <img src={similarArtist.picture_medium} alt={similarArtist.name} />
                <div className={styles.artistPlay}>
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
              <div className={styles.artistName}>{similarArtist.name}</div>
              <div className={styles.artistType}>Artist</div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Add to Playlist Modal */}
      {selectedTrack && (
        <AddToPlaylistModal
          isOpen={isAddToPlaylistOpen}
          onClose={() => setIsAddToPlaylistOpen(false)}
          track={selectedTrack}
        />
      )}
    </div>
  )
}

export default ArtistDetailPage
