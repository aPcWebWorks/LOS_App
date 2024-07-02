import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Base64} from 'js-base64';
import axiosInstance from '../../api/axiosInstence.js';
import {LOGIN_ENDPOINT} from '../../api/endpoints.js';
import {
  getWithSCPNumberHandler,
  scpUserHandler,
} from '../scp-user/scpUserThunk.js';
import {store} from '../../store/store.js';

// function decodeJWT(token) {
//   try {
//     const [payload] = token.split('.');
//     const decoded = JSON.parse(Base64.decode(payload));
//     return decoded;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// }

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
        console.log(error);
        return rejectWithValue(data);
      }
    } catch (error) {
      console.log('Login Error', error);
    }
  },
);

const userLogout = createAsyncThunk('auth/logout', async () => {
  try {
    await AsyncStorage.clear();
    delete axiosInstance.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
});

export {userLogin, userLogout};
