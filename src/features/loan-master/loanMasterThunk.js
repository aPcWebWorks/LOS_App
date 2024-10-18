import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {LOANDETAILS_ENDPOINT} from '../../api/endpoints.js';
import {store} from '../../store/store.js';
import {getCustomerWithId} from '../customer-master/customerMasterThunk.js';
import bankMasterHandler from './bank-master/bankMasterThunk.js';

const loanMasterHandler = createAsyncThunk(
  'loan-Master/get-all-loan',
  async (_id, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        'http://192.168.29.113:8589/api/v1/los/loan/master?pageNumber=0&pageSize=2000',
      );

      // const {status, data} = response;
      const {record} = response?.data?.records;
      return record;
    } catch (err) {
      return rejectWithValue(err);
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
      //  console.log('Loan Details Response Data:', data);
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

const getAllLoanTypeHandler = createAsyncThunk(
  'loan-Master/get-all-loantype',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        'http://192.168.29.113:8589/api/v1/los/loan/type?pageNumber=0&pageSize=2000',
      );
      const {status, data} = response;
      const {record} = data.records;
      //  console.log("Loans",record)
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
      return response;
    } catch (error) {
      console.log('generate-loan', error);
    }
  },
);

const getLoanTypeWithIdHandler = createAsyncThunk(
  'loan-Master/get-loantype-with-id',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `http://192.168.29.113:8589/api/v1/los/loan/type/${id}`,
      );

      console.log('get-loantype-with-id', response.data);
      return response;
    } catch (error) {
      console.log('get-all-loan', error);
    }
  },
);

const loanUpdateHandler = createAsyncThunk(
  'loan-Master/update-loan',
  async (payload, {rejectWithValue}) => {
    const {id, formData} = payload;

    console.log('id, payload', formData);
    try {
      const response = await axiosInstance.put(
        `http://192.168.29.113:8589/api/v1/los/loan/${id}/master`,
        formData,
      );

      const {data} = response;

      // console.log('loanUpdateHandler', response);
      return response;
    } catch (error) {
      console.log('generate-loan', error);
    }
  },
);

export {
  loanMasterHandler,
  loanDetailsHandler,
  getAllLoanTypeHandler,
  loanGenerationHandler,
  loanUpdateHandler,
  getLoanTypeWithIdHandler,
};
