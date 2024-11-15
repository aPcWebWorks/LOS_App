import {createSlice} from '@reduxjs/toolkit';
import {
  loanDetailsHandler,
  loanMasterHandler,
  getAllLoanTypeHandler,
  loanGenerationHandler,
  getLoanTypeWithIdHandler,
} from './loanMasterThunk';

const initialState = {
  isLoading: false,
  loan: null,
  isError: false,
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
        state.isError = false;
        state.error = null;
      })
      .addCase(loanMasterHandler.fulfilled, (state, {payload}) => {
        state.loan = payload;
        state.isLoading = false;
      })
      .addCase(loanMasterHandler.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = true;
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
      .addCase(getAllLoanTypeHandler.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllLoanTypeHandler.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loans = action.payload;
      })
      .addCase(getAllLoanTypeHandler.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

const loanGenerationSlice = createSlice({
  name: 'loan-generation',
  initialState: {isLoading: null, generatedLoan: null, isError: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loanGenerationHandler.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(loanGenerationHandler.fulfilled, (state, {payload}) => {
        state.generatedLoan = payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(loanGenerationHandler.rejected, (state, {payload}) => {
        state.isError = payload;
        state.isLoading = false;
      });
  },
});

const loanGetWithIdSlice = createSlice({
  name: 'loan-generation',
  initialState: {isLoading: null, loanType: null, isError: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLoanTypeWithIdHandler.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLoanTypeWithIdHandler.fulfilled, (state, {payload}) => {
        state.loanType = payload?.data;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(getLoanTypeWithIdHandler.rejected, (state, {payload}) => {
        state.isError = payload;
        state.isLoading = false;
      });
  },
});

export {
  loanDetailsSlice,
  loanTypeSlice,
  loanGenerationSlice,
  loanGetWithIdSlice,
};
export default loanMasterSlice.reducer;
