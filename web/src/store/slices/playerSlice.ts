/**
 * Player Slice for Web
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Track {
  id: string
  title: string
  artist: string
  album?: string
  duration: number
  coverArt?: string
  audioUrl: string
}

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  position: number
  queue: Track[]
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 1.0,
  position: 0,
  queue: [],
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload
    },
    play: (state) => {
      state.isPlaying = true
    },
    pause: (state) => {
      state.isPlaying = false
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    setPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload
    },
  },
})

export const { setCurrentTrack, play, pause, setVolume, setPosition } = playerSlice.actions
export default playerSlice.reducer
