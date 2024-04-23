import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';

export const postCustomerCredentials = createAsyncThunk(
  'customer/postCustomerCredentials',
  async (credentials, thunkAPI) => {
    console.log('postCustomerCredentials', credentials);
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
  customer: null,
  error: null,
  loading: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postCustomerCredentials.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCustomerCredentials.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(postCustomerCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const customerCredentials = state => state.customer_master;
// export const {setCredentialsReducer} = customerSlice.actions;
export default customerSlice.reducer;
