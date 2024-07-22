import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { logOut } from '../auth/AuthSlice.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api',
  prepareHeaders: (headers, {}) => {
    /* @ts-ignore */
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReAuth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // TODO - re-authenticate with refresh token
    api.dispatch(logOut());
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  /* @ts-ignore */
  endpoints: builder => ({})
  });
