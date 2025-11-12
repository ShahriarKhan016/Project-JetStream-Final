/**
 * Music Card Component - Web Version
 * Futuristic music track card with 3D tilt and play button
 */

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Play, Heart } from 'lucide-react'
import { useState, MouseEvent } from 'react'
import styles from './MusicCard.module.css'

interface MusicCardProps {
  title: string
  artist: string
  image: string
  duration?: string
  onPlay?: () => void
  onLike?: () => void
  isLiked?: boolean
  delay?: number
}

function MusicCard({
  title,
  artist,
  image,
  duration,
  onPlay,
  onLike,
  isLiked = false,
  delay = 0,
}: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return

    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.68, -0.55, 0.265, 1.55],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <div className={`${styles.overlay} ${isHovered ? styles.overlayVisible : ''}`}>
          <motion.button
            className={styles.playButton}
            onClick={onPlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Play size={24} fill="currentColor" />
          </motion.button>
        </div>
        <button
          className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
          onClick={onLike}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        {duration && <span className={styles.duration}>{duration}</span>}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artist}>{artist}</p>
      </div>

      {/* Glow effect */}
      <div className={`${styles.glow} ${isHovered ? styles.glowActive : ''}`} />
    </motion.div>
  )
}

export default MusicCard
