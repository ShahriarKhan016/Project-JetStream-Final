/**
 * Animated Card Component - Web Version
 * Futuristic card with hover effects, glow, and animations
 */

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'
import styles from './AnimatedCard.module.css'

interface AnimatedCardProps {
  children: ReactNode
  variant?: 'default' | 'glow' | 'glass' | 'neon'
  hoverable?: boolean
  delay?: number
  onClick?: () => void
  className?: string
}

function AnimatedCard({
  children,
  variant = 'default',
  hoverable = true,
  delay = 0,
  onClick,
  className = '',
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`${styles.card} ${styles[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={
        hoverable
          ? {
              y: -8,
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {variant === 'glow' && isHovered && <div className={styles.glowEffect} />}
      <div className={styles.content}>{children}</div>
    </motion.div>
  )
}

export default AnimatedCard
