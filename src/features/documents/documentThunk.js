import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {DOCUMENT_ENDPOINT} from '../../api/endpoints.js';

const documentHandler = createAsyncThunk(
  'document/fetch',
  async (_id, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(`${DOCUMENT_ENDPOINT}/${_id}`, {
        responseType: 'blob',
      });

      const blob = new Blob([await response.data], {
        type: 'image/jpg',
      });

      const base64Str = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      return base64Str;
    } catch (error) {
      console.log(error);
    }
  },
);

export default documentHandler;
