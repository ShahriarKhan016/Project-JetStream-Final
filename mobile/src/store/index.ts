/**
 * Redux Store Configuration
 * Manages global state for JetStream
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import playerReducer from './slices/playerSlice';
import libraryReducer from './slices/librarySlice';
import userReducer from './slices/userSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    library: libraryReducer,
    user: userReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization
        ignoredActions: ['player/setAudioObject'],
        // Ignore these paths in the state
        ignoredPaths: ['player.audioObject'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for better TypeScript support
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
