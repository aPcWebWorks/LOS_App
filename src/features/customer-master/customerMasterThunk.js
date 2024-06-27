import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {CUSTOMERMASTER_ENDPOINT} from '../../api/endpoints.js';
// import {customerParamsClearState} from './customerMasterSlice.js';

// const addcustomer = createAsyncThunk(
//   'customer/addcustomer',
//   async (credentials, thunkAPI) => {
//     console.log('addcustomer', credentials);
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       };
//       const response = await axiosInstance.post(
//         '/customer',
//         credentials,
//         config,
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error",error);
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );

const addcustomer = createAsyncThunk(
  'customer/addcustomer',
  async (credentials, thunkAPI) => {
    // console.log('addcustomer', credentials);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const response = await axiosInstance.post(
        '/customer',
        credentials,
        config,
      );
      // console.log('data', response);
      return response;
    } catch (error) {
      console.error('Thunk Error', error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

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

const getCustomerWithId = createAsyncThunk(
  'customer-master/getCustomerWithId',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        `${CUSTOMERMASTER_ENDPOINT}/${_id}`,
      );
      // console.log("singal Customer thunk document", data)
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const patchCustomerHandler = createAsyncThunk(
  'customer/update-customer',
  async ({id, credentials}, thunkAPI) => {
    // console.log('addcustomer', credentials);
    try {
      const {data} = await axiosInstance.patch(`/customer/${id}`, credentials);
      console.log('data', data);
      return data;
    } catch (error) {
      console.error('Thunk Error', error);
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
