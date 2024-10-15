import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstence.js';
import {LOGIN_ENDPOINT} from '../../api/endpoints.js';
import {getWithSCPNumberHandler} from '../scp-user/scpUserThunk.js';
import {store} from '../../store/store.js';

const userLogin = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        `${LOGIN_ENDPOINT}`,
        credentials,
      );

      const {data, status} = response;

      if (status === 200) {
        const _token = ['token', data.token];
        const _id = ['userid', data.id];
        await AsyncStorage.multiSet([_token, _id]);

        await store.dispatch(getWithSCPNumberHandler(data.loginId));
        return response;
      } else {
        return rejectWithValue(data);
      }
    } catch (err) {
      return rejectWithValue(
        err.response ? err.response.data : 'Network error',
      );
    }
  },
);

const tokenChecker = createAsyncThunk(
  'auth/token-checker',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        return true;
      }
      return false;
    } catch (err) {
      rejectWithValue(err.response.message);
    }
  },
);

const userLogout = createAsyncThunk(
  'auth/user-logout',
  async (_, {rejectWithValue}) => {
    console.log('user logout succesfully');
    try {
      await AsyncStorage.clear();
      delete axiosInstance.defaults.headers.common['Authorization'];
      return true;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  },
);

export {userLogin, tokenChecker, userLogout};
