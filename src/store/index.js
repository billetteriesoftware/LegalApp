import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import AuthReducer from './slices/auth';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: AuthReducer,
  },
});

export default store;
