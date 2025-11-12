/**
 * Simple Audio Extraction Server (Pure JS - No TypeScript!)
 * Works exactly like Discord bots - extracts full YouTube audio
 * Uses play-dl for better compatibility
 */

const express = require('express');
const cors = require('cors');
const play = require('play-dl');

const app = express();
const PORT = 5000;

// Initialize play-dl
(async () => {
  try {
    // This ensures play-dl can parse YouTube properly
    await play.getFreeClientID();
    console.log('✅ play-dl initialized successfully');
  } catch (error) {
    console.log('⚠️ Using play-dl without client ID (may have rate limits)');
  }
})();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'JetStream Audio API is running',
    timestamp: new Date().toISOString(),
  });
});

// Audio extraction endpoint (Discord bot style!)
app.get('/api/audio/youtube/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    console.log(`🎵 Extracting audio for video: ${videoId}`);

    // Validate YouTube URL
    const validate = await play.validate(url);
    
    if (!validate || validate !== 'yt_video') {
      return res.status(400).json({
        success: false,
        error: 'Invalid YouTube video ID',
      });
    }

    // Get video info (same method Discord bots use)
    const info = await play.video_info(url);

    // Get best audio format
    const audioFormats = info.format.filter(f => f.mimeType?.includes('audio'));
    
    if (audioFormats.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No audio stream found for this video',
      });
    }

    // Get the best quality audio
    const bestAudio = audioFormats.reduce((prev, current) => {
      const prevBitrate = parseInt(prev.bitrate) || 0;
      const currentBitrate = parseInt(current.bitrate) || 0;
      return currentBitrate > prevBitrate ? current : prev;
    });

    console.log(`✅ Found audio stream: ${info.video_details.title}`);

    // Return audio URL (valid for ~6 hours)
    res.json({
      success: true,
      videoId,
      title: info.video_details.title,
      author: info.video_details.channel?.name || 'Unknown',
      duration: info.video_details.durationInSec,
      audioUrl: bestAudio.url,
      quality: {
        bitrate: bestAudio.bitrate,
        codec: bestAudio.mimeType,
      },
      expiresIn: '6 hours',
    });

  } catch (error) {
    console.error('❌ YouTube audio extraction error:', error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to extract audio from YouTube',
      details: error.message,
    });
  }
});

// Audio health check
app.get('/api/audio/health', (req, res) => {
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

// STREAM audio through backend (Discord bot method!)
app.get('/api/audio/stream/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    console.log(`🎵 Streaming audio for video: ${videoId}`);
    console.log(`   URL: ${url}`);

    // Validate YouTube URL
    const isValid = await play.yt_validate(url);
    
    console.log(`   Validation result:`, isValid);
    
    if (isValid !== 'video') {
      console.error(`   ❌ Invalid video URL`);
      return res.status(400).json({
        success: false,
        error: 'Invalid YouTube video URL',
      });
    }

    console.log(`   ✅ URL is valid, getting stream...`);

    // Get stream with proper error handling
    const stream = await play.stream(url, {
      discordPlayerCompatibility: true, // Use Discord bot compatible format
    });

    console.log(`   ✅ Stream obtained for: ${stream.video_details.title}`);

    // Set proper headers for audio streaming
    res.setHeader('Content-Type', stream.type.includes('webm') ? 'audio/webm' : 'audio/mpeg');
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'no-cache');

    console.log(`   🎵 Starting stream to client...`);

    // Stream audio directly to client (Discord bot style!)
    stream.stream.pipe(res);
    
    // Handle stream errors
    stream.stream.on('error', (error) => {
      console.error('   ❌ Stream error:', error.message);
    });
    
    res.on('close', () => {
      console.log('   ✅ Client connection closed');
      stream.stream.destroy();
    });

  } catch (error) {
    console.error('❌ Streaming error:', error.message);
    console.error('   Stack:', error.stack);
    
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: 'Failed to stream audio',
        details: error.message,
      });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 JetStream Audio API running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🎵 Audio API: http://localhost:${PORT}/api/audio/health`);
  console.log(`🎵 Stream endpoint: http://localhost:${PORT}/api/audio/stream/:videoId`);
  console.log(`\n✨ Ready to extract AND STREAM full-length audio (just like Discord bots)!\n`);
});
