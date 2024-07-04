// import {createSlice} from '@reduxjs/toolkit';
// import {userLogin, tokenChecker} from './authThunks';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axiosInstance from '../../api/axiosInstence';

// const initialState = {
//   isLoading: false,
//   isAuthenticated: false,
//   isError: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     userLogout: async () => {
//       await AsyncStorage.clear();
//       delete axiosInstance.defaults.headers.common['Authorization'];

//       state.isLoading = false;
//       state.isAuthenticated = false;
//       state.isError = null;
//     },
//   },
//   extraReducers: builder => {
//     // Login user
//     builder
//       .addCase(userLogin.pending, state => {
//         state.isLoading = true;
//         state.isError = null;
//       })
//       .addCase(userLogin.fulfilled, (state, {payload}) => {
//         state.isLoading = false;
//         state.isAuthenticated = true;
//       })
//       .addCase(userLogin.rejected, (state, {payload}) => {
//         state.isLoading = false;
//         state.isAuthenticated = false;
//         state.isError = payload;
//       });

//     // TokenChecker
//     builder
//       .addCase(tokenChecker.fulfilled, (state, {payload}) => {
//         state.isLoading = true;
//         state.isAuthenticated = payload;
//         console.log('token checker payload', payload);
//       })
//       .addCase(tokenChecker.rejected, (state, {payload}) => {
//         state.isLoading = false;
//         state.isAuthenticated = payload;
//         state.isError = action.error.message;
//         console.log('tokenChecker slice', action.payload);
//       });
//   },
// });

// export const {userLogout} = authSlice.actions;
// export default authSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {userLogin, tokenChecker, userLogout} from './authThunks';

const initialState = {
  isLoading: false,
  user: null,
  isAuthenticated: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Login user
    builder
      .addCase(userLogin.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(userLogin.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.user = payload;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isError = payload;
      })

      // Logout user
      .addCase(userLogout.pending, state => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isError = null;
      })
      .addCase(userLogout.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = payload;
      })

      // TokenChecker
      .addCase(tokenChecker.fulfilled, (state, {payload}) => {
        state.isLoading = true;
        state.isAuthenticated = payload;
        console.log('token checker payload', payload);
      })
      .addCase(tokenChecker.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isAuthenticated = payload;
        state.isError = payload;
        console.log('tokenChecker slice', payload);
      });
  },
});

export default authSlice.reducer;
