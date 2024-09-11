import React from 'react';
import { useGetClientsQuery } from '../../services/client/ClientApiSlice.ts';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import Loader from '../../common/Loader';
import DataTable from '../../components/DataTables/DataTable.tsx';
import { useNavigate } from 'react-router-dom';

const ListClient: React.FC = () => {

  const columns = [
    { Header: 'ID Externe', accessor: 'externalId' },
    { Header: 'Nom', accessor: 'name' },
    { Header: 'Type', accessor: 'type' },
    { Header: 'Type de Relation', accessor: 'relationType' },
    { 
      Header: 'Date d\'Archivage', 
      accessor: 'archivingDate', 
      Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : 'N/A' 
    }
  ];

  const navigate = useNavigate();

  const { data: clients, isLoading } = useGetClientsQuery({});

  const handleOnClick = (row: { id: any; }) => {
    navigate(`/client/${row.id}`);
  }

  if (isLoading) return <Loader />;

  return (
    <DefaultLayout>
      <div>
        <DataTable column={columns} rows={clients} handleOnClick={handleOnClick} />
      </div>
    </DefaultLayout>
  );
};

export default ListClient;
