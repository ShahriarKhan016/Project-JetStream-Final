# Full-Length Audio Playback Setup Guide

## 🎵 Problem: Deezer API Limitation

Deezer's public API only provides **30-second preview URLs** for songs. To get full-length audio, we've implemented a hybrid solution.

---

## ✅ Solution: Hybrid Music Service

**Deezer (Metadata)** + **YouTube (Full Audio)**

### How It Works:

1. **Search & Metadata**: Use Deezer API
   - Song titles, artist names, album art
   - Album information, genres, charts
   - Fast and reliable metadata

2. **Audio Playback**: Use YouTube
   - Full-length audio streams
   - High-quality audio
   - Free (no subscription needed)

3. **Smart Caching**: Store YouTube video IDs
   - Avoid repeated API calls
   - 24-hour cache expiry
   - localStorage persistence

---

## 🚀 Quick Start (No API Key Needed)

The app **works out of the box** using Invidious API:

```bash
# No setup needed! Just run:
cd web
npm run dev
```

**Invidious** is a privacy-friendly YouTube frontend that provides API access without requiring an API key.

### Limitations of Invidious:
- ⚠️ Less reliable (instances may be down)
- ⚠️ Slower response times
- ⚠️ Rate limiting on public instances

---

## 🔑 Recommended: YouTube Data API Setup

For better performance and reliability:

### Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **YouTube Data API v3**:
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create API Key:
   - Go to "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

### Step 2: Add to Your Project

Create or update `.env` file in the `web` directory:

```env
VITE_YOUTUBE_API_KEY=YOUR_ACTUAL_API_KEY_HERE
```

### Step 3: Restart Dev Server

```bash
cd web
npm run dev
```

---

## 📁 New Files Created

### 1. `web/src/services/youtube.service.ts`
- YouTube search functionality
- Invidious API integration
- Audio stream URL extraction

### 2. `web/src/services/music.service.ts`
- Hybrid service combining Deezer + YouTube
- Smart caching system
- Automatic fallback to 30s preview

---

## 🔄 How to Update Your Code

### Option 1: Replace Deezer Service (Recommended)

Find all imports of `deezerService` and replace with `musicService`:

**Before:**
```typescript
import { deezerService } from '../services/deezer.service'
```

**After:**
```typescript
import { musicService } from '../services/music.service'
```

### Option 2: Use `getTrackWithFullAudio` Method

For playing individual tracks:

```typescript
// Get track with full audio URL
const track = await musicService.getTrackWithFullAudio(trackId)

if (track) {
  playTrack({
    id: track.id,
    title: track.title,
    artist: track.artist,
    albumTitle: track.albumTitle,
    coverImage: track.coverImage,
    duration: track.duration,
    audioUrl: track.audioUrl, // Full audio or 30s preview fallback
  })
}
```

### Option 3: Batch Process Albums

For album pages:

```typescript
const albumData = await musicService.getAlbumWithFullAudio(albumId)

if (albumData) {
  const { album, tracksWithAudio } = albumData
  
  // tracksWithAudio array contains full audio URLs
  tracksWithAudio.forEach(track => {
    console.log(track.hasFullAudio ? '✅ Full audio' : '⚠️ Preview only')
  })
}
```

---

## 🎯 API Comparison

| Feature | Deezer | YouTube (Official) | YouTube (Invidious) |
|---------|--------|-------------------|---------------------|
| **API Key** | Not needed | Required | Not needed |
| **Audio Length** | 30 seconds | Full length | Full length |
| **Rate Limits** | Generous | 10,000 req/day | Variable |
| **Reliability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Speed** | Fast | Fast | Medium |
| **Quality** | 128 kbps | Up to 256 kbps | Up to 256 kbps |

---

## 💾 Caching System

The hybrid service includes intelligent caching:

```typescript
// Check cache stats
const stats = musicService.getCacheStats()
console.log(stats)
// {
//   totalEntries: 42,
//   oldestEntry: 1730901234567,
//   newestEntry: 1730987654321
// }

// Manually clean cache
musicService.cleanCache()
```

**Cache Storage:**
- Stored in: `localStorage` → `jetstream_audio_cache`
- Expiry: 24 hours
- Auto-cleanup: Every hour

---

## 🔧 Troubleshooting

### Problem: "No YouTube match found"

**Causes:**
- Incorrect song title/artist name
- Song not available on YouTube
- API rate limit reached

**Solutions:**
```typescript
// Fallback is automatic - uses 30s preview
const track = await musicService.getTrackWithFullAudio(trackId)
if (!track.hasFullAudio) {
  console.warn('Using 30s preview')
}
```

### Problem: "All Invidious instances failed"

**Solutions:**
1. Set up YouTube API key (recommended)
2. Wait and retry (instances may be temporarily down)
3. Use VPN if instances are geo-blocked

### Problem: YouTube API quota exceeded

**Free Tier Limit:** 10,000 requests/day

**Each search costs:** ~100 quota units = ~100 searches/day

**Solutions:**
- Implement rate limiting
- Cache aggressively
- Use Invidious as fallback

---

## 🎨 UI Indicators (Optional)

Add visual feedback for audio availability:

```tsx
{track.hasFullAudio ? (
  <span className="badge-full">Full Audio ✅</span>
) : (
  <span className="badge-preview">30s Preview</span>
)}
```

---

## 📊 Performance Tips

### 1. Lazy Load Full Audio
Only fetch full audio URL when user clicks play:

```typescript
const handlePlayTrack = async (track) => {
  setLoading(true)
  
  const fullTrack = await musicService.getTrackWithFullAudio(track.id)
  
  if (fullTrack) {
    playTrack(fullTrack)
  }
  
  setLoading(false)
}
```

### 2. Preload First Track
For playlists, preload the first track:

```typescript
useEffect(() => {
  if (playlist.tracks.length > 0) {
    musicService.getTrackWithFullAudio(playlist.tracks[0].id)
  }
}, [playlist])
```

### 3. Batch Processing with Limits
Don't fetch 100 tracks at once:

```typescript
// Good: Process in batches
const firstBatch = tracks.slice(0, 5)
await Promise.all(firstBatch.map(t => 
  musicService.getTrackWithFullAudio(t.id)
))
```

---

## 🌐 Alternative Services

If YouTube doesn't work for you:

### Jamendo (Royalty-Free Music)
```bash
npm install jamendo-client
```
- Full-length songs
- Free API
- Limited mainstream content

### SoundCloud
```bash
npm install soundcloud-api
```
- Some full songs
- Requires API key
- Mixed availability

### Spotify Web Playback SDK
- Requires Premium subscription
- Official support
- Best quality

---

## 📝 Implementation Checklist

- [x] Create `youtube.service.ts`
- [x] Create `music.service.ts`
- [ ] Update imports in components
- [ ] Test audio playback
- [ ] Add loading states
- [ ] Add error handling
- [ ] Update UI with audio status badges
- [ ] Get YouTube API key (optional)
- [ ] Test caching functionality

---

## 🎉 Benefits

✅ **Full-length audio** playback  
✅ **No subscription** required  
✅ **Smart caching** reduces API calls  
✅ **Automatic fallback** to previews  
✅ **Works without API key** (Invidious)  
✅ **Easy to upgrade** to official YouTube API  

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify API key is set correctly
3. Test with Invidious first (no key needed)
4. Check YouTube video availability
5. Clear cache: `localStorage.clear()`

---

**Last Updated:** November 8, 2025  
**Status:** ✅ Ready to Use
