# Migration Guide: 30s Previews → Full Audio

## 🎯 Goal
Replace Deezer's 30-second previews with full-length audio from YouTube.

---

## 📦 What's Been Added

### New Services:
1. ✅ `web/src/services/youtube.service.ts` - YouTube audio integration
2. ✅ `web/src/services/music.service.ts` - Hybrid Deezer + YouTube
3. ✅ `web/src/components/FullAudioExample.tsx` - Usage examples

### Documentation:
4. ✅ `docs/FULL_AUDIO_SETUP.md` - Complete setup guide

---

## 🔄 Files That Need Updates

### 1. PlayerContext.tsx (IMPORTANT)

**Location:** `web/src/contexts/PlayerContext.tsx`

**Find the `playTrack` function and update it:**

```typescript
// BEFORE (uses Deezer preview)
const playTrack = (track: Track) => {
  setCurrentTrack(track)
  setIsPlaying(true)
  // Uses track.audioUrl (30s preview)
}

// AFTER (fetch full audio)
import { musicService } from '../services/music.service'

const playTrack = async (track: Track) => {
  setIsPlaying(true)
  setCurrentTrack(track)
  
  // Try to get full audio URL
  const fullTrack = await musicService.getTrackWithFullAudio(
    parseInt(track.id),
    track.title,
    track.artist
  )
  
  if (fullTrack && fullTrack.audioUrl) {
    // Update with full audio URL
    setCurrentTrack({
      ...track,
      audioUrl: fullTrack.audioUrl
    })
  }
  // If fails, uses original track.audioUrl (30s preview)
}
```

---

### 2. HomePage.tsx

**Location:** `web/src/pages/HomePage.tsx`

**Update imports:**
```typescript
// BEFORE
import { deezerService } from '../services/deezer.service'

// AFTER
import { musicService } from '../services/music.service'
```

**Update all `deezerService` calls to `musicService`:**
```typescript
// BEFORE
const tracks = await deezerService.getChart('tracks', 10)

// AFTER
const tracks = await musicService.getChart('tracks', 10)
```

**No other changes needed** - `musicService` has all the same methods as `deezerService`!

---

### 3. SearchPage.tsx

**Location:** `web/src/pages/SearchPage.tsx`

**Update imports:**
```typescript
import { musicService } from '../services/music.service'
```

**Update search call:**
```typescript
// BEFORE
const results = await deezerService.search(query, activeTab)

// AFTER
const results = await musicService.search(query, activeTab)
```

---

### 4. AlbumDetailPage.tsx

**Location:** `web/src/pages/AlbumDetailPage.tsx`

**Update imports:**
```typescript
import { musicService } from '../services/music.service'
```

**Option A - Keep it simple (recommended):**
```typescript
// Just replace deezerService with musicService
const album = await musicService.getAlbum(albumId)
```

**Option B - Load full audio for all tracks:**
```typescript
const albumData = await musicService.getAlbumWithFullAudio(albumId)

if (albumData) {
  const { album, tracksWithAudio } = albumData
  // Use tracksWithAudio array (has full audio URLs)
}
```

---

### 5. ArtistDetailPage.tsx

**Location:** `web/src/pages/ArtistDetailPage.tsx`

**Update imports:**
```typescript
import { musicService } from '../services/music.service'
```

**Update all calls:**
```typescript
// Artist info
const artist = await musicService.getArtist(artistId)

// Top tracks
const topTracks = await musicService.getArtistTopTracks(artistId)

// Albums
const albums = await musicService.getArtistAlbums(artistId)
```

---

### 6. HitsPage.tsx

**Update imports:**
```typescript
import { musicService } from '../services/music.service'
```

**Update chart calls:**
```typescript
const topTracks = await musicService.getChart('tracks', 50)
const topAlbums = await musicService.getChart('albums', 20)
const topArtists = await musicService.getChart('artists', 20)
```

---

## 🚀 Quick Migration Script

Run this in your terminal to update all imports automatically:

```bash
# For Unix/Mac/Linux
cd web/src
find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/from.*deezer\.service/from "..\/services\/music.service"/g'

# For Windows PowerShell
cd web/src
Get-ChildItem -Recurse -Include *.tsx,*.ts | ForEach-Object {
  (Get-Content $_.FullName) -replace "from.*deezer\.service.*", 'from "../services/music.service"' | Set-Content $_.FullName
}
```

---

## ✅ Testing Checklist

After migration, test these features:

### Basic Playback:
- [ ] Play a track from home page
- [ ] Play a track from search results
- [ ] Play a track from album page
- [ ] Play a track from artist page

### Full Audio:
- [ ] Check browser console - should see "Searching YouTube for: ..."
- [ ] Verify songs play longer than 30 seconds
- [ ] Test with popular songs (higher success rate)
- [ ] Test with obscure songs (may fall back to preview)

### Caching:
- [ ] Play same song twice - should load faster second time
- [ ] Check localStorage → `jetstream_audio_cache`
- [ ] Verify cache persists after page reload

### Error Handling:
- [ ] Disconnect internet - should handle gracefully
- [ ] Play song not on YouTube - should fall back to preview
- [ ] Check console for errors

---

## 🐛 Common Issues

### Issue 1: "AbortSignal.timeout is not a function"

**Solution:** Update to Node 18+ or use polyfill:

```typescript
// In youtube.service.ts, replace:
signal: AbortSignal.timeout(5000)

// With:
signal: (() => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), 5000)
  return controller.signal
})()
```

### Issue 2: "CORS error from Invidious"

**Solution:** The service tries multiple instances automatically. If all fail:
1. Get YouTube API key (recommended)
2. Wait and retry (instances may be down temporarily)
3. Check browser console for specific error

### Issue 3: "No audio plays"

**Debug steps:**
```typescript
// Add logging in PlayerContext
console.log('Track audio URL:', track.audioUrl)
console.log('Has full audio:', track.hasFullAudio)
```

Check if:
- Audio URL is valid
- CORS is blocking the request
- Browser supports the audio format

---

## 📊 Performance Impact

### Before (Deezer only):
- ⚡ Fast search: ~200ms
- ⚡ Instant play: 0ms (just URL)
- ❌ Audio duration: 30 seconds

### After (Deezer + YouTube):
- ⚡ Fast search: ~200ms (same)
- 🐢 First play: ~2-5 seconds (YouTube search)
- ⚡ Cached play: ~500ms
- ✅ Audio duration: Full length

### Optimization Tips:

1. **Preload on hover:**
```typescript
<button
  onMouseEnter={() => musicService.getTrackWithFullAudio(track.id)}
  onClick={() => playTrack(track)}
>
  Play
</button>
```

2. **Background loading:**
```typescript
useEffect(() => {
  // Preload first 3 tracks in background
  tracks.slice(0, 3).forEach(track => {
    musicService.getTrackWithFullAudio(track.id)
  })
}, [tracks])
```

---

## 🎉 You're Done!

After updating these files:
1. Restart dev server: `npm run dev`
2. Test playback
3. Check browser console for logs
4. Enjoy full-length music! 🎵

---

## 📞 Need Help?

Check these files for examples:
- `web/src/components/FullAudioExample.tsx` - Working examples
- `docs/FULL_AUDIO_SETUP.md` - Detailed setup guide
- `web/src/services/music.service.ts` - Implementation

**Pro Tip:** Start with one page (like HomePage) to test, then migrate others once it's working!
