import React from 'react';
import { useGetMatchingWorkflowByClientQuery } from '../../services/matching/MatchingApiSlice.ts';
import Loader from '../../common/Loader';
import ClientMatchingDataTable from '../DataTables/ClientMatchingDataTable.tsx';
type ClientMatchingProps = { clientID: string; };

const columns = [
  { Header: 'Nom', accessor: 'name' },
  { Header: 'Date de Detection', accessor: 'detectionDate' },
  { Header: 'Date de Qualification', accessor: 'decisionDate' },
  { Header: 'Statut', accessor: 'status' }
]

const ClientMatching: React.FC<ClientMatchingProps> = ({clientID}) => {
  const { data: workflow, isLoading } = useGetMatchingWorkflowByClientQuery(clientID);

  const rows = workflow?.matches?.map((match) => {
    return {
      id: match.id,
      name: match.data.nature === 'NATURAL' ? `${match.data.natural.firstName} ${match.data.name}` : match.data.name,
      detectionDate: match.detectionDate,
      decisionDate: match.decisionDate,
      status: match.status
    }
  });

  console.log(rows);

  return isLoading ? (<Loader/>) : (
    <div>
      <ClientMatchingDataTable column={columns} rows={rows} matchingInfo={{status: workflow?.status, total: workflow?.totalMatches}}/>
    </div>
  );
};

export default ClientMatching;
