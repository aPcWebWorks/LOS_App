import {createSlice} from '@reduxjs/toolkit';
import {userLogin, userLogout} from './authThunks';

const initialState = {
  isLoading: false,
  // user: null,
  error: null,
  success: false,
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
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, {payload}) => {
        // state.user = payload;
        state.isLoading = false;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.error = payload;
      });

    // Logout user
    builder
      .addCase(userLogout.pending, state => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, state => {
        state.isLoading = false;
        // state.user = null;
        state.success = false;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
