/**
 * Playback Speed Control Component
 * Dropdown selector for 0.5x - 2x speed
 */

import { useState, useRef, useEffect } from 'react'
import { Gauge } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PlaybackSpeedControl.module.css'

interface PlaybackSpeedControlProps {
  currentSpeed: number
  onSpeedChange: (speed: number) => void
}

const speedOptions = [
  { value: 0.25, label: '0.25x' },
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1.0, label: 'Normal' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 1.75, label: '1.75x' },
  { value: 2.0, label: '2x' },
]

function PlaybackSpeedControl({ currentSpeed, onSpeedChange }: PlaybackSpeedControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const currentOption = speedOptions.find(opt => opt.value === currentSpeed) || speedOptions[3]

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={`${styles.button} ${currentSpeed !== 1.0 ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Playback speed"
      >
        <Gauge size={18} />
        <span className={styles.buttonLabel}>{currentOption.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className={styles.dropdownHeader}>Playback Speed</div>
            <div className={styles.options}>
              {speedOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.option} ${currentSpeed === option.value ? styles.optionActive : ''}`}
                  onClick={() => {
                    onSpeedChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  <span className={styles.optionLabel}>{option.label}</span>
                  {currentSpeed === option.value && (
                    <motion.div
                      className={styles.checkmark}
                      layoutId="activeSpeed"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PlaybackSpeedControl
