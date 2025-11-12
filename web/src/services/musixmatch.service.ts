/**
 * Lyrics Service with Multiple Providers
 * - Lyrics.ovh: Free, no API key, instant
 * - MyMemory Translation: Free, no API key, instant
 * - Fallback support for multiple sources
 */

import { apiCacheService } from './apiCache.service'

interface LyricsResult {
  lyrics: string
  source: string
  language?: string
  translatedLyrics?: string
}

class LyricsService {
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours (lyrics don't change)
  private readonly LYRICS_API = 'https://api.lyrics.ovh/v1'
  private readonly TRANSLATE_API = 'https://api.mymemory.translated.net/get'

  /**
   * Check if service is ready (always true - no API key needed!)
   */
  isConfigured(): boolean {
    return true // No API key required!
  }

  /**
   * Get lyrics from lyrics.ovh (free, no API key needed)
   */
  async getLyrics(trackTitle: string, artistName: string): Promise<LyricsResult | null> {
    // Check cache first
    const cacheKey = `lyrics_${artistName}_${trackTitle}`.toLowerCase()
    const cached = apiCacheService.get<LyricsResult>(cacheKey)
    if (cached) {
      console.log('📦 Using cached lyrics')
      return cached
    }

    try {
      const response = await fetch(
        `${this.LYRICS_API}/${encodeURIComponent(artistName)}/${encodeURIComponent(trackTitle)}`
      )

      if (!response.ok) {
        console.log('❌ Lyrics not found on lyrics.ovh')
        return null
      }

      const data = await response.json()

      if (!data.lyrics) {
        return null
      }

      const result: LyricsResult = {
        lyrics: data.lyrics,
        source: 'lyrics.ovh'
      }

      // Cache for 24 hours
      apiCacheService.set(cacheKey, result, this.CACHE_TTL)
      console.log('✅ Fetched lyrics from lyrics.ovh')

      return result
    } catch (error) {
      console.error('❌ Error fetching lyrics:', error)
      return null
    }
  }

  /**
   * Detect if lyrics are in English
   */
  private detectLanguage(text: string): 'english' | 'other' {
    // Simple heuristic: check for common English words
    const englishWords = ['the', 'is', 'are', 'and', 'you', 'me', 'my', 'love', 'can', 'will']
    const words = text.toLowerCase().split(/\s+/).slice(0, 50) // Check first 50 words
    const englishCount = words.filter(word => englishWords.includes(word)).length
    
    // If more than 10% are common English words, likely English
    return (englishCount / words.length) > 0.1 ? 'english' : 'other'
  }

  /**
   * Translate lyrics to English using MyMemory free API
   */
  private async translateToEnglish(text: string): Promise<string | null> {
    try {
      // Split into chunks (API has character limits)
      const maxChars = 500
      const chunks: string[] = []
      const lines = text.split('\n')
      let currentChunk = ''

      for (const line of lines) {
        if (currentChunk.length + line.length > maxChars) {
          chunks.push(currentChunk)
          currentChunk = line + '\n'
        } else {
          currentChunk += line + '\n'
        }
      }
      if (currentChunk) chunks.push(currentChunk)

      // Translate each chunk
      const translatedChunks = await Promise.all(
        chunks.map(async (chunk) => {
          const params = new URLSearchParams({
            q: chunk,
            langpair: 'auto|en' // Auto-detect source language, translate to English
          })

          const response = await fetch(`${this.TRANSLATE_API}?${params}`)
          const data = await response.json()

          if (data.responseStatus === 200 && data.responseData.translatedText) {
            return data.responseData.translatedText
          }
          return chunk // Fallback to original if translation fails
        })
      )

      return translatedChunks.join('\n')
    } catch (error) {
      console.warn('⚠️ Translation failed, showing original lyrics:', error)
      return null
    }
  }

  /**
   * Get lyrics with optional English translation
   */
  async getTranslatedLyrics(trackTitle: string, artistName: string): Promise<{
    originalLyrics: string
    translatedLyrics: string | null
    originalLanguage: string
    copyright: string
  } | null> {
    // Check translation cache first
    const transCacheKey = `lyrics_translated_${artistName}_${trackTitle}`.toLowerCase()
    const cached = apiCacheService.get<any>(transCacheKey)
    if (cached) {
      console.log('📦 Using cached translated lyrics')
      return cached
    }

    try {
      // Get original lyrics
      const lyricsResult = await this.getLyrics(trackTitle, artistName)
      if (!lyricsResult) {
        return null
      }

      // Detect language
      const language = this.detectLanguage(lyricsResult.lyrics)
      
      let result: any = {
        originalLyrics: lyricsResult.lyrics,
        translatedLyrics: null,
        originalLanguage: language === 'english' ? 'English' : 'Non-English',
        copyright: 'Lyrics provided by lyrics.ovh'
      }

      // If not English, try to translate
      if (language === 'other') {
        console.log('🌐 Translating lyrics to English...')
        const translated = await this.translateToEnglish(lyricsResult.lyrics)
        if (translated) {
          result.translatedLyrics = translated
          console.log('✅ Translation complete')
        }
      }

      // Cache the result
      apiCacheService.set(transCacheKey, result, this.CACHE_TTL)
      return result

    } catch (error) {
      console.error('❌ Error processing lyrics:', error)
      return null
    }
  }

  /**
   * Get attribution text
   */
  getAttribution(): string {
    return 'Lyrics powered by lyrics.ovh & MyMemory Translation'
  }
}

export const lyricsService = new LyricsService()
// Keep old export name for compatibility
export const musixmatchService = lyricsService
