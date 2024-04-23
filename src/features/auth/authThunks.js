import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {LOGIN_ENDPOINT} from '../../api/endpoints.js';
import {scpUserHandler} from '../scp-user/scpUserThunk.js';

const userLogin = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const {data, status} = await axiosInstance.post(
        `${LOGIN_ENDPOINT}`,
        credentials,
      );
      if (status === 200) {
        // const _token = ['token', data.token];
        // const _id = ['id', data.id];
        // await AsyncStorage.multiSet([_token, _id]);
        await AsyncStorage.setItem('token', data.token);
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

const userLogout = createAsyncThunk('auth/logout', async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
});

export {userLogin, userLogout};
