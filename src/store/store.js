import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import authReducer from '../features/auth/authSlice.js';
import customerMasterReducer from '../features/customer-master/customerMasterSlice.js';
import scpUserReducer from '../features/scp-user/scpUserSlice.js';
import {thunk} from 'redux-thunk';
import loanMasterReducer from '../features/loan-master/loanMasterSlice.js';

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  customerMaster: customerMasterReducer,
  scpUser: scpUserReducer,
  loanMaster: loanMasterReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: {
  //   auth: authReducer,
  //   customerMaster: customerMasterReducer,
  // },
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(thunk);
  // },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// export default store;
