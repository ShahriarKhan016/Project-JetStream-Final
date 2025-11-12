/**
 * User Slice - Manages user authentication and profile
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
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
  setUser,
  logout,
  updateProfile,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
