import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { useParams } from 'react-router-dom';
import { useGetOneTimeSearchResultQuery } from '../../services/matching/MatchingApiSlice.ts';
import Loader from '../../common/Loader';
import DataTable from '../../components/DataTables/DataTable.tsx';

const OneTimeSearchResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: searchResult,
    isLoading,
    isError,
  } = useGetOneTimeSearchResultQuery(id);

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

  const columns = (searchResult) => {
    if (searchResult.nature === 'NATURAL') {
      return [
        { Header: 'N° de Registre', accessor: 'registreId' },
        { Header: 'Nom', accessor: 'name' },
        { Header: 'Prénom', accessor: 'firstName' },
        { Header: 'Score', accessor: 'score' },
      ];
    }
    if (searchResult.nature === 'LEGAL') {
      return [
        { Header: 'N° de Registre', accessor: 'registreId' },
        { Header: 'Nom', accessor: 'name' },
        { Header: 'Score', accessor: 'score' },
      ];
    }
    if (searchResult.nature === 'VESSEL') {
      return [
        { Header: 'N° de Registre', accessor: 'registreId' },
        { Header: 'Nom', accessor: 'name' },
        { Header: 'Score', accessor: 'score' },
        { Header: 'N° OMI', accessor: 'omiNumber' },
      ];
    }

    return [
      { Header: 'N° de Registre', accessor: 'registreId' },
      { Header: 'Nom', accessor: 'name' },
      { Header: 'Score', accessor: 'score' },
    ];
  };

  const rows = (searchResults) => {
    return searchResults.map((result) => {
      return {
        registreId: result?._source?.registreId,
        name: result?._source?.name,
        firstName: result?._source?.natural?.firstName,
        score: result?._score,
        omiNumber: result?._source?.vessel?.OMINumber,
      };
    });
  }

  const dateFormater = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {});
  };

  return isLoading ? (<Loader></Loader>) : isError ? (<div>Error</div>) : (
    <DefaultLayout>
      <div
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Résultat de la recherche - {searchResult?.name}
          </h3>
        </div>
        <div className="p-4 sm:p-6 xl:p-9">
          <div className="flex flex-col-reverse gap-5 xl:flex-row xl:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row xl:gap-9">
              <div>
                <div className="block">
                  <span
                    className="font-bold text-black dark:text-white">Référence: </span> {searchResult?.id}
                </div>
                <div className="mt-2 block">
                  <span className="font-bold text-black dark:text-white">Entité </span>
                  {natureOptions.find((option) => option.value === searchResult?.nature)?.label}
                </div>
              </div>
              <div className="ml-2.5">
                <div className="block">
                  <span
                    className="font-bold text-black dark:text-white">Date de la recherche: {' '} </span> {dateFormater(searchResult?.searchDate)}
                </div>
                <span className="mt-2 block">
                  <span
                    className="font-bold text-black dark:text-white">Hits total: </span> {searchResult?.totalResults}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <DataTable column={columns(searchResult)} rows={rows(searchResult.searchResult)} handleOnClick={() => {console.log('Click')}} />
      </div>
    </DefaultLayout>);
};

export default OneTimeSearchResult;
