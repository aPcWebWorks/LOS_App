import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstence';
import {BANKMASTER_ENDPOINT} from '../../../api/endpoints';

const bankMasterHandler = createAsyncThunk(
  'bank-Master/bank',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`${BANKMASTER_ENDPOINT}/${_id}`);
      // console.log('Bank Master Handler', data?.records?.record[0]?.response);
      // console.log('Bank Master Handler', data);
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

const getAllBankHandller = createAsyncThunk(
  'bank-Master/getAllBank',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get
        // `${BANKMASTER_ENDPOINT}/?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        ('http://192.168.29.113:8589/api/v1/los/bank?pageNumber=0&pageSize=2000');
        // console.log('API Response:', data); 
      return data.records.record;
    } catch (error) {
      console.log(error);
      await rejectWithValue(error);
    }
  },
);

export {getAllBankHandller};
export default bankMasterHandler;
