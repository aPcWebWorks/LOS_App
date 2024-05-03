import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {CUSTOMERMASTER_ENDPOINT} from '../../api/endpoints.js';
import {customerParamsClearState} from './customerMasterSlice.js';

const customerMasterHandler = createAsyncThunk(
  'customer-master/getAllCustomer',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        `${CUSTOMERMASTER_ENDPOINT}/all?pageNumber=0&pageSize=10`,
      );
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

const geCustomerWithId = createAsyncThunk(
  'customer-master/geCustomerWithId',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        `${CUSTOMERMASTER_ENDPOINT}/${_id}`,
      );
      // console.log("Customer with id Data Handler", data)
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

const searchCustomerParamsHandler = createAsyncThunk(
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
      console.log('criteria data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export {customerMasterHandler, geCustomerWithId, searchCustomerParamsHandler};
