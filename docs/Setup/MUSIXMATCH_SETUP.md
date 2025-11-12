# Musixmatch Lyrics Integration Guide

## ✅ What's Implemented

Your JetStream app now fetches **real lyrics** for every song with these features:

1. **Real Lyrics from Musixmatch**
   - Largest lyrics database (millions of songs)
   - Covers all languages and genres
   - Licensed and legal to display

2. **Automatic English Translation**
   - If a song is in another language (Spanish, Korean, Japanese, etc.)
   - Musixmatch automatically translates it to English
   - You can toggle between original and English with one click

3. **Smart Caching**
   - Lyrics are cached for 24 hours
   - Reduces API calls (free tier: 2,000/day)
   - Instant loading for previously viewed songs

4. **Beautiful UI**
   - Shows original language (e.g., "Original: Spanish")
   - Toggle button to switch between original/English
   - Copyright attribution as required by Musixmatch
   - Smooth animations when switching

---

## 🚀 Setup Instructions (5 minutes)

### Step 1: Get Your Free Musixmatch API Key

1. **Visit**: https://developer.musixmatch.com/
2. **Sign Up**: Create a free account
3. **Create App**: 
   - Click "Create New Application"
   - Name: "JetStream Music Player"
   - Click "Create"
4. **Copy API Key**: You'll see your API key (looks like: `a1b2c3d4e5f6...`)

### Step 2: Add API Key to Your Project

1. **Create `.env` file** in the `web` folder (same level as `package.json`):

```bash
# In: E:\EWU University\10th Semester\CSE412\Project JetStream\web\.env
VITE_MUSIXMATCH_API_KEY=YOUR_ACTUAL_API_KEY_HERE
```

2. **Replace `YOUR_ACTUAL_API_KEY_HERE`** with the key you copied

3. **Restart the dev server**:
```bash
npm run dev
```

### Step 3: Test It!

1. Play any song
2. Click the lyrics button (or press `L` key)
3. You'll see **real lyrics** appear!
4. If the song is in another language, you'll see:
   - A toggle button ("English" / "Original")
   - Language indicator (e.g., "Original: Spanish")
   - Click the toggle to switch between versions

---

## 📊 Free Tier Limits

- **2,000 API calls per day** (very generous!)
- **Calculation**: 
  - Each song = 1 call (first time)
  - Cached for 24 hours (subsequent views = 0 calls)
  - You can view ~2,000 different songs per day
  - Or view 10 songs 200 times each (thanks to caching!)

---

## 🎯 How It Works

### For English Songs:
```
1. User clicks lyrics button
2. App searches Musixmatch: "Blinding Lights - The Weeknd"
3. Gets English lyrics directly
4. Displays lyrics (no translation needed)
5. Caches for 24 hours
```

### For Non-English Songs:
```
1. User clicks lyrics button
2. App searches: "Despacito - Luis Fonsi"
3. Gets Spanish lyrics + English translation
4. Shows "Original: Spanish" badge
5. Shows translation by default
6. User can toggle to see Spanish original
7. Caches both versions
```

---

## 🔧 Technical Details

### Files Created:
- `web/src/services/musixmatch.service.ts` - API integration
- `web/.env.example` - Configuration template
- `MUSIXMATCH_SETUP.md` - This guide

### Files Modified:
- `web/src/components/LyricsPanel.tsx` - UI with translation toggle
- `web/src/components/LyricsPanel.module.css` - Styling

### Features:
- ✅ Real lyrics from Musixmatch database
- ✅ Automatic English translation for any language
- ✅ Toggle between original and translated
- ✅ 24-hour caching (saves API quota)
- ✅ Shows original language
- ✅ Copyright attribution
- ✅ Error handling
- ✅ Loading states
- ✅ Beautiful animations

---

## 🎨 User Experience

### Before (Dummy Lyrics):
```
♪ Despacito ♪
by Luis Fonsi

[Verse 1]
This is where the first verse would appear
With beautiful words and melody so clear
...
```

### After (Real Lyrics with Translation):
```
Header shows: 
  🌐 Original: Spanish
  [English] button

English translation:
Slowly
I want to breathe your neck slowly
Let me tell you things in your ear
So that you remember when you're not with me
...

Click [Original] button to see:
Despacito
Quiero respirar tu cuello despacito
Deja que te diga cosas al oído
Para que te acuerdes si no estás conmigo
...
```

---

## ⚠️ Important Notes

1. **API Key Security**:
   - The `.env` file is already in `.gitignore`
   - Never commit your API key to Git
   - Share `.env.example` (without real key) with team

2. **Rate Limits**:
   - Free tier: 2,000 calls/day
   - Caching reduces calls significantly
   - Monitor usage in Musixmatch dashboard

3. **Attribution Requirement**:
   - Musixmatch requires "Lyrics powered by Musixmatch"
   - Already implemented at bottom of lyrics
   - Don't remove this attribution

4. **Coverage**:
   - Musixmatch has millions of songs
   - Some very rare/new tracks may not be available
   - App handles this gracefully with error message

---

## 🐛 Troubleshooting

### "Musixmatch API key not configured"
- Check if `.env` file exists in `web` folder
- Verify key starts with `VITE_MUSIXMATCH_API_KEY=`
- Restart dev server after creating `.env`

### "Lyrics not available for this track"
- Song might not be in Musixmatch database
- Try a popular song to verify setup
- Check API key is correct

### Translation not showing
- Not all songs have translations
- Very new songs might not be translated yet
- English songs don't need translation

### Console shows "401 Unauthorized"
- API key is incorrect
- Copy key again from Musixmatch dashboard
- Make sure no extra spaces in `.env`

---

## 📈 Next Steps (Optional Enhancements)

1. **Synchronized Lyrics** (karaoke mode)
   - Musixmatch offers synced lyrics
   - Highlight current line as song plays
   - Requires additional API endpoint

2. **Lyrics Search**
   - Search for songs by lyrics
   - "Find songs containing 'love in my heart'"
   - Musixmatch supports this

3. **User Preferences**
   - Save translation preference
   - Auto-show English for non-English songs
   - Remember last language choice

4. **Offline Lyrics**
   - Cache lyrics in IndexedDB
   - Available without internet
   - Part of PWA enhancement

---

## 📝 Summary

✅ **Setup**: 5 minutes (get API key, add to `.env`)
✅ **Cost**: FREE (2,000 calls/day)
✅ **Coverage**: Millions of songs in all languages
✅ **Translation**: Automatic to English
✅ **Legal**: Fully licensed, attribution included
✅ **Performance**: 24-hour caching reduces API usage

Your JetStream app now shows **real, legal lyrics** for any song in any language, with automatic English translation! 🎉

---

## 🔗 Resources

- Musixmatch Developer Portal: https://developer.musixmatch.com/
- API Documentation: https://developer.musixmatch.com/documentation
- Terms of Service: https://developer.musixmatch.com/terms
- Support: https://developer.musixmatch.com/support
