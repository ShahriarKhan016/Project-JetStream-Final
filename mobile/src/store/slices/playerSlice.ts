/**
 * Player Slice - Manages playback state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaybackState, Track, RepeatMode } from '@/types';

const initialState: PlaybackState = {
  currentTrack: null,
  isPlaying: false,
  isPaused: false,
  isLoading: false,
  queue: [],
  history: [],
  currentIndex: 0,
  position: 0,
  duration: 0,
  volume: 1.0,
  repeatMode: 'off',
  shuffleEnabled: false,
  speed: 1.0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.isLoading = false;
    },
    
    play: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
    },
    
    pause: (state) => {
      state.isPlaying = false;
      state.isPaused = true;
    },
    
    stop: (state) => {
      state.isPlaying = false;
      state.isPaused = false;
      state.position = 0;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setQueue: (state, action: PayloadAction<Track[]>) => {
      state.queue = action.payload;
    },
    
    addToQueue: (state, action: PayloadAction<Track>) => {
      state.queue.push(action.payload);
    },
    
    removeFromQueue: (state, action: PayloadAction<number>) => {
      state.queue.splice(action.payload, 1);
    },
    
    clearQueue: (state) => {
      state.queue = [];
    },
    
    setPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
    
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
    },
    
    setRepeatMode: (state, action: PayloadAction<RepeatMode>) => {
      state.repeatMode = action.payload;
    },
    
    toggleShuffle: (state) => {
      state.shuffleEnabled = !state.shuffleEnabled;
    },
    
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = Math.max(0.5, Math.min(2.0, action.payload));
    },
    
    nextTrack: (state) => {
      if (state.currentIndex < state.queue.length - 1) {
        state.currentIndex += 1;
        state.currentTrack = state.queue[state.currentIndex];
        state.position = 0;
      } else if (state.repeatMode === 'all') {
        state.currentIndex = 0;
        state.currentTrack = state.queue[0];
        state.position = 0;
      }
    },
    
    previousTrack: (state) => {
      if (state.position > 3) {
        // If more than 3 seconds, restart current track
        state.position = 0;
      } else if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentTrack = state.queue[state.currentIndex];
        state.position = 0;
      }
    },
    
    addToHistory: (state, action: PayloadAction<Track>) => {
      state.history.unshift(action.payload);
      if (state.history.length > 50) {
        state.history = state.history.slice(0, 50);
      }
    },
  },
});

export const {
  setCurrentTrack,
  play,
  pause,
  stop,
  setLoading,
  setQueue,
  addToQueue,
  removeFromQueue,
  clearQueue,
  setPosition,
  setDuration,
  setVolume,
  setRepeatMode,
  toggleShuffle,
  setSpeed,
  nextTrack,
  previousTrack,
  addToHistory,
} = playerSlice.actions;

export default playerSlice.reducer;
