# 🚀 Quick Start - Full Audio Playback

## Prerequisites
- Node.js 18+ installed
- Two terminal windows

## Step 1: Start Backend (Audio Server)
```bash
cd backend
node audio-server.js
```
**Expected output:**
```
🚀 JetStream Audio API running on port 5000
✨ Ready to extract full-length audio (just like Discord bots)!
```

## Step 2: Start Frontend
```bash
cd web
npm run dev
```
**Expected output:**
```
VITE ready in [X]ms
Local: http://localhost:5173
```

## Step 3: Test
1. Open http://localhost:5173
2. Search for any song
3. Click play
4. **Watch the console** - you should see:
   ```
   🎵 Fetching audio from backend
   ✅ Got full audio URL from backend!
   ```
5. Song plays **IN FULL** (not just 30 seconds)!

## ✅ How to Verify It's Working

### Backend Health Check:
Visit: http://localhost:5000/api/audio/health
Should return: `"success": true`

### Test Specific Video:
Visit: http://localhost:5000/api/audio/youtube/SAqJBJkByzU
Should return: JSON with `audioUrl` field

### In Your App:
- Console shows: "Got full audio URL from backend!"
- Song plays beyond 30 seconds
- High quality audio (128-160kbps)

## 🎵 How It Works

```
Your React App → Backend API → ytdl-core → YouTube → Full Audio
```

Same exact method Discord music bots use!

## 🐛 Troubleshooting

### Backend won't start
```bash
cd backend
npm install @distube/ytdl-core express cors
node audio-server.js
```

### Frontend shows "Backend not running"
- Make sure backend terminal shows "Ready to extract"
- Check http://localhost:5000/health

### Song still plays 30 seconds
- Check browser console for error messages
- Try a different song (some videos are restricted)
- Verify backend is responding: http://localhost:5000/api/audio/health

## 📝 Note

YouTube audio URLs expire after ~6 hours. If playback fails after long time, just restart the backend or click play again (it will fetch a fresh URL).

---

**Status**: ✅ WORKING
**Method**: Discord bot-style extraction
**Quality**: High (128-160kbps)
**Duration**: Full length ✅
