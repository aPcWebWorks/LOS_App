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
        `${LOANDETAILS_ENDPOINT}/master?pageNumber=0&pageSize=2000`,
      );
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
      if (data) {
        await store.dispatch(getCustomerWithId(data?.customerId));
        await store.dispatch(bankMasterHandler(data?.bankId));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const getAllLoanTypeHandler = createAsyncThunk(
  'loan-Master/get-all-loantype',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${LOANDETAILS_ENDPOINT}/type?pageNumber=0&pageSize=2000`,
      );
      const {status, data} = response;
      const {record} = data.records;
      return record;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const loanGenerationHandler = createAsyncThunk(
  'loan-Master/generate-loan',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        `${LOANDETAILS_ENDPOINT}/master`,
        payload,
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const getLoanTypeWithIdHandler = createAsyncThunk(
  'loan-Master/get-loantype-with-id',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `${LOANDETAILS_ENDPOINT}/type/${id}`,
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const loanUpdateHandler = createAsyncThunk(
  'loan-Master/update-loan',
  async (payload, {rejectWithValue}) => {
    const {id, formData} = payload;

    try {
      const response = await axiosInstance.put(
        `${LOANDETAILS_ENDPOINT}/${id}/master`,
        formData,
      );

      const {data} = response;

      return response;
    } catch (error) {
      return rejectWithValue(error);
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
