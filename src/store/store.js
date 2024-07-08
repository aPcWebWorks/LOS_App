import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import authReducer from '../features/auth/authSlice.js';
import customerMasterReducer, {
  searchCustomerByParameterSlice,
  getCustomerWithIdSlice,
} from '../features/customer-master/customerMasterSlice.js';
import scpUserReducer from '../features/scp-user/scpUserSlice.js';
import {thunk} from 'redux-thunk';
import loanMasterReducer, {
  loanTypeSlice,
  loanDetailsSlice,
} from '../features/loan-master/loanMasterSlice.js';
import documentSlice from '../features/documents/documentSlice.js';
import bankMasterReducer, {
  getBanksSlice,
} from '../features/loan-master/bank-master/bankMasterSlice.js';
import {getAllLoanHandler} from '../features/loan-master/loanMasterThunk.js';
// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  customerMaster: customerMasterReducer,
  searchCustomerByParameter: searchCustomerByParameterSlice.reducer,
  getCustomerById: getCustomerWithIdSlice.reducer,
  scpUser: scpUserReducer,
  loanMaster: loanMasterReducer,
  loanDetails: loanDetailsSlice.reducer,
  bankMaster: bankMasterReducer,
  document: documentSlice,
  banks: getBanksSlice.reducer,
  loanType: loanTypeSlice.reducer,
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
