import React from 'react';
import { useGetMatchingWorkflowListQuery } from '../../services/matching/MatchingApiSlice.ts';
import Loader from '../../common/Loader';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import DataTable from '../../components/DataTables/DataTable.tsx';
import { useNavigate } from 'react-router-dom';

const columns = [
  {Header: 'Client', accessor: 'name'},
  {Header: 'Statut', accessor: 'status'},
  {Header: 'Nombre de Match', accessor: 'totalMatches'},
  {Header: 'Matches Complétés', accessor: 'matchesCompleted'},
];

const WorkflowList: React.FC = () => {
  const { data: workflows, isLoading} = useGetMatchingWorkflowListQuery('');
  const navigate = useNavigate();

  const handleOnClick = (row) => {
    navigate(`/client/${row.clientId}`);
  };

  const rows = workflows?.map((workflow) => ({
    clientId: workflow?.clientId,
    name: workflow?.Client?.name,
    status: workflow?.status === 'PENDING' ? 'En cours' : 'Terminé',
    totalMatches: workflow?.totalMatches,
    matchesCompleted: workflow?._count?.matches,
  }));

  return isLoading ? (<Loader></Loader>) : (
    <DefaultLayout>
      <div>
        <DataTable column={columns} rows={rows} handleOnClick={handleOnClick}/>
      </div>
    </DefaultLayout>
  );
};

export default WorkflowList;
