import { useGetUsersQuery } from '../../services/user/UserApiSlice.ts';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import Loader from '../../common/Loader';
import DataTable from '../../components/DataTables/DataTable.tsx';
import { useNavigate } from 'react-router-dom';

const UserList = () => {

  const columns = [
    { Header: 'Nom', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' },
    { Header: 'Actif', accessor: 'active' }];

  const navigate = useNavigate();

  // @ts-ignore
  const { data: users, isLoading } = useGetUsersQuery();

  const handleOnClick = (row) => {
    navigate(`/user/${row.id}`);
  }
  return isLoading ? (<Loader></Loader>) : (
    <DefaultLayout>
      <div>
        <DataTable column={columns} rows={users} handleOnClick={handleOnClick}/>
      </div>
    </DefaultLayout>
  );
};

export default UserList;
