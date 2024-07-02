import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {SCP_ENDPOINT} from '../../api/endpoints.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getWithSCPNumberHandler = createAsyncThunk(
  'scp/get-scp',
  async (scpnumber, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(`${SCP_ENDPOINT}/${scpnumber}`);

      const {status, data} = response;
      if (status === 200) {
        const {id} = data.scpDetail;
        await AsyncStorage.setItem('scpId', id);
        return;
      }
    } catch (error) {
      console.log('scp error', error);
    }
  },
);

const scpUserDetailsHandler = createAsyncThunk(
  'scp/getDetails_scpUser',
  async (_id, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`${SCP_ENDPOINT}/${_id}`);
      // console.log("SCP User Details Data Handler", _id)
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

export {getWithSCPNumberHandler, scpUserDetailsHandler};
