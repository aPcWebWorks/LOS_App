import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {DOCUMENT_ENDPOINT} from '../../api/endpoints.js';

const documentHandler = createAsyncThunk(
  'document/fetch',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`${DOCUMENT_ENDPOINT}/${_id}`, {
        responseType: 'arraybuffer',
      });

      const uint8Array = new Uint8Array(data);
      const blob = new Blob([data], {type: 'image/jpeg'});
      const imageUrl = URL.createObjectURL(blob);

      console.log('imageUrl', blob);
      // console.log(data);
      return {imageUrl, data: response.data};
    } catch (error) {
      console.log(error);
    }
  },
);

export default documentHandler;
