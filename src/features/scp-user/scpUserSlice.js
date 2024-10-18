import {createSlice} from '@reduxjs/toolkit';
import {getWithSCPNumberHandler, scpUserDetailsHandler} from './scpUserThunk';

const initialState = {
  isLoading: false,
  scpNumber: null,
  scpUser: null,
  isError: false,
  error: null,
};

const scpUserSlice = createSlice({
  name: 'scp',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // SCP User Details Handler
      .addCase(scpUserDetailsHandler.pending, (state, {payload}) => {
        state.isLoading = true;
        state.scpNumber = null;
        state.scpUser = null;
        state.isError = false;
        state.error = null;
      })
      .addCase(scpUserDetailsHandler.fulfilled, (state, {payload}) => {
        state.scpUser = payload;
        state.isLoading = false;
      })
      .addCase(scpUserDetailsHandler.rejected, (state, {payload}) => {
        state.error = payload;
        state.isError = true;
        state.isLoading = false;
      })

      // Get With SCP Number Handler
      .addCase(getWithSCPNumberHandler.pending, state => {
        state.isLoading = true;
        state.scpNumber = null;
        state.isError = false;
        state.error = null;
      })
      .addCase(getWithSCPNumberHandler.fulfilled, (state, {payload}) => {
        state.scpNumber = payload;
        state.isLoading = false;
      })
      .addCase(getWithSCPNumberHandler.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      });
  },
});

export default scpUserSlice.reducer;
