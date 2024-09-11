import { apiSlice } from '../api/apiSlice.ts';

export const matchingApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    sendOneTimeSearchRequest: builder.mutation({
      query: (data: {name: string, nature: string})=> ({
        url: `/matching/one-time-search`,
        method: 'POST',
        body: data
      })
    }),
    getOneTimeSearchs: builder.query({
      query: () => ({
        url: '/matching/one-time-search',
        method: 'GET'
      })
    }),
    getOneTimeSearchResult: builder.query({
      query: (searchId: string) => ({
        url: `/matching/one-time-search/${searchId}`,
        method: 'GET'
      })
    }),
    getEntity: builder.query({
      query: (entityId: string) => ({
        url: `/matching/entity/${entityId}`,
        method: 'GET'
      }),
      keepUnusedDataFor: 1000 * 60 * 5, // 5 minutes
    }),
  })
});

export const {
  useSendOneTimeSearchRequestMutation,
  useGetOneTimeSearchsQuery,
  useGetOneTimeSearchResultQuery,
  useGetEntityQuery,
} = matchingApiSlice;
