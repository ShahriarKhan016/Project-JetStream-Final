/**
 * Demo Lyrics Service
 * - Shows demo lyrics for all songs
 * - No API calls needed
 */

interface LyricsResult {
  lyrics: string
  source: string
}

export class LyricsService {
  /**
   * Always ready - no setup needed
   */
  isConfigured(): boolean {
    return true
  }

  /**
   * Get demo lyrics (simplified - no API calls)
   */
  async getLyrics(trackTitle: string, artistName: string): Promise<LyricsResult | null> {
    console.log(`Demo lyrics for: ${artistName} - ${trackTitle}`)
    
    return {
      lyrics: `Look at the stars
Look how they shine for you
And everything you do
Yeah, they were all yellow

I came along
I wrote a song for you
And all the things you do
And it was called "Yellow"

So then I took my turn
Oh, what a thing to've done
And it was all yellow

Your skin, oh yeah, your skin and bones
Turn into something beautiful
And you know, you know I love you so
You know I love you so

I swam across
I jumped across for you
Oh, what a thing to do
'Cause you were all yellow

I drew a line
I drew a line for you
Oh, what a thing to do
And it was all yellow

Your skin, oh yeah, your skin and bones
Turn into something beautiful
And you know, for you I'd bleed myself dry
For you I'd bleed myself dry

It's true, look how they shine for you
Look how they shine for you
Look how they shine for
Look how they shine for you
Look how they shine for you
Look how they shine

Look at the stars
Look how they shine for you
And all the things that you do`,
      source: 'demo'
    }
  }

  /**
   * Get lyrics with demo format (simplified method for compatibility)
   */
  async getTranslatedLyrics(trackTitle: string, artistName: string): Promise<{
    originalLyrics: string
    translatedLyrics: string | null
    originalLanguage: string
    copyright: string
  } | null> {
    const result = await this.getLyrics(trackTitle, artistName)
    if (!result) return null

    return {
      originalLyrics: result.lyrics,
      translatedLyrics: null,
      originalLanguage: 'Demo',
      copyright: 'JetStream Demo Mode'
    }
  }

  /**
   * Get attribution text
   */
  getAttribution(): string {
    return 'JetStream Demo Mode'
  }
}

export const lyricsService = new LyricsService()

// Keep old name for compatibility
export const musixmatchService = lyricsService
