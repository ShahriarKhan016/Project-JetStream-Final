/**
 * Library Slice for Web
 */

import { createSlice } from '@reduxjs/toolkit'

interface LibraryState {
  tracks: any[]
  playlists: any[]
}

const initialState: LibraryState = {
  tracks: [],
  playlists: [],
}

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
})

export default librarySlice.reducer
