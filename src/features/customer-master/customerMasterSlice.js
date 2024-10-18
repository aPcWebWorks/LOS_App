import {createSlice} from '@reduxjs/toolkit';
import {
  customerMasterHandler,
  getCustomerWithId,
  searchCustomerByParameter,
} from './customerMasterThunk.js';

const initialState = {
  isLoading: false,
  customer: null,
  isError: false,
  error: null,
};

const customerMasterSlice = createSlice({
  name: 'customer-master',
  initialState,
  reducers: {},
  // filterHandler: (state, {payload}) =>{
  //   console.log("Filter Handler is clicking", payload);
  //   state.filteredCustomers = state.customers.filter((customer)=>{
  //     return (
  //       customer.customerName===payload.customerName &&
  //       customer.customerId===payload.customerId &&
  //       customer.mobilenumber===payload.mobilenumber &&
  //       customer.email===payload.email
  //     );

  extraReducers: builder => {
    builder
      .addCase(customerMasterHandler.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(customerMasterHandler.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.customer = payload;
      })
      .addCase(customerMasterHandler.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      });
  },
});

// export const customerCredentials = state => state.customer_master;
// export const {setCredentialsReducer} = customerSlice.actions;
// export const {filterHandler}=customerMasterSlice.actions;

const getCustomerWithIdSlice = createSlice({
  name: 'getCustomerWithId',
  initialState: {isLoading: false, isError: true, error: null, customer: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCustomerWithId.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCustomerWithId.fulfilled, (state, {payload}) => {
        state.customer = payload?.data;
        state.isLoading = false;
      })
      .addCase(getCustomerWithId.rejected, (state, {payload}) => {
        state.isError = true;
        state.error = payload;
        state.isLoading = false;
      });
  },
});

const searchCustomerByParameterSlice = createSlice({
  name: 'initialParamsState',
  initialState: {
    isLoading: false,
    customers: null,
    isError: false,
    error: null,
  },
  reducers: {
    customerParamsClearState: state => {
      state.customerParams = null;
      console.log('customerParamsClearState');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchCustomerByParameter.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(searchCustomerByParameter.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.customers = payload;
      })

      .addCase(searchCustomerByParameter.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = true;
        state.error = payload;
      });
  },
});

export const {customerParamsClearState} =
  searchCustomerByParameterSlice.actions;
export {searchCustomerByParameterSlice, getCustomerWithIdSlice};
export default customerMasterSlice.reducer;
