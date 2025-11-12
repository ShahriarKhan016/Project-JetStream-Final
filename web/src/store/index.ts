/**
 * Redux Store Configuration for Web
 */

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Import slices (we'll use simplified versions for web)
import playerReducer from './slices/playerSlice'
import libraryReducer from './slices/librarySlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    library: libraryReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
