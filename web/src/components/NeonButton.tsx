/**
 * Neon Button Component - Web Version
 * Glowing animated button with multiple variants
 */

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import styles from './NeonButton.module.css'

interface NeonButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

function NeonButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
}: NeonButtonProps) {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ''
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <span className={styles.content}>
        {icon && iconPosition === 'left' && (
          <span className={styles.icon}>{icon}</span>
        )}
        <span className={styles.text}>{children}</span>
        {icon && iconPosition === 'right' && (
          <span className={styles.icon}>{icon}</span>
        )}
      </span>
      <span className={styles.glow} />
    </motion.button>
  )
}

export default NeonButton
