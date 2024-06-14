import {createSlice} from '@reduxjs/toolkit';
import bankMasterHandler from './bankMasterThunk';

const initialState = {
  isLoading: false,
  bank: null,
  isError: null,
};

const bankMasterSlice = createSlice({
  name: 'bank-Master',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(bankMasterHandler.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(bankMasterHandler.fulfilled, (state, {payload}) => {
        state.bank = payload;
        state.isLoading = false;
        state.isError = null;
        // console.log("payload", payload)
      })
      .addCase(bankMasterHandler.rejected, (state, {payload}) => {
        state.isError = payload;
      });
  },
});

export default bankMasterSlice.reducer;
