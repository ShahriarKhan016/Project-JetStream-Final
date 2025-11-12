# 🧪 Testing Guide - Caching & PWA Features

## Quick Test Checklist

### ✅ 1. API Caching Test (2 minutes)

**Steps:**
1. Open browser DevTools → Console
2. Search for "Human" in the app
3. Look for: `💾 Cached: search_track_Human_20`
4. Search "Human" again immediately
5. Look for: `📦 Cache hit: search_track_Human_20`

**Expected Result:**
- First search: Fetches from Deezer (slower)
- Second search: Instant (from cache)

---

### ✅ 2. Offline Indicator Test (1 minute)

**Steps:**
1. Keep app open
2. Open DevTools → Network tab
3. Change "Online" dropdown to "Offline"
4. Red banner should appear: "🚫 No internet connection"
5. Change back to "Online"
6. Banner disappears

**Expected Result:**
- Banner animates in smoothly when offline
- Banner disappears when back online

---

### ✅ 3. Settings - Cache Management (2 minutes)

**Steps:**
1. Go to Settings page
2. Scroll to "Storage & Data" section
3. See "Total Cache Size: X KB"
4. See "API Cache" with "Clear API Cache" button
5. Click "Clear API Cache"
6. Confirm dialog → Check console for cleared count
7. Do a search → It should fetch fresh (no cache hit)

**Expected Result:**
- Shows current cache size
- Clear button works
- After clearing, searches fetch fresh data

---

### ✅ 4. PWA Installation Test (5 minutes)

**Desktop (Chrome):**
1. Visit your app
2. Look for install icon in address bar
3. Click "Install JetStream"
4. App opens in standalone window
5. Check app menu/home screen for icon

**Mobile:**
1. Open in Chrome mobile
2. Menu → "Add to Home Screen" or "Install"
3. Accept prompt
4. Icon appears on home screen
5. Tap icon → Opens fullscreen (no browser UI)

**Expected Result:**
- App can be installed
- Runs in standalone mode
- Has app icon

---

## Console Output Examples

### Good Cache Behavior:
```
// First search
💾 Cached: search_track_Human_20 (TTL: 1800s)

// Second search (within 30 min)
📦 Cache hit: search_track_Human_20

// After 30 minutes
💾 Cached: search_track_Human_20 (TTL: 1800s)  ← Re-fetched
```

### Offline/Online:
```
// When going offline
📴 Connection lost

// When back online
🌐 Back online!
```

### Service Worker:
```
✅ Service Worker registered: /
```

---

## Troubleshooting

### Cache not working?
- Check console for errors
- Verify localStorage is not disabled
- Try clearing browser cache and reload

### Offline banner not showing?
- Check if browser supports `navigator.onLine`
- Try airplane mode on mobile
- Check console for errors

### PWA not installable?
- Must be served over HTTPS (or localhost)
- Service worker must register successfully
- Manifest must be valid JSON

### Service worker errors?
- Check `/sw.js` exists in public folder
- Check console for registration errors
- Try unregister and re-register

---

## Performance Metrics

Track these improvements:

**Before Caching:**
- Search "Human" → ~500ms (network)
- Load album → ~600ms
- Load artist → ~700ms

**After Caching:**
- Search "Human" (cached) → ~5ms ⚡ **100x faster!**
- Load album (cached) → ~3ms
- Load artist (cached) → ~4ms

**Storage Usage:**
- Fresh install: ~50 KB
- After 10 searches: ~150 KB
- After 1 hour usage: ~300 KB
- Max expected: ~1 MB (auto-cleans when full)

---

## Visual Indicators to Look For

### 1. Offline Banner (Top of screen):
```
┌─────────────────────────────────────────┐
│ 🚫 No internet • Some features limited  │
└─────────────────────────────────────────┘
```

### 2. Settings - Cache Section:
```
Storage & Data
──────────────────────
Total Cache Size      245.67 KB
API Cache            [Clear API Cache]
```

### 3. Console Logs:
- `📦 Cache hit:` - Data served from cache
- `💾 Cached:` - New data cached
- `✅ Service Worker registered` - PWA ready
- `🧹 Cleared X expired cache entries` - Auto-cleanup

---

## Success Criteria

✅ All features working if:
1. Second search is instant (cache hit)
2. Offline banner appears when disconnected
3. Settings shows cache size
4. Clear cache button works
5. Service worker registers successfully
6. App can be installed as PWA
7. All existing features still work

---

**Expected Test Duration:** 10-15 minutes for complete verification
