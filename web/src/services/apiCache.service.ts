/**
 * API Cache Service
 * Caches Deezer API responses in localStorage to reduce API calls
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}

class ApiCacheService {
  private readonly CACHE_PREFIX = 'jetstream_api_cache_'
  private readonly DEFAULT_TTL = 30 * 60 * 1000 // 30 minutes

  /**
   * Get cached data if available and not expired
   */
  get<T>(key: string): T | null {
    try {
      const cacheKey = this.CACHE_PREFIX + key
      const cached = localStorage.getItem(cacheKey)
      
      if (!cached) return null

      const entry: CacheEntry<T> = JSON.parse(cached)
      
      // Check if expired
      if (Date.now() > entry.expiresAt) {
        this.delete(key)
        return null
      }

      console.log(`📦 Cache hit: ${key}`)
      return entry.data
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  /**
   * Set cache with optional TTL (time to live in milliseconds)
   */
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    try {
      const cacheKey = this.CACHE_PREFIX + key
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + ttl
      }

      localStorage.setItem(cacheKey, JSON.stringify(entry))
      console.log(`💾 Cached: ${key} (TTL: ${ttl / 1000}s)`)
    } catch (error) {
      console.error('Cache set error:', error)
      // If localStorage is full, clear old cache entries
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        this.clearExpired()
      }
    }
  }

  /**
   * Delete specific cache entry
   */
  delete(key: string): void {
    const cacheKey = this.CACHE_PREFIX + key
    localStorage.removeItem(cacheKey)
  }

  /**
   * Clear all expired cache entries
   */
  clearExpired(): void {
    try {
      const keys = Object.keys(localStorage)
      const cacheKeys = keys.filter(k => k.startsWith(this.CACHE_PREFIX))
      
      let cleared = 0
      cacheKeys.forEach(cacheKey => {
        try {
          const cached = localStorage.getItem(cacheKey)
          if (!cached) return

          const entry: CacheEntry<unknown> = JSON.parse(cached)
          if (Date.now() > entry.expiresAt) {
            localStorage.removeItem(cacheKey)
            cleared++
          }
        } catch (error) {
          // Invalid entry, remove it
          localStorage.removeItem(cacheKey)
          cleared++
        }
      })

      if (cleared > 0) {
        console.log(`🧹 Cleared ${cleared} expired cache entries`)
      }
    } catch (error) {
      console.error('Clear expired error:', error)
    }
  }

  /**
   * Clear all API cache
   */
  clearAll(): void {
    try {
      const keys = Object.keys(localStorage)
      const cacheKeys = keys.filter(k => k.startsWith(this.CACHE_PREFIX))
      
      cacheKeys.forEach(key => localStorage.removeItem(key))
      console.log(`🧹 Cleared all API cache (${cacheKeys.length} entries)`)
    } catch (error) {
      console.error('Clear all error:', error)
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): { count: number; size: number } {
    try {
      const keys = Object.keys(localStorage)
      const cacheKeys = keys.filter(k => k.startsWith(this.CACHE_PREFIX))
      
      let totalSize = 0
      cacheKeys.forEach(key => {
        const value = localStorage.getItem(key)
        if (value) {
          totalSize += value.length * 2 // Approximate size in bytes (UTF-16)
        }
      })

      return {
        count: cacheKeys.length,
        size: totalSize
      }
    } catch (error) {
      console.error('Get stats error:', error)
      return { count: 0, size: 0 }
    }
  }
}

export const apiCacheService = new ApiCacheService()

// Auto-clear expired entries on page load
apiCacheService.clearExpired()
