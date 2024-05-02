import {createSlice} from '@reduxjs/toolkit';
import {loanMasterHandler} from './loanMasterThunk';

const initialState = {
  isLoading: false,
  loan: null,
  error: null,
};

const loanMasterSlice = createSlice({
  name: 'loan-Master',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loanMasterHandler.pending, (state, {payload}) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loanMasterHandler.fulfilled, (state, {payload}) => {
        state.loan = payload?.records?.record;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loanMasterHandler.rejected, (state, {payload}) => {
        state.error = payload;
      });
  },
});

export default loanMasterSlice.reducer;
