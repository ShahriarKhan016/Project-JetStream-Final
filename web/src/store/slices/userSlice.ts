/**
 * User Slice for Web
 */

import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  currentUser: any | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default userSlice.reducer
