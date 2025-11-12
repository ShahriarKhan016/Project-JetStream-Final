/**
 * Settings Slice - Manages app settings and preferences
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences, AudioSettings } from '@/types';

interface SettingsState {
  preferences: UserPreferences;
  audioSettings: AudioSettings;
}

const initialState: SettingsState = {
  preferences: {
    theme: 'dark',
    audioQuality: 'high',
    offlineMode: false,
    crossfadeEnabled: true,
    crossfadeDuration: 5,
    gaplessPlayback: true,
    normalizeVolume: true,
    language: 'en',
    notificationsEnabled: true,
    dataUsage: 'wifi',
    aiRecommendations: true,
    explicitContent: false,
  },
  audioSettings: {
    equalizer: {
      name: 'Flat',
      bands: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    bass: 0,
    treble: 0,
    spatialAudio: false,
    noiseCancellation: false,
    reverb: 0,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    
    setAudioSettings: (state, action: PayloadAction<Partial<AudioSettings>>) => {
      state.audioSettings = { ...state.audioSettings, ...action.payload };
    },
    
    setEqualizerPreset: (state, action: PayloadAction<{ name: string; bands: number[] }>) => {
      state.audioSettings.equalizer = action.payload;
    },
    
    toggleOfflineMode: (state) => {
      state.preferences.offlineMode = !state.preferences.offlineMode;
    },
    
    toggleCrossfade: (state) => {
      state.preferences.crossfadeEnabled = !state.preferences.crossfadeEnabled;
    },
    
    toggleSpatialAudio: (state) => {
      state.audioSettings.spatialAudio = !state.audioSettings.spatialAudio;
    },
  },
});

export const {
  setPreferences,
  setAudioSettings,
  setEqualizerPreset,
  toggleOfflineMode,
  toggleCrossfade,
  toggleSpatialAudio,
} = settingsSlice.actions;

export default settingsSlice.reducer;
