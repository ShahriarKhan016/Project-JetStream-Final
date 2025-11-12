/**
 * Sidebar Navigation Component
 */

import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1 className={styles.logoText}>🎵 JetStream</h1>
      </div>
      
      <nav className={styles.nav}>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.icon}>🏠</span>
          Home
        </NavLink>
        
        <NavLink 
          to="/search" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.icon}>🔍</span>
          Search
        </NavLink>
        
        <NavLink 
          to="/hits" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.icon}>🔥</span>
          Hits
        </NavLink>
        
        <NavLink 
          to="/library" 
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.active : ''}`
          }
        >
          <span className={styles.icon}>📚</span>
          Your Library
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
