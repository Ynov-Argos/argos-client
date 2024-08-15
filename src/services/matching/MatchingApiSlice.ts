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
    getOneTimeSearchHistory: builder.query({
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
  })
});

export const {
  useSendOneTimeSearchRequestMutation,
  useGetOneTimeSearchHistoryQuery,
  useGetOneTimeSearchResultQuery
} = matchingApiSlice;
