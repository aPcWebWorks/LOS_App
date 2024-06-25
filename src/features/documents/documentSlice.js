import {createSlice} from '@reduxjs/toolkit';
import documentHandler from './documentThunk';

const initialState = {
  isLoading: false,
  document: null,
  error: null,
};

const documentSlice = createSlice({
  name: 'loanMaster',
  initialState,
  reducers: {
    resetDocumentState: state => {
      state.document = null;
      state.isLoading = false;
      state.error = null;
      // console.log('reset state');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(documentHandler.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(documentHandler.fulfilled, (state, {payload}) => {
        state.document = payload;
        state.isLoading = false;
        // console.log('payload Ids', payload);
      })
      .addCase(documentHandler.rejected, (state, {error}) => {
        // Use error instead of payload for rejected case
        state.error = error.message;
        state.isLoading = false;
      });
  },
});

export const {resetDocumentState} = documentSlice.actions;
export default documentSlice.reducer;
