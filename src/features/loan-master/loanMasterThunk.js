import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';

const loanMasterHandler = createAsyncThunk(
  'loan-Master/getAllLoan',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        'http://192.168.29.113:8589/api/v1/los/loan/master?pageNumber=1&pageSize=9',
        // 'http://192.168.29.113:8589/api/v1/los/loan/master'
      );
      //   console.log("Loan Master Handler", data?.records?.record[0]?.response);
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

export {loanMasterHandler};
