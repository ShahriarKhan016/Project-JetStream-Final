/**
 * Library Slice - Manages user's music library
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, Album, Artist, Playlist } from '@/types';

interface LibraryState {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  likedTracks: Track[];
  recentlyPlayed: Track[];
  downloadedTracks: Track[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LibraryState = {
  tracks: [],
  albums: [],
  artists: [],
  playlists: [],
  likedTracks: [],
  recentlyPlayed: [],
  downloadedTracks: [],
  isLoading: false,
  error: null,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
    },
    
    addTrack: (state, action: PayloadAction<Track>) => {
      state.tracks.push(action.payload);
    },
    
    removeTrack: (state, action: PayloadAction<string>) => {
      state.tracks = state.tracks.filter((track: Track) => track.id !== action.payload);
    },
    
    setAlbums: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
    },
    
    setArtists: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
    },
    
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
    
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex((p: Playlist) => p.id === action.payload.id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
      }
    },
    
    removePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter((p: Playlist) => p.id !== action.payload);
    },
    
    likeTrack: (state, action: PayloadAction<Track>) => {
      if (!state.likedTracks.find((t: Track) => t.id === action.payload.id)) {
        state.likedTracks.push(action.payload);
      }
    },
    
    unlikeTrack: (state, action: PayloadAction<string>) => {
      state.likedTracks = state.likedTracks.filter((t: Track) => t.id !== action.payload);
    },
    
    addToRecentlyPlayed: (state, action: PayloadAction<Track>) => {
      state.recentlyPlayed = [
        action.payload,
        ...state.recentlyPlayed.filter((t: Track) => t.id !== action.payload.id),
      ].slice(0, 20);
    },
    
    addDownloadedTrack: (state, action: PayloadAction<Track>) => {
      if (!state.downloadedTracks.find((t: Track) => t.id === action.payload.id)) {
        state.downloadedTracks.push(action.payload);
      }
    },
    
    removeDownloadedTrack: (state, action: PayloadAction<string>) => {
      state.downloadedTracks = state.downloadedTracks.filter((t: Track) => t.id !== action.payload);
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTracks,
  addTrack,
  removeTrack,
  setAlbums,
  setArtists,
  setPlaylists,
  addPlaylist,
  updatePlaylist,
  removePlaylist,
  likeTrack,
  unlikeTrack,
  addToRecentlyPlayed,
  addDownloadedTrack,
  removeDownloadedTrack,
  setLoading,
  setError,
} = librarySlice.actions;

export default librarySlice.reducer;
