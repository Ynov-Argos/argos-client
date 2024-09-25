import { apiSlice } from '../api/apiSlice.ts';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDashboard: builder.query({
      query: () => ({
        url: `/dashboard/`,
        method: 'GET'
      })
    })
  })
});

export const {
  useGetDashboardQuery,
} = dashboardApiSlice;


