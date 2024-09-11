import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import OneTimeSearchForm from '../../components/Forms/OneTimeSearch/OneTimeSearchForm.tsx';
import { ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGetOneTimeSearchsQuery } from '../../services/matching/MatchingApiSlice.ts';
import DataTable from '../../components/DataTables/DataTable.tsx';
import Loader from '../../common/Loader';

const OneTimeSearch: React.FC = () => {
  const navigate = useNavigate();

  // @ts-ignore
  const { data: searchResult, isLoading } = useGetOneTimeSearchsQuery();

  const dateFormater = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {});
  };

  const columns = [
    { Header: 'Nom', accessor: 'name' },
    { Header: 'Nature', accessor: 'nature' },
    { Header: 'Date de recherche', accessor: 'searchDate' },
    { Header: 'Total de recherche', accessor: 'totalResults'}
  ]

  const natureOptions = [
    {
      value: 'NATURAL',
      label: 'Personne physique',
    },
    {
      value: 'LEGAL',
      label: 'Personne morale',
    },
    {
      value: 'VESSEL',
      label: 'Navire',
    }
  ];

  const getRows = (searchResults) => {
    const data = searchResults.map((result) => {
      return {
        id: result.id,
        name: result.name,
        nature: natureOptions.find((option) => option.value === result.nature)?.label,
        searchDate: dateFormater(result.searchDate),
        totalResults: result.totalResults
      }
    })
    console.log(data);
    return data;
  };

  const handleOnClick = (row) => {
    navigate(`/one-time-search/${row.id}`);
  }

  return isLoading ? (<><Loader></Loader></>) :(<><DefaultLayout>
      <div>
        Research
        <OneTimeSearchForm />
      </div>
      <div className='mt-4'>
        <DataTable column={columns} rows={getRows(searchResult)} handleOnClick={handleOnClick}/>
      </div>
    </DefaultLayout><ToastContainer /></>
  );
};

export default OneTimeSearch;
