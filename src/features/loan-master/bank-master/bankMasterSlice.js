import {createSlice} from '@reduxjs/toolkit';
import bankMasterHandler, {getAllBankHandller} from './bankMasterThunk';

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
      })
      .addCase(bankMasterHandler.rejected, (state, {payload}) => {
        state.isError = payload;
      });
  },
});

const getBanksSlice = createSlice({
  name: 'bank-Master/get-all-bank',
  initialState: {isLoading: false, allbanks: null, isError: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllBankHandller.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllBankHandller.fulfilled, (state, {payload}) => {
        state.allbanks = payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(getAllBankHandller.rejected, (state, {payload}) => {
        state.isError = payload;
      });
  },
});

export {getBanksSlice};
export default bankMasterSlice.reducer;
