# 🎵 JetStream Music Player - Version 1.0

**A Modern Web-Based Music Streaming Application**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0-blue)](CHANGELOG.md)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)

## 🌟 Overview

JetStream is a Progressive Web Application (PWA) that provides a seamless music streaming experience with a beautiful glassmorphism UI, advanced audio controls, and intelligent caching features. Version 1.0 focuses on delivering a robust web experience with plans for mobile apps and backend integration in Version 2.0.

## ✨ Features (Version 1.0)

### � Core Music Features
- **Music Search & Discovery** - Search millions of songs via Deezer API
- **Audio Playback** - High-quality 30-second previews
- **Audio Visualizer** - Real-time frequency visualization
- **Lyrics Display** - Demo lyrics panel (real lyrics in V2)
- **Playlist Management** - Create, edit, and manage custom playlists
- **Queue System** - Add songs to queue and manage playback order

### 🎨 User Interface
- **Glassmorphism Design** - Modern glass-effect UI
- **Responsive Layout** - Optimized for desktop, tablet, and mobile
- **Dark Theme** - Beautiful gradients and smooth animations
- **Interactive Components** - Hover effects and dynamic cards

### ⚡ Advanced Features
- **Progressive Web App (PWA)** - Installable on desktop/mobile
- **API Response Caching** - Faster searches with 24-hour TTL
- **Offline Indicator** - Connection status monitoring
- **Persistent State** - Settings and playlists in localStorage
- **Keyboard Shortcuts** - Quick controls for power users

### 🎛️ Audio Controls
- **Full Playback Controls** - Play, pause, skip, previous
- **Volume Control** - Adjustable with visual feedback
- **Progress Tracking** - Seekable timeline with time display
- **Repeat Modes** - No repeat, repeat one, repeat all
- **Shuffle Mode** - Randomize playlist order

## 🚀 Quick Start

### For Testers (Windows - Easy Setup)

1. **Install Node.js** - Download from [nodejs.org](https://nodejs.org/) (LTS version)
2. **Run Setup** - Double-click `setup.bat` (first time only, installs dependencies)
3. **Start App** - Double-click `start.bat` (opens browser automatically)

That's it! The app will open at `http://localhost:5173`

📖 See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions and troubleshooting.

### For Developers (Manual Setup)

```bash
# Clone the repository
git clone <your-repo-url>
cd "Project JetStream"

# Install dependencies
cd web
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18.2 with TypeScript 5.3
- **Build Tool**: Vite 5.4
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: CSS Modules
- **API**: Deezer Public API
- **Audio**: HTML5 Audio + Web Audio API

### Project Structure
```
JetStream/
├── web/                          # Web application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── store/               # Redux store
│   │   └── router/              # Routing config
│   ├── public/                  # Static assets
│   └── package.json
├── shared/                       # Shared types & theme
├── docs/                        # Documentation
├── setup.bat                    # Windows setup script
├── start.bat                    # Windows start script
└── README.md                    # This file
```

## � Tech Stack Details

### Main Dependencies
- **Web**: React with TypeScript
- **Desktop**: Electron
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation

### Backend
- **Server**: Node.js with Express.js
- **Database**: PostgreSQL + MongoDB
- **Cache**: Redis
- **Storage**: AWS S3 / IPFS

### Advanced Features
- **AI/ML**: TensorFlow.js
- **Blockchain**: Ethereum, Web3.js
- **AR/VR**: Unity, WebXR
- **Audio**: Expo AV, Web Audio API

## 📦 Installation

### Prerequisites
- **Node.js** (v18+) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo CLI** - Install with `npm install -g expo-cli`
- **Git** - [Download here](https://git-scm.com/)
- **MongoDB** (optional for backend) - [Download here](https://www.mongodb.com/)

### Quick Start

**Step 1: Clone the repository**
```bash
git clone https://github.com/yourusername/jetstream.git
cd jetstream
```

**Step 2: Install dependencies**
```bash
# Install all dependencies
npm install

# Install mobile dependencies
cd mobile
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..
```

**Step 3: Configure environment**

**For Web App (Optional - for full-length audio):**
```bash
cd web
copy .env.example .env
# Add your YouTube API key for full-length audio (optional)
# Without it, app uses free Invidious API
cd ..
```

**For Backend:**
```bash
cd backend
copy .env.example .env
# Edit .env with your configuration
cd ..
```

**Step 4: Start development**

**Terminal 1 - Mobile App:**
```bash
cd mobile
npm start
# Scan QR code with Expo Go app on your phone
# Or press 'a' for Android emulator, 'i' for iOS simulator
```

**Terminal 2 - Backend Server:**
```bash
cd backend
npm run dev
# Backend will run on http://localhost:5000
```

📖 **Need more help?** See [NEXT_STEPS.md](./NEXT_STEPS.md) for detailed instructions!

## � Full-Length Audio Playback

JetStream uses a **hybrid approach** to provide full-length songs:

- **Deezer API** for metadata (song info, album art, artist data)
- **YouTube** for full-length audio streams

### Setup (Optional but Recommended)

1. Get a free YouTube API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Add to `web/.env`:
   ```env
   VITE_YOUTUBE_API_KEY=your_api_key_here
   ```

Without an API key, the app uses **Invidious** (free YouTube frontend) - works but may be slower.

📖 **See [Full Audio Setup Guide](./docs/FULL_AUDIO_SETUP.md)** for complete instructions!

## �🎯 Roadmap

### Phase 1 (Months 1-2): MVP Core
- [x] Project setup and architecture
- [ ] Basic audio playback
- [ ] Offline storage
- [ ] Minimalistic UI/UX
- [ ] User authentication

### Phase 2 (Months 3-4): Online Features
- [ ] API integrations
- [ ] Cloud sync
- [ ] Playlist management
- [ ] AI recommendations (basic)
- [ ] Social features

### Phase 3 (Months 5-6): Advanced Features
- [ ] Blockchain integration
- [ ] AR/VR support
- [ ] Plugin system
- [ ] Advanced AI
- [ ] Multi-device ecosystem

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the open-source community
- Inspired by the need for versatile, privacy-focused music players

## � Documentation

| Document | Description |
|----------|-------------|
| [📋 NEXT_STEPS.md](./NEXT_STEPS.md) | Quick start guide for developers |
| [🚀 GETTING_STARTED.md](./docs/GETTING_STARTED.md) | Detailed setup instructions |
| [🏗️ ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture and design |
| [📡 API.md](./docs/API.md) | Backend API documentation |
| [🗺️ ROADMAP.md](./docs/ROADMAP.md) | Development timeline |
| [🤝 CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Contribution guidelines |
| [📊 PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Comprehensive project overview |
| [📁 STRUCTURE.md](./STRUCTURE.md) | Complete file structure |
| [🎵 FULL_AUDIO_SETUP.md](./docs/FULL_AUDIO_SETUP.md) | Full-length audio configuration |
| [🔄 MIGRATION_GUIDE.md](./docs/MIGRATION_GUIDE.md) | Migrate from previews to full audio |

## 📞 Contact

- **Email**: contact@jetstream.app
- **Discord**: [Join our community](https://discord.gg/jetstream) (Coming soon)
- **Twitter**: [@jetstreamapp](https://twitter.com/jetstreamapp)
- **Issues**: [GitHub Issues](https://github.com/yourusername/jetstream/issues)

---

**Important Note**: This project respects copyright laws and integrates only with legal music sources. Always ensure compliance with licensing requirements.

**Built with ❤️ for music lovers everywhere** 🎵
