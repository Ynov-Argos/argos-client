import { apiSlice } from '../api/apiSlice.ts';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: (userId: string) => ({
        url: `/user/${userId}`,
        method: 'GET'
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET'
      })
    }),
    updatePassword: builder.query({
      query: (data: { oldPassword: string, newPassword: string }) => ({
        url: '/user/update-password',
        method: 'PUT',
        body: { ...data }
      })
    }),
    createUser: builder.query({
      query: (data: { email: string, password: string, name: string, role: string }) => ({
        url: '/user',
        method: 'POST',
        body: { ...data }
      })
    }),
    updateUser: builder.query({
      query: (data: { email: string, name: string, role: string }) => ({
        url: '/user',
        method: 'PUT',
        body: { ...data }
      })
    }),
    deactivateUser: builder.query({
      query: (userId: string) => ({
        url: `/user/deactivate/${userId}`,
        method: 'PUT'
      })
    }),
    activateUser: builder.query({
      query: (userId: string) => ({
        url: `/user/activate/${userId}`,
        method: 'PUT'
      })
    })
  })
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useUpdatePasswordQuery,
  useCreateUserQuery,
  useUpdateUserQuery,
  useDeactivateUserQuery,
  useActivateUserQuery
} = userApiSlice;

