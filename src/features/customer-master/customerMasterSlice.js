import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {customerMasterHandler} from './customerMasterThunk.js';

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
  loading: false,
  customer: null,
  error: null,
};

const customerMasterSlice = createSlice({
  name: 'customer-master',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(customerMasterHandler.pending, state => {
        state.loading = true;
        state.error = null;
        // console.log('Customer Master Slice');
      })
      .addCase(customerMasterHandler.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.customer = payload;
        // console.log('Customer Master Slice payload', payload);
      })
      .addCase(customerMasterHandler.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
        console.log('Customer Master Slice error', action.payload);
      });
  },
});

// export const customerCredentials = state => state.customer_master;
// export const {setCredentialsReducer} = customerSlice.actions;
export default customerMasterSlice.reducer;
