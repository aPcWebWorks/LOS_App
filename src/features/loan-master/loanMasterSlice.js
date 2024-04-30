import {createSlice} from '@reduxjs/toolkit';
import {loanMasterHandler} from './loanMasterThunk';

const initialState = {
  isLoading: false,
  loan: null,
  filteredData: [],
  error: null,
};

const loanMasterSlice = createSlice({
  name: 'loan-Master',
  initialState,
  reducers: {
    filterHandler: (state, {payload}) => {
      const _filterData = state.loan?.records?.record;
      const searchValue = payload.value;

      // state.loan.records.record = _filterData.filter(item => {
      //   item.response.loanTypeId
      //     .toLowerCase()
      //     .includes(searchValue.toLowerCase());
      //   console.log('filteredData', item);
      // });

      // const customFilter = _filterData.filter(item => {
      //   if (item.response.loanTypeId.match(searchValue)) {
      //     console.log('Item', item);
      //     return item;
      //   }
      //   console.log('No Data found');
      // });
      // state.filteredData = customFilter;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loanMasterHandler.pending, (state, {payload}) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loanMasterHandler.fulfilled, (state, {payload}) => {
        state.loan = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loanMasterHandler.rejected, (state, {payload}) => {
        state.error = payload;
      });
  },
});

export const {filterHandler} = loanMasterSlice.actions;
export default loanMasterSlice.reducer;
