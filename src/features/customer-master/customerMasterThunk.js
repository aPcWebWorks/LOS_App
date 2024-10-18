import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {CUSTOMERMASTER_ENDPOINT} from '../../api/endpoints.js';

const addcustomer = createAsyncThunk(
  'customer_master/addcustomer',
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/customer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Request Headers:', response);
      return response;
    } catch (err) {
      console.error('Thunk Error', err);
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  },
);

const customerMasterHandler = createAsyncThunk(
  'customer-master/getAllCustomer',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        `${CUSTOMERMASTER_ENDPOINT}/all?pageNumber=0&pageSize=2000`,
      );

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const getCustomerWithId = createAsyncThunk(
  'customer-master/getCustomerWithId',
  async (_id, {rejectWithValue}) => {
    try {
      const res = await axiosInstance.get(`${CUSTOMERMASTER_ENDPOINT}/${_id}`);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const searchCustomerByParameter = createAsyncThunk(
  'customer-master/searchByCustomerUrlParamsHandler',
  async ({criteriaType, criteriaValue}, {rejectWithValue}) => {
    try {
      let endpoint = CUSTOMERMASTER_ENDPOINT;

      switch (criteriaType) {
        case 'name':
          endpoint += `/all?name=${criteriaValue}`;
          break;

        case 'aadharorpannumber':
          if (criteriaValue) {
            endpoint += `/all?aadhaarOrPanNumber=${criteriaValue}`;
          }
          break;

        // case 'customerid':
        //   endpoint += `/all?name=${criteriaValue}`;
        //   break;

        default:
          // customerParamsClearState();
          break;
      }

      const {data} = await axiosInstance.get(endpoint);
      // console.log('criteria data', data);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const patchCustomerHandler = createAsyncThunk(
  'customer/update-customer',
  async ({id, credentials}, thunkAPI) => {
    console.log('addcustomer', credentials);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axiosInstance.patch(
        `/customer/${id}`,
        credentials,
        config,
      );

      console.log('data', response.data);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export {
  customerMasterHandler,
  getCustomerWithId,
  searchCustomerByParameter,
  addcustomer,
  patchCustomerHandler,
};
