import { apiSlice } from '../api/apiSlice.ts';

export const matchingApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    sendOneTimeSearchRequest: builder.mutation({
      query: (data: { name: string, nature: string }) => ({
        url: `/matching/one-time-search`,
        method: 'POST',
        body: data,
      }),
    }),
    getOneTimeSearches: builder.query({
      query: () => ({
        url: '/matching/one-time-search',
        method: 'GET',
      }),
    }),
    getOneTimeSearchResult: builder.query({
      query: (searchId: string) => ({
        url: `/matching/one-time-search/${searchId}`,
        method: 'GET',
      }),
    }),
    getEntity: builder.query({
      query: (entityId: string) => ({
        url: `/matching/entity/${entityId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 1000 * 60 * 5, // 5 minutes
    }),
    getEntityOnDemand: builder.mutation({
      query: (entityId: string) => ({
        url: `/matching/entity/${entityId}`,
        method: 'GET',
      }),
    }),
    getMatchingWorkflowByClient: builder.query({
      query: (clientId: string) => ({
        url: `/matching/workflows/${clientId}`,
        method: 'GET',
      }),
    }),
    setMatchQualification: builder.mutation({
      query: (data: { workflowId: string, matchId: string, qualification: string }) => ({
        url: `/matching/workflows/${data.workflowId}/match/${data.matchId}/${data.qualification}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useSendOneTimeSearchRequestMutation,
  useGetOneTimeSearchesQuery,
  useGetOneTimeSearchResultQuery,
  useGetEntityQuery,
  useGetEntityOnDemandMutation,
  useGetMatchingWorkflowByClientQuery,
  useSetMatchQualificationMutation,
} = matchingApiSlice;
