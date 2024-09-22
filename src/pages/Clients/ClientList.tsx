import { useNavigate } from 'react-router-dom';
import { useGetClientsQuery } from '../../services/client/ClientApiSlice.ts';
import Loader from '../../common/Loader';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import DataTable from '../../components/DataTables/DataTable.tsx';
import { ClientType, RelationType } from '../../services/client/client.entity.ts';

const columns = [
  { Header: 'Nom', accessor: 'name' },
  { Header: 'Type de Client', accessor: 'type' },
  { Header: 'Relation', accessor: 'relationType' },
];

const clientTypes  = [{value: ClientType.LEGAL , label: 'Moral'}, {value: ClientType.NATURAL, label: 'Physique'}, {value: ClientType.VESSEL, label: 'Navire'}];
const relationTypes = [{value: RelationType.CLIENT, label: 'Client'}, {value: RelationType.RELATION, label: 'Relation'}, {value: RelationType.PROSPECT, label: 'Prospect'}, {value: RelationType.ARCHIVED, label: 'Archivé'}];

const ClientList = () => {
  const navigate = useNavigate();

  // @ts-ignore
  const { data: clients, isLoading } = useGetClientsQuery();

  const preparedData: any[] = clients?.map((client) => {
    return {
      id: client.id,
      name: client.name,
      type: client.type ? clientTypes.find((type) => type.value === client.type)?.label : '',
      relationType: client.relationType ? relationTypes.find((relation) => relation.value === client.relationType)?.label : '',
    };
  });

  const handleOnClick = (row) => {
    navigate(`/client/${row.id}`);
  };

  return isLoading ? (<Loader></Loader>) : (
    <DefaultLayout>
      <div>
        <DataTable column={columns} rows={preparedData} handleOnClick={handleOnClick}/>
      </div>
    </DefaultLayout>
  );
};

export default ClientList;
