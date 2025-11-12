# JetStream Music Player - Quick Setup Guide

## For Testers & Team Members

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
  - Download the LTS (Long Term Support) version
  - Install with default settings
  - Restart your computer after installation

### Quick Start (Windows)

1. **Download the project**
   - Clone or download this repository
   - Extract to a folder (e.g., `C:\JetStream`)

2. **Run Setup (First Time Only)**
   - Double-click `setup.bat`
   - Wait for dependencies to install (2-5 minutes)
   - You'll see "Setup completed successfully!"

3. **Start the Application**
   - Double-click `start.bat`
   - The app will open automatically in your browser at `http://localhost:5173`
   - Keep the black terminal window open while using the app

4. **Stop the Application**
   - Close the browser tab
   - Press `Ctrl+C` in the terminal window
   - Or simply close the terminal window

### Manual Setup (Alternative Method)

If batch files don't work, use these commands:

```bash
# 1. Install dependencies
cd web
npm install

# 2. Start the application
npm run dev
```

Then open your browser to: `http://localhost:5173`

### Troubleshooting

**Problem: "Node.js is not installed" error**
- Solution: Install Node.js from https://nodejs.org/
- Choose the LTS version
- Restart your computer

**Problem: Port 5173 is already in use**
- Solution: Vite will automatically use another port (5174, 5175, etc.)
- Check the terminal for the actual URL

**Problem: "npm not found" error**
- Solution: Node.js installation didn't complete properly
- Uninstall Node.js
- Reinstall from https://nodejs.org/
- Restart computer

**Problem: Browser doesn't open automatically**
- Solution: Manually open your browser
- Go to: `http://localhost:5173`

**Problem: Application is slow**
- Solution: First load always takes 10-20 seconds
- Subsequent page loads are faster
- Check your internet connection (needed for music API)

### System Requirements

- **OS**: Windows 10/11, macOS, or Linux
- **Browser**: Chrome, Firefox, Edge, or Safari (latest versions)
- **RAM**: 4GB minimum, 8GB recommended
- **Internet**: Required for streaming music
- **Disk Space**: ~500MB for dependencies

### Testing Checklist

Please test these features and report any issues:

- [ ] Home page loads correctly
- [ ] Search for songs works
- [ ] Play/pause/skip controls work
- [ ] Audio plays smoothly
- [ ] Lyrics panel displays demo lyrics
- [ ] Volume control works
- [ ] Playlist creation works
- [ ] Responsive design on mobile browser
- [ ] Offline indicator shows when disconnected

### Reporting Issues

When reporting bugs, please include:
1. What you were trying to do
2. What happened (with screenshots if possible)
3. What you expected to happen
4. Browser and OS version
5. Any error messages from the console (F12 → Console tab)

### Contact

For questions or issues, contact the development team or create an issue on GitHub.
