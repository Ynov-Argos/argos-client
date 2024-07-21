import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/api/apiSlice';
import authReducer from './services/auth/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
