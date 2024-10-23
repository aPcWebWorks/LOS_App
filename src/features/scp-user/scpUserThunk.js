import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {SCP_ENDPOINT} from '../../api/endpoints.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const getWithSCPNumberHandler = createAsyncThunk(
//   'scp/get-scp',
//   async (scpnumber, {rejectWithValue}) => {
//     try {
//       const response = await axiosInstance.get(`${SCP_ENDPOINT}/${scpnumber}`);
//       const {status, data} = response;

//       if (status === 200) {
//         const {id} = data?.scpDetail;
//         await AsyncStorage.setItem('scpId', id);

//         return response;
//       }

//       return;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   },
// );

const getWithSCPNumberHandler = createAsyncThunk(
  'scp/get-scp',
  async (scpnumber, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(`${SCP_ENDPOINT}/${scpnumber}`);
      const {status, data} = response;

      if (status === 200 && data?.scpDetail?.id) {
        const {id} = data.scpDetail;

        try {
          await AsyncStorage.setItem('scpId', id);
        } catch (err) {
          return rejectWithValue('Error saving SCP ID in store.');
        }

        return data;
      } else {
        return rejectWithValue(`Unexpected response status: ${status}`);
      }
    } catch (err) {
      return rejectWithValue(err);
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
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export {getWithSCPNumberHandler, scpUserDetailsHandler};
