import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {
  customerMasterHandler,
  geCustomerWithId,
  searchCustomerParamsHandler,
} from './customerMasterThunk.js';

export const postCustomerCredentials = createAsyncThunk(
  'customer/postCustomerCredentials',
  async (credentials, thunkAPI) => {
    // console.log('postCustomerCredentials', credentials);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axiosInstance.post(
        '/customer',
        credentials,
        config,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  isLoading: false,
  customer: null,
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
        state.error = null;
        console.log('Customer Master Slice');
      })
      .addCase(customerMasterHandler.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.customer = payload;
        // console.log('Customer Master Slice payload', payload);
      })
      .addCase(customerMasterHandler.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.error = payload;
        console.log('Customer Master Slice error', action.payload);
      });
  },
});

// export const customerCredentials = state => state.customer_master;
// export const {setCredentialsReducer} = customerSlice.actions;
// export const {filterHandler}=customerMasterSlice.actions;

const geCustomerWithIdSlice = createSlice({
  name: 'geCustomerWithId',
  initialState: {isLoading: false, isError: null, customer: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(geCustomerWithId.pending, state => {
        state.isLoading = true;
      })
      .addCase(geCustomerWithId.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.customer = payload;
      })
      .addCase(geCustomerWithId.rejected, (state, {payload}) => {
        state.isError = payload;
      });
  },
});

const customerMasterParamsSlice = createSlice({
  name: 'initialParamsState',
  initialState: {isLoading: false, customerParams: null, error: null},
  reducers: {
    customerParamsClearState: state => {
      state.customerParams = null;
      console.log('customerParamsClearState');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchCustomerParamsHandler.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(searchCustomerParamsHandler.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.customerParams = payload;
        // console.log("payload", payload)
      })

      .addCase(searchCustomerParamsHandler.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const {customerParamsClearState} = customerMasterParamsSlice.actions;
export {customerMasterParamsSlice, geCustomerWithIdSlice};
export default customerMasterSlice.reducer;
