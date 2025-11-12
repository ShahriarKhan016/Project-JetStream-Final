# JetStream - Getting Started Guide

## 🚀 Quick Start

Welcome to JetStream! This guide will help you set up the project and start development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Expo CLI** - For mobile development
  ```bash
  npm install -g expo-cli
  ```
- **MongoDB** (Optional - for backend) - [Download](https://www.mongodb.com/try/download/community)
- **PostgreSQL** (Optional - for backend) - [Download](https://www.postgresql.org/download/)

## 📁 Project Structure

```
JetStream/
├── mobile/              # React Native mobile app (Expo)
├── web/                 # React web application
├── desktop/             # Electron desktop app
├── backend/             # Node.js/Express API server
├── blockchain/          # Smart contracts (Web3)
├── ai-engine/           # ML recommendation system
├── shared/              # Shared types and utilities
│   ├── theme/           # Design system
│   └── types/           # TypeScript interfaces
└── docs/                # Documentation
```

## 🎨 Design System

JetStream uses a minimalistic dark theme with carefully curated colors:

### Color Palette
- **Background Primary**: `#0A0E27` (Deep Space Black)
- **Background Secondary**: `#141B34` (Elevated Surfaces)
- **Accent Blue**: `#00D9FF` (Primary Actions)
- **Accent Purple**: `#9D4EDD` (Secondary Highlights)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#A0A9C0`

## 📱 Mobile App Setup

### 1. Navigate to Mobile Directory
```bash
cd mobile
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

### 4. Run on Your Device
- **iOS Simulator** (Mac only):
  ```bash
  npm run ios
  ```
- **Android Emulator**:
  ```bash
  npm run android
  ```
- **Physical Device**: 
  - Install Expo Go app on your phone
  - Scan the QR code from the terminal

## 🖥️ Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jetstream
# ... (add other variables as needed)
```

### 4. Start Development Server
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

## 🌐 Full Stack Development

To run both mobile and backend simultaneously:

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Mobile
```bash
cd mobile
npm start
```

## 📦 Installing All Dependencies

From the root directory:

```bash
npm install
npm run install-all
```

This will install dependencies for all modules.

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Mobile Tests
```bash
cd mobile
npm test
```

### Run Backend Tests
```bash
cd backend
npm test
```

## 🔨 Building for Production

### Mobile (Android APK)
```bash
cd mobile
eas build --platform android
```

### Mobile (iOS)
```bash
cd mobile
eas build --platform ios
```

### Backend
```bash
cd backend
npm run build
npm start
```

## 🎯 Development Workflow

### 1. Create a New Feature
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Edit code in your preferred editor (VS Code recommended)
- Save files - hot reloading will update the app automatically

### 3. Commit Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

### 4. Push to Repository
```bash
git push origin feature/your-feature-name
```

## 🐛 Common Issues & Solutions

### Issue: Expo not starting
**Solution**: Clear cache and restart
```bash
expo start -c
```

### Issue: Dependencies not installing
**Solution**: Clear node_modules and reinstall
```bash
rm -rf node_modules
npm install
```

### Issue: Backend can't connect to database
**Solution**: Ensure MongoDB/PostgreSQL is running
```bash
# Check MongoDB status
mongod --version

# Check PostgreSQL status
pg_ctl status
```

### Issue: Port already in use
**Solution**: Kill process on the port
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Unix/Mac
lsof -ti:5000 | xargs kill
```

## 📚 Key Technologies

### Frontend (Mobile)
- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform
- **Redux Toolkit**: State management
- **React Navigation**: Navigation library

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **PostgreSQL**: SQL database
- **JWT**: Authentication

### Advanced Features
- **TensorFlow.js**: AI/ML recommendations
- **Web3.js**: Blockchain integration
- **WebXR**: AR/VR experiences

## 🎓 Learning Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 🤝 Getting Help

- **Discord**: Join our community (coming soon)
- **Issues**: Report bugs on GitHub
- **Documentation**: Check `/docs` folder

## 🎉 Next Steps

1. ✅ Set up development environment
2. 🔨 Explore the codebase
3. 📱 Run the mobile app
4. 🖥️ Start the backend
5. 🎨 Customize the UI
6. 🚀 Build your first feature!

Happy coding! 🎵
