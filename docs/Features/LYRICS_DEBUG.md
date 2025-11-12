# 🐛 Lyrics Not Showing - Debug Guide

## Quick Fixes to Try:

### 1. Check Browser Console (F12)

Open DevTools (F12) and look for these messages when you click the lyrics button:

**Good signs:**
```
🔍 Fetching lyrics: Artist Name - Song Title
📡 API URL: https://api.lyrics.ovh/v1/Artist%20Name/Song%20Title
📥 Response status: 200
✅ Fetched lyrics from lyrics.ovh
📝 Lyrics length: 1234 characters
```

**Problem signs:**
```
❌ Lyrics not found - Status: 404
```
→ Song not in database, try another song

```
❌ Error fetching lyrics: TypeError: Failed to fetch
```
→ CORS issue or API is down

### 2. Test with Known Good Song

Click the lyrics button and if you see "Lyrics not available", click the **"Test with Coldplay - Yellow"** button.

This tests with a song that's definitely in the database.

**If test works:**
- ✅ API is working
- ❌ Problem: The song you're playing isn't in the database
- Solution: Try popular songs

**If test fails:**
- ❌ API might be down or blocked
- Solution: See fixes below

### 3. Try These Popular Songs

These are almost definitely in the lyrics.ovh database:

- Coldplay - Yellow
- The Beatles - Hey Jude
- Queen - Bohemian Rhapsody
- Ed Sheeran - Shape of You
- Adele - Hello

### 4. Check Song Name Spelling

The API needs EXACT matches:
- ✅ "Coldplay" - "Yellow"
- ❌ "coldplay" - "yellow" (might work)
- ❌ "Cold Play" - "Yellow" (won't work)
- ❌ "Coldplay" - "Yellow (Album Version)" (won't work)

### 5. CORS Issues (if API blocked)

If you see `Failed to fetch` or CORS errors in console:

**Option A: Use CORS Proxy**

Edit `web/src/services/lyrics.service.ts`:

```typescript
// Change this line:
private readonly LYRICS_API = 'https://api.lyrics.ovh/v1'

// To this:
private readonly LYRICS_API = 'https://corsproxy.io/?https://api.lyrics.ovh/v1'
```

**Option B: Alternative Lyrics API**

Replace lyrics.ovh with another free API:

```typescript
// In lyrics.service.ts, replace getLyrics method with:
async getLyrics(trackTitle: string, artistName: string): Promise<LyricsResult | null> {
  try {
    // Use lyrics.org API instead
    const url = `https://some-lyrics-api.p.rapidapi.com/lyrics/${artistName}/${trackTitle}`;
    // ... rest of code
  }
}
```

### 6. Test the API Directly

Open `web/test-lyrics.html` in your browser:
```
file:///E:/EWU%20University/10th%20Semester/CSE412/Project%20JetStream/web/test-lyrics.html
```

Click "Test: Coldplay - Yellow" button.

**If it works:**
- ✅ API is accessible
- Problem is in the app code

**If it fails:**
- ❌ API is blocked or down
- Use CORS proxy (Option A above)

---

## Common Problems & Solutions:

### Problem: "Lyrics not available for this track"

**Causes:**
1. Song not in lyrics.ovh database
2. Artist/title spelling doesn't match
3. Song is too new or obscure

**Solutions:**
- Try popular/old songs first
- Check artist and title spelling
- Use the test button to verify API works

### Problem: Nothing happens (loading forever)

**Causes:**
1. CORS blocking the request
2. API is down
3. Network issue

**Solutions:**
- Check browser console for errors
- Try CORS proxy
- Check internet connection

### Problem: Console shows 404 errors

**Cause:** Song not found in database

**Solution:** Try different songs that are popular

### Problem: Console shows CORS errors

**Cause:** Browser blocking cross-origin requests

**Solution:** 
```typescript
// Add CORS proxy in lyrics.service.ts:
private readonly LYRICS_API = 'https://corsproxy.io/?https://api.lyrics.ovh/v1'
```

---

## Step-by-Step Debugging:

1. **Open app** (`npm run dev`)
2. **Open browser DevTools** (F12)
3. **Go to Console tab**
4. **Play any song**
5. **Click Lyrics button**
6. **Watch console messages**

Look for:
- 🔍 Fetching lyrics message
- 📡 API URL
- 📥 Response status
- ✅ Success or ❌ Error

7. **If error, click "Test with Coldplay - Yellow" button**
8. **Check if test works**

---

## Quick Test Commands:

Open browser console and paste:

```javascript
// Test API directly
fetch('https://api.lyrics.ovh/v1/Coldplay/Yellow')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```

If this works, lyrics API is accessible!

---

## Still Not Working?

1. Check the browser console output
2. Share the error messages
3. Try the CORS proxy solution
4. Verify internet connection
5. Try a different browser

The app has detailed logging now - check the console for exact error messages!
