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
      }),
      keepUnusedDataFor: 60
    }),
    updatePassword: builder.mutation({
      query: (data: { userId: string, oldPassword: string, newPassword: string }) => ({
        url: `/user/update-password/${data.userId}`,
        method: 'PUT',
        body: { oldPassword: data.oldPassword, newPassword: data.newPassword }
      })
    }),
    createUser: builder.mutation({
      query: (data: { email: string, password: string, name: string, role: string }) => ({
        url: '/user',
        method: 'POST',
        body: { ...data }
      })
    }),
    updateUser: builder.mutation({
      query: (data: { userId: string, email: string, name: string, role: string }) => ({
        url: `/user/${data.userId}`,
        method: 'PUT',
        body: { name: data.name, email: data.email, role: data.role }
      })
    }),
    deactivateUser: builder.mutation({
      query: (userId: string) => ({
        url: `/user/deactivate/${userId}`,
        method: 'PUT'
      })
    }),
    activateUser: builder.mutation({
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
  useUpdatePasswordMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeactivateUserMutation,
  useActivateUserMutation
} = userApiSlice;

