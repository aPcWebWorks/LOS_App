import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstence';
import {BANKMASTER_ENDPOINT, GET_ALL_BANK} from '../../../api/endpoints';
import {store} from '../../../store/store';
import {getAllLoanTypeHandler} from '../loanMasterThunk';

const bankMasterHandler = createAsyncThunk(
  'bank-Master/bank',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`${BANKMASTER_ENDPOINT}/${_id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const getAllBankHandller = createAsyncThunk(
  'bank-Master/get-all-bank',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        // 'http://192.168.29.113:8589/api/v1/los/bank?pageNumber=0&pageSize=2000',
        `${BANKMASTER_ENDPOINT}?pageNumber=0&pageSize=2000`,
      );

      const {status, data} = response;
      const {record} = data.records;

      if (status === 200) {
        await store.dispatch(getAllLoanTypeHandler());
      }
      return record;
    } catch (error) {
      console.log(error);
      await rejectWithValue(error);
    }
  },
);

export {getAllBankHandller};
export default bankMasterHandler;
