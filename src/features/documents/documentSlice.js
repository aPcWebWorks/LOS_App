import {createSlice} from '@reduxjs/toolkit';
import {documentHandler} from './documentThunk';

const initialState = {
  isLoading: false,
  document: null,
  error: null,
};

const documentSlice = createSlice({
  name: 'loan-Master',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(documentHandler.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(documentHandler.fulfilled, (state, {payload}) => {
        state.document = payload;
        state.isLoading = false;
      })
      .addCase(documentHandler.rejected, (state, {payload}) => {
        state.error = payload;
      });
  },
});

export default documentSlice.reducer;
