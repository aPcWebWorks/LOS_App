import {createSlice} from '@reduxjs/toolkit';
import documentHandler from './documentThunk';

const initialState = {
  isLoading: false,
  documents: [],
  error: null,
};

const documentSlice = createSlice({
  name: 'loanMaster',
  initialState,
  reducers: {
    resetDocumentState: state => {
      state.documents = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(documentHandler.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(documentHandler.fulfilled, (state, {payload}) => {
        state.documents.push(payload);
        state.isLoading = false;
      })
      .addCase(documentHandler.rejected, (state, {error}) => {
        state.error = error.message;
        state.isLoading = false;
      });
  },
});

export const {resetDocumentState} = documentSlice.actions;
export default documentSlice.reducer;
