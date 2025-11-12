# 📱 JetStream Mobile V2 - Development Guide

**Focus**: Robust, Lightweight Android App with Clean Animations  
**Status**: Phase 2 - Active Development  
**Branch**: `version-2.0-dev`

---

## 🎯 Mobile App Goals

1. **Performance**: 60 FPS animations, < 20MB app size
2. **Design**: Clean, modern UI with subtle animations
3. **UX**: Intuitive gestures and smooth transitions
4. **Lightweight**: Minimal dependencies, optimized code

---

## 📦 Current Setup

### Installed Dependencies
- ✅ React Native 0.73.2
- ✅ Expo SDK 50
- ✅ React Navigation (Bottom Tabs + Stack)
- ✅ Redux Toolkit for state
- ✅ React Native Reanimated 3.6.1
- ✅ React Native Gesture Handler 2.14
- ✅ Expo AV (audio playback)
- ✅ Expo Linear Gradient
- ✅ Lottie React Native (animations)

### Project Structure
```
mobile/
├── src/
│   ├── components/          # Reusable components (TO CREATE)
│   │   ├── AnimatedCard.tsx
│   │   ├── NeonButton.tsx
│   │   ├── MusicCard.tsx
│   │   ├── GlassPlayer.tsx
│   │   ├── AlbumArt.tsx
│   │   └── TrackList.tsx
│   ├── screens/             # Main screens (EXISTS - NEEDS IMPROVEMENT)
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── LibraryScreen.tsx
│   │   └── PlayerScreen.tsx
│   ├── navigation/          # Navigation setup (EXISTS)
│   │   └── AppNavigator.tsx
│   ├── store/               # Redux store (EXISTS)
│   │   └── index.ts
│   ├── services/            # API services (TO CREATE)
│   │   ├── deezer.service.ts
│   │   └── storage.service.ts
│   ├── hooks/               # Custom hooks (TO CREATE)
│   │   ├── useAudioPlayer.ts
│   │   └── useAnimation.ts
│   └── theme/               # Theme & styles (TO ENHANCE)
│       ├── colors.ts
│       ├── spacing.ts
│       └── typography.ts
├── App.tsx                  # Entry point (EXISTS)
└── package.json

```

---

## 🎨 Design System

### Color Palette (Clean & Modern)
```typescript
colors: {
  primary: '#1ED760',      // Spotify Green
  secondary: '#00D9FF',    // Aqua Blue
  accent: '#FF006E',       // Hot Pink
  background: {
    primary: '#121212',    // Dark Gray
    secondary: '#181818',  // Slightly lighter
    card: '#282828',       // Card background
  },
  text: {
    primary: '#FFFFFF',    // White
    secondary: '#B3B3B3',  // Light Gray
    tertiary: '#878787',   // Medium Gray
  },
  border: '#333333',       // Subtle border
}
```

### Animation Principles
1. **Subtle**: No flashy, distracting animations
2. **Fast**: Animations < 300ms
3. **Meaningful**: Animations provide visual feedback
4. **Performant**: Use native driver, 60 FPS

---

## 📋 Week 1-2 Tasks: Core Components

### Task 1: Create AnimatedCard Component
**Purpose**: Reusable card with enter/exit animations

**Features**:
- Fade in + scale animation
- Press animation (scale down slightly)
- Customizable styles
- Support for any content

**File**: `src/components/AnimatedCard.tsx`

### Task 2: Create NeonButton Component  
**Purpose**: Primary action buttons with haptic feedback

**Features**:
- Gradient background
- Press animation
- Haptic feedback on press
- Loading state
- Disabled state

**File**: `src/components/NeonButton.tsx`

### Task 3: Create MusicCard Component
**Purpose**: Display track/album with gestures

**Features**:
- Swipe left to like/add to playlist
- Long press for options
- Play button overlay on press
- Album art with placeholder
- Artist and title display

**File**: `src/components/MusicCard.tsx`

### Task 4: Create GlassPlayer Component
**Purpose**: Mini player at bottom of screen

**Features**:
- Glassmorphism effect
- Album art thumbnail
- Track info (title/artist)
- Play/pause button
- Progress bar
- Tap to expand to full player

**File**: `src/components/GlassPlayer.tsx`

### Task 5: Create AlbumArt Component
**Purpose**: Optimized album art display

**Features**:
- Image caching
- Loading placeholder
- Fade-in animation
- Rounded corners
- Shadow effect

**File**: `src/components/AlbumArt.tsx`

### Task 6: Create TrackList Component
**Purpose**: Scrollable list of tracks

**Features**:
- FlatList with virtualization
- Animated item entrance
- Swipe actions
- Pull to refresh
- Empty state

**File**: `src/components/TrackList.tsx`

---

## 🏠 Week 3-4 Tasks: Improve Screens

### HomeScreen Improvements
- [ ] Add animated greeting (time-based)
- [ ] Featured playlists carousel
- [ ] Trending section with API integration
- [ ] Quick action buttons
- [ ] Pull to refresh
- [ ] Loading skeletons

### SearchScreen Improvements
- [ ] Animated search bar
- [ ] Filter chips with animations
- [ ] Search results with stagger animation
- [ ] Search history
- [ ] Empty state illustration
- [ ] Debounced search input

### LibraryScreen Improvements
- [ ] Tab view with gestures
- [ ] Liked songs list
- [ ] Playlists grid
- [ ] Sort options
- [ ] Swipe to delete
- [ ] Create playlist modal

### PlayerScreen Improvements
- [ ] Full-screen player UI
- [ ] Large album art with rotation
- [ ] Swipe gestures (left/right to skip)
- [ ] Draggable progress bar
- [ ] Volume slider
- [ ] Queue bottom sheet
- [ ] Lyrics view

---

## 🎵 Week 5-6 Tasks: Audio Integration

### Audio Playback Service
- [ ] Set up React Native Track Player
- [ ] Background playback
- [ ] Lock screen controls
- [ ] Notification with controls
- [ ] Handle play/pause/skip
- [ ] Handle interruptions (calls)
- [ ] Bluetooth controls
- [ ] Audio focus

### Player Context
- [ ] Create usePlayer hook
- [ ] Global player state
- [ ] Queue management
- [ ] Recently played tracking
- [ ] Shuffle & repeat modes

---

## 🧪 Week 7-8 Tasks: Polish & Testing

### Performance Optimization
- [ ] Optimize re-renders (React.memo)
- [ ] Image caching strategy
- [ ] Reduce bundle size
- [ ] Test on low-end devices
- [ ] Memory leak detection
- [ ] Animation performance (60 FPS)

### Testing
- [ ] Test on Android 10, 11, 12, 13, 14
- [ ] Test on different screen sizes
- [ ] Test gestures
- [ ] Test offline mode
- [ ] Test interruptions
- [ ] Fix all crashes

### UI Polish
- [ ] Add loading states everywhere
- [ ] Add error states
- [ ] Add empty states
- [ ] Smooth transitions
- [ ] Haptic feedback
- [ ] Toast notifications

---

## 🛠️ Development Workflow

### Daily Workflow
```bash
# Navigate to mobile folder
cd mobile

# Install dependencies (first time)
npm install

# Start Expo dev server
npm start

# Run on Android
npm run android

# Or use Expo Go app
# Scan QR code with Expo Go app on your phone
```

### Testing on Real Device
1. Install Expo Go app from Play Store
2. Connect phone and computer to same WiFi
3. Run `npm start`
4. Scan QR code with Expo Go
5. App will load on your phone

### Building APK (Later)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure build
eas build:configure

# Build for Android
npm run build:android
```

---

## 📝 Code Style Guide

### Component Structure
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### Animation Example
```typescript
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const opacity = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
}));

// Trigger animation
opacity.value = withTiming(1, { duration: 300 });
```

---

## 🚀 Getting Started NOW

### Step 1: Set Up Environment (5 minutes)
```bash
cd mobile
npm install
npm start
```

### Step 2: Create Components Folder
```bash
mkdir src\components
```

### Step 3: Start with AnimatedCard (30 minutes)
- Create `src/components/AnimatedCard.tsx`
- Add fade + scale animation
- Test in HomeScreen

### Step 4: Create Other Components (2-3 hours each)
- NeonButton
- MusicCard
- GlassPlayer
- AlbumArt
- TrackList

### Step 5: Improve Screens (4-6 hours total)
- Integrate components into screens
- Add animations
- Connect to Deezer API

---

## 💡 Tips for Success

1. **Test Often**: Run on real Android device frequently
2. **Keep It Simple**: Don't over-animate
3. **Performance First**: Use native driver for animations
4. **Reuse Components**: Build once, use everywhere
5. **Follow Design System**: Consistent colors & spacing

---

## 🐛 Common Issues & Solutions

### Issue: Animations Laggy
**Solution**: Use `useNativeDriver: true` in animations

### Issue: App Crashes on Android
**Solution**: Check error logs with `npx react-native log-android`

### Issue: Gestures Not Working
**Solution**: Ensure `GestureHandlerRootView` wraps the app

### Issue: Images Not Loading
**Solution**: Check CORS, use proxy if needed

---

## 📚 Resources

- [React Native Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [React Native Track Player](https://react-native-track-player.js.org/)
- [Expo Documentation](https://docs.expo.dev/)

---

<div align="center">

**🚀 Let's Build an Amazing Android App! 🚀**

[Main Roadmap](../V2_ROADMAP.md) | [Quick Start](../V2_QUICKSTART.md)

</div>
