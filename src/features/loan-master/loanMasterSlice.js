import {createSlice} from '@reduxjs/toolkit';
import {
  loanDetailsHandler,
  loanMasterHandler,
  getAllLoanHandler,
  loanGenerationHandler,
} from './loanMasterThunk';

const initialState = {
  isLoading: false,
  loan: null,
  response:null,
  error: null,
};

const loanMasterSlice = createSlice({
  name: 'loan-Master',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loanMasterHandler.pending, state => {
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

const loanDetailsSlice = createSlice({
  name: 'loan-Master',
  initialState: {isLoading: null, loanDetails: null, isError: null},
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loanDetailsHandler.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loanDetailsHandler.fulfilled, (state, {payload}) => {
        // state.loanDetails = payload?.records?.record;
        state.loanDetails = payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(loanDetailsHandler.rejected, (state, {payload}) => {
        state.isError = payload;
      });
  },
});

const loanTypeSlice = createSlice({
  name: 'loanMaster',
  initialState: {
    loans: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllLoanHandler.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllLoanHandler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loans = action.payload;
      })
      .addCase(getAllLoanHandler.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
const loanGenerationSlice = createSlice({
  name: 'loan-Master',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loanGenerationHandler.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loanGenerationHandler.fulfilled, (state, { payload }) => {
        state.response = payload.data; 
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loanGenerationHandler.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});


export {loanDetailsSlice, loanTypeSlice, loanGenerationSlice};
export default loanMasterSlice.reducer;
