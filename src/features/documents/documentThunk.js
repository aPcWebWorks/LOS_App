import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {DOCUMENT_ENDPOINT} from '../../api/endpoints.js';

const documentHandler = createAsyncThunk(
  'document',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`${DOCUMENT_ENDPOINT}/${_id}`);
      //   console.log('Singal Customer Document', data);
      //   console.log('blob', _blob);
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

export {documentHandler};
