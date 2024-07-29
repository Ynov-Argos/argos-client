import { apiSlice } from '../api/apiSlice.ts';

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClient: builder.query({
      query: (clientId: string) => ({
        url: `/client/${clientId}`,
        method: 'GET'
      })
    }),
    getClients: builder.query({
      query: () => ({
        url: '/client',
      }),
      keepUnusedDataFor: 60
    }),
    createClient: builder.mutation({
      query: (data: {
        idExterne: string, type: string, typeRelation: string, natural: string, legal: string, vessel: string,
        prenom: string, nom: string, dateNaissance: string, lieuNaissance: string, nationalite: string,
        email: string, adresse: string, adresse2: string, ville: string, codePostal: string, pays: string
      }) => ({
        url: '/client',
        method: 'POST',
        body: { ...data }
      })
    }),
    updateClient: builder.mutation({
      query: (data: {
        clientId: string, idExterne: string, type: string, typeRelation: string, natural: string, legal: string, vessel: string,
        prenom: string, nom: string, dateNaissance: string, lieuNaissance: string, nationalite: string,
        email: string, adresse: string, adresse2: string, ville: string, codePostal: string, pays: string
      }) => ({
        url: `/client/${data.clientId}`,
        method: 'PUT',
        body: {
          idExterne: data.idExterne, type: data.type, typeRelation: data.typeRelation, natural: data.natural,
          legal: data.legal, vessel: data.vessel, prenom: data.prenom, nom: data.nom, dateNaissance: data.dateNaissance,
          lieuNaissance: data.lieuNaissance, nationalite: data.nationalite, email: data.email, adresse: data.adresse,
          adresse2: data.adresse2, ville: data.ville, codePostal: data.codePostal, pays: data.pays
        }
      })
    }),
    deactivateClient: builder.mutation({
      query: (clientId: string) => ({
        url: `/client/deactivate/${clientId}`,
        method: 'PUT'
      })
    }),
    activateClient: builder.mutation({
      query: (clientId: string) => ({
        url: `/client/activate/${clientId}`,
        method: 'PUT'
      })
    })
  })
});

export const {
  useGetClientQuery,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeactivateClientMutation,
  useActivateClientMutation
} = clientApiSlice;
