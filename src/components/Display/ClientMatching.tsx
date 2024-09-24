import React from 'react';
import { useGetMatchingWorkflowByClientQuery } from '../../services/matching/MatchingApiSlice.ts';
import Loader from '../../common/Loader';
import ClientMatchingDataTable from '../DataTables/ClientMatchingDataTable.tsx';
import moment from 'moment';

type ClientMatchingProps = { clientID: string; };

const columns = [
  { Header: 'Nom', accessor: 'name' },
  { Header: 'Date de Detection', accessor: 'detectionDate' },
  { Header: 'Date de Qualification', accessor: 'decisionDate' },
  { Header: 'Statut', accessor: 'status' }
]

const clientMatchStatus = [{value: 'PENDING_QUALIFICATION', label: 'EN ATTENTE DE QUALIFICATION'}, {value: 'VERIFIED', label: 'VÉRIFIÉ'}, {value: 'CLEARED', label: 'FAUX POSITIF'}];

const ClientMatching: React.FC<ClientMatchingProps> = ({clientID}) => {
  const { data: workflow, isLoading, error } = useGetMatchingWorkflowByClientQuery(clientID);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !workflow) {
    // @ts-ignore
    if (error?.data.statusCode === 404) {
      return <div>Aucun workflow de matching trouvé pour ce client</div>;
    }
    return <div>Erreur lors de la récupération des données</div>;
  }

  const rows = workflow?.matches?.map((match) => {
    return {
      id: match.id,
      name: match.data.nature === 'NATURAL' ? `${match.data.natural.firstName} ${match.data.name}` : match.data.name,
      detectionDate: moment(match.detectionDate, 'YYYY-MM-DDTHH:mm:ss.sssZ.').format('DD/MM/YYYY'),
      decisionDate: !match.decisionDate || moment(match.decisionDate, 'YYYY-MM-DDTHH:mm:ss.sssZ.').format('DD/MM/YYYY') ,
      status: clientMatchStatus.find((status) => status.value === match.status)?.label || ''
    }
  });

  return (
    <div>
      <ClientMatchingDataTable column={columns} rows={rows} matchingInfo={{status: workflow?.status, total: workflow?.totalMatches}}/>
    </div>
  );
};

export default ClientMatching;
