import {createSlice} from '@reduxjs/toolkit';
import {userLogin, userLogout} from './authThunks';

const initialState = {
  isLoading: false,
  user: null,
  isError: null,
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
        state.isError = null;
      })
      .addCase(userLogin.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.user = payload.data;
        state.success = true;
        // console.log('login payload', payload.data);
      })
      .addCase(userLogin.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = payload;
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
        state.isError = action.error.message;
      });
  },
});

export default authSlice.reducer;
