import {createSlice} from '@reduxjs/toolkit';
import {getWithSCPNumberHandler, scpUserDetailsHandler} from './scpUserThunk';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const initialState = {
  isLoading: false,
  userByScpNumber: null,
  userByScpDetails: null,
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
        state.error = null;
      })
      .addCase(scpUserDetailsHandler.fulfilled, (state, {payload}) => {
        state.userByScpDetails = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(scpUserDetailsHandler.rejected, (state, {payload}) => {
        state.error = payload;
      })

      // Get With SCP Number Handler
      .addCase(getWithSCPNumberHandler.fulfilled, (state, {payload}) => {
        state.userByScpNumber = payload;
      })
      .addCase(getWithSCPNumberHandler.rejected, (state, {payload}) => {
        state.error = action.error.message;
      });
  },
});

export default scpUserSlice.reducer;
