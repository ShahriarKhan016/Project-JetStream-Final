/**
 * Offline Indicator Component
 * Shows a banner when user loses internet connection
 */

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WifiOff } from 'lucide-react'
import styles from './OfflineIndicator.module.css'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Back online!')
      setIsOnline(true)
    }

    const handleOffline = () => {
      console.log('📴 Connection lost')
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          className={styles.offlineBanner}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className={styles.content}>
            <WifiOff size={20} />
            <span>No internet connection</span>
            <span className={styles.dot}>•</span>
            <span className={styles.subtext}>Some features may be limited</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
