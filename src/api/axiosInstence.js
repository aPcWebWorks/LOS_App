import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {userLogout} from '../features/auth/authThunks';
import {Alert} from 'react-native';
import customSnackbar from '../components/Common/snackbar/Snackbar';

// Axios Instance.
const axiosInstance = axios.create({
  // baseURL: 'http://192.168.33.16:8589/api/v1/los',
  baseURL:'http://192.168.29.113:8589/api/v1/los',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptots.
axiosInstance.interceptors.request.use(
  async config => {
    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response Interceptots.
axiosInstance.interceptors.response.use(
  response => {
    const available_session_time = response.headers.available_session_time;
    console.log(
      `Your Session is Expire within a ${available_session_time} Seconds.`,
    );
    if (available_session_time < 1) {
      userLogout();
    }
    return response;
  },
  async error => {
    if (error.response && error.response.status === 403) {
      try {
        removeFew = async () => {
          const keys = ['token', 'id'];
          try {
            await AsyncStorage.multiRemove(keys);
            const tkn = await AsyncStorage.getItem('token');
            console.log(tkn);
          } catch (error) {
            console.log('token remove error', error);
          }
        };
        removeFew();
        Alert.alert('Your session is expire.');
        return error;
      } catch (e) {
        console.log('Error removing token from AsyncStorage:', e);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
