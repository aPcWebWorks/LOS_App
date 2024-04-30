import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import { CUSTOMERMASTER_ENDPOINT } from '../../api/endpoints.js';

const customerMasterHandler = createAsyncThunk(
    'customer-master/getAllCustomer',
    async (_id, {rejectWithValue}) => {
      try {
        const {data} = await axiosInstance.get(`${CUSTOMERMASTER_ENDPOINT}pageNumber=0&pageSize=10`);
        // console.log("Customer mAster Data Handler", data)
        return data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          console.log('error.response.data.message', error.response.data.message);
          return rejectWithValue(error.response.data.message);
        } else {
          console.log('error.message', error.message);
          return rejectWithValue(error.message);
        }
      }
    },
  );

  export {customerMasterHandler};