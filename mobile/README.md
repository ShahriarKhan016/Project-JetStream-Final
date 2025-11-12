# JetStream Mobile App

## Overview
This is the React Native mobile application for JetStream, built with Expo for cross-platform compatibility (iOS & Android).

## Design System

### Color Palette (Dark Theme)
- **Primary Background**: `#0A0E27` - Deep space black
- **Secondary Background**: `#141B34` - Cards and elevated surfaces
- **Accent Blue**: `#00D9FF` - Primary actions, links
- **Accent Purple**: `#9D4EDD` - Secondary actions, highlights
- **Text Primary**: `#FFFFFF` - Main text
- **Text Secondary**: `#A0A9C0` - Descriptions

### Key Design Principles
1. **Minimalism**: Clean interfaces with maximum 3-4 colors
2. **Hierarchy**: Clear visual hierarchy using size, weight, and color
3. **Consistency**: Reusable components following design system
4. **Performance**: Optimized for smooth 60fps animations

## Project Structure

```
mobile/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   ├── navigation/       # Navigation configuration
│   ├── store/            # Redux state management
│   │   └── slices/       # Redux slices
│   ├── services/         # API and external services
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
├── assets/               # Images, fonts, etc.
├── App.tsx               # Entry point
└── app.json              # Expo configuration
```

## Getting Started

### Prerequisites
```bash
npm install -g expo-cli
```

### Installation
```bash
cd mobile
npm install
```

### Running the App
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

## State Management

The app uses Redux Toolkit for state management with the following slices:
- **player**: Playback state, queue, controls
- **library**: User's music collection
- **user**: Authentication and profile
- **settings**: App preferences

## Key Features to Implement

### Phase 1 (Current)
- [x] Project setup
- [x] Design system
- [x] Navigation structure
- [x] Redux store
- [x] Home screen UI
- [ ] Audio playback engine
- [ ] Offline storage

### Phase 2
- [ ] Search functionality
- [ ] Library management
- [ ] Playlist creation
- [ ] User authentication

### Phase 3
- [ ] AI recommendations
- [ ] Blockchain features
- [ ] Plugin system
- [ ] AR/VR support

## UI Components

### Planned Components
- Button (Primary, Secondary, Ghost)
- Card (Default, Elevated)
- Input (Text, Search)
- Player Controls (Mini, Full)
- Track List Item
- Album Card
- Playlist Card
- Loading States
- Empty States
- Error Boundaries

## Performance Optimization

- Use React.memo for expensive components
- Implement FlatList/SectionList for long lists
- Lazy load images with caching
- Code splitting for heavy features
- Profile with React DevTools

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Building for Production

```bash
# Build Android APK
eas build --platform android

# Build iOS IPA
eas build --platform ios
```

## Contributing

See main [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](../LICENSE)
