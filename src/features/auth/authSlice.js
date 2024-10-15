import {createSlice} from '@reduxjs/toolkit';
import {userLogin, tokenChecker, userLogout} from './authThunks';

const initialState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Login user
    builder
      .addCase(userLogin.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(userLogin.fulfilled, (state, {payload}) => {
        if (!payload) return;

        state.isLoading = false;
        state.user = payload;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state, {payload}) => {
        if (!payload) return;

        state.isLoading = false;
        state.isAuthenticated = false;
        state.isError = payload;
      })

      // Logout user
      .addCase(userLogout.pending, state => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isError = null;
      })
      .addCase(userLogout.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = payload;
      })

      // TokenChecker
      .addCase(tokenChecker.fulfilled, (state, {payload}) => {
        state.isLoading = true;
        state.isAuthenticated = payload;
      })
      .addCase(tokenChecker.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isAuthenticated = payload;
        state.isError = payload;
      });
  },
});

export default authSlice.reducer;
