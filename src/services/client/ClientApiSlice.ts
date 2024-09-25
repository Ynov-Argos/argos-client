import {apiSlice} from '../api/apiSlice.ts';
import { Client } from './client.entity.ts';

const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClient: builder.query({
      query: (id: string) => ({
        url: `/client/${id}`,
        method: 'GET'
      })
    }),
    getClients: builder.query({
      query: () => ({
        url: '/client',
      }),
      keepUnusedDataFor: 60
    }),
    updateClient: builder.mutation({
      query: (data: Client) => ({
        url: `/client/${data.id}`,
        method: 'PUT',
        body: { ...data }
      })
    }),
    createClient: builder.mutation({
      query: (data: Client) => ({
        url: '/client',
        method: 'POST',
        body: { ...data }
      })
    }),
  }),
});

export const {
  useGetClientQuery,
  useGetClientsQuery,
  useUpdateClientMutation,
  useCreateClientMutation,
} = clientApiSlice;
