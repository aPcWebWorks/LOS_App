import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';
import {userLogout} from '../features/auth/authThunks';
import {store} from '../store/store';

// Axios Instance.
const axiosInstance = axios.create({
  baseURL: 'http://192.168.29.113:8589/api/v1/los',
  // baseURL: 'http://192.168.64.16:8589/api/v1/los',
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
    console.log("config", config)
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

    // console.log(response)
    if (available_session_time <= 60) {
      setTimeout(() => {
        Alert.alert('Session Expiring', `Your session will expire soon`, [
          {
            text: 'OK',
            onPress: async () => {
              await store.userLogout();
            },
          },
        ]);
      }, 0);
    }

    return response;
  },
  async error => {
    if (error.response && error.response.status === 403) {
      try {
        return new Promise((resolve, reject) => {
          Alert.alert(
            'Session Expiring',
            'Your session will expired.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  try {
                    await store.dispatch(userLogout());
                    resolve(error);
                  } catch (e) {
                    console.log('Error removing token from AsyncStorage:', e);
                    reject(error);
                  }
                },
              },
            ],
            {cancelable: false},
          );
        });
      } catch (e) {
        console.log('Error during logout:', e);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
