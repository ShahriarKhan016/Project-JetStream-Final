/**
 * Audio Extraction Routes
 * Extracts full-length audio from YouTube (just like Discord bots!)
 */

import { Router, Request, Response } from 'express';
import ytdl from '@distube/ytdl-core';

const router = Router();

/**
 * GET /api/audio/youtube/:videoId
 * Extracts audio stream URL from YouTube video
 * 
 * This works exactly like Discord music bots because it runs server-side!
 */
router.get('/youtube/:videoId', async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;

    console.log(`🎵 Extracting audio for video: ${videoId}`);

    // Validate video ID
    if (!ytdl.validateID(videoId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid YouTube video ID',
      });
    }

    // Get video info (same method Discord bots use)
    const info = await ytdl.getInfo(videoId);

    // Filter for audio-only formats (best quality)
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (audioFormats.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No audio stream found for this video',
      });
    }

    // Get the best quality audio format
    const bestAudio = audioFormats.reduce((prev, current) => {
      return (current.audioBitrate || 0) > (prev.audioBitrate || 0) ? current : prev;
    });

    console.log(`✅ Found audio stream: ${bestAudio.qualityLabel || 'audio'} @ ${bestAudio.audioBitrate}kbps`);

    // Return audio URL (valid for ~6 hours)
    res.json({
      success: true,
      videoId,
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      duration: parseInt(info.videoDetails.lengthSeconds),
      audioUrl: bestAudio.url,
      quality: {
        bitrate: bestAudio.audioBitrate,
        codec: bestAudio.codecs,
        container: bestAudio.container,
      },
      expiresIn: '6 hours', // YouTube URLs expire after ~6 hours
    });

  } catch (error: any) {
    console.error('❌ YouTube audio extraction error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to extract audio from YouTube',
      details: error.message,
    });
  }
});

/**
 * POST /api/audio/search
 * Search for a song and return audio URL
 */
router.post('/search', async (req: Request, res: Response) => {
  try {
    const { query, artist, title } = req.body;

    if (!query && (!artist || !title)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide either "query" or both "artist" and "title"',
      });
    }

    const searchQuery = query || `${artist} ${title} official audio`;

    console.log(`🔍 Searching YouTube for: ${searchQuery}`);

    // Note: ytdl-core doesn't have search, so we'll need play-dl for that
    // For now, return a message to use the YouTube Data API from frontend
    // and call /api/audio/youtube/:videoId with the result

    res.json({
      success: false,
      message: 'Search not implemented in this endpoint. Use YouTube Data API from frontend to get videoId, then call /api/audio/youtube/:videoId',
    });

  } catch (error: any) {
    console.error('❌ Search error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Search failed',
      details: error.message,
    });
  }
});

/**
 * GET /api/audio/health
 * Check if audio extraction is working
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Audio extraction service is running',
    features: [
      'YouTube audio extraction',
      'High-quality audio formats',
      'Discord bot-style extraction',
    ],
  });
});

export default router;
