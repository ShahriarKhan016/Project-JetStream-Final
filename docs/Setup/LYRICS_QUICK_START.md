# 🎵 Real Lyrics Setup - Quick Start

## ✅ What's Done

Your JetStream app now has **real lyrics** with automatic English translation for any language!

### Features Implemented:
- ✅ Real lyrics from Musixmatch (millions of songs)
- ✅ Automatic English translation for non-English songs
- ✅ Toggle between original and translated lyrics
- ✅ Shows original language indicator
- ✅ 24-hour caching (saves API quota)
- ✅ Beautiful animated UI
- ✅ Copyright attribution (required by Musixmatch)

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Free API Key

1. Visit: **https://developer.musixmatch.com/**
2. Click "Sign Up" (free account)
3. Create a new application:
   - Name: "JetStream Music Player"
   - Description: "Personal music streaming app"
4. Copy your API key (looks like: `a1b2c3d4e5f6g7h8...`)

### Step 2: Add API Key to Project

1. Open the file: `web\.env`
2. Find the line: `VITE_MUSIXMATCH_API_KEY=`
3. Paste your API key after the `=` sign:

```
VITE_MUSIXMATCH_API_KEY=your_actual_api_key_here
```

### Step 3: Restart Dev Server

Stop the current server (Ctrl+C) and restart:

```bash
cd web
npm run dev
```

---

## 🎉 Test It!

1. Play any song in JetStream
2. Click the **Lyrics** button (or press `L`)
3. See **real lyrics** appear!

### For English songs:
- Lyrics appear directly in English
- No translation needed

### For non-English songs (Spanish, Korean, Japanese, etc.):
- Shows "🌐 Original: [Language]" badge
- Displays English translation by default
- Click **"Original"** button to see original lyrics
- Click **"English"** button to see translation

---

## 📊 Examples

### English Song: "Blinding Lights" - The Weeknd
```
✓ Lyrics appear in English immediately
✓ No language indicator (already English)
✓ No toggle button needed
```

### Spanish Song: "Despacito" - Luis Fonsi
```
✓ Shows "🌐 Original: Spanish"
✓ Displays English translation by default:
  "Slowly, I want to breathe your neck slowly..."
✓ Click [Original] to see:
  "Despacito, Quiero respirar tu cuello despacito..."
```

### Korean Song: "Dynamite" - BTS
```
✓ Shows "🌐 Original: Korean"
✓ English translation shown by default
✓ Toggle to see Korean characters
```

---

## 🔍 How to Verify It's Working

1. **Open Browser Console** (F12)
2. Play a song and open lyrics
3. Look for these messages:

### First Time (Fetching from API):
```
✅ Fetched lyrics from Musixmatch: en
💾 Cached: musixmatch_lyrics_Artist_Title (TTL: 86400s)
```

### Second Time (Using Cache):
```
📦 Using cached lyrics from Musixmatch
```

---

## 📈 Free Tier Limits

- **2,000 API calls per day**
- Each unique song = 1 call (first time only)
- Cached for 24 hours = subsequent views are FREE
- **Example**: View 10 songs → 10 calls used, 1,990 remaining

---

## ⚠️ Troubleshooting

### "Musixmatch API key not configured"
**Solution**: 
- Check `.env` file exists in `web` folder
- Verify line starts with: `VITE_MUSIXMATCH_API_KEY=`
- Make sure key has no spaces or quotes
- Restart dev server

### "Lyrics not available for this track"
**Reasons**:
- Song is very new or rare (not in database yet)
- Try a popular song to verify setup works
- Check API key is correct

### Console shows "401 Unauthorized"
**Solution**:
- API key is wrong
- Go back to Musixmatch dashboard
- Copy the key again carefully
- Update `.env` file
- Restart server

---

## 🎯 What You Get

### Before (Dummy Lyrics):
```
♪ Song Title ♪
[Verse 1]
This is where the first verse would appear
With beautiful words and melody so clear
...
(Generic placeholder text)
```

### After (Real Lyrics):
```
🌐 Original: Spanish  [English] [Original]

Translation showing:
Slowly
I want to breathe your neck slowly
Let me tell you things in your ear
So that you remember when you're not with me
...

(Real, licensed lyrics with proper attribution)
```

---

## 📝 Summary

| Feature | Status |
|---------|--------|
| Real lyrics | ✅ Implemented |
| All languages | ✅ Supported |
| English translation | ✅ Automatic |
| Toggle original/translated | ✅ One-click |
| Caching | ✅ 24 hours |
| Free tier | ✅ 2,000/day |
| Legal/Licensed | ✅ Yes |
| Attribution | ✅ Included |

---

## 🔗 Resources

- **Musixmatch Developer Portal**: https://developer.musixmatch.com/
- **API Documentation**: https://developer.musixmatch.com/documentation
- **Get API Key**: https://developer.musixmatch.com/signup
- **Full Setup Guide**: See `MUSIXMATCH_SETUP.md` for detailed docs

---

## 🚀 Next Steps

After setup is complete:
1. ✅ Test with English songs
2. ✅ Test with non-English songs (Spanish, Korean, etc.)
3. ✅ Try the translation toggle
4. ✅ Verify caching in console
5. 🎉 Enjoy real lyrics for every song!

---

**Need help?** Check the detailed guide in `MUSIXMATCH_SETUP.md`
