import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {LOANDETAILS_ENDPOINT} from '../../api/endpoints.js';
import {store} from '../../store/store.js';
import {getCustomerWithId} from '../customer-master/customerMasterThunk.js';
import bankMasterHandler from './bank-master/bankMasterThunk.js';

const loanMasterHandler = createAsyncThunk(
  'loan-Master/getAllLoan',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        // 'http://192.168.29.113:8589/api/v1/los/loan/master?pageNumber=1&pageSize=9',
        'http://192.168.29.113:8589/api/v1/los/loan/master',
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

const loanDetailsHandler = createAsyncThunk(
  'loan-Master/details',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        `${LOANDETAILS_ENDPOINT}/${_id}/master`,
      );

      if (data) {
        await store.dispatch(getCustomerWithId(data?.customerId));
        await store.dispatch(bankMasterHandler(data?.bankId));
      }

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

const getAllLoanHandler = createAsyncThunk(
  'loan-Master/get-all-loan',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        'http://192.168.29.113:8589/api/v1/los/loan/type?pageNumber=0&pageSize=2000',
      );
      const {status, data} = response;
      const {record} = data.records;
// console.log("Loans",response)
      return record;
    } catch (error) {
      console.log('get-all-loan', error);
    }
  },
);

const loanGenerationHandler = createAsyncThunk(
  'loan-Master/generate-loan',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        
        'http://192.168.29.113:8589/api/v1/los/loan/master',
        payload,
      );

       const {data} = response;

      // console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.error('Error:', error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.error('Error:', error.message);
        return rejectWithValue(error.message);
      }
    }
  },
);


export {
  loanMasterHandler,
  loanDetailsHandler,
  getAllLoanHandler,
  loanGenerationHandler,
};
